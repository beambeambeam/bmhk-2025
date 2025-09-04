import AdviserDisplay from "@/app/(protected)/round-1/_components/verifly-dialog/adviser"
import {
  VerifyDialogContext,
  VerifyDialogContextValue,
} from "@/app/(protected)/round-1/_components/verifly-dialog/context"
import VerifyForm, { VerifyFormParent } from "@/app/(protected)/round-1/_components/verifly-dialog/form"
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
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SearchCheckIcon, UserIcon } from "lucide-react"
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
    <VerifyDialogContext.Provider value={{ id: props.id }}>
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
            <div className="grid h-full min-h-0 w-[98vw] grid-rows-2 overflow-y-auto transition-all md:w-[85vw] md:grid-cols-[2fr_1fr]">
              <Tabs defaultValue="team" value={tab} onValueChange={onTabChange} className="h-full">
                <TabsList className="h-fit w-fit">
                  <TabsTrigger value="team">Team</TabsTrigger>
                  <TabsTrigger value="adviser">Adviser</TabsTrigger>
                  <TabsTrigger value="member 1">
                    <UserIcon /> 1
                  </TabsTrigger>
                  <TabsTrigger value="member 2">
                    <UserIcon /> 2
                  </TabsTrigger>
                  <TabsTrigger value="member 3">
                    <UserIcon /> 3
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="team" className="mt-0">
                  <TeamDisplay />
                </TabsContent>
                <TabsContent value="adviser" className="mt-0">
                  <AdviserDisplay />
                </TabsContent>
                <TabsContent value="member 1" className="mt-0">
                  <Member1Display />
                </TabsContent>
                <TabsContent value="member 2" className="mt-0">
                  <Member2Display />
                </TabsContent>
                <TabsContent value="member 3" className="mt-0">
                  <Member3Display />
                </TabsContent>
              </Tabs>
              <div className="h-full pt-20 lg:p-4 lg:pt-0">
                <VerifyFormParent id={props.id} closeDialog={() => setVerify("")} />
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </VerifyDialogContext.Provider>
  )
}
export default VerifyDialog
