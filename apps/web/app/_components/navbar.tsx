"use client"

import GlassCard from "@/components/glassCard"
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
      <GlassCard className="flex items-center justify-between rounded-full p-[15px] backdrop-blur-md">
        <div className="flex h-[70px] items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/static/logo/Logo.png" alt="Bangmod Hackathon Logo" className="h-[140px]" />
        </div>
        <div className="flex items-center justify-between gap-2.5">
          {nav.map((item) => (
            <a
              key={item.label}
              className={`rounded-full px-6 py-4 text-white ${isActive(item.href) ? "text-nav-1-selected liquid" : "text-nav-2"}`}
              href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="h-[70px]">
          <button className="text-button-2 h-full rounded-full bg-[linear-gradient(0deg,rgba(38,38,38,0.002),rgba(38,38,38,0.002)),radial-gradient(78.68%_99.36%_at_50%_0%,rgba(255,135,237,0.5)_0%,rgba(255,135,237,0)_100%),radial-gradient(79.19%_100%_at_50.05%_100%,#9f83dc_0%,rgba(159,131,220,0)_100%),linear-gradient(106.52deg,rgba(255,204,247,0.09)_-2.48%,rgba(159,131,220,0.09)_29.08%)] px-10 py-2.5 text-white shadow-[0px_0px_20px_rgba(0,0,0,0.25),inset_-1px_-1px_30px_rgba(255,204,247,0.6)]">
            ลงทะเบียน
          </button>
        </div>
      </GlassCard>
    </div>
  )
}
