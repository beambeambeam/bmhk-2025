export interface ScrollAreaProps {
  children: React.ReactNode
  className?: string
  colorTheme: string
}

export interface AccordionItemProps {
  value: string
  isOpen?: boolean
  onToggle?: (id: string) => void
  trigger: string
  lqClassName: string
  colorTheme: string
  data: ContentData
}

export interface AccordionProps {
  type?: "single" | "multiple"
  collapsible?: boolean
}

export interface SubItem {
  label: string
  subItems?: SubItem[]
}

export interface ContentData {
  id: string
  title: string
  lqClassName: string
  colorTheme: string
  items: SubItem[]
}
