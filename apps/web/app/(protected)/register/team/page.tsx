"use client"

import TeamRegisterForm from "@/app/(protected)/register/team/_components/form"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"

function TeamRegisterPage() {
  const query = useQuery(orpc.register.getTeam.queryOptions())

  if (query.isLoading) {
    return
  }

  return (
    <div className="h-full min-h-screen w-full bg-black">
      <TeamRegisterForm
        defaultValues={
          query.data && query.data.success && query.data.team
            ? {
                team_name: query.data.team.name ?? "",
                school_name: query.data.team.school ?? "",
                number_of_member: query.data.team.memberAmount ?? 0,
                quote: query.data.team.quote ?? "",
                team_image: [],
              }
            : undefined
        }
      />
    </div>
  )
}
export default TeamRegisterPage
