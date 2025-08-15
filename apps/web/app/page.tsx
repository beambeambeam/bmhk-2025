import Application from "@/app/_components/application"
import Award from "@/app/_components/award"
import Contact from "@/app/_components/contact"
import DateAndContest from "@/app/_components/dateandcontest"
import LandingSection from "@/app/_components/landing"
import QualificationSector from "@/app/_components/qualification"
import Scope from "@/app/_components/scope"
import Story from "@/app/_components/story"

import Footer from "./_components/footer"

export default function Page() {
  return (
    <div className="no-scrollbar flex h-screen snap-y snap-always flex-col gap-20 overflow-y-auto bg-black text-white">
      {/* spacec for navbar */}
      <div className="h-[94.45px]" />

      <div className="flex min-h-screen snap-start items-center justify-center">
        <LandingSection />
      </div>
      <div className="flex min-h-screen snap-start items-center justify-center">
        <QualificationSector />
      </div>
      <div className="flex min-h-screen snap-start items-center justify-center">
        <Application />
      </div>
      <div className="flex snap-start items-center justify-center">
        <Award />
      </div>
      <div className="flex min-h-screen snap-start items-center justify-center">
        <DateAndContest />
      </div>
      <div className="flex min-h-screen snap-start items-center justify-center">
        <Scope />
      </div>
      <div className="flex min-h-screen snap-start items-center justify-center">
        <Contact />
      </div>
      <div className="flex min-h-screen snap-start items-center justify-center">
        <Story />
      </div>
      <div className="flex snap-start items-center justify-center">
        <Footer />
      </div>
    </div>
  )
}
