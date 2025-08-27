"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu"
import { CircleUserRound } from "lucide-react"

export function TeamNavCTA() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <button className="text-button-2 hidden h-[52px] cursor-not-allowed gap-x-3 rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-4 py-0 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(93,47,60,0.6)] lg:flex 2xl:h-[70px] 2xl:px-10 2xl:py-2.5">
          <CircleUserRound fill="#fff" strokeOpacity={0} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>ทีมของฉัน</DropdownMenuItem>
        <DropdownMenuItem>ออกจากระบบ</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
