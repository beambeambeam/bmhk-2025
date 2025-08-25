"use client"

import { authClient } from "@/lib/auth-client"

function SignInPage() {
  return (
    <div className="flex h-screen items-center justify-center">
      <button
        onClick={() => authClient.signIn.social({ provider: "google" })}
        className="cursor-pointer border-2">
        sign in
      </button>
    </div>
  )
}
export default SignInPage
