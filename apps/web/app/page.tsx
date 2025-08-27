"use client"

import Application from "@/app/_components/application"
import Award from "@/app/_components/award"
import Contact from "@/app/_components/contact"
import DateAndContest from "@/app/_components/dateandcontest"
import LandingSection from "@/app/_components/landing"
import { Navbar } from "@/app/_components/navbar"
import QualificationSector from "@/app/_components/qualification"
import Scope from "@/app/_components/scope"
import Story from "@/app/_components/story"
import Head from "next/head"

import Footer from "./_components/footer"

const NavCTA = ({ isMobile }: { isMobile?: boolean }) => {
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

export default function Page() {
  return (
    <>
      <Head>
        <link
          rel="preload"
          as="image"
          href="/static/background-image/Home.webp"
          media="(min-width: 1024px)"
        />
        <link
          rel="preload"
          as="image"
          href="/static/background-image/Home-tablet.webp"
          media="(min-width: 768px)"
        />
        <link
          rel="preload"
          as="image"
          href="/static/background-image/Home-phone.webp"
          media="(max-width: 768px)"
        />
      </Head>
      <div className="hidden">
        <img src="/static/background-image/Home.webp" alt="" />
        <img src="/static/background-image/Home-tablet.webp" alt="" />
        <img src="/static/background-image/Home-phone.webp" alt="" />
      </div>
      <div
        className="no-scrollbar bg-home flex min-h-screen w-full snap-y snap-always flex-col gap-20 overflow-hidden overflow-y-hidden text-white"
        style={{ scrollBehavior: "smooth" }}>
        <Navbar
          links={[
            {
              label: "รายละเอียด",
              href: "#landing",
              type: "normal",
            },
            {
              label: "คุณสมบัติ",
              href: "#qualification",
              type: "normal",
            },
            {
              label: "รางวัล",
              href: "#award",
              type: "normal",
            },
            {
              label: "กำหนดการ",
              href: "#dateandcontest",
              type: "normal",
            },
            {
              label: "ติดต่อทีมงาน",
              href: "#contact",
              type: "normal",
            },
          ]}
          CTA={NavCTA}
          sections={["landing", "qualification", "award", "dateandcontest", "contact"]}
        />

        <div id="landing" className="flex min-h-screen items-center justify-center">
          <LandingSection />
        </div>
        <div id="qualification" className="flex min-h-screen items-center justify-center">
          <QualificationSector />
        </div>
        <div id="application" className="flex min-h-screen items-center justify-center">
          <Application />
        </div>
        <div id="award" className="flex items-center justify-center">
          <Award />
        </div>
        <div id="dateandcontest" className="flex items-center justify-center">
          <DateAndContest />
        </div>
        <div id="scope" className="flex min-h-screen items-center justify-center">
          <Scope />
        </div>
        <div id="contact" className="flex min-h-screen items-center justify-center">
          <Contact />
        </div>
        <div id="story" className="flex min-h-screen items-center justify-center">
          <Story />
        </div>
        <div className="flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </>
  )
}
