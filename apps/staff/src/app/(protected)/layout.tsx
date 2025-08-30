import Component from "@/app/(protected)/_components/navbar"
import type { ReactNode } from "react"

function ProtectedLayout(props: { children: ReactNode }) {
  return (
    <div className="h-full w-screen">
      <Component />
      {props.children}
    </div>
  )
}
export default ProtectedLayout
