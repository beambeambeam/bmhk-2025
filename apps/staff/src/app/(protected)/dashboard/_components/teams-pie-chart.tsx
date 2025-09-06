"use client"

import type { TeamsResponse } from "@/app/(protected)/dashboard/_lib/user-v-done"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"
import { LabelList, Pie, PieChart, Cell } from "recharts"

const chartConfig = {
  submitted: {
    label: "Submitted Teams",
    color: "var(--chart-1)",
  },
  pending: {
    label: "Pending Teams",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

interface TeamsPieChartProps {
  data: TeamsResponse
}

export function TeamsPieChart({ data }: TeamsPieChartProps) {
  const { totalRegistered, totalSubmitted, submissionRate } = data.summary
  const pending = totalRegistered - totalSubmitted

  const chartData = [
    {
      category: "submitted",
      count: totalSubmitted,
      fill: "var(--color-submitted)",
      label: "Submitted",
    },
    {
      category: "pending",
      count: pending,
      fill: "var(--color-pending)",
      label: "Pending",
    },
  ]

  const sortedChartData = [...chartData].sort((a, b) => a.count - b.count)

  const BASE_RADIUS = 60
  const SIZE_INCREMENT = 10

  const submissionRateNum = parseFloat(submissionRate)
  const isPositive = submissionRateNum >= 50
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  const trendColor = isPositive ? "text-green-500" : "text-red-500"
  const trendBgColor = isPositive ? "bg-green-500/10" : "bg-red-500/10"

  return (
    <Card className="flex flex-col overflow-hidden">
      <CardHeader className="items-center pb-0">
        <CardTitle>
          Teams Overview
          <Badge variant="outline" className={`${trendBgColor} ${trendColor} ml-2 border-none`}>
            <TrendIcon className="h-4 w-4" />
            <span>{submissionRate}%</span>
          </Badge>
        </CardTitle>
        <CardDescription>
          {totalRegistered} total teams • {totalSubmitted} submitted
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden pb-0">
        <ChartContainer
          config={chartConfig}
          className="[&_.recharts-text]:fill-background mx-auto aspect-square max-h-full max-w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent nameKey="count" hideLabel />} />
            {sortedChartData.map((entry, index) => (
              <Pie
                key={`pie-${entry.category}`}
                data={[entry]}
                innerRadius={30}
                outerRadius={BASE_RADIUS + index * SIZE_INCREMENT}
                dataKey="count"
                cornerRadius={4}
                startAngle={
                  (sortedChartData.slice(0, index).reduce((sum, d) => sum + d.count, 0) /
                    sortedChartData.reduce((sum, d) => sum + d.count, 0)) *
                  360
                }
                endAngle={
                  (sortedChartData.slice(0, index + 1).reduce((sum, d) => sum + d.count, 0) /
                    sortedChartData.reduce((sum, d) => sum + d.count, 0)) *
                  360
                }>
                <Cell fill={entry.fill} />
                <LabelList
                  dataKey="count"
                  stroke="none"
                  fontSize={12}
                  fontWeight={500}
                  fill="currentColor"
                  formatter={(value: number) => value.toString()}
                />
              </Pie>
            ))}
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
