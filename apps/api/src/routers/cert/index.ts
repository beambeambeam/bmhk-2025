import { protectedProcedure } from "@/lib/orpc"
import { db } from "@workspace/db"
import { teams, member } from "@workspace/db/schema"
import { eq, and } from "drizzle-orm"
import z from "zod"

import { generateCertificatePdf } from "./gen.js"

export const certRouter = {
  generate: protectedProcedure
    .input(
      z
        .object({
          memberIndex: z.number().int().min(1).max(3).optional(),
          member: z.enum(["member1", "member2", "member3"]).optional(),
        })
        .refine((v) => v.memberIndex !== undefined || v.member !== undefined, {
          message: "Either memberIndex or member is required",
          path: ["memberIndex"],
        })
    )
    .output(
      z.object({
        success: z.boolean(),
        message: z.string(),
        data: z.string(),
      })
    )
    .handler(async ({ input, context }) => {
      if (!context.session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const userId = context.session.user.id

      const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)
      if (userTeam.length === 0) {
        throw new Error("No team found for user")
      }
      const team = userTeam[0]

      const memberIndex: number =
        input.memberIndex !== undefined
          ? input.memberIndex
          : input.member
            ? Number(input.member.replace("member", ""))
            : NaN

      if (!Number.isInteger(memberIndex) || memberIndex < 1 || memberIndex > 3) {
        throw new Error("Invalid member index")
      }

      const allMembers = await db.select().from(member).where(eq(member.teamId, team.id))

      if (allMembers.length === 0) {
        throw new Error(
          `No members found for team. Team has memberCount: ${team.memberCount}, but no members are registered in the database.`
        )
      }

      const memberData = await db
        .select()
        .from(member)
        .where(and(eq(member.teamId, team.id), eq(member.index, memberIndex)))
        .limit(1)

      if (memberData.length === 0) {
        const availableIndices = allMembers.map((m: (typeof allMembers)[number]) => m.index).sort()
        throw new Error(
          `No member${memberIndex} found for team. Available member indices: [${availableIndices.join(", ")}]. Team has memberCount: ${team.memberCount}.`
        )
      }

      const memberInfo = memberData[0]

      const base64 = await generateCertificatePdf(memberInfo, team)

      return {
        success: true,
        message: `Certificate generated for member${memberIndex}`,
        data: base64,
      }
    }),
}
