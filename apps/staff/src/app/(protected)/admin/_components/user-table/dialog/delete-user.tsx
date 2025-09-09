"use client"

import { LoadingSpinner } from "@/components/svg/loading-spinner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { authClient } from "@/lib/auth-client"
import { isDefinedError, onError, onSuccess, ORPCError } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { parseAsString, useQueryState } from "nuqs"
import { useContext } from "react"
import { toast } from "sonner"

import { deleteUser } from "../../../actions"
import { UserDataContext } from "../action-menu"

const DropdownMenuDeleteStaff = () => {
  const { user } = useContext(UserDataContext)

  const [open, setOpen] = useQueryState("user", parseAsString.withDefault(""))

  authClient.useSession()

  const { execute, isPending } = useServerAction(deleteUser, {
    interceptors: [
      onError((err) => {
        if (err instanceof ORPCError && isDefinedError(err)) {
          if (err.data.bmhkIntError) {
            if (err.data.bmhkIntError === "USER_NOT_FOUND") {
              toast.error("Error!", {
                description: err?.message,
              })
            }
          } else {
            console.error(err)
          }
        }
        toast.error("Error!", {
          description: err?.message ?? "Unknown Error Occured.",
        })
      }),
      onSuccess(() => {
        toast.success("Success!", {
          description: "User deleted.",
        })
      }),
    ],
  })

  if (!user) {
    return null
  }

  return (
    <Dialog open={open === `d-${user.id}`} onOpenChange={(isOpen) => setOpen(isOpen ? `d-${user.id}` : "")}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            Confirm deleting {user.name} ({user.username})
          </DialogTitle>
          <DialogDescription>Are you sure? This action is irreversible!</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {isPending ? (
            <LoadingSpinner className="size-4" />
          ) : (
            <>
              <Button
                type="button"
                variant="destructive"
                onClick={async () => {
                  execute({
                    id: user.id,
                  })
                }}>
                Confirm
              </Button>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </DialogClose>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
export default DropdownMenuDeleteStaff
