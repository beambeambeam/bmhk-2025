import { auth, Roles, StaffRoles } from "@workspace/auth"
import { headers } from "next/headers"

export const protectedActionContext = async () => {
  const headerLists = await headers()

  const session = await auth.api.getSession({
    headers: headerLists,
  })

  if (!session?.user?.role || !StaffRoles.includes(session.user.role as (typeof StaffRoles)[number])) {
    throw new Error("Unauthorized: user does not have staff privileges")
  }

  return { session }
}

export const adminActionContext = async () => {
  const headerLists = await headers()

  const session = await auth.api.getSession({
    headers: headerLists,
  })

  if (
    !session?.user?.role ||
    (session.user.role !== Roles.ADMIN && session.user.role !== Roles.SUPER_ADMIN)
  ) {
    throw new Error("Unauthorized: user does not have admin privileges")
  }

  return { session }
}
