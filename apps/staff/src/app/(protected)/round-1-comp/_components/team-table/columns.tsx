import { formatCodeName } from "@/app/(protected)/round-1/_components/team-table/format"
import { Button } from "@/components/ui/button"
import { RelativeTimeCard } from "@/components/ui/relative-time-card"
import { cn } from "@/lib/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { teams } from "@workspace/db/schema"
import { Building2, Users, School, Mail, FileText } from "lucide-react"
import { Text } from "lucide-react"

export type Team = Pick<
  typeof teams.$inferSelect,
  "id" | "name" | "school" | "memberCount" | "createdAt" | "index"
> & {
  notes: string | null
  firstMemberEmail: string | null
  rowShouldBeRed: boolean
}

const columnHelper = createColumnHelper<Team>()

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
      const shouldBeRed = info.row.original.rowShouldBeRed

      return (
        <div className="flex items-center gap-2">
          <School className={cn("h-4 w-4", shouldBeRed ? "text-red-500" : "text-muted-foreground")} />
          <span className={cn(shouldBeRed && "font-medium text-red-500")}>{schoolName}</span>
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
  columnHelper.accessor("memberCount", {
    id: "memberCount",
    header: "Members",
    cell: (info) => (
      <div className="flex items-center gap-2">
        <Users className="text-muted-foreground h-4 w-4" />
        {info.getValue()}
      </div>
    ),
    enableSorting: false,
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
  columnHelper.accessor("firstMemberEmail", {
    id: "firstMemberEmail",
    header: "First Member Email",
    cell: (info) => {
      const email = info.getValue()
      if (!email) {
        return <span className="text-muted-foreground">No email</span>
      }
      return (
        <div className="flex items-center gap-2">
          <Mail className="text-muted-foreground h-4 w-4" />
          <span className="font-mono text-sm">{email}</span>
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "First Member Email",
      placeholder: "Search emails...",
      variant: "text",
      icon: Mail,
    },
  }),
  columnHelper.accessor("notes", {
    id: "notes",
    header: "Notes",
    cell: (info) => {
      const notes = info.getValue()
      if (!notes) {
        return <span className="text-muted-foreground">No notes</span>
      }
      return (
        <div className="flex max-w-xs items-center gap-2">
          <FileText className="text-muted-foreground h-4 w-4 flex-shrink-0" />
          <span className="truncate" title={notes}>
            {notes}
          </span>
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
  columnHelper.accessor("createdAt", {
    id: "createdAt",
    header: "Created",
    cell: (info) => {
      const date = new Date(info.getValue())
      return <RelativeTimeCard date={date} className="text-muted-foreground" />
    },
    enableSorting: false,
    enableColumnFilter: false,
  }),
]
