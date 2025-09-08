import UserTable from "@/app/(protected)/admin/_components/user-table"
import { getUsers } from "@/app/(protected)/admin/_components/user-table/queries"
import { searchParamsCache } from "@/app/(protected)/admin/_components/user-table/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { getValidFilters } from "@/lib/data-table"
import { SearchParams } from "@/types"
import { Suspense } from "react"

interface AdminPageProps {
  searchParams: Promise<SearchParams>
}

async function Admin(props: AdminPageProps) {
  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const validFilters = getValidFilters(search.filters)

  const promises = Promise.all([
    getUsers({
      ...search,
      filters: validFilters,
    }),
  ])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full max-w-7xl flex-col gap-2 px-4 pt-12">
        <h1 className="w-full text-start text-2xl font-bold">Admin Dashboard</h1>

        <h2 className="w-full text-start text-xl font-semibold">Users</h2>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={7}
              filterCount={2}
              cellWidths={["10rem", "30rem", "10rem", "10rem", "6rem", "6rem", "6rem"]}
              shrinkZero
            />
          }>
          <UserTable promises={promises} />
        </Suspense>
      </div>
    </div>
  )
}
export default Admin
