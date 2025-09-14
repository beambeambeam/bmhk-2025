import TeamDialog from "@/app/(protected)/_components/team-dialog"
import { formatCodeName } from "@/app/(protected)/round-1/_components/team-table/format"
import { createColumnHelper } from "@tanstack/react-table"
import { teams } from "@workspace/db/schema"
import { Building2, School, Trophy, Text } from "lucide-react"

export type TeamAward = Pick<
  typeof teams.$inferSelect,
  "id" | "name" | "school" | "award" | "createdAt" | "index"
>

const columnHelper = createColumnHelper<TeamAward>()

export const columns = [
  columnHelper.accessor("index", {
    id: "codeName",
    header: "Code Name",
    cell: (info) => {
      const code = formatCodeName(info.row.original.index)
      const prefix = "BMHK"
      const suffix = code.replace(prefix, "")
      return (
        <div className="font-mono">
          <span className="text-muted-foreground">{prefix}</span>
          <span>{suffix}</span>
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Code Name",
      placeholder: "Search code names...",
      variant: "text",
      icon: Text,
    },
  }),
  columnHelper.accessor("name", {
    id: "name",
    header: "Team Name",
    cell: (info) => <div className="font-medium">{info.getValue()}</div>,
    enableSorting: false,
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
    cell: (info) => {
      const schoolName = info.getValue()
      return (
        <div className="flex items-center gap-2">
          <School className="text-muted-foreground h-4 w-4" />
          <span>{schoolName}</span>
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "School",
      placeholder: "Search schools...",
      variant: "text",
      icon: Building2,
    },
  }),
  columnHelper.accessor("award", {
    id: "award",
    header: "Award",
    cell: (info) => {
      const award = info.getValue()
      return (
        <div className="flex items-center gap-2">
          <Trophy className="h-4 w-4 text-yellow-500" />
          <span className="font-medium">{award}</span>
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Award",
      placeholder: "Search awards...",
      variant: "text",
      icon: Trophy,
    },
  }),
  columnHelper.display({
    id: "action",
    header: "Action",
    cell: ({ row }) => <TeamDialog id={row.original.id} />,
  }),
]
