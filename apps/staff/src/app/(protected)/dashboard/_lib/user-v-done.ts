"use server"

import { os } from "@orpc/server"
import { z } from "zod"

export interface ChartDataPoint {
  date: string
  users: number
  completed: number
}

export interface ChartSummary {
  totalUsers: number
  totalCompleted: number
  growthRate: string
}

export interface UserVdoneResponse {
  data: ChartDataPoint[]
  summary: ChartSummary
}

export const userVdone = os
  .input(z.object({}))
  .handler(async (): Promise<UserVdoneResponse> => {
    const data: ChartDataPoint[] = await Promise.resolve([
      { date: "2024-01", users: 45, completed: 120 },
      { date: "2024-02", users: 52, completed: 145 },
      { date: "2024-03", users: 48, completed: 138 },
      { date: "2024-04", users: 61, completed: 167 },
      { date: "2024-05", users: 58, completed: 189 },
      { date: "2024-06", users: 67, completed: 203 },
      { date: "2024-07", users: 73, completed: 218 },
      { date: "2024-08", users: 69, completed: 195 },
      { date: "2024-09", users: 81, completed: 234 },
      { date: "2024-10", users: 85, completed: 251 },
      { date: "2024-11", users: 92, completed: 267 },
      { date: "2024-12", users: 98, completed: 289 },
    ])

    return {
      data,
      summary: {
        totalUsers: data[data.length - 1].users,
        totalCompleted: data[data.length - 1].completed,
        growthRate: (((data[data.length - 1].users - data[0].users) / data[0].users) * 100).toFixed(1),
      },
    }
  })
  .actionable()
