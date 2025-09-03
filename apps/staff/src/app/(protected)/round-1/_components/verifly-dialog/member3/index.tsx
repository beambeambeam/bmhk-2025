"use client"

import MemberLayout from "@/app/(protected)/round-1/_components/verifly-dialog/lib/member-layout"
import { getMember } from "@/app/(protected)/round-1/_components/verifly-dialog/lib/queries"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"

interface Member3DisplayProps {
  id: string
}

function Member3Display(props: Member3DisplayProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.id, "member3"],
    queryFn: async () => {
      const data = await getMember({
        id: props.id,
        index: 3,
      })

      return data[1]?.member
    },
  })

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
