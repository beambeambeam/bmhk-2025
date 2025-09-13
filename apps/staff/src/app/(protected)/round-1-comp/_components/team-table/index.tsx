"use client"

import { columns, Team } from "@/app/(protected)/round-1-comp/_components/team-table/columns"
import { getRound1CompTeams } from "@/app/(protected)/round-1-comp/_components/team-table/queries"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"
import { Row } from "@tanstack/react-table"
import { CSSProperties, use } from "react"

interface Round1CompTeamTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getRound1CompTeams>>]>
}

function Round1CompTeamTable({ promises }: Round1CompTeamTableProps) {
  const [{ data, pageCount }] = use(promises)

  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id,
    pageCount,
    initialState: {
      columnPinning: { right: [] },
      columnVisibility: {},
    },
    shallow: false,
    clearOnDefault: true,
    meta: {
      getRowStyles: (row: Row<Team>): CSSProperties => ({
        background: row.original.rowShouldBeRed ? "rgba(239, 68, 68, 0.1)" : "transparent",
      }),
    },
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}

export default Round1CompTeamTable
