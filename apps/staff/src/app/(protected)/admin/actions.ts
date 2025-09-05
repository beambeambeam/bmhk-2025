"use server"

import { adminActionContext } from "@/lib/orpc/actionable"
import { adminProcedure } from "@/lib/orpc/procedures"
import { ORPCError } from "@orpc/client"
import { auth, StaffRolesEnum } from "@workspace/auth"
import { db } from "@workspace/db"
import { eq } from "@workspace/db/orm"
import { user } from "@workspace/db/schema"
import { headers } from "next/headers"
import { z } from "zod"

const passwordSchema = z
  .string()
  .min(6, { message: "Password must be longer than 6 characters" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least 1 uppercase letter",
  })
  .regex(/[a-z]/, {
    message: "Password must contain at least 1 lowercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
  .regex(/[!@#$%^&*]/, {
    message: "Password must contain at least 1 special character",
  })

const optionalPasswordSchema = z
  .string()
  .max(0)
  .or(
    z
      .string()
      .min(6, { message: "Password must be longer than 6 characters" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least 1 uppercase letter",
      })
      .regex(/[a-z]/, {
        message: "Password must contain at least 1 lowercase letter",
      })
      .regex(/[0-9]/, { message: "Password must contain at least 1 number" })
      .regex(/[!@#$%^&*]/, {
        message: "Password must contain at least 1 special character",
      })
  )

const addUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  username: z.string(),
  password: optionalPasswordSchema,
  role: StaffRolesEnum,
  autoGeneratePassword: z.boolean(),
})

const editUserSchema = addUserSchema.partial().extend({
  id: z.string(),
  password: z.preprocess((val) => (val === "" ? undefined : val), passwordSchema.optional()),
})

const deleteUserSchema = z.object({
  id: z.string(),
})

export const addUser = adminProcedure
  .input(addUserSchema)
  .handler(async ({ input }) => {
    const [existingEmail] = await db.select().from(user).where(eq(user.email, input.email)).limit(1)

    if (existingEmail)
      throw new ORPCError("BAD_REQUEST", {
        message: `User with email ${input.email} already existed!`,
        data: {
          bmhkIntErr: "EMAIL_EXISTED",
        },
      })

    const [existingUser] = await db.select().from(user).where(eq(user.username, input.username)).limit(1)

    if (existingUser)
      throw new ORPCError("BAD_REQUEST", {
        message: `User ${input.username} already existed!`,
        data: {
          bmhkIntErr: "USERNAME_EXISTED",
        },
      })
    if (!input.autoGeneratePassword && !input.password)
      throw new ORPCError("BAD_REQUEST", {
        message: `If not autogenerating password can't be blank!`,
        data: {
          bmhkIntErr: "PASSWORD_IS_BLANK",
        },
      })

    let password = ""

    if (input.autoGeneratePassword) {
      const allChars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*_"
      let tr = ""
      for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * allChars.length)
        tr += allChars[randomIndex]
      }
      password = tr
    } else {
      const psp = passwordSchema.safeParse(input.password)

      if (!psp.success) {
        throw new ORPCError("BAD_REQUEST", {
          message: `If not autogenerating password can't be blank!`,
          data: {
            bmhkIntErr: "PASSWORD_IS_BLANK",
          },
        })
      }

      password = psp.data
    }

    const res = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: password,
        username: input.username,
      },
      headers: await headers(),
      asResponse: false,
    })

    await db.update(user).set({ role: input.role }).where(eq(user.id, res.user.id))
    return {
      email: res.user.email,
      password: password,
    }
  })
  .actionable({
    context: adminActionContext,
  })

export const editUser = adminProcedure
  .input(editUserSchema)
  .handler(async ({ input }) => {
    const [u] = await db.select().from(user).where(eq(user.id, input.id)).limit(1)

    if (!u) throw new Error(`User not found!`)

    console.log("Edit user input")
    console.log(JSON.stringify(input, null, 2))

    let data: Omit<z.infer<typeof editUserSchema>, "id"> = {}

    if (input.email) data.email = input.email
    if (input.name) data.name = input.name
    if (input.role) data.role = input.role
    if (input.username) data.username = input.username
    if (input.password)
      await auth.api.setUserPassword({ body: { userId: input.id, newPassword: input.password } })

    console.log("Data to commit")
    console.log(JSON.stringify(data, null, 2))

    if (data && Object.keys(data).length !== 0) await db.update(user).set(data).where(eq(user.id, input.id))
  })
  .actionable({
    context: adminActionContext,
  })

export const deleteUser = adminProcedure
  .input(deleteUserSchema)
  .handler(async ({ input }) => {
    console.log(`Deleting ${input.id}`)
    const [u] = await db.select().from(user).where(eq(user.id, input.id)).limit(1)
    console.log(u)
    if (!u) throw new Error(`User not exist!`)

    const h = await headers()

    console.dir(h, { depth: null })

    await auth.api
      .removeUser({
        body: {
          userId: input.id,
        },
        headers: h,
      })
      .catch((err) => console.dir(err, { depth: null }))
  })
  .actionable({
    context: adminActionContext,
  })
