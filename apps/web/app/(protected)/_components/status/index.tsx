import { useTeamStatus } from "@/app/(protected)/_components/status/context"

function RegisterStatus() {
  const team = useTeamStatus()

  return (
    <div className="flex gap-2">
      <p>{team}</p>
    </div>
  )
}
export default RegisterStatus
