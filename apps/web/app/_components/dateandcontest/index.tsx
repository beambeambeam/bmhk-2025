"use client"

import Timeline from "./Timeline"
import { SectionItem } from "./Timeline"
import { dateAndContestData } from "./dateAndContest"

function DateAndContest() {
  // Helper to create a date without time (year, month index, day)
  const mkDate = (d: number, m: number, y: number) => new Date(y, m - 1, d)

  const today = new Date()

  let timelineKey = "timeline-registration-1"

  if (today < mkDate(27, 8, 2025)) {
    timelineKey = "timeline-registration-1"
  } else if (today >= mkDate(15, 9, 2025) && today < mkDate(18, 9, 2025)) {
    timelineKey = "timeline-registration-2"
  } else if (today >= mkDate(18, 9, 2025) && today < mkDate(20, 9, 2025)) {
    timelineKey = "timeline-registration-3"
  } else if (today.getTime() === mkDate(20, 9, 2025).getTime()) {
    timelineKey = "timeline-competition-1"
  } else if (today > mkDate(20, 9, 2025) && today < mkDate(25, 9, 2025)) {
    timelineKey = "timeline-competition-2"
  } else if (today >= mkDate(25, 9, 2025) && today < mkDate(11, 10, 2025)) {
    timelineKey = "timeline-competition-3"
  } else if (today.getTime() === mkDate(11, 10, 2025).getTime()) {
    timelineKey = "timeline-competition-4"
  } else {
    timelineKey = "timeline-competition-5"
  }

  const timelineData: SectionItem[] = dateAndContestData[
    timelineKey as keyof typeof dateAndContestData
  ] as SectionItem[]

  return (
    <div className="w-full px-6 lg:max-h-[834px] lg:px-20 2xl:max-h-[1080px] 2xl:px-40">
      <Timeline data={timelineData} />
    </div>
  )
}

export default DateAndContest
