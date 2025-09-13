import Round1CompTeamTable from "@/app/(protected)/round-1-comp/_components/team-table"
import { getRound1CompTeams } from "@/app/(protected)/round-1-comp/_components/team-table/queries"
import { searchParamsCache } from "@/app/(protected)/round-1-comp/_components/team-table/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { getValidFilters } from "@/lib/data-table"
import { SearchParams } from "@/types"
import { Suspense } from "react"

interface Round1CompPageProps {
  searchParams: Promise<SearchParams>
}

async function Round1CompPage(props: Round1CompPageProps) {
  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const validFilters = getValidFilters(search.filters)

  const promises = Promise.all([
    getRound1CompTeams({
      ...search,
      filters: validFilters,
    }),
  ])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full max-w-[90rem] flex-col gap-2 px-4 pt-12">
        <h1 className="w-full text-start text-2xl font-bold">Round 1 Competition</h1>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={7}
              filterCount={5}
              cellWidths={["8rem", "20rem", "15rem", "8rem", "20rem", "15rem", "10rem"]}
              shrinkZero
            />
          }>
          <Round1CompTeamTable promises={promises} />
        </Suspense>
      </div>
    </div>
  )
}

export default Round1CompPage
