import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { createColumnHelper } from "@tanstack/react-table"
import { MoreHorizontal, Building2, Users, Trophy, School } from "lucide-react"
import { Text } from "lucide-react"

// Define the team type based on the schema
type Team = {
  id: string
  name: string
  school: string
  memberCount: number
  award: string
  createdAt: Date
  updatedAt: Date
}

const columnHelper = createColumnHelper<Team>()

export const columns = [
  columnHelper.accessor("name", {
    id: "name",
    header: "Team Name",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "Team Name",
      placeholder: "Search team names...",
      variant: "text",
      icon: Text,
    },
  }),
  columnHelper.accessor("school", {
    id: "school",
    header: "School",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <School className="text-muted-foreground h-4 w-4" />
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "School",
      placeholder: "Search schools...",
      variant: "text",
      icon: Building2,
    },
  }),
  columnHelper.accessor("memberCount", {
    id: "memberCount",
    header: "Members",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Users className="text-muted-foreground h-4 w-4" />
        {info.getValue()}
      </div>
    ),
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "Member Count",
      placeholder: "Filter by member count...",
      variant: "select",
      icon: Users,
      options: [
        { label: "2 Members", value: "2" },
        { label: "3 Members", value: "3" },
      ],
    },
  }),
  columnHelper.accessor("award", {
    id: "award",
    header: "Award",
    cell: (info) => {
      const award = info.getValue()
      const isFirstRound = award === "FIRST_ROUND"
      const isSecondRound = award === "SECOND_ROUND"

      return (
        <Badge
          variant={isFirstRound ? "default" : isSecondRound ? "secondary" : "outline"}
          className="capitalize">
          <Trophy className="mr-1 h-3 w-3" />
          {award === "FIRST_ROUND" ? "First Round" : "Second Round"}
        </Badge>
      )
    },
    enableSorting: true,
    enableColumnFilter: true,
    meta: {
      label: "Award",
      variant: "select",
      options: [
        { label: "First Round", value: "FIRST_ROUND" },
        { label: "Second Round", value: "SECOND_ROUND" },
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
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
    size: 32,
  }),
]
