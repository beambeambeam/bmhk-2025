import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { authClient } from "@/lib/auth-client"
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal, CheckCircle, XCircle } from "lucide-react"
import { Text } from "lucide-react"

const columnHelper = createColumnHelper<typeof authClient.$Infer.Session.user>()

export const columns = [
  columnHelper.accessor("id", {
    id: "id",
    header: "ID",
    cell: (info) => <div className="font-mono text-sm">{info.getValue()}</div>,
    enableSorting: true,
  }),
  columnHelper.accessor("email", {
    id: "email",
    header: "Email",
    cell: (info) => <div>{info.getValue()}</div>,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "Email",
      placeholder: "Search emails...",
      variant: "text",
      icon: Text,
    },
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Name",
    cell: (info) => <div>{info.getValue() || "N/A"}</div>,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "Name",
      placeholder: "Search names...",
      variant: "text",
      icon: Text,
    },
  }),
  columnHelper.accessor("role", {
    id: "role",
    header: "Role",
    cell: (info) => {
      const role = info.getValue()
      return (
        <Badge variant="outline" className="capitalize">
          {role === "admin" ? <CheckCircle className="mr-1 h-3 w-3" /> : <XCircle className="mr-1 h-3 w-3" />}
          {role}
        </Badge>
      )
    },
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "Roles",
      variant: "select",
      options: [
        { label: "Super admin", value: "super_admin" },
        { label: "Admin", value: "admin" },
        { label: "Staff", value: "staff" },
      ],
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "Actions",
    cell: (_info) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 32,
  }),
]
