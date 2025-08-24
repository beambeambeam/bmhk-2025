import { serve } from "@hono/node-server"
import { Hono } from "hono"
import { logger } from "hono/logger"
import { requestId } from "hono/request-id"

const app = new Hono()

app.use(logger())
app.use("*", requestId())

app.get("/", (c) => {
  return c.text("Hello Hono!")
})

app.get("/health", (c) => {
  return c.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  })
})

serve(
  {
    fetch: app.fetch,
    port: 3001,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`)
  }
)
