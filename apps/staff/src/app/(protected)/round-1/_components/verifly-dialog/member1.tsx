"use client"

import MemberLayout, {
  MemberSkeleton,
} from "@/app/(protected)/round-1/_components/verifly-dialog/member-layout"
import { getMember } from "@/app/(protected)/round-1/_components/verifly-dialog/queries"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"

interface Member1DisplayProps {
  id: string
}

function Member1Display(props: Member1DisplayProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.id, "member1"],
    queryFn: async () => {
      const data = await getMember({
        id: props.id,
        index: 1,
      })

      return data[1]?.member
    },
  })

  if (isPending) {
    return <MemberSkeleton title="Member 1" />
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <UserIcon className="text-muted-foreground mx-auto h-12 w-12" />
          <p className="text-muted-foreground mt-2">No Member 1 data found</p>
        </div>
      </div>
    )
  }

  return <MemberLayout title="Member 1" member={data} />
}

export default Member1Display
