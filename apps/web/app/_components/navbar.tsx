"use client"

import GlassCard from "@/components/glassCard"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const nav = [
  {
    label: "รายละเอียด",
    href: "#landing",
  },
  {
    label: "คุณสมบัติ",
    href: "#qualification",
  },
  {
    label: "รางวัล",
    href: "#award",
  },
  {
    label: "กำหนดการ",
    href: "#dateandcontest",
  },
  {
    label: "ติดต่อทีมงาน",
    href: "#contact",
  },
]

const CTA = ({ isMobile }: { isMobile?: boolean }) => {
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
    <button className="text-button-2 hidden h-full cursor-not-allowed rounded-full bg-[radial-gradient(ellipse_99.36%_78.93%_at_50.23%_99.36%,_rgba(198,_60,_81,_0.80)_9%,_rgba(198,_60,_81,_0.32)_100%)] px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(93,47,60,0.6)] md:block">
      ยังไม่เปิดรับสมัคร
    </button>
  )
}

const sections = ["landing", "qualification", "award", "dateandcontest", "contact"]

export function Navbar() {
  const [active, setActive] = useState("landing")

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        })
      },
      { threshold: 0.6 }
    )

    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const isActive = (href: string) => active === href
  return (
    <div className="fixed z-50 w-full p-9 px-[24px] md:px-[60px] lg:px-[160px]">
      <GlassCard className="flex items-center justify-between rounded-full pl-3 pr-5 backdrop-blur-md md:pr-3">
        <div className="flex w-[142px] items-center justify-center pt-1 md:w-[100px] xl:w-[180px]">
          <Link href={"/"}>
            <Image
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              width={500}
              height={242}
              src="/static/logo/Logo.webp"
              alt="Bangmod Hackathon"
            />
          </Link>
        </div>
        <div className="hidden items-center justify-between gap-2.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              className={`rounded-full px-6 py-4 text-white ${isActive(item.href.replace("#", "")) ? "text-nav-1-selected liquid" : "text-nav-2"}`}
              href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex h-[70px]">
          <CTA />
          <Drawer>
            <DrawerTrigger asChild>
              <button className="block text-xl md:hidden">
                <MenuIcon color="#d1d5dc" />
              </button>
            </DrawerTrigger>
            <DrawerContent className="border-1 !border-none !bg-transparent">
              <GlassCard className="border-1 rounded-t-2xl border-white/10 bg-black/50 backdrop-blur-2xl">
                <DrawerTitle className="sr-only">Navbar</DrawerTitle>
                <div className="mb-10 flex flex-col gap-y-5 overflow-auto p-6">
                  <Image
                    className="mx-auto object-cover"
                    width={142}
                    height={75}
                    src="/static/logo/Logo.webp"
                    alt="Bangmod Hackathon"
                  />
                  {nav.map((item) => (
                    <DrawerClose key={item.href} asChild className="flex items-center justify-center">
                      <Link href={item.href}>
                        <button className="transition-colors">
                          <span
                            className={`font-prompt ${active === item.href.replace("#", "") ? "text-nav-1-selected text-pink-300" : "text-nav-2 text-white"}`}>
                            {item.label}
                          </span>
                        </button>
                      </Link>
                    </DrawerClose>
                  ))}
                  <DrawerClose asChild className="flex items-center justify-center">
                    <CTA isMobile />
                  </DrawerClose>
                </div>
              </GlassCard>
            </DrawerContent>
          </Drawer>
        </div>
      </GlassCard>
    </div>
  )
}
