"use client"

import RegisterStatus from "@/app/(protected)/_components/status"
import { RegisterStatusProvider } from "@/app/(protected)/_components/status/context"
import PolicyConsent from "@/components/accpet-card/policy"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { ReactNode, useMemo } from "react"

interface ProtectedLayoutProps {
  readonly children: ReactNode
}

function ProtectedLayout({ children }: ProtectedLayoutProps) {
  const query = useQuery(orpc.register.status.get.queryOptions())

  const initialState = useMemo(() => {
    return query.data?.registerStatus
      ? {
          team: query.data.registerStatus.team,
          adviser: query.data.registerStatus.adviser,
          member1: query.data.registerStatus.member1,
          member2: query.data.registerStatus.member2,
          member3: query.data.registerStatus.member3,
          submitRegister: query.data.registerStatus.submitRegister,
        }
      : undefined
  }, [query.data?.registerStatus])

  return (
    <RegisterStatusProvider initialState={initialState}>
      <RegisterStatus />
      {!query.isPending && children}
      <PolicyConsent />
    </RegisterStatusProvider>
  )
}
export default ProtectedLayout
