"use client"

import { columns, TeamAward } from "@/app/(protected)/team-award/_components/team-award-table/columns"
import { getTeamAwards } from "@/app/(protected)/team-award/_components/team-award-table/queries"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"
import { use } from "react"

interface TeamAwardTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getTeamAwards>>]>
}

function TeamAwardTable({ promises }: TeamAwardTableProps) {
  const [{ data, pageCount }] = use(promises)

  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id,
    pageCount,
    initialState: {
      columnVisibility: {},
    },
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}

export default TeamAwardTable
