"use client"

import { TeamNavMobileLinks } from "@/app/(protected)/_components/team-nav"
import CertPreview from "@/app/(protected)/teams/certs/cert"
import { Navbar } from "@/app/_components/navbar"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@workspace/ui/lib/utils"
import { useState } from "react"

const BACKGROUND_CLASS =
  "bg-[url(/static/background-image/my-team/xs.webp)] md:bg-[url(/static/background-image/my-team/md.webp)] lg:bg-[url(/static/background-image/my-team/lg.webp)] 2xl:bg-[url(/static/background-image/my-team/2xl.webp)] bg-cover bg-center bg-no-repeat bg-scroll bg-black"

type MemberType = "adviser" | "member1" | "member2" | "member3"

function CertPage() {
  const [selectedMember, setSelectedMember] = useState<MemberType | null>(null)
  const query = useQuery(orpc.register.all.get.queryOptions())

  if (query.isPending) {
    return (
      <div className={cn("flex min-h-screen w-full flex-col items-center", BACKGROUND_CLASS)}>
        <Navbar links={TeamNavMobileLinks} CTAId={"regis"} sections={[]} />
        <div className="flex w-full flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="size-8 animate-spin rounded-full border-4 border-white/30 border-t-white" />
            <p className="text-[1rem] text-white opacity-70">กำลังโหลด...</p>
          </div>
        </div>
      </div>
    )
  }

  const members: { value: MemberType; label: string }[] = [
    { value: "adviser", label: "อาจารย์ที่ปรึกษา" },
    { value: "member1", label: "สมาชิกคนที่ 1" },
    { value: "member2", label: "สมาชิกคนที่ 2" },
    ...(query.data?.team?.memberCount === 3
      ? [{ value: "member3" as MemberType, label: "สมาชิกคนที่ 3" }]
      : []),
  ]

  return (
    <div className={cn("flex min-h-screen w-full flex-col items-center", BACKGROUND_CLASS)}>
      <Navbar links={TeamNavMobileLinks} CTAId={"regis"} sections={[]} />
      <div
        className={
          "pb-15 flex w-full flex-col items-center gap-0 overflow-hidden text-white md:gap-10 2xl:gap-8"
        }>
        <div className="md:px-15 flex w-full flex-col items-center gap-8 px-6 pt-8 md:pt-0 lg:px-20 2xl:gap-10 2xl:px-40">
          <div className="flex w-full flex-col items-center justify-between gap-6 md:flex-row md:gap-0">
            <h1 className="text-[1.5rem] font-medium md:text-[2rem] 2xl:text-[3rem]">ประกาศนียบัตร</h1>
          </div>

          <div className="liquid flex w-full flex-col items-center gap-5 rounded-[24px] p-4 backdrop-blur-sm md:items-start md:rounded-[32px] md:p-6 2xl:gap-10 2xl:rounded-[40px] 2xl:p-8">
            <div className="flex w-full flex-wrap items-center justify-center gap-3 md:gap-4">
              {members.map((member) => (
                <button
                  key={member.value}
                  onClick={() => setSelectedMember(member.value)}
                  className={cn(
                    "rounded-[20px] px-4 py-2 text-[1rem] font-medium transition-all md:rounded-[24px] md:px-6 md:py-3 md:text-[1.125rem] 2xl:text-[1.25rem]",
                    selectedMember === member.value
                      ? "bg-white text-black"
                      : "bg-white/20 text-white hover:bg-white/30"
                  )}>
                  {member.label}
                </button>
              ))}
            </div>

            <div className="flex w-full items-center justify-center">
              {selectedMember && <CertPreview member={selectedMember} />}
              {!selectedMember && (
                <p className="py-8 text-center text-[1rem] opacity-70 md:text-[1.125rem]">
                  กรุณาเลือกสมาชิกเพื่อดูประกาศนียบัตร
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CertPage
