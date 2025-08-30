import { TeamsChart } from "@/app/(protected)/dashboard/_components/dotted-multi-line"
import { teamsData } from "@/app/(protected)/dashboard/_lib/user-v-done"

async function Dashboard() {
  const [error, data] = await teamsData({})

  if (error) {
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
    <div className="flex h-screen w-full items-center justify-center">
      <div className="w-full max-w-4xl p-4">
        <TeamsChart initialData={data} />
      </div>
    </div>
  )
}

export default Dashboard
