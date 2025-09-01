import { db } from "@workspace/db"
import { user } from "@workspace/db"
import { eq } from "@workspace/db/orm"
import * as readline from "node:readline/promises"

import { auth } from "./auth"
import { Roles } from "./roles"

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

if (!process.argv[2] || !process.argv[3]) {
  console.error("Usage: pnpm auth:seed <email> <username>")
  process.exit(1)
}

const email = process.argv[2]
const username = process.argv[3]

console.log(`Email: ${email}`)
console.log(`User: ${username}`)
const password = await rl.question("Set Your Password: ")

function createCurrentDate() {
  return new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
}

async function createAdmin() {
  try {
    const res = await auth.api.signUpEmail({
      body: {
        email,
        password,
        name: username,
        username,
      },
      asResponse: false,
    })

    if (!res.user) throw Error("SuperAdmin User Creation Failed")

    await db.update(user).set({ role: Roles.SUPER_ADMIN }).where(eq(user.id, res.user.id))

    console.log(`✅ SuperAdmin user created successfully! at ${createCurrentDate()}`)
  } catch (error) {
    console.error(`❌ Failed to create admin user at with ${createCurrentDate()} \n error : `, error)
  } finally {
    process.exit()
  }
}

createAdmin()
