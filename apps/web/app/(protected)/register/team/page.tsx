"use client"

import TeamRegisterForm from "@/app/(protected)/register/team/_components/form"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"

function TeamRegisterPage() {
  const query = useQuery(orpc.register.team.get.queryOptions())

  if (query.isPending) {
    return null
  }

  return (
    <div className="flex h-full min-h-screen w-full items-center justify-center bg-black">
      <TeamRegisterForm
        defaultValues={
          query.data && query.data.success && query.data.team
            ? {
                team_name: query.data.team.name ?? "",
                school_name: query.data.team.school ?? "",
                member_count: query.data.team.memberCount ?? 0,
                quote: query.data.team.quote ?? "",
                team_image: query.data.team.image ? [query.data.team.image] : [],
              }
            : undefined
        }
      />
    </div>
  )
}

export default TeamRegisterPage
