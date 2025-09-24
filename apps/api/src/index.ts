import { createContext } from "@/lib/context"
import { appRouter } from "@/routers"
import { serve } from "@hono/node-server"
import { RPCHandler } from "@orpc/server/fetch"
import { auth } from "@workspace/auth"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { requestId } from "hono/request-id"
import { NtpTimeSync, type NtpTimeSyncConstructorOptions } from "ntp-time-sync"
import type { RecursivePartial } from "ntp-time-sync/dist/RecursivePartial"

const app = new Hono()

const timeOptions: RecursivePartial<NtpTimeSyncConstructorOptions> = {
  servers: ["time.navy.mi.th", "time2.navy.mi.th"],
}

const timeSync = NtpTimeSync.getInstance(timeOptions)

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
app.use("/rpc/*", async (c, next) => {
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

app.get("/time", async (c) => {
  const time = await timeSync.getTime()
  return c.json({
    c: time.now,
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

// Export types for the web app to use
export type { AppRouter, AppRouterClient } from "./routers"
