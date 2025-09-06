"use client"

import { useVerifyDialogContext } from "@/app/(protected)/round-1/_components/verifly-dialog/context"
import MemberLayout, {
  MemberSkeleton,
} from "@/app/(protected)/round-1/_components/verifly-dialog/member-layout"
import { getMember } from "@/app/(protected)/round-1/_components/verifly-dialog/queries"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"

function Member2Display() {
  const { id } = useVerifyDialogContext()
  const { data, isPending } = useQuery({
    queryKey: [id, "member2"],
    queryFn: async () => {
      const data = await getMember({
        id,
        index: 2,
      })

      return data[1]?.member
    },
  })

  if (isPending) {
    return <MemberSkeleton title="Member 2" />
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <UserIcon className="text-muted-foreground mx-auto h-12 w-12" />
          <p className="text-muted-foreground mt-2">No Member 2 data found</p>
        </div>
      </div>
    )
  }

  return <MemberLayout title="Member 2" member={data} />
}

export default Member2Display
