import { TeamsLineChart } from "@/app/(protected)/dashboard/_components/teams-line-chart"
import TeamNumberCard from "@/app/(protected)/dashboard/_components/teams-number-chart"
import { TeamsPieChart } from "@/app/(protected)/dashboard/_components/teams-pie-chart"
import { teamsData } from "@/app/(protected)/dashboard/_lib/user-v-done"

async function Dashboard() {
  const [error, data] = await teamsData()

  if (error || !data) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-destructive text-xl font-semibold">Error loading teams data</h2>
          <p className="text-muted-foreground">Please try refreshing the page</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex w-full items-center justify-center overflow-x-hidden">
      <div className="w-full max-w-7xl space-y-6 p-4 md:p-8 lg:p-12">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
          <TeamsLineChart initialData={data} />
          <TeamsPieChart data={data} />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <TeamNumberCard
            number={data.summary.totalRegistered}
            title="Overall Registered Teams"
            description={`Total teams registered`}
            variant="registered"
          />
          <TeamNumberCard
            number={data.summary.totalSubmitted}
            title="Overall Submitted Teams"
            description={`${data.summary.submissionRate}% submission rate`}
            variant="submitted"
          />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
