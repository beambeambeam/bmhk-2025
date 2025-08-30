import { TeamNavMenu } from "@/app/(protected)/_components/team-nav"
import Link from "next/link"
import { JSX } from "react"

const Landing = ({ isMobile }: { isMobile?: boolean }) => {
  if (isMobile) {
    return (
      <Link href="/sign-in">
        <button className="text-button-2 h-full w-full cursor-pointer rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(255,204,247,0.6)]">
          ลงทะเบียน
        </button>
      </Link>
    )
  }
  return (
    <Link href="/sign-in" className="2xl:h-full">
      <button className="text-button-2 hidden cursor-pointer items-center justify-center gap-4 whitespace-nowrap rounded-full bg-gradient-to-r from-purple-400/50 to-pink-300/50 shadow-xl shadow-black/25 lg:flex lg:h-full lg:px-8 lg:py-3 2xl:px-10 2xl:py-2.5">
        ลงทะเบียน
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
