"use client"

import { authClient } from "@/lib/auth-client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { ChevronDown, ChevronUp } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

interface TeamData {
  teamCode: string | null
  teamName: string
  teamImage: string | null
}

export function TeamNavMenuClient({ teamData }: { teamData: TeamData }) {
  const [drawerOpen, setDrawerOpen] = useState(false)
  return (
    <DropdownMenu open={drawerOpen} onOpenChange={() => setDrawerOpen(!drawerOpen)}>
      <DropdownMenuTrigger asChild>
        <button
          className="text-button-2 hidden h-[50px] cursor-not-allowed items-center rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-4 py-0 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(93,47,60,0.6)] lg:flex 2xl:h-[70px] 2xl:px-10 2xl:py-2.5"
          onClick={(e) => {
            e.preventDefault()
            setDrawerOpen(!drawerOpen)
          }}>
          <div className="flex items-center justify-between gap-x-3">
            {teamData.teamImage ? (
              <img src={teamData.teamImage} width={50} height={50} className="size-[50px] rounded-full" />
            ) : (
              <img src="/static/icon/UserCircleFilled.svg" alt="ทีมของฉัน" />
            )}
            <span>{teamData.teamName}</span>
            {drawerOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!border-1 w-[270px] rounded-[24px] !border-white/20 !bg-[#262626] p-2">
        <Link href="/teams">
          <DropdownMenuItem className="flex w-full items-center justify-between rounded-[24px] px-5 py-3">
            <span className="text-nav-2">ทีมของฉัน</span>
            <img src="/static/icon/Group.svg" alt="ทีมของฉัน" />
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={async () => {
            await authClient.signOut()
          }}
          className="flex w-full items-center justify-between rounded-[24px] px-5 py-3">
          <span className="text-nav-2">ออกจากระบบ</span>
          <img src="/static/icon/SignOut.svg" alt="ออกจากระบบ" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
