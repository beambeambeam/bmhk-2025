"use client"

import { useSubmitRegister } from "@/app/(protected)/_components/status/context"
import TeamDone from "@/app/(protected)/teams/done"
import Navbar from "@/app/(protected)/teams/navbar"
import Requirement from "@/app/(protected)/teams/requirement"
import { cn } from "@workspace/ui/lib/utils"

const BACKGROUND_CLASS =
  "bg-[url(/static/background-image/my-team/xs.webp)] md:bg-[url(/static/background-image/my-team/md.webp)] lg:bg-[url(/static/background-image/my-team/lg.webp)] 2xl:bg-[url(/static/background-image/my-team/2xl.webp)]"

export default function TeamPage() {
  const isSubmit = useSubmitRegister()

  return (
    <div
      className={cn(
        "md:pt-15 pb-15 2xl:gap-18 flex min-h-screen w-full flex-col items-center gap-0 overflow-hidden bg-black pt-8 text-white md:gap-10",
        BACKGROUND_CLASS
      )}>
      <Navbar />

      {!isSubmit ? <Requirement key="landing" /> : <TeamDone />}
    </div>
  )
}
