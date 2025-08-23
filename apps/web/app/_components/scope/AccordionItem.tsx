import React, { useRef, useState, useEffect } from "react"

import { NestedList } from "./NestedList"
import ScrollArea from "./ScrollArea"
import { TriggerIcon } from "./icons"
import { AccordionItemProps } from "./types"

export function AccordionItem({
  value,
  isOpen = false,
  onToggle,
  longTitle,
  shortTitle,
  lqClassName = "liquid",
  colorTheme,
  data,
}: AccordionItemProps) {
  const contentRef = useRef<HTMLDivElement>(null)
  const [height, setHeight] = useState("0px")

  useEffect(() => {
    if (contentRef.current) {
      setHeight(isOpen ? `${contentRef.current.scrollHeight}px` : "0px")
    }
  }, [isOpen, data])

  return (
    <div
      className={`${lqClassName} w-full max-w-[700px] overflow-hidden rounded-[1.25rem] border border-white/10 px-5 py-4 transition-all duration-300 lg:max-w-[1034px] lg:rounded-[2.5rem] lg:px-7 lg:py-5 2xl:max-w-[1326px] 2xl:px-8 2xl:py-6`}>
      <button
        onClick={() => onToggle && onToggle(value)}
        className="group flex w-full cursor-pointer items-center justify-between gap-x-10 text-left"
        aria-expanded={isOpen}
        aria-controls={`content-${value}`}
        id={`trigger-${value}`}
        type="button">
        <p className="whitespace-nowrap text-[1.125rem] font-medium text-white lg:text-[1.75rem] 2xl:text-[2rem]">
          <span className="block lg:hidden">{data.shortTitle}</span>
          <span className="hidden lg:block">{data.longTitle}</span>
        </p>
        <TriggerIcon isOpen={isOpen} className="h-6 w-6 lg:h-8 lg:w-8" />
      </button>

      <div
        id={`content-${value}`}
        role="region"
        aria-labelledby={`trigger-${value}`}
        ref={contentRef}
        style={{
          height,
          transition: "height 300ms ease",
          overflow: "hidden",
        }}
        className={`${isOpen ? "mt-4 2xl:mt-6" : ""}`}>
        <ScrollArea colorTheme={colorTheme} className="max-h-100 h-auto pr-10 2xl:pr-20">
          <NestedList items={data.items} color={colorTheme} />
        </ScrollArea>
      </div>
    </div>
  )
}

export default AccordionItem
