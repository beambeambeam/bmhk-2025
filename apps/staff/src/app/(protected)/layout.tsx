"use client"

import Component from "@/app/(protected)/_components/navbar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect, type ReactNode } from "react"

const { useSession } = authClient

function ProtectedLayout(props: { children: ReactNode }) {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending) {
      type StaffRole = "super_admin" | "admin" | "staff"
      const ALLOWED_ROLES: readonly StaffRole[] = ["super_admin", "admin", "staff"] as const
      const role = session?.user?.role as StaffRole | undefined
      const isStaff = role ? ALLOWED_ROLES.includes(role) : false
      if (!session?.user || !isStaff) {
        router.push("/")
      }
    }
  }, [session, isPending, router])

  return (
    <div className="h-full w-full overflow-x-hidden">
      <Component />
      {props.children}
    </div>
  )
}

export default ProtectedLayout
