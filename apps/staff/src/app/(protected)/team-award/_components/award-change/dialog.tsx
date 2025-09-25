"use client"

import AwardChangeFormParent from "@/app/(protected)/team-award/_components/award-change/form"
import AwardHistory from "@/app/(protected)/team-award/_components/award-change/history"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trophy } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"

type AwardChangeDialogProps = {
  teamId: string
  currentAward: string
  teamName: string
}

function AwardChangeDialog(props: AwardChangeDialogProps) {
  const [award, setAward] = useQueryState("award-team", parseAsString.withDefault(""))

  const isOpen = award === props.teamId

  return (
    <Dialog open={isOpen} onOpenChange={(open) => setAward(open ? props.teamId : "")}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trophy className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] max-w-[98vw] p-0 md:max-w-[85vw]">
        <DialogHeader className="px-4 pt-4" hidden>
          <DialogTitle>Change Award</DialogTitle>
          <DialogDescription>Update team award and view change history.</DialogDescription>
        </DialogHeader>
        <div className="grid h-[calc(90vh-80px)] min-h-0 w-full grid-rows-2 transition-all md:grid-cols-[2fr_1fr] md:grid-rows-1">
          <div className="min-h-0 border-r p-4 md:h-full md:overflow-y-auto">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Change Award</h2>
              <p className="text-muted-foreground text-sm">Update award for team: {props.teamName}</p>
            </div>
            <AwardChangeFormParent
              teamId={props.teamId}
              currentAward={props.currentAward}
              closeDialog={() => setAward("")}
            />
          </div>
          <div className="min-h-0 px-4 md:h-full lg:p-4">
            <h3 className="px-1 pb-2 text-lg font-semibold">Award Change History</h3>
            <div className="h-[calc(100%-32px)] overflow-y-auto pr-2 md:h-[calc(100%-40px)]">
              <AwardHistory teamId={props.teamId} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AwardChangeDialog
