import { Navbar } from "@/app/_components/navbar"
import { cn } from "@workspace/ui/lib/utils"
import { ReactNode } from "react"

import { TeamNavMobileLinks, TeamNavMenu } from "../../_components/team-nav"

interface MemberLayoutProps {
  readonly children: ReactNode
}

function MemberLayout(props: MemberLayoutProps) {
  const BACKGROUND_CLASS =
    "bg-[url(/static/background-image/register-form/xs.webp)] md:bg-[url(/static/background-image/register-form/md.webp)] lg:bg-[url(/static/background-image/register-form/lg.webp)] 2xl:bg-[url(/static/background-image/register-form/2xl.webp)]  bg-cover bg-center bg-no-repeat bg-scroll bg-black"

  return (
    <div
      className={cn(
        "flex h-full min-h-screen w-full flex-col items-center justify-center gap-14 pt-4",
        BACKGROUND_CLASS
      )}>
      <Navbar links={TeamNavMobileLinks} CTAId={"regis"} sections={[]} />
      <p className="text-header-2-medium">ลงทะเบียนเข้าแข่งขัน</p>
      <div className="max-w-[80rem]">{props.children}</div>
    </div>
  )
}
export default MemberLayout
