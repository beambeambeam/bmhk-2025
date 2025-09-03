"use client"

import { formatCodeName } from "@/app/(protected)/round-1/_components/team-table/format"
import { getTeam } from "@/app/(protected)/round-1/_components/verifly-dialog/lib/queries"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { SchoolIcon } from "lucide-react"

interface TeamDisplayProps {
  id: string
}

function TeamDisplay(props: TeamDisplayProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.id, "team"],
    queryFn: async () => {
      const data = await getTeam({
        id: props.id,
      })

      return data[1]?.team
    },
  })

  if (!data) {
    return
  }

  return (
    <div className="grid grid-cols-[2fr_1fr]">
      <div className="flex flex-col gap-2">
        <h1 className="flex flex-col text-2xl font-bold">
          <span className="flex-col">
            {data?.index !== undefined &&
              (() => {
                const code = formatCodeName(data.index)
                const prefix = code.slice(0, 4)
                const suffix = code.slice(4)
                return (
                  <span className="font-mono">
                    <span className="text-muted-foreground">{prefix}</span>
                    <span>{suffix}</span>
                  </span>
                )
              })()}
          </span>
          <span className="text-4xl">
            <span className="text-muted-foreground">Team:</span> {data?.name}
          </span>
        </h1>
        <div className="flex flex-col gap-5 p-2">
          <div className="flex w-full flex-col gap-2 pt-4">
            <Label>School</Label>
            <div className="rounded-lg border p-2 px-3">{data.school}</div>
          </div>
          <div className="flex w-full flex-col gap-2">
            <Label>Quotes</Label>
            <div className="rounded-lg border p-2 px-3">
              {data.quote ? <span className="italic">{data.quote}</span> : "No quotes"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeamDisplay
