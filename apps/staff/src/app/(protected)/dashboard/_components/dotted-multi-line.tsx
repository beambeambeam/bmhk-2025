"use client"

import type { UserVdoneResponse } from "@/app/(protected)/dashboard/_lib/user-v-done"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, TrendingDown } from "lucide-react"
import { CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

const chartConfig = {
  users: {
    label: "Active Users",
    color: "var(--chart-2)",
  },
  completed: {
    label: "Completed Tasks",
    color: "var(--chart-5)",
  },
} satisfies ChartConfig

interface UserVDoneChartProps {
  initialData: UserVdoneResponse
}

export function UserVDoneChart({ initialData }: UserVDoneChartProps) {
  const chartData = initialData.data
  const summary = initialData.summary

  const growthRate = summary?.growthRate ? parseFloat(summary.growthRate) : 0
  const isPositive = growthRate >= 0
  const TrendIcon = isPositive ? TrendingUp : TrendingDown
  const trendColor = isPositive ? "text-green-500" : "text-red-500"
  const trendBgColor = isPositive ? "bg-green-500/10" : "bg-red-500/10"

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          User Activity Dashboard
          {summary && (
            <Badge variant="outline" className={`ml-2 border-none ${trendBgColor} ${trendColor}`}>
              <TrendIcon className="h-4 w-4" />
              <span>
                {isPositive ? "+" : ""}
                {summary.growthRate}%
              </span>
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {summary && (
            <>
              {summary.totalUsers} active users • {summary.totalCompleted} completed tasks
            </>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                tickFormatter={(value) => value.slice(5)} // Show only month number
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.toLocaleString()}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Line
                dataKey="users"
                type="linear"
                stroke="var(--color-users)"
                strokeWidth={2}
                dot={{ fill: "var(--color-users)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
              <Line
                dataKey="completed"
                type="linear"
                stroke="var(--color-completed)"
                strokeWidth={2}
                strokeDasharray="4 4"
                dot={{ fill: "var(--color-completed)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
