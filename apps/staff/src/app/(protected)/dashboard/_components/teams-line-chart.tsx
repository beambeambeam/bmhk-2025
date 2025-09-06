"use client"

import type { TeamsResponse } from "@/app/(protected)/dashboard/_lib/user-v-done"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

const chartConfig = {
  registered: {
    label: "Registered Teams",
    color: "var(--chart-2)",
  },
  submitted: {
    label: "Submitted Teams",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

interface TeamsLineChartProps {
  initialData: TeamsResponse
}

export function TeamsLineChart({ initialData }: TeamsLineChartProps) {
  const chartData = initialData.data
  const summary = initialData.summary

  const submissionRate = summary?.submissionRate ? parseFloat(summary.submissionRate) : 0
  const isPositive = submissionRate >= 50 // Consider 50%+ as positive
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  const trendColor = isPositive ? "text-green-500" : "text-red-500"
  const trendBgColor = isPositive ? "bg-green-500/10" : "bg-red-500/10"

  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle>
          Teams Registration Dashboard
          {summary && (
            <Badge variant="outline" className={`ml-2 border-none ${trendBgColor} ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span>{summary.submissionRate}%</span>
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {summary && (
            <>
              {summary.totalRegistered} registered teams • {summary.totalSubmitted} submitted teams
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
                top: 12,
                bottom: 12,
              }}>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => {
                  const [, month, day] = value.split("-")
                  return `${month}/${day}`
                }}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="registered"
                type="linear"
                stroke="var(--color-registered)"
                strokeWidth={2}
                dot={{ fill: "var(--color-registered)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                dataKey="submitted"
                type="linear"
                stroke="var(--color-submitted)"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ fill: "var(--color-submitted)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
