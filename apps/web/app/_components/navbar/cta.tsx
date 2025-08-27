import { TeamNavMenu } from "@/app/(protected)/_components/team-nav"
import { JSX } from "react"

const Landing = ({ isMobile }: { isMobile?: boolean }) => {
  /* if (isMobile) {
      return (
        <button className="text-button-2 h-full rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(255,204,247,0.6)]">
          ลงทะเบียน
        </button>
      )
    }
    return (
      <button className="text-button-2 hidden h-full rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(255,204,247,0.6)] md:block">
        ลงทะเบียน
      </button>
    ) */
  if (isMobile) {
    return (
      <button className="text-button-2 h-full rounded-full bg-[radial-gradient(ellipse_99.36%_78.93%_at_50.23%_99.36%,_rgba(198,_60,_81,_0.80)_9%,_rgba(198,_60,_81,_0.32)_100%)] px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(93,47,60,0.6)]">
        ยังไม่เปิดรับสมัคร
      </button>
    )
  }
  return (
    <button className="text-button-2 hidden h-[52px] cursor-not-allowed rounded-full bg-[radial-gradient(ellipse_99.36%_78.93%_at_50.23%_99.36%,_rgba(198,_60,_81,_0.80)_9%,_rgba(198,_60,_81,_0.32)_100%)] px-4 py-0 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(93,47,60,0.6)] lg:block 2xl:h-[70px] 2xl:px-10 2xl:py-2.5">
      ยังไม่เปิดรับสมัคร
    </button>
  )
}

export const CTA: {
  [key: string]: JSX.Element
} = {
  landing: <Landing />,
  "landing-mobile": <Landing isMobile />,
  regis: <TeamNavMenu />,
}
