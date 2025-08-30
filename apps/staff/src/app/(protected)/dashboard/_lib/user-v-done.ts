"use server"

import { os } from "@orpc/server"
import { db, teams, registerStatus, sql } from "@workspace/db"
import { z } from "zod"

export interface TeamsDataPoint {
  date: string
  registered: number
  submitted: number
}

export interface TeamsSummary {
  totalRegistered: number
  totalSubmitted: number
  submissionRate: string
}

export interface TeamsResponse {
  data: TeamsDataPoint[]
  summary: TeamsSummary
}

export const teamsData = os
  .input(z.object({}))
  .handler(async (): Promise<TeamsResponse> => {
    const teamsWithStatus = await db
      .select({
        id: teams.id,
        name: teams.name,
        school: teams.school,
        createdAt: teams.createdAt,
        submitRegister: registerStatus.submitRegister,
      })
      .from(teams)
      .leftJoin(registerStatus, sql`${teams.id} = ${registerStatus.teamId}`)

    const dailyData = new Map<string, { registered: number; submitted: number }>()

    teamsWithStatus.forEach((team) => {
      const createdDate = new Date(team.createdAt)
      const dayKey = `${createdDate.getFullYear()}-${String(createdDate.getMonth() + 1).padStart(2, "0")}-${String(createdDate.getDate()).padStart(2, "0")}`

      if (!dailyData.has(dayKey)) {
        dailyData.set(dayKey, { registered: 0, submitted: 0 })
      }

      const dayData = dailyData.get(dayKey)
      if (dayData) {
        dayData.registered += 1

        if (team.submitRegister) {
          dayData.submitted += 1
        }
      }
    })

    const data: TeamsDataPoint[] = Array.from(dailyData.entries())
      .map(([date, counts]) => ({
        date,
        registered: counts.registered,
        submitted: counts.submitted,
      }))
      .sort((a, b) => a.date.localeCompare(b.date))

    const totalRegistered = teamsWithStatus.length
    const totalSubmitted = teamsWithStatus.filter((team) => team.submitRegister).length
    const submissionRate = totalRegistered > 0 ? ((totalSubmitted / totalRegistered) * 100).toFixed(1) : "0.0"

    return {
      data,
      summary: {
        totalRegistered,
        totalSubmitted,
        submissionRate,
      },
    }
  })
  .actionable()
