"use client"

import SignInForm from "@/app/_components/form"
import { CardDescription, CardTitle } from "@/components/ui/card"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

const { useSession } = authClient

export default function Home() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (!isPending && session?.user) {
      type StaffRole = "super_admin" | "admin" | "staff"
      const ALLOWED_ROLES: readonly StaffRole[] = ["super_admin", "admin", "staff"] as const
      const role = session?.user?.role as StaffRole | undefined
      const isStaff = role ? ALLOWED_ROLES.includes(role) : false

      if (isStaff) {
        router.push("/dashboard")
      } else {
        router.push("/404")
      }
    }
  }, [session, isPending, router])

  if (isPending) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="grid h-screen w-screen lg:grid-cols-2">
      <div className="hidden bg-[url('/Log_in_background.webp')] lg:flex"></div>
      <div className="flex flex-col items-center justify-center border-l px-12">
        <div className="w-full max-w-xl">
          <CardTitle className="text-center text-2xl">Sign in</CardTitle>
          <CardDescription className="text-center">BMHK 2025 Staff Website</CardDescription>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
