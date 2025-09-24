"use client"

import Application from "@/app/_components/application"
import Award from "@/app/_components/award"
import Contact from "@/app/_components/contact"
import DateAndContest from "@/app/_components/dateandcontest"
import Footer from "@/app/_components/footer"
import LandingSection from "@/app/_components/landing"
import { Navbar } from "@/app/_components/navbar"
import QualificationSector from "@/app/_components/qualification"
import Sponsors from "@/app/_components/sponsors"
import Scope from "@/app/_components/scope"
import Story from "@/app/_components/story"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function Page() {
  const [sTime, setSTime] = useState<string | null>("0")

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/time`)
      .then((res) => {
        res
          .json()
          .then((d) => {
            setSTime(d["c"])
            console.log(d["c"])
          })
          .catch(() => setSTime(null))
      })
      .catch(() => setSTime(null))
  }, [])

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
        <div className="fixed z-50 w-full">
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
            CTAId={"landing"}
            sections={["landing", "qualification", "award", "dateandcontest", "contact"]}
          />
        </div>

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
          <DateAndContest c={sTime} />
        </div>
        <div id="scope" className="flex items-center justify-center">
          <Scope />
        </div>
        <div id="contact" className="flex items-center justify-center">
          <Contact />
        </div>
        <div id="story" className="flex min-h-screen items-center justify-center">
          <Story />
        </div>
        <div className="flex items-center justify-center">
          <Sponsors />
        </div>
        <div className="flex items-center justify-center">
          <Footer />
        </div>
      </div>
    </>
  )
}
