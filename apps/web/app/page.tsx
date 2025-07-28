import Application from "@/app/_components/application"
import Award from "@/app/_components/award"
import Contact from "@/app/_components/contact"
import DateAndContest from "@/app/_components/dateandcontest"
import LandingSection from "@/app/_components/landing"
import QualificationSector from "@/app/_components/qualification"
import Scope from "@/app/_components/scope"
import Story from "@/app/_components/story"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-20">
      {/* spacec for navbar */}
      <div className="h-[94.45px]" />

      <LandingSection />
      <QualificationSector />
      <Application />
      <Award />
      <DateAndContest />
      <Scope />
      <Contact />
      <Story />
    </div>
  )
}
