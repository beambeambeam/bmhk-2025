"use server"

import { protectedActionContext } from "@/lib/orpc/actionable"
import { protectedProcedure } from "@/lib/orpc/procedures"
import { db, round1Verification, user } from "@workspace/db"
import { eq } from "@workspace/db/orm"
import { z } from "zod"

// Input validation schema for the verification form
const verificationInputSchema = z.object({
  teamId: z.string().uuid(),
  adviser: z.array(z.string()),
  member1: z.array(z.string()),
  member2: z.array(z.string()),
  member3: z.array(z.string()),
  notes: z.string().optional(),
  status: z.enum(["DONE", "NOT_DONE"]),
})

export const submitRound1Verification = protectedProcedure
  .input(verificationInputSchema)
  .handler(async ({ input, context }) => {
    try {
      // Check if verification already exists for this team
      const existingVerification = await db
        .select()
        .from(round1Verification)
        .where(eq(round1Verification.teamId, input.teamId))
        .limit(1)

      const verificationData = {
        teamId: input.teamId,
        adviser: input.adviser,
        member1: input.member1,
        member2: input.member2,
        member3: input.member3,
        notes: input.notes || null,
        status: input.status,
        verifiedBy: context.session.user.id,
        verifiedAt: input.status === "DONE" ? new Date() : null,
        updatedAt: new Date(),
      }

      if (existingVerification.length > 0) {
        // Update existing verification
        const [updatedVerification] = await db
          .update(round1Verification)
          .set(verificationData)
          .where(eq(round1Verification.id, existingVerification[0].id))
          .returning()

        return {
          success: true,
          verification: updatedVerification,
          message: "Verification updated successfully",
        }
      } else {
        // Create new verification
        const [newVerification] = await db.insert(round1Verification).values(verificationData).returning()

        return {
          success: true,
          verification: newVerification,
          message: "Verification submitted successfully",
        }
      }
    } catch (error) {
      console.error("Error submitting verification:", error)
      return {
        success: false,
        verification: null,
        message: "Failed to submit verification",
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  })
  .actionable({
    context: protectedActionContext,
  })

// Get existing verification for a team
export const getRound1Verification = protectedProcedure
  .input(
    z.object({
      teamId: z.string().uuid(),
    })
  )
  .handler(async ({ input }) => {
    try {
      const verification = await db
        .select()
        .from(round1Verification)
        .where(eq(round1Verification.teamId, input.teamId))
        .limit(1)

      if (verification.length === 0) {
        return {
          verification: null,
        }
      }

      const verificationData = verification[0]

      let userInfo = null
      if (verificationData.verifiedBy) {
        const userData = await db
          .select({
            id: user.id,
            name: user.name,
            displayUsername: user.displayUsername,
            username: user.username,
          })
          .from(user)
          .where(eq(user.id, verificationData.verifiedBy))
          .limit(1)

        if (userData.length > 0) {
          userInfo = userData[0]
        }
      }

      return {
        verification: {
          ...verificationData,
          userInfo,
        },
      }
    } catch (error) {
      console.error("Error fetching verification:", error)
      return {
        verification: null,
        error: error instanceof Error ? error.message : "Unknown error",
      }
    }
  })
  .actionable({
    context: protectedActionContext,
  })
