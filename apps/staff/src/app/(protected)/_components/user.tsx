import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Spinner } from "@/components/ui/spinner"
import { authClient } from "@/lib/auth-client"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"

const { useSession } = authClient

function UserNavbar() {
  const { data: session, isPending } = useSession()
  const router = useRouter()

  if (isPending) {
    return <Spinner />
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button>{session?.user.name}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{session?.user.email}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={async () => {
            await authClient.signOut({})
            router.push("/")
          }}>
          <LogOutIcon />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserNavbar
