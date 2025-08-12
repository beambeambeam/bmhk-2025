"use client"

import Timeline from "@/app/_components/dateandcontest/Timeline"

import { registerDate, competitionDate } from "./content"

function DateAndContest() {
  return (
    <div className="gap-y-25 2xl:gap-y-50 flex h-auto w-full flex-col items-center justify-center px-6 lg:h-[834px] lg:px-20 2xl:h-[1080px] 2xl:px-40">
      {/* registeration */}
      <Timeline title="การรับสมัคร" colorPercentage={50} data={registerDate} />
      {/* competition */}
      <Timeline title="การแข่งขัน" colorPercentage={0} data={competitionDate} />
    </div>
  )
}

export default DateAndContest
