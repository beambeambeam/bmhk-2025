import { cn } from "@workspace/ui/lib/utils"
import { ReactNode } from "react"

interface MemberLayoutProps {
  readonly children: ReactNode
}

function MemberLayout(props: MemberLayoutProps) {
  const BACKGROUND_CLASS =
    "bg-[url(/static/background-image/register-form/xs.webp)] md:bg-[url(/static/background-image/register-form/md.webp)] lg:bg-[url(/static/background-image/register-form/lg.webp)] 2xl:bg-[url(/static/background-image/register-form/2xl.webp)]  bg-cover bg-center bg-no-repeat bg-scroll bg-black"

  return (
    <div className={cn("flex h-full min-h-screen w-screen items-center justify-center", BACKGROUND_CLASS)}>
      <div className="max-w-[62rem]">{props.children}</div>
    </div>
  )
}
export default MemberLayout
