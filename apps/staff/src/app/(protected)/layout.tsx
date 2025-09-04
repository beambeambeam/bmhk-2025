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
    if (!session?.user && !isPending) {
      router.push("/")
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
