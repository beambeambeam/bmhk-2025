import { useAllStatus } from "@/app/(protected)/_components/status/context"

function RegisterStatus() {
  const status = useAllStatus()
  return (
    <div className="flex gap-2">
      <p>{status.team}</p>
      <p>{status.adviser}</p>
      <p>{status.member1}</p>
      <p>{status.member2}</p>
      <p>{status.member3}</p>
    </div>
  )
}
export default RegisterStatus
