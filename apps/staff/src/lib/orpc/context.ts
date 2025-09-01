import { auth } from "@workspace/auth"
import type { NextRequest } from "next/server"

export type CreateContextOptions = {
  request?: NextRequest
}

export async function createContext({ request }: CreateContextOptions = {}) {
  let session = null

  if (request) {
    session = await auth.api.getSession({
      headers: request.headers,
    })
  }

  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
