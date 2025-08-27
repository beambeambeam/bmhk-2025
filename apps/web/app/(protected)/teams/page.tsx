"use client"

import { useSubmitRegister, useAllRegisterStatus } from "@/app/(protected)/_components/status/context"
import TeamDone from "@/app/(protected)/teams/done"
import Requirement from "@/app/(protected)/teams/requirement"
import { Navbar } from "@/app/_components/navbar"
import { cn } from "@workspace/ui/lib/utils"

import { TeamNavMenu, TeamNavMobileLinks } from "../_components/team-nav"

const BACKGROUND_CLASS =
  "bg-[url(/static/background-image/my-team/xs.webp)] md:bg-[url(/static/background-image/my-team/md.webp)] lg:bg-[url(/static/background-image/my-team/lg.webp)] 2xl:bg-[url(/static/background-image/my-team/2xl.webp)] bg-cover bg-center bg-no-repeat bg-scroll bg-black"

export default function TeamPage() {
  const isSubmit = useSubmitRegister()
  const allStatus = useAllRegisterStatus()

  // Check if only one status is "DONE"
  const doneStatuses = [
    allStatus.team,
    allStatus.adviser,
    allStatus.member1,
    allStatus.member2,
    allStatus.member3,
  ].filter((status) => status === "DONE")

  const shouldShowTeamDone = isSubmit || doneStatuses.length >= 1

  return (
    <div className={cn("flex min-h-screen w-full flex-col items-center", BACKGROUND_CLASS)}>
      <Navbar links={TeamNavMobileLinks} CTAId={"regis"} sections={[]} />
      <div
        className={
          "pb-15 flex w-full flex-col items-center gap-0 overflow-hidden text-white md:gap-10 2xl:gap-8"
        }>
        {!isSubmit ? <Requirement key="landing" /> : <TeamDone />}
      </div>
    </div>
  )
}
