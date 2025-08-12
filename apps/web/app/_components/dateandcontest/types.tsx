export type DateItem = {
  date: string
  label: string
  isActive: boolean
}

export type TimelineProps = {
  title: string
  colorPercentage?: number
  data: DateItem[]
}
