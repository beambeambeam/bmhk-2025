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
  if (isMobile) {
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
  )
}

const MobileDrawer = () => (
  <Drawer>
    <DrawerTrigger asChild>
      <button className="block text-xl xl:hidden">
        <MenuIcon color="#d1d5dc" />
      </button>
    </DrawerTrigger>
    <DrawerContent className="!border-none !bg-transparent backdrop-blur-xl">
      <DrawerTitle className="sr-only">Navbar</DrawerTitle>
      <div className="mb-10 flex flex-col gap-y-5 overflow-auto p-6">
        <DrawerClose asChild className="flex items-center justify-center">
          <CTA isMobile />
        </DrawerClose>
        {nav.map((item) => (
          <DrawerClose key={item.href} asChild className="flex items-center justify-center">
            <Link href={item.href}>
              <button className="hover:text-vermilion cursor-pointer text-white transition-colors">
                <span className="font-prompt text-[1.3rem] font-bold">{item.label}</span>
              </button>
            </Link>
          </DrawerClose>
        ))}
      </div>
    </DrawerContent>
  </Drawer>
)

export function Navbar() {
  const [hash, setHash] = useState("")

  useEffect(() => {
    // Set initial hash
    setHash(window.location.hash)

    // Listen for hash changes
    const handleHashChange = () => {
      setHash(window.location.hash)
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const isActive = (href: string) => hash === href
  return (
    <div className="fixed z-50 w-full p-9 px-[24px] md:px-[60px] lg:px-[160px]">
      <GlassCard className="flex items-center justify-between rounded-full py-3 pl-3 pr-5 backdrop-blur-md md:pr-3">
        <div className="flex w-[142px] items-center justify-center pt-1 md:w-[100px] xl:w-[180px]">
          <Link href={"/"}>
            <Image
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              width={500}
              height={242}
              src="/static/logo/Logo.png"
              alt="Bangmod Hackathon"
            />
          </Link>
        </div>
        <div className="hidden items-center justify-between gap-2.5 md:flex">
          {nav.map((item) => (
            <a
              key={item.label}
              className={`rounded-full px-6 py-4 text-white ${isActive(item.href) ? "text-nav-1-selected liquid" : "text-nav-2"}`}
              href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="flex h-[70px]">
          <CTA />
          <MobileDrawer />
        </div>
      </GlassCard>
    </div>
  )
}
