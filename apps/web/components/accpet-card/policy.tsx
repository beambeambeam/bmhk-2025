"use client"

import ScrollArea from "@/app/_components/scope/ScrollArea"
import { Button } from "@workspace/ui/components/button"
import { cn } from "@workspace/ui/lib/utils"
import { useEffect, useState } from "react"

export default function PolicyConsent({ demo = false }) {
  const [isOpen, setIsOpen] = useState(false)
  const [hide, setHide] = useState(false)

  const COOKIE_NAME = "confirm.consent"

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
      //ignore error
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={cn(
        "font-prompt fixed left-0 right-0 top-0 z-[200] flex h-full items-center justify-center text-black duration-700",
        !isOpen
          ? "translate-y-8 opacity-0 transition-[opacity,transform]"
          : "translate-y-0 opacity-100 transition-[opacity,transform]",
        hide && "hidden"
      )}>
      <div className="flex max-h-[80vh] w-full max-w-[80rem] justify-between border border-white/10 bg-black p-10">
        <div className="grid h-full w-full grid-rows-[auto_1fr_auto] gap-4 text-white">
          <ScrollArea className="max-h-full rounded-xl bg-black p-5" colorTheme="">
            d
          </ScrollArea>

          <div className="flex h-fit w-full justify-between">
            <Button onClick={accept}>ยอมรับ</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
