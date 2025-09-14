"use client"

import { useTeamDialogContext } from "@/app/(protected)/_components/team-dialog/context"
import MemberLayout, { MemberSkeleton } from "@/app/(protected)/_components/team-dialog/member-layout"
import { getMember } from "@/app/(protected)/_components/team-dialog/queries"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"

function Member3Display() {
  const { id } = useTeamDialogContext()
  const { data, isPending } = useQuery({
    queryKey: [id, "member3"],
    queryFn: async () => {
      const data = await getMember({
        id,
        index: 3,
      })

      return data[1]?.member
    },
  })

  if (isPending) {
    return <MemberSkeleton title="Member 3" />
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <UserIcon className="text-muted-foreground mx-auto h-12 w-12" />
          <p className="text-muted-foreground mt-2">No Member 3 data found</p>
        </div>
      </div>
    )
  }

  return <MemberLayout title="Member 3" member={data} />
}

export default Member3Display
