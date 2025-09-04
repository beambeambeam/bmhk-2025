"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { UserWithRole } from "better-auth/plugins/admin"
import { MoreHorizontal } from "lucide-react"
import { createContext } from "react"

import DropdownMenuDeleteStaff from "./dialog/delete-user"
import DropdownMenuEditStaff from "./dialog/edit-user"

interface ActionMenuProps {
  user: typeof authClient.$Infer.Session.user | undefined
}

export const UserDataContext = createContext<ActionMenuProps>({
  user: undefined,
})

export function ActionMenu(props: ActionMenuProps) {
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
          <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
            <DropdownMenuEditStaff />
          </DropdownMenuItem>
          <DropdownMenuItem variant="destructive" onSelect={(e) => e.preventDefault()}>
            <DropdownMenuDeleteStaff />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </UserDataContext.Provider>
  )
}
