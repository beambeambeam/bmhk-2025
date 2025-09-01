import { db } from "@workspace/db"
import { user, account, session, verification } from "@workspace/db/schema"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, username } from "better-auth/plugins"
import * as dotenv from "dotenv"
import { resolve } from "path"

import { Roles } from "./roles"

dotenv.config({ path: resolve("../../.env") })

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user,
      account,
      session,
      verification,
    },
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      scope: ["email", "profile"],
    },
  },
  plugins: [
    username(),
    admin({
      defaultRole: Roles.USER,
      adminRoles: [Roles.ADMIN, Roles.SUPER_ADMIN],
    }),
  ],
  trustedOrigins: [
    process.env.API_CORS_ORIGIN || "http://localhost:3000",
    process.env.STAFF_URL || "http://localhost:3002",
  ],
})
