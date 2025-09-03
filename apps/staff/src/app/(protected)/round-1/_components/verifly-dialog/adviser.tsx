"use client"

import MemberLayout from "@/app/(protected)/round-1/_components/verifly-dialog/member-layout"
import { getAdviser } from "@/app/(protected)/round-1/_components/verifly-dialog/queries"
import { useQuery } from "@tanstack/react-query"
import { UserIcon } from "lucide-react"

interface AdviserDisplayProps {
  id: string
}

function AdviserDisplay(props: AdviserDisplayProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.id, "adviser"],
    queryFn: async () => {
      const data = await getAdviser({
        id: props.id,
      })

      return data[1]?.adviser
    },
  })

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
