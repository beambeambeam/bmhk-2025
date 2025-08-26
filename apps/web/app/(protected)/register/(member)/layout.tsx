import { ReactNode } from "react"

interface MemberLayoutProps {
  readonly children: ReactNode
}

function MemberLayout(props: MemberLayoutProps) {
  return (
    <div className="flex h-full min-h-screen w-screen items-center justify-center bg-black">
      <div className="max-w-[62rem]">{props.children}</div>
    </div>
  )
}
export default MemberLayout
