import { NavLink } from "@/app/_components/navbar"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"

import { TeamNavMenuClient } from "./team-nav-menu-client"

export function TeamNavMenu() {
  const query = useQuery(orpc.register.all.get.queryOptions())
  const teamData = {
    teamCode: query.data?.team?.id || null,
    teamName: query.data?.team?.name || "ทีมไม่ระบุชื่อ",
    teamImage: query.data?.team?.image?.url || null,
  }

  if (query.isPending) {
    return null
  }

  return <TeamNavMenuClient teamData={teamData} />
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
    action: "signout",
  },
]
