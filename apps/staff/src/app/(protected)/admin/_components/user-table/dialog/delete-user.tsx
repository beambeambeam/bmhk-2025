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
  DialogTrigger,
} from "@/components/ui/dialog"
import { authClient } from "@/lib/auth-client"
import { isDefinedError, onError, onSuccess } from "@orpc/client"
import { useServerAction } from "@orpc/react/hooks"
import { TrashIcon } from "lucide-react"
import { useContext, useState } from "react"
import { toast } from "sonner"

import { deleteUser } from "../../../actions"
import { UserDataContext } from "../action-menu"

const DropdownMenuDeleteStaff = () => {
  const { user } = useContext(UserDataContext)

  const { data } = authClient.useSession()

  const { execute, isPending } = useServerAction(deleteUser, {
    interceptors: [
      onError((err) => {
        console.log(err)
        toast("Error!", {
          description: err?.message,
        })
        if (isDefinedError(err)) {
          console.error(err)
        }
      }),
      onSuccess(() => window.location.reload()),
    ],
  })

  if (!user) {
    return null
  }

  return (
    <Dialog>
      <DialogTrigger asChild disabled={user.id == data?.user.id && user.role === "super_admin"}>
        <Button variant="ghost" className="text-destructive hover:text-destructive w-full justify-start">
          <TrashIcon /> Delete Staff Account
        </Button>
      </DialogTrigger>
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
                onClick={() => {
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
