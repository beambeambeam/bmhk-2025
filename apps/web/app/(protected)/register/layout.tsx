"use client"

import { useSubmitRegister } from "@/app/(protected)/_components/status/context"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect } from "react"

function RegisterLayout({ children }: { readonly children: ReactNode }) {
  const router = useRouter()
  const isSubmit = useSubmitRegister()

  useEffect(() => {
    if (isSubmit) {
      router.push("/teams")
    }
  }, [isSubmit, router])
  return <>{children}</>
}
export default RegisterLayout
