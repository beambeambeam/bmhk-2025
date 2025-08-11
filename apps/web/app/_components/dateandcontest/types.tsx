export type DateItem = {
  date: string
  label: string
  isActive: boolean
}

export type TimelineProps = {
  title: string
  lineColor?: string
  colorPercentage?: number
  transparentPercentage?: number
  data: DateItem[]
}
