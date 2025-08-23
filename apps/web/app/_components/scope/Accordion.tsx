"use client"

import React, { useState } from "react"

import AccordionItem from "./AccordionItem"
import { contentData } from "./scope"
import { AccordionProps } from "./types"

export const Accordion: React.FC<AccordionProps> = ({ type = "single", collapsible = true }) => {
  const [openItem, setOpenItem] = useState<string | null>(null)
  const [openItems, setOpenItems] = useState<string[]>([])

  const toggleItem = (id: string) => {
    if (type === "single") {
      setOpenItem((prev) => (prev === id && collapsible ? null : id))
    } else {
      setOpenItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]))
    }
  }

  return (
    <div className="flex flex-col gap-y-6 lg:gap-y-8 2xl:gap-y-10">
      {contentData.map((data) => {
        const isOpen = type === "single" ? openItem === data.id : openItems.includes(data.id)
        return (
          <AccordionItem
            key={data.id}
            value={data.id}
            isOpen={isOpen}
            onToggle={toggleItem}
            shortTitle={data.shortTitle}
            longTitle={data.longTitle}
            lqClassName={data.lqClassName}
            colorTheme={data.colorTheme}
            data={data}
          />
        )
      })}
    </div>
  )
}

export default Accordion
