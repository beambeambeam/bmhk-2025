"use server"

import { protectedActionContext } from "@/lib/orpc/actionable"
import { protectedProcedure } from "@/lib/orpc/procedures"
import { db, teams, registerStatus } from "@workspace/db"
import { eq } from "@workspace/db/orm"
import z from "zod"

export const getTeam = protectedProcedure
  .input(
    z.object({
      id: z.string().min(1),
    })
  )
  .handler(async ({ input }) => {
    try {
      const teamData = await db.select().from(teams).where(eq(teams.id, input.id)).limit(1)

      if (teamData.length === 0) {
        throw new Error("Team not found")
      }

      const team = teamData[0]

      return {
        team: {
          id: team.id,
          name: team.name,
          school: team.school,
          memberCount: team.memberCount,
          quote: team.quote,
          award: team.award,
          index: team.index,
          createdAt: team.createdAt,
          updatedAt: team.updatedAt,
        },
      }
    } catch (error) {
      return {
        team: null,
      }
    }
  })
  .actionable({
    context: protectedActionContext,
  })
