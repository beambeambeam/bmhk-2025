import * as dotenv from "dotenv"
import { drizzle } from "drizzle-orm/node-postgres/driver"
import { migrate } from "drizzle-orm/node-postgres/migrator"
import { resolve } from "path"
import pg from "pg"

dotenv.config({ path: resolve("../../.env") })

const { Pool } = pg

const pool = new Pool({
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PW,
  host: process.env.DATABASE_MIGRATE_HOST || process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT!),
  database: process.env.DATABASE_NAME,
})

const db = drizzle(pool)

async function runMigrations() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" })
    console.log("Migrations completed!")
    process.exit(0)
  } catch (error) {
    console.error("Migration error:", error)
    process.exit(1)
  }
}

runMigrations()
