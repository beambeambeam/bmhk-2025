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
        "font-prompt fixed left-0 right-0 top-0 z-[200] flex h-full items-center justify-center duration-700",
        !isOpen
          ? "translate-y-8 opacity-0 transition-[opacity,transform]"
          : "translate-y-0 opacity-100 transition-[opacity,transform]",
        hide && "hidden"
      )}>
      <div className="liquid flex h-fit max-h-[80vh] w-full max-w-[80rem] justify-between rounded-[3rem]">
        <div className="grid h-fit w-full grid-rows-3 gap-8 p-10 text-white">
          <div className="flex h-full items-center gap-6">
            <div className="liquid flex size-[3rem] min-h-[3rem] min-w-[3rem] items-center justify-center rounded-[1.25rem] lg:size-[3.75rem]">
              d
            </div>
            <p className="text-header-2-medium">นโยบายความเป็นส่วนตัว (Privacy Policy)</p>
          </div>
          <ScrollArea className="max-h-full rounded-xl" colorTheme="">
            ddd
          </ScrollArea>
          <div className="flex h-full w-full justify-between">
            <Button onClick={accept} className="h-full w-full">
              ยอมรับ
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
