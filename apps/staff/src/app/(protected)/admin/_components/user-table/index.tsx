"use client"

import { columns } from "@/app/(protected)/admin/_components/user-table/columns"
import { getUsers } from "@/app/(protected)/admin/_components/user-table/queries"
import { DataTable } from "@/components/data-table/data-table"
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar"
import { useDataTable } from "@/hooks/use-data-table"
import { use } from "react"

import { AddStaffDialog } from "./dialog/add-user"

interface UserTableProps {
  promises: Promise<[Awaited<ReturnType<typeof getUsers>>]>
}

function UserTable({ promises }: UserTableProps) {
  const [{ data, pageCount }] = use(promises)

  const { table } = useDataTable({
    data,
    columns,
    getRowId: (row) => row.id,
    pageCount,
    initialState: {
      columnPinning: { right: ["actions"] },
    },
    shallow: false,
    clearOnDefault: true,
  })

  return (
    <DataTable table={table}>
      <DataTableToolbar table={table}>
        <AddStaffDialog />
      </DataTableToolbar>
    </DataTable>
  )
}

export default UserTable
