import { TeamNavMenu } from "@/app/(protected)/_components/team-nav"
import Link from "next/link"
import { JSX } from "react"

const Landing = ({ isMobile }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <Link href="/sign-in">
        <button className="text-button-2 h-full w-full cursor-pointer rounded-full bg-red-500 px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(255,204,247,0.6)]">
          เข้าสู่ระบบ
        </button>
      </Link>
    )
  }
  return (
    <Link href="/sign-in" className="2xl:h-full">
      <button className="text-button-2 hidden cursor-pointer items-center justify-center gap-4 whitespace-nowrap rounded-full bg-red-500 shadow-xl shadow-black/25 lg:flex lg:h-full lg:px-8 lg:py-3 2xl:px-10 2xl:py-2.5">
        เข้าสู่ระบบ
      </button>
    </Link>
  )
}

export const CTA: {
  [key: string]: JSX.Element
} = {
  landing: <Landing />,
  "landing-mobile": <Landing isMobile />,
  regis: <TeamNavMenu />,
}
