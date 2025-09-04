"use client"

import { formatCodeName } from "@/app/(protected)/round-1/_components/team-table/format"
import { useVerifyDialogContext } from "@/app/(protected)/round-1/_components/verifly-dialog/context"
import { MemberSkeleton } from "@/app/(protected)/round-1/_components/verifly-dialog/member-layout"
import { getTeam } from "@/app/(protected)/round-1/_components/verifly-dialog/queries"
import { Label } from "@/components/ui/label"
import { useQuery } from "@tanstack/react-query"
import { UsersIcon } from "lucide-react"

function TeamDisplay() {
  const { id } = useVerifyDialogContext()
  const { data, isPending } = useQuery({
    queryKey: [id, "team"],
    queryFn: async () => {
      const data = await getTeam({
        id,
      })

      return data[1]?.team
    },
  })

  if (isPending) {
    return <MemberSkeleton title="Team" />
  }

  if (!data) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <UsersIcon className="text-muted-foreground mx-auto h-12 w-12" />
          <p className="text-muted-foreground mt-2">No Team Users data found</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2 p-4">
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
        <span className="text-4xl">{data?.name}</span>
      </h1>
      <div className="flex flex-col gap-5 p-2 pt-5">
        <div className="grid w-full grid-cols-1 items-start gap-4 lg:grid-cols-[180px_1fr]">
          <div className="flex w-full flex-col gap-2">
            <Label>Team Image</Label>
            <div className="rounded-lg border p-2">
              {data.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.image.url} alt={data.image.name} className="h-40 w-20" />
              ) : (
                <div className="text-muted-foreground h-40 w-20">No image</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex w-full flex-col gap-2">
              <Label>Team Name</Label>
              <div className="rounded-lg border p-2 px-3">{data.name}</div>
            </div>
            <div className="flex w-full flex-col gap-2">
              <Label>School</Label>
              <div className="rounded-lg border p-2 px-3">{data.school}</div>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col gap-2">
            <Label>Quotes</Label>
            <div className="rounded-lg border p-2 px-3">
              {data.quote ? <span className="italic">{data.quote}</span> : "No quotes"}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Member Count</Label>
            <div className="rounded-lg border p-2 px-3">
              {typeof data.memberCount === "number" ? data.memberCount : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default TeamDisplay
