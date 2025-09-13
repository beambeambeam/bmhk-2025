"use client"

import { columns, Team } from "@/app/(protected)/round-1-comp/_components/team-table/columns"
import { getRound1CompTeams } from "@/app/(protected)/round-1-comp/_components/team-table/queries"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { Button } from "@/components/ui/button"
import { useDataTable } from "@/hooks/use-data-table"
import { exportTableToCSV } from "@/lib/csv-export"
import { Row } from "@tanstack/react-table"
import { Download } from "lucide-react"
import { CSSProperties, use, useCallback } from "react"

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

  const handleExportCSV = useCallback(() => {
    const filteredData = table.getFilteredRowModel().rows.map((row, index) => {
      const team = row.original
      return {
        Index: `${index + 1}`,
        CodeName: `BMHK${team.index.toString().padStart(3, "0")}`,
        TeamName: team.name,
        School: team.school,
        FirstMemberEmail: team.firstMemberEmail || "",
        Notes: team.notes || "",
      }
    })

    exportTableToCSV(filteredData, {
      filename: `round-1-competition-teams-${new Date().toISOString().split("T")[0]}.csv`,
    })
  }, [table])

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <Button onClick={handleExportCSV} variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </DataTableToolbar>
    </DataTable>
  )
}

export default Round1CompTeamTable
