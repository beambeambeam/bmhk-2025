import { ReactNode } from "react"

function ProtectedLayout(props: { children: ReactNode }) {
  return <>{props.children}</>
}
export default ProtectedLayout
