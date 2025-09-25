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
import { useState } from "react"

type AwardChangeDialogProps = {
  teamId: string
  currentAward: string
  teamName: string
}

function AwardChangeDialog(props: AwardChangeDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Trophy className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] !max-w-fit">
        <DialogHeader className="h-full min-h-0" hidden>
          <DialogTitle hidden>Change Award</DialogTitle>
          <DialogDescription hidden>Update team award and view change history.</DialogDescription>
        </DialogHeader>
        <div className="grid h-full min-h-0 w-[98vw] grid-rows-2 overflow-auto transition-all md:w-[85vw] md:grid-cols-[2fr_1fr]">
          <div className="h-[90vh] border-r p-4 md:h-full">
            <div className="mb-4">
              <h2 className="text-lg font-semibold">Change Award</h2>
              <p className="text-muted-foreground text-sm">Update award for team: {props.teamName}</p>
            </div>
            <AwardChangeFormParent
              teamId={props.teamId}
              currentAward={props.currentAward}
              closeDialog={() => setOpen(false)}
            />
          </div>
          <div className="mt-[50%] h-full pt-20 md:mt-0 lg:p-4 lg:pt-0">
            <AwardHistory teamId={props.teamId} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AwardChangeDialog
