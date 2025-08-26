"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

function SignInPage() {
  const { data: session } = authClient.useSession()
  const router = useRouter()

  useEffect(() => {
    if (session?.user) {
      router.push("/")
    }
  }, [session])

  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() =>
          authClient.signIn.social({
            provider: "google",
            callbackURL: `${process.env.NEXT_PUBLIC_WEB_URL}/teams`,
          })
        }
        className="cursor-pointer border-2">
        sign in
      </button>
    </div>
  )
}
export default SignInPage
