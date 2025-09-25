"use server"

import { protectedActionContext } from "@/lib/orpc/actionable"
import { protectedProcedure } from "@/lib/orpc/procedures"
import { db, teams, awardAudit, user } from "@workspace/db"
import { eq } from "@workspace/db/orm"
import { revalidateTag } from "next/cache"
import { z } from "zod"

// Input validation schema for the award change form
const awardChangeInputSchema = z.object({
  teamId: z.string().uuid(),
  newAward: z.string().min(1, "Award cannot be empty"),
  reason: z.string().optional(),
})

export const submitAwardChange = protectedProcedure
  .input(awardChangeInputSchema)
  .handler(async ({ input, context }) => {
    try {
      const currentTeam = await db
        .select({ award: teams.award })
        .from(teams)
        .where(eq(teams.id, input.teamId))
        .limit(1)

      if (currentTeam.length === 0) {
        return {
          success: false,
          message: "Team not found",
        }
      }

      const oldAward = currentTeam[0].award
      const newAward = input.newAward

      if (oldAward === newAward) {
        return {
          success: false,
          message: "Award value hasn't changed",
        }
      }

      const result = await db.transaction(async (tx) => {
        const [updatedTeam] = await tx
          .update(teams)
          .set({
            award: newAward,
            updatedAt: new Date(),
          })
          .where(eq(teams.id, input.teamId))
          .returning()

        const [auditRecord] = await tx
          .insert(awardAudit)
          .values({
            teamId: input.teamId,
            oldAward,
            newAward,
            changedBy: context.session.user.id,
            reason: input.reason || null,
          })
          .returning()

        return { updatedTeam, auditRecord }
      })

      revalidateTag("team-awards")

      return {
        success: true,
        message: "Award updated successfully",
        data: result,
      }
    } catch (error) {
      console.error("Error updating award:", error)
      return {
        success: false,
        message: "Failed to update award",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  })
  .actionable({
    context: protectedActionContext,
  })

export const getAwardAuditHistory = protectedProcedure
  .input(
    z.object({
      teamId: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    try {
      const auditHistory = await db
        .select({
          id: awardAudit.id,
          oldAward: awardAudit.oldAward,
          newAward: awardAudit.newAward,
          changedAt: awardAudit.changedAt,
          reason: awardAudit.reason,
          changedBy: awardAudit.changedBy,
          user: {
            id: user.id,
            name: user.name,
            displayUsername: user.displayUsername,
            username: user.username,
          },
        })
        .from(awardAudit)
        .leftJoin(user, eq(user.id, awardAudit.changedBy))
        .where(eq(awardAudit.teamId, input.teamId))
        .orderBy(awardAudit.changedAt)

      return {
        auditHistory,
      }
    } catch (error) {
      console.error("Error fetching award audit history:", error)
      return {
        auditHistory: [],
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  })
  .actionable({
    context: protectedActionContext,
  })
