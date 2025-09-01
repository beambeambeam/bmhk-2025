import UserTable from "@/app/(protected)/admin/_components/user-table"
import { authClient } from "@/lib/auth-client"

async function Admin() {
  return (
    <div>
      <UserTable />
    </div>
  )
}
export default Admin
