import React from "react"

import { SubItem } from "./types"

type NestedListProps = {
  items: SubItem[]
  level?: number
  color: string
}

export const NestedList: React.FC<NestedListProps> = ({ items, level = 0, color }) => {
  const listStyle =
    level === 0 ? "list-decimal font-normal" : level === 1 ? "list-[lower-alpha]" : "list-[lower-roman]"

  return (
    <ol className={`${listStyle} space-y-2 pl-6 text-[1.25rem] font-normal text-white`}>
      {items.map((item, index) => (
        <li key={index} style={{ color: level === 0 ? color : undefined }}>
          {item.label}
          {item.subItems && <NestedList items={item.subItems} level={level + 1} color={color} />}
        </li>
      ))}
    </ol>
  )
}
