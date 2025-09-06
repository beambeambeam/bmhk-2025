import { auth } from "@workspace/auth"
import type { NextRequest } from "next/server"

export async function createContext(req: NextRequest) {
  const session = await auth.api.getSession({
    headers: req.headers,
  })
  return {
    session,
  }
}
