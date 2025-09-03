import AdviserDisplay from "@/app/(protected)/round-1/_components/verifly-dialog/adviser"
import {
  VerifyDialogContext,
  VerifyDialogContextValue,
} from "@/app/(protected)/round-1/_components/verifly-dialog/context"
import Member1Display from "@/app/(protected)/round-1/_components/verifly-dialog/member1"
import Member2Display from "@/app/(protected)/round-1/_components/verifly-dialog/member2"
import Member3Display from "@/app/(protected)/round-1/_components/verifly-dialog/member3"
import TeamDisplay from "@/app/(protected)/round-1/_components/verifly-dialog/team"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchCheckIcon } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"
import { ReactNode } from "react"

interface VerifyDialogProps extends VerifyDialogContextValue {
  children?: ReactNode
}

function VerifyDialog(props: VerifyDialogProps) {
  const [verify, setVerify] = useQueryState("verify", parseAsString.withDefault(""))

  const [tab, setTab] = useQueryState("verify-tab", parseAsString.withDefault(""))
  const onTabChange = (value: string) => setTab(value)

  return (
    <VerifyDialogContext.Provider value={{ id: props.id, form: props.form }}>
      <Dialog
        open={verify === props.id}
        onOpenChange={(isOpen) => {
          setVerify(isOpen ? props.id : "")
          setTab(null)
        }}>
        <DialogTrigger asChild>
          {props.children ?? (
            <Button variant="outline" size="icon">
              <SearchCheckIcon />
            </Button>
          )}
        </DialogTrigger>
        <DialogContent className="h-[90vh] !max-w-fit">
          <DialogHeader className="h-full min-h-0">
            <DialogTitle hidden>Are you absolutely sure?</DialogTitle>
            <DialogDescription hidden>
              This action cannot be undone. This will permanently delete your account and remove your data
              from our servers.
            </DialogDescription>
            <Tabs
              defaultValue="team"
              className="h-full min-h-0 w-[80vw]"
              value={tab}
              onValueChange={onTabChange}>
              <div className="overflow-auto overflow-y-hidden">
                <TabsList>
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="adviser">Adviser</TabsTrigger>
                  <TabsTrigger value="member 1">Member 1</TabsTrigger>
                  <TabsTrigger value="member 2">Member 2</TabsTrigger>
                  <TabsTrigger value="member 3">Member 3</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="team">
                <TeamDisplay id={props.id} />
              </TabsContent>
              <TabsContent value="adviser">
                <AdviserDisplay id={props.id} />
              </TabsContent>
              <TabsContent value="member 1">
                <Member1Display id={props.id} />
              </TabsContent>
              <TabsContent value="member 2">
                <Member2Display id={props.id} />
              </TabsContent>
              <TabsContent value="member 3">
                <Member3Display id={props.id} />
              </TabsContent>
            </Tabs>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </VerifyDialogContext.Provider>
  )
}
export default VerifyDialog
