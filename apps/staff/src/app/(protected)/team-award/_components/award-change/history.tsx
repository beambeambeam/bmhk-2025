"use client"

import { getAwardAuditHistory } from "@/app/(protected)/team-award/_components/award-change/action"
import { getAwardDisplay } from "@/app/(protected)/team-award/_components/award-change/constants"
import { RelativeTimeCard } from "@/components/ui/relative-time-card"
import { useQuery } from "@tanstack/react-query"
import { Trophy } from "lucide-react"

type AwardHistoryProps = {
  teamId: string
}

function AwardHistory(props: AwardHistoryProps) {
  const { data, isPending } = useQuery({
    queryKey: [props.teamId, "award-audit"],
    queryFn: async () => {
      const data = await getAwardAuditHistory({
        teamId: props.teamId,
      })
      return data[1]?.auditHistory || []
    },
  })

  if (isPending) {
    return <AwardHistorySkeleton />
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 p-8 text-center">
        <Trophy className="text-muted-foreground h-8 w-8" />
        <p className="text-muted-foreground">No award changes yet</p>
        <p className="text-muted-foreground text-sm">Award changes will appear here once they are made</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="space-y-3">
        {data.map((change, index) => (
          <div key={change.id} className="bg-card text-card-foreground rounded-lg border p-4 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <div className="text-sm font-medium">
                    <div className="flex items-center gap-1">
                      <span>{getAwardDisplay(change.oldAward).label}</span>
                      <span>→</span>
                      <span>{getAwardDisplay(change.newAward).label}</span>
                    </div>
                  </div>
                </div>

                {change.reason && <p className="text-muted-foreground text-sm">{change.reason}</p>}

                <div className="text-muted-foreground flex items-center gap-4 text-xs">
                  <span>
                    Changed by:{" "}
                    {change.user?.displayUsername || change.user?.username || change.user?.name || "Unknown"}
                  </span>
                  <RelativeTimeCard date={new Date(change.changedAt)} variant="ghost" type="button" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function AwardHistorySkeleton() {
  return (
    <div className="space-y-4">
      <div className="bg-muted h-6 w-40 animate-pulse rounded" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-card rounded-lg border p-4 shadow-sm">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="bg-muted h-4 w-4 animate-pulse rounded" />
                <div className="bg-muted h-4 w-48 animate-pulse rounded" />
              </div>
              <div className="bg-muted h-4 w-32 animate-pulse rounded" />
              <div className="flex items-center gap-4">
                <div className="bg-muted h-3 w-24 animate-pulse rounded" />
                <div className="bg-muted h-4 w-16 animate-pulse rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AwardHistory
