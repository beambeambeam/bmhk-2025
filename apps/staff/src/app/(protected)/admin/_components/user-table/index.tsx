"use client"

import { columns } from "@/app/(protected)/admin/_components/user-table/columns"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"

function UserTable() {
  const { table } = useDataTable({
    data: [],
    columns,
    getRowId: (row) => row.id,
    pageCount: -1,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table} />
    </DataTable>
  )
}
export default UserTable
