import { NavLink } from "@/app/_components/navbar"
import { authClient } from "@/lib/auth-client"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { ChevronDown, ChevronUp, CircleUserRound, LogOutIcon } from "lucide-react"
import { useState } from "react"

export function TeamNavMenu() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const query = useQuery(orpc.register.all.get.queryOptions())
  const teamData = {
    teamCode: query.data?.team?.id || null,
    teamName: query.data?.team?.name || "ทีมไม่ระบุชื่อ",
    teamImage: query.data?.team?.image?.url || null,
  }
  return (
    <DropdownMenu open={drawerOpen} onOpenChange={() => setDrawerOpen(!drawerOpen)}>
      <DropdownMenuTrigger>
        <button
          className="text-button-2 hidden h-[50px] cursor-not-allowed items-center gap-x-3 rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-4 py-0 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(93,47,60,0.6)] lg:flex 2xl:h-[70px] 2xl:px-10 2xl:py-2.5"
          onClick={(e) => {
            e.preventDefault()
            setDrawerOpen(!drawerOpen)
          }}>
          <div className="flex items-center gap-x-3">
            <img src="/static/icon/UserCircleFilled.svg" alt="ทีมของฉัน" />
            <span>{teamData.teamName}</span>
            {drawerOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="!border-1 w-[270px] rounded-[24px] !border-white/20 !bg-[#262626] p-2">
        <DropdownMenuItem className="flex w-full items-center justify-between rounded-[24px] px-5 py-3">
          <span className="text-nav-2">ทีมของฉัน</span>
          <img src="/static/icon/Group.svg" alt="ทีมของฉัน" />
        </DropdownMenuItem>
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

export const TeamNavMobileLinks: NavLink[] = [
  {
    label: "ทีมของคุณ",
    type: "normal",
    href: "/teams",
    mobileOnly: true,
  },
  {
    label: "ออกจากระบบ",
    type: "action",
    action: () => authClient.signOut(),
  },
]
