"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { Edit2Icon, MoreHorizontal, TrashIcon } from "lucide-react"
import { parseAsString, useQueryState } from "nuqs"
import { createContext } from "react"

import DropdownMenuDeleteStaff from "./dialog/delete-user"
import DropdownMenuEditStaff from "./dialog/edit-user"

interface ActionMenuProps {
  user: typeof authClient.$Infer.Session.user | undefined
}

export const UserDataContext = createContext<ActionMenuProps>({
  user: undefined,
})

const { useSession } = authClient

export function ActionMenu(props: ActionMenuProps) {
  const [open, setOpen] = useQueryState("user", parseAsString.withDefault(""))

  const { isPending, data } = useSession()

  if (isPending) {
    return (
      <Button variant="ghost" size="icon">
        <Spinner className="h-5 w-5" />
      </Button>
    )
  }

  return (
    <UserDataContext.Provider value={props}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Edit Accounts</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={(e) => {
              e.preventDefault()
              setOpen(`e-${props.user?.id}`)
            }}>
            <Edit2Icon /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onSelect={(e) => {
              e.preventDefault()
              setOpen(`d-${props.user?.id}`)
            }}>
            <TrashIcon /> Delete Staff Account
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenuDeleteStaff />
      <DropdownMenuEditStaff />
    </UserDataContext.Provider>
  )
}
