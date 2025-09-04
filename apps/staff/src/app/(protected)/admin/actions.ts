"use server"

import { adminActionContext } from "@/lib/orpc/actionable"
import { adminProcedure } from "@/lib/orpc/procedures"
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

const addUserSchema = z.object({
  name: z.string(),
  email: z.email(),
  username: z.string(),
  password: passwordSchema,
  role: StaffRolesEnum,
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

    if (existingEmail) throw new Error(`User with email ${input.email} already existed!`)

    const [existingUser] = await db.select().from(user).where(eq(user.username, input.username)).limit(1)

    if (existingUser) throw new Error(`User ${input.username} already existed!`)

    const res = await auth.api.signUpEmail({
      body: {
        name: input.name,
        email: input.email,
        password: input.password,
        username: input.username,
      },
      asResponse: false,
    })

    await db.update(user).set({ role: input.role }).where(eq(user.id, res.user.id))
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
