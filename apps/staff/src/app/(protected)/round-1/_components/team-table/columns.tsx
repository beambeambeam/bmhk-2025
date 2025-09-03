import {
  formatCodeName,
  RegsiterStatusToIcon,
  RegisterStatusToColorClass,
} from "@/app/(protected)/round-1/_components/team-table/format"
import VerifyDialog from "@/app/(protected)/round-1/_components/verifly-dialog"
import VerifyForm from "@/app/(protected)/round-1/_components/verifly-dialog/form"
import { Button } from "@/components/ui/button"
import { RelativeTimeCard } from "@/components/ui/relative-time-card"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import { createColumnHelper } from "@tanstack/react-table"
import { teams, registerStatusEnum } from "@workspace/db/schema"
import { Building2, Users, School, CircleOffIcon } from "lucide-react"
import { Text } from "lucide-react"

type Team = Pick<
  typeof teams.$inferSelect,
  "id" | "name" | "school" | "memberCount" | "createdAt" | "index"
> & {
  regisStatusTeam: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusAdviser: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusMember1: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusMember2: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusMember3: (typeof registerStatusEnum.enumValues)[number] | null
  submitRegister: Date | null
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
    cell: (info) => (
      <div className="flex items-center gap-2">
        <School className="text-muted-foreground h-4 w-4" />
        {info.getValue()}
      </div>
    ),
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
  columnHelper.display({
    id: "allStatus",
    header: "Register Status",
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          {registerStatusIcon(row.original.regisStatusTeam, "team")}
          {registerStatusIcon(row.original.regisStatusAdviser, "adviser")}
          {registerStatusIcon(row.original.regisStatusMember1, "member 1")}
          {registerStatusIcon(row.original.regisStatusMember2, "member 2")}
          {registerStatusIcon(row.original.regisStatusMember3, "member 3")}
        </div>
      )
    },
  }),
  columnHelper.accessor("regisStatusTeam", {
    id: "regisStatusTeam",
    header: "Team Status",
    cell: (info) => {
      const value = info.getValue()
      const status = (value ?? "NOT_HAVE") as "DONE" | "NOT_DONE" | "NOT_HAVE"
      const Icon = RegsiterStatusToIcon(status)
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${RegisterStatusToColorClass(status)}`} />
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Team Status",
      placeholder: "Filter by status...",
      variant: "select",
      options: [
        { label: "Done", value: "DONE" },
        { label: "Not Done", value: "NOT_DONE" },
      ],
    },
  }),
  columnHelper.accessor("regisStatusAdviser", {
    id: "regisStatusAdviser",
    header: "Adviser Status",
    cell: (info) => {
      const value = info.getValue()
      const status = (value ?? "NOT_HAVE") as "DONE" | "NOT_DONE" | "NOT_HAVE"
      const Icon = RegsiterStatusToIcon(status)
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${RegisterStatusToColorClass(status)}`} />
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Adviser Status",
      placeholder: "Filter by status...",
      variant: "select",
      options: [
        { label: "Done", value: "DONE" },
        { label: "Not Done", value: "NOT_DONE" },
      ],
    },
  }),
  columnHelper.accessor("regisStatusMember1", {
    id: "regisStatusMember1",
    header: "Member 1 Status",
    cell: (info) => {
      const value = info.getValue()
      const status = (value ?? "NOT_HAVE") as "DONE" | "NOT_DONE" | "NOT_HAVE"
      const Icon = RegsiterStatusToIcon(status)
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${RegisterStatusToColorClass(status)}`} />
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Member 1 Status",
      placeholder: "Filter by status...",
      variant: "select",
      options: [
        { label: "Done", value: "DONE" },
        { label: "Not Done", value: "NOT_DONE" },
      ],
    },
  }),
  columnHelper.accessor("regisStatusMember2", {
    id: "regisStatusMember2",
    header: "Member 2 Status",
    cell: (info) => {
      const value = info.getValue()
      const status = (value ?? "NOT_HAVE") as "DONE" | "NOT_DONE" | "NOT_HAVE"
      const Icon = RegsiterStatusToIcon(status)
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${RegisterStatusToColorClass(status)}`} />
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Member 2 Status",
      placeholder: "Filter by status...",
      variant: "select",
      options: [
        { label: "Done", value: "DONE" },
        { label: "Not Done", value: "NOT_DONE" },
      ],
    },
  }),
  columnHelper.accessor("regisStatusMember3", {
    id: "regisStatusMember3",
    header: "Member 3 Status",
    cell: (info) => {
      const value = info.getValue()
      const status = (value ?? "NOT_HAVE") as "DONE" | "NOT_DONE" | "NOT_HAVE"
      const Icon = RegsiterStatusToIcon(status)
      return (
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${RegisterStatusToColorClass(status)}`} />
        </div>
      )
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Member 3 Status",
      placeholder: "Filter by status...",
      variant: "select",
      options: [
        { label: "Done", value: "DONE" },
        { label: "Not Done", value: "NOT_DONE" },
        { label: "Not Have", value: "NOT_HAVE" },
      ],
    },
  }),
  columnHelper.accessor("submitRegister", {
    id: "submitRegister",
    header: "Submit Date",
    cell: (info) => {
      const value = info.getValue() as Date | null
      if (!value) {
        return <CircleOffIcon className="h-4 w-4 text-rose-500" />
      }
      const date = new Date(value)

      return <RelativeTimeCard date={date} className="font-semibold text-green-600 hover:text-green-800" />
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Submit Date",
      placeholder: "Filter by date...",
      variant: "dateRange",
    },
  }),
  columnHelper.display({
    id: "verify",
    header: "veify",
    cell: ({ row }) => <VerifyDialog id={row.original.id} form={<VerifyForm id={row.original.id} />} />,
  }),
]

const registerStatusIcon = (value: "NOT_DONE" | "DONE" | "NOT_HAVE" | null, tooltip: string) => {
  const status = (value ?? "NOT_HAVE") as "DONE" | "NOT_DONE" | "NOT_HAVE"
  const Icon = RegsiterStatusToIcon(status)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline" size="icon">
          <Icon className={cn("h-4 min-h-4 w-4 min-w-4", RegisterStatusToColorClass(status))} />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{tooltip}</p>
      </TooltipContent>
    </Tooltip>
  )
}
