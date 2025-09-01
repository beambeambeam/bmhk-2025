"use server"

import { auth } from "@workspace/auth"
import { db, teams, registerStatus, sql } from "@workspace/db"
import { headers } from "next/headers"

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

export async function teamsData(): Promise<[Error | null, TeamsResponse | null]> {
  try {
    const headersList = await headers()

    const session = await auth.api.getSession({
      headers: headersList,
    })

    if (!session?.user) {
      return [new Error("UNAUTHORIZED"), null]
    }

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

    const result: TeamsResponse = {
      data,
      summary: {
        totalRegistered,
        totalSubmitted,
        submissionRate,
      },
    }

    return [null, result]
  } catch (error) {
    console.error("Error in teamsData server action:", error)
    return [error as Error, null]
  }
}
