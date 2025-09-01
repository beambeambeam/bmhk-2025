import SignInForm from "@/app/_components/form"
import { CardDescription, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="grid h-screen w-screen lg:grid-cols-2">
      <div className="hidden lg:flex"></div>
      <div className="flex flex-col items-center justify-center border-l px-12">
        <div className="w-full max-w-xl">
          <CardTitle className="text-center text-2xl">Sign in</CardTitle>
          <CardDescription className="text-center">BMHK 2025 Staff Website</CardDescription>
          <SignInForm />
        </div>
      </div>
    </div>
  )
}
