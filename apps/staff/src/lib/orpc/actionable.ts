import { auth } from "@workspace/auth"
import { headers } from "next/headers"

export const protectedActionContext = async () => {
  const headerLists = await headers()

  const session = await auth.api.getSession({
    headers: headerLists,
  })

  return { session: session }
}
