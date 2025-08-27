"use client"

import GlassCard from "@/components/glassCard"
import { authClient } from "@/lib/auth-client"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@workspace/ui/components/drawer"
import { MenuIcon } from "lucide-react"
import Image from "next/image"
import NavLink from "next/link"
import { Fragment, useEffect, useState } from "react"

import { CTA } from "./cta"

interface BaseLink {
  type: "normal" | "action"
  label: string
}

interface NormalLink extends BaseLink {
  type: "normal"
  href: string
  mobileOnly?: boolean
}

interface ActionLink extends BaseLink {
  type: "action"
  action: string
}

export type NavLink = NormalLink | ActionLink

interface NavbarProps {
  links: NavLink[]
  CTAId: string
  sections?: string[]
}

type Actions = {
  [key: string]: (...args: any[]) => any
}

const actions: Actions = {
  signout: authClient.signOut,
}

export function Navbar({ links, CTAId, sections }: NavbarProps) {
  const [active, setActive] = useState(sections !== undefined ? sections[0] : "")

  useEffect(() => {
    if (!sections || sections.length < 2) return
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
    <div className="z-100 sticky top-0 w-full p-9 px-[24px] lg:px-[60px] 2xl:px-[160px]">
      <GlassCard className="flex items-center justify-between rounded-full pl-3 pr-5 backdrop-blur-md lg:pr-3">
        <div className="flex w-[142px] items-center justify-center pt-1 lg:w-[100px] 2xl:w-[180px]">
          <NavLink href={"/"}>
            <Image
              style={{ width: "100%", height: "auto", objectFit: "cover" }}
              width={500}
              height={242}
              src="/static/logo/Logo.webp"
              alt="Bangmod Hackathon"
            />
          </NavLink>
        </div>
        <div className="hidden items-center lg:flex 2xl:justify-between 2xl:gap-2.5">
          {links.map((item, i) => {
            if (item.type === "normal" && !item.mobileOnly) {
              return (
                <NavLink
                  key={item.label}
                  className={`rounded-full px-4 py-4 text-white 2xl:px-6 ${isActive(item.href.replace("#", "")) ? "text-nav-1-selected liquid" : "text-nav-2"}`}
                  href={item.href}>
                  {item.label}
                </NavLink>
              )
            } else return <Fragment key={`${item.label}-${i}`}></Fragment>
          })}
        </div>
        <div className="flex h-[70px] items-center">
          {CTA[CTAId]}
          <Drawer>
            <DrawerTrigger asChild>
              <button className="block text-xl lg:hidden">
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
                  {links.map((item, i) => {
                    if (item.type === "action")
                      return (
                        <DrawerClose key={i} asChild className="flex items-center justify-center">
                          <button
                            className="transition-colors"
                            onClick={() => {
                              actions[item.action]?.()
                            }}>
                            <span className={`font-prompt text-nav-2 text-white`}>{item.label}</span>
                          </button>
                        </DrawerClose>
                      )
                    else
                      return (
                        <DrawerClose key={i} asChild className="flex items-center justify-center">
                          <NavLink href={item.href}>
                            <button className="transition-colors">
                              <span
                                className={`font-prompt ${active === item.href.replace("#", "") ? "text-nav-1-selected text-pink-300" : "text-nav-2 text-white"}`}>
                                {item.label}
                              </span>
                            </button>
                          </NavLink>
                        </DrawerClose>
                      )
                  })}
                  <DrawerClose asChild className="flex items-center justify-center">
                    {CTA[`${CTAId}-mobile`]}
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
