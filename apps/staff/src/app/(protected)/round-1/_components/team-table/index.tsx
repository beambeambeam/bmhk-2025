"use client"

import { columns } from "@/app/(protected)/round-1/_components/team-table/columns"
import { getRound1Teams } from "@/app/(protected)/round-1/_components/team-table/queries"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"
import { use } from "react"

interface Round1TeamTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getRound1Teams>>]>
}

function Round1TeamTable({ promises }: Round1TeamTableProps) {
  const [{ data, pageCount }] = use(promises)

  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id,
    pageCount,
    initialState: {
      columnPinning: { right: ["actions"] },
      columnVisibility: {
        regisStatusTeam: false,
        regisStatusAdviser: false,
        regisStatusMember1: false,
        regisStatusMember2: false,
        regisStatusMember3: false,
      },
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

export default Round1TeamTable
