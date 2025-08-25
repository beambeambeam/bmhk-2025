import PolicyConsent from "@/components/accpet-card/policy"
import { ReactNode } from "react"

interface ProtectedLayoutProps {
  readonly children: ReactNode
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  return (
    <>
      {children}
      <PolicyConsent />
    </>
  )
}
export default ProtectedLayout
