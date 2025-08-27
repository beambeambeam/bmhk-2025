"use client"

import TeamRegisterForm from "@/app/(protected)/register/team/_components/form"
import { orpc } from "@/utils/orpc"
import { useQuery } from "@tanstack/react-query"
import { cn } from "@workspace/ui/lib/utils"

function TeamRegisterPage() {
  const query = useQuery(orpc.register.team.get.queryOptions())

  if (query.isPending) {
    return null
  }

  const BACKGROUND_CLASS =
    "bg-[url(/static/background-image/register-form/xs.webp)] md:bg-[url(/static/background-image/register-form/md.webp)] lg:bg-[url(/static/background-image/register-form/lg.webp)] 2xl:bg-[url(/static/background-image/register-form/2xl.webp)]"

  return (
    <div className={cn("flex h-full min-h-screen w-full items-center justify-center", BACKGROUND_CLASS)}>
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
