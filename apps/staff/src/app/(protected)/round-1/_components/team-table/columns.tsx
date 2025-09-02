import { createColumnHelper } from "@tanstack/react-table"
import { teams, registerStatusEnum } from "@workspace/db/schema"
import { Building2, Users, School } from "lucide-react"
import { Text } from "lucide-react"

type Team = Pick<typeof teams.$inferSelect, "id" | "name" | "school" | "memberCount" | "createdAt"> & {
  regisStatusTeam: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusAdviser: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusMember1: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusMember2: (typeof registerStatusEnum.enumValues)[number] | null
  regisStatusMember3: (typeof registerStatusEnum.enumValues)[number] | null
  submitRegister: Date | null
}

const columnHelper = createColumnHelper<Team>()

export const columns = [
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
  columnHelper.accessor("regisStatusTeam", {
    id: "regisStatusTeam",
    header: "Team Status",
    cell: (info) => {
      const value = info.getValue()
      const label = value === "DONE" ? "Done" : value === "NOT_DONE" ? "Not Done" : "Not Have"
      return <div className="flex items-center gap-2">{label}</div>
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
      const label = value === "DONE" ? "Done" : value === "NOT_DONE" ? "Not Done" : "Not Have"
      return <div className="flex items-center gap-2">{label}</div>
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
      const label = value === "DONE" ? "Done" : value === "NOT_DONE" ? "Not Done" : "Not Have"
      return <div className="flex items-center gap-2">{label}</div>
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
      const label = value === "DONE" ? "Done" : value === "NOT_DONE" ? "Not Done" : "Not Have"
      return <div className="flex items-center gap-2">{label}</div>
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
      const label = value === "DONE" ? "Done" : value === "NOT_DONE" ? "Not Done" : "Not Have"
      return <div className="flex items-center gap-2">{label}</div>
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
        return <div className="flex items-center gap-2">-</div>
      }
      const date = new Date(value)
      const dd = String(date.getDate()).padStart(2, "0")
      const mm = String(date.getMonth() + 1).padStart(2, "0")
      const yyyy = date.getFullYear()
      const HH = String(date.getHours()).padStart(2, "0")
      const MM = String(date.getMinutes()).padStart(2, "0")
      const formatted = `${dd}/${mm}/${yyyy} ${HH}:${MM}`
      return <div className="flex items-center gap-2">{formatted}</div>
    },
    enableSorting: false,
    enableColumnFilter: true,
    meta: {
      label: "Submit Date",
      placeholder: "Filter by date...",
      variant: "dateRange",
    },
  }),
]
