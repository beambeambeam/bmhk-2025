import Round1TeamTable from "@/app/(protected)/round-1/_components/team-table"
import { getRound1Teams } from "@/app/(protected)/round-1/_components/team-table/queries"
import { searchParamsCache } from "@/app/(protected)/round-1/_components/team-table/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { getValidFilters } from "@/lib/data-table"
import { SearchParams } from "@/types"
import { Suspense } from "react"

interface Round1PageProps {
  searchParams: Promise<SearchParams>
}

async function Round1Page(props: Round1PageProps) {
  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const validFilters = getValidFilters(search.filters)

  const promises = Promise.all([
    getRound1Teams({
      ...search,
      filters: validFilters,
    }),
  ])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full max-w-[90rem] flex-col gap-2 px-4 pt-12">
        <h1 className="w-full text-start text-2xl font-bold">Round 1 Teams</h1>
        <p className="text-muted-foreground">
          View and manage teams participating in the first round of the competition.
        </p>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              filterCount={4}
              cellWidths={["20rem", "20rem", "10rem", "12rem", "6rem"]}
              shrinkZero
            />
          }>
          <Round1TeamTable promises={promises} />
        </Suspense>
      </div>
    </div>
  )
}

export default Round1Page
