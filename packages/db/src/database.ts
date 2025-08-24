import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres"
import pg from "pg"

dotenv.config()

const { Pool } = pg

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PW,
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  database: process.env.DATABASE_NAME,
})

export const db = drizzle(pool)
