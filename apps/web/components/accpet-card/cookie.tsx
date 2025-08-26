"use client"

import { cn } from "@workspace/ui/lib/utils"
import { Cookie, CookieIcon } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CookieConsent({ demo = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hide, setHide] = useState(false)

  const COOKIE_NAME = "policy.consent"

  const accept = () => {
    setIsOpen(false)
    document.cookie = `${COOKIE_NAME}=true; expires=Fri, 31 Dec 9999 23:59:59 GMT`
    setTimeout(() => {
      setHide(true)
    }, 700)
  }

  useEffect(() => {
    try {
      setIsOpen(true)
      if (document.cookie.includes(`${COOKIE_NAME}=true`)) {
        if (!demo) {
          setIsOpen(false)
          setTimeout(() => {
            setHide(true)
          }, 700)
        }
      }
    } catch {
      // Ignore errors
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={cn(
        "font-prompt fixed bottom-0 left-0 right-0 z-[200] w-full text-black backdrop-blur-2xl duration-700 sm:bottom-4 sm:left-4 sm:max-w-md",
        !isOpen
          ? "translate-y-8 opacity-0 transition-[opacity,transform]"
          : "translate-y-0 opacity-100 transition-[opacity,transform]",
        hide && "hidden"
      )}>
      <div className="rounded-3xl border border-white/10">
        <div className="grid gap-2 text-white">
          <div className="m-4 flex items-center gap-6">
            <div className="liquid boder-white/10 flex size-[40px] items-center justify-center rounded-xl bg-transparent 2xl:size-[60px] 2xl:rounded-3xl">
              <CookieIcon />
            </div>
            <span className="text-xl font-medium 2xl:text-2xl">เราใช้คุกกี้</span>
          </div>
          <div className="px-4">
            <p className="text-start text-sm font-normal 2xl:text-base">
              เราใช้คุกกี้ (Cookies) ที่จำเป็นเพื่อให้เว็บไซต์ทำงานได้อย่างถูกต้อง และช่วยให้คุณใช้งาน
              ฟีเจอร์พื้นฐานและเข้าถึงพื้นที่ปลอดภัยของเว็บไซต์ อ่านเพิ่มเติมได้ที่{" "}
              <Link href="/privacy-policy" className="text-pink-300 underline hover:text-pink-200">
                นโยบายความเป็นส่วนตัว
              </Link>
              <br />
            </p>
          </div>
          <div className="mx-6 mb-6 flex gap-2 border-t border-white/10">
            <button
              onClick={accept}
              className="hover:text-vermilion liquid h-full w-full cursor-pointer rounded-3xl py-5 transition-colors">
              ยอมรับ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
