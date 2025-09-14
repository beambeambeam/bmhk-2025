"use client"

import { useTeamDialogContext } from "@/app/(protected)/_components/team-dialog/context"
import MemberLayout, { MemberSkeleton } from "@/app/(protected)/_components/team-dialog/member-layout"
import { getAdviser } from "@/app/(protected)/_components/team-dialog/queries"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"

function AdviserDisplay() {
  const { id } = useTeamDialogContext()
  const { data, isPending } = useQuery({
    queryKey: [id, "adviser"],
    queryFn: async () => {
      const data = await getAdviser({
        id,
      })

      return data[1]?.adviser
    },
  })

  if (isPending) {
    return <MemberSkeleton title="Adviser" />
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <UserIcon className="text-muted-foreground mx-auto h-12 w-12" />
          <p className="text-muted-foreground mt-2">No adviser data found</p>
        </div>
      </div>
    )
  }

  return <MemberLayout title="Adviser" member={data} showGuardian={false} />
}

export default AdviserDisplay
