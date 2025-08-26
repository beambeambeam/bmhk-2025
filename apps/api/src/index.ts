import { createContext } from "@/lib/context"
import { appRouter } from "@/routers"
import { serve } from "@hono/node-server"
import { RPCHandler } from "@orpc/server/fetch"
import { auth } from "@workspace/auth"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { requestId } from "hono/request-id"

const app = new Hono()

app.use("*", requestId())
app.use(logger())
app.use(
  "/*",
  cors({
    origin: process.env.API_CORS_ORIGIN || "http://localhost:3000",
    allowMethods: ["GET", "POST", "OPTIONS"],
    allowHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
)

app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw))

const handler = new RPCHandler(appRouter)
app.use("/api/rpc/*", async (c, next) => {
  const context = await createContext({ context: c })
  const { matched, response } = await handler.handle(c.req.raw, {
    prefix: "/rpc",
    context: context,
  })

  if (matched) {
    return c.newResponse(response.body, response)
  }
  await next()
})

app.get("/", (c) => {
  return c.text("OK")
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

// Export types for the web app to use
export type { AppRouter, AppRouterClient } from "./routers"
