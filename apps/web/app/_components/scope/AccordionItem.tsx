import React, { useRef, useState, useEffect } from "react"

import { NestedList } from "./NestedList"
import ScrollArea from "./ScrollArea"
import { TriggerIcon } from "./icons"
import { AccordionItemProps } from "./types"

export function AccordionItem({
  value,
  isOpen = false,
  onToggle,
  trigger,
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
      className={`${lqClassName} w-[1326px] overflow-hidden rounded-[2.5rem] border border-white/10 px-8 py-6 transition-all duration-300`}>
      <button
        onClick={() => onToggle && onToggle(value)}
        className="group flex w-full cursor-pointer items-center justify-between text-left"
        aria-expanded={isOpen}
        aria-controls={`content-${value}`}
        id={`trigger-${value}`}
        type="button">
        <p className="text-[2rem] font-medium text-white">{trigger}</p>
        <TriggerIcon isOpen={isOpen} />
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
        }}>
        <ScrollArea colorTheme={colorTheme} className="h-100 pr-40 pt-4">
          <NestedList items={data.items} color={colorTheme} />
        </ScrollArea>
      </div>
    </div>
  )
}

export default AccordionItem
