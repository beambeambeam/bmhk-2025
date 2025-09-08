"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

const { useSession } = authClient

function AdminLayout(props: { children: ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending) {
      type AdminRole = "super_admin" | "admin"
      const ALLOWED_ROLES: readonly AdminRole[] = ["super_admin", "admin"] as const
      const role = session?.user?.role as AdminRole | undefined
      const isAdmin = role ? ALLOWED_ROLES.includes(role) : false
      if (!session?.user || !isAdmin) {
        router.push("/dashboard")
      }
    }
  }, [session, isPending, router])

  return <>{props.children}</>
}

export default AdminLayout
