"use client"

import Timeline from "@/app/_components/dateandcontest/Timeline"

import { registerDate, competitionDate } from "./content"

function DateAndContest() {
  return (
    <div className="space-y-50 flex h-[1080px] w-full flex-col items-center justify-center px-40">
      {/* registeration */}
      <Timeline
        title="การรับสมัคร"
        lineColor="#C63C51"
        colorPercentage={50}
        transparentPercentage={50}
        data={registerDate}
      />
      {/* competition */}
      <Timeline
        title="การแข่งขัน"
        lineColor="#DFDFDF99"
        colorPercentage={100}
        transparentPercentage={0}
        data={competitionDate}
      />
    </div>
  )
}

export default DateAndContest
