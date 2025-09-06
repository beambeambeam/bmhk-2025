import { auth, StaffRoles } from "@workspace/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { ReactNode } from "react"

async function AdminLayout(props: { children: ReactNode }) {
  const u = await auth.api.getSession({ headers: await headers() })

  if (!u || StaffRoles.includes(u.user.role as "super_admin" | "admin" | "staff")) {
    redirect("/dashboard")
  }
  return <>{props.children}</>
}

export default AdminLayout
