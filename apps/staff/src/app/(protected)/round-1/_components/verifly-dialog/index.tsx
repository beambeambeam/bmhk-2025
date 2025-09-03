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
import { parseAsString, useQueryState } from "nuqs"

interface VerifyDialogProps {
  id: string
}

function VerifyDialog(props: VerifyDialogProps) {
  const [verify, setVerify] = useQueryState("verify", parseAsString.withDefault(""))

  const [tab, setTab] = useQueryState("verify-tab", parseAsString.withDefault(""))
  const onTabChange = (value: string) => setTab(value)

  return (
    <Dialog
      open={verify === props.id}
      onOpenChange={(isOpen) => {
        setVerify(isOpen ? props.id : "")
        setTab(null)
      }}>
      <DialogTrigger asChild>
        <Button>d</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] !max-w-fit">
        <DialogHeader>
          <DialogTitle hidden>Are you absolutely sure?</DialogTitle>
          <DialogDescription hidden>
            This action cannot be undone. This will permanently delete your account and remove your data from
            our servers.
          </DialogDescription>
          <Tabs defaultValue="team" className="h-full w-[80vw]" value={tab} onValueChange={onTabChange}>
            <TabsList>
              <TabsTrigger value="team">Team</TabsTrigger>
              <TabsTrigger value="adviser">Adviser</TabsTrigger>
              <TabsTrigger value="member 1">Member 1</TabsTrigger>
              <TabsTrigger value="member 2">Member 2</TabsTrigger>
              <TabsTrigger value="member 3">Member 3</TabsTrigger>
            </TabsList>
            <TabsContent value="team" className="rounded-lg border p-2 px-3">
              Team
            </TabsContent>
            <TabsContent value="adviser" className="rounded-lg border p-2 px-3">
              Adviser
            </TabsContent>
            <TabsContent value="member 1" className="rounded-lg border p-2 px-3">
              Member 1
            </TabsContent>
            <TabsContent value="member 2" className="rounded-lg border p-2 px-3">
              Member 2
            </TabsContent>
            <TabsContent value="member 3" className="rounded-lg border p-2 px-3">
              Member 3
            </TabsContent>
          </Tabs>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
export default VerifyDialog
