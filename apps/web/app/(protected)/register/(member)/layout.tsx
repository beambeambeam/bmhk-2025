import { ReactNode } from "react"

interface MemberLayoutProps {
  readonly children: ReactNode
}

function MemberLayout(props: MemberLayoutProps) {
  return <div className="h-full min-h-screen w-screen bg-black">{props.children}</div>
}
export default MemberLayout
