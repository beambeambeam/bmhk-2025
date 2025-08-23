import * as dotenv from "dotenv"
import { defineConfig } from 'drizzle-kit'

dotenv.config()


export default defineConfig({
    out: './drizzle',
    schema: './src/schema.ts',
    dialect: 'postgresql',
    dbCredentials: {
        user: process.env.DATABASE_USER!,
        password: process.env.DATABASE_PW!,
        host: process.env.DATABASE_HOST!,
        port: parseInt(process.env.DATABASE_PORT!),
        database: process.env.DATABASE_NAME!
    },
})