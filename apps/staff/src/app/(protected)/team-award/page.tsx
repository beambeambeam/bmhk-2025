import TeamAwardTable from "@/app/(protected)/team-award/_components/team-award-table"
import { getTeamAwards } from "@/app/(protected)/team-award/_components/team-award-table/queries"
import { searchParamsCache } from "@/app/(protected)/team-award/_components/team-award-table/validations"
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton"
import { getValidFilters } from "@/lib/data-table"
import { SearchParams } from "@/types"
import { Suspense } from "react"

interface TeamAwardPageProps {
  searchParams: Promise<SearchParams>
}

async function TeamAwardPage(props: TeamAwardPageProps) {
  const searchParams = await props.searchParams
  const search = searchParamsCache.parse(searchParams)

  const validFilters = getValidFilters(search.filters)

  const promises = Promise.all([
    getTeamAwards({
      ...search,
      filters: validFilters,
    }),
  ])

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex w-full max-w-[90rem] flex-col gap-2 px-4 pt-12">
        <h1 className="w-full text-start text-2xl font-bold">Team Award</h1>
        <Suspense
          fallback={
            <DataTableSkeleton
              columnCount={5}
              filterCount={4}
              cellWidths={["12rem", "20rem", "20rem", "15rem", "12rem"]}
              shrinkZero
            />
          }>
          <TeamAwardTable promises={promises} />
        </Suspense>
      </div>
    </div>
  )
}

export default TeamAwardPage
