import { createContext } from "@/lib/context"
import { appRouter } from "@/routers"
import { serve } from "@hono/node-server"
import { OpenAPIGenerator } from "@orpc/openapi"
import { RPCHandler } from "@orpc/server/fetch"
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4"
import { Scalar } from "@scalar/hono-api-reference"
import { auth } from "@workspace/auth"
import { Hono } from "hono"
import { cors } from "hono/cors"
import { logger } from "hono/logger"
import { requestId } from "hono/request-id"
import { NtpTimeSync, type NtpTimeSyncConstructorOptions } from "ntp-time-sync"
import type { RecursivePartial } from "ntp-time-sync/dist/RecursivePartial"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"

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

app.get("/cert/generate", async (c) => {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage([600, 600])

  const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
  const fontSize = 48
  const text = "BMHK2025"

  const textWidth = font.widthOfTextAtSize(text, fontSize)
  const textHeight = font.heightAtSize(fontSize)

  const x = (600 - textWidth) / 2
  const y = (600 - textHeight) / 2

  page.drawText(text, {
    x,
    y,
    size: fontSize,
    font,
    color: rgb(0, 0, 0),
  })

  const bytes = await pdfDoc.save()
  const out = new Uint8Array(bytes.byteLength)
  out.set(bytes)
  return c.newResponse(out, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=cert.pdf",
    },
  })
})

const isDevelopment = process.env.NODE_ENV === "development" || process.env.NODE_ENV !== "production"

if (isDevelopment) {
  const generator = new OpenAPIGenerator({
    schemaConverters: [new ZodToJsonSchemaConverter()],
  })

  const spec = await generator.generate(appRouter, {
    info: {
      title: "BMHK 2025 API",
      version: "1.0.0",
    },
  })

  app.use(
    "/reference",
    Scalar({
      content: spec,
    })
  )
}

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
