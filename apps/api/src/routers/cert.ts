import { protectedProcedure } from "@/lib/orpc"
import { db } from "@workspace/db"
import { teams, member } from "@workspace/db/schema"
import { eq, and } from "drizzle-orm"
import { PDFDocument, StandardFonts, rgb } from "pdf-lib"
import z from "zod"

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
        const availableIndices = allMembers.map((m) => m.index).sort()
        throw new Error(
          `No member${memberIndex} found for team. Available member indices: [${availableIndices.join(", ")}]. Team has memberCount: ${team.memberCount}.`
        )
      }

      const memberInfo = memberData[0]

      const pdfDoc = await PDFDocument.create()
      const page = pdfDoc.addPage([600, 600])

      const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold)
      const regularFont = await pdfDoc.embedFont(StandardFonts.Helvetica)

      const titleText = "BMHK2025"
      const titleFontSize = 48
      const titleWidth = font.widthOfTextAtSize(titleText, titleFontSize)
      const titleX = (600 - titleWidth) / 2
      const titleY = 500

      page.drawText(titleText, {
        x: titleX,
        y: titleY,
        size: titleFontSize,
        font,
        color: rgb(0, 0, 0),
      })

      let memberName: string
      const nameFont = regularFont

      try {
        memberName = `${memberInfo.thaiFirstname} ${memberInfo.thaiLastname}`
        regularFont.widthOfTextAtSize(memberName, 24)
      } catch {
        memberName = `${memberInfo.firstName} ${memberInfo.lastname}`
      }

      const nameFontSize = 24
      const nameWidth = nameFont.widthOfTextAtSize(memberName, nameFontSize)
      const nameX = (600 - nameWidth) / 2
      const nameY = 400

      page.drawText(memberName, {
        x: nameX,
        y: nameY,
        size: nameFontSize,
        font: nameFont,
        color: rgb(0, 0, 0),
      })

      let teamText: string
      try {
        teamText = `ทีม: ${team.name}`
        regularFont.widthOfTextAtSize(teamText, 18)
      } catch {
        teamText = `Team: ${team.name}`
      }

      const teamFontSize = 18
      const teamWidth = regularFont.widthOfTextAtSize(teamText, teamFontSize)
      const teamX = (600 - teamWidth) / 2
      const teamY = 350

      page.drawText(teamText, {
        x: teamX,
        y: teamY,
        size: teamFontSize,
        font: regularFont,
        color: rgb(0, 0, 0),
      })

      let schoolText: string
      try {
        schoolText = `โรงเรียน: ${team.school}`
        regularFont.widthOfTextAtSize(schoolText, 16)
      } catch {
        schoolText = `School: ${team.school}`
      }

      const schoolFontSize = 16
      const schoolWidth = regularFont.widthOfTextAtSize(schoolText, schoolFontSize)
      const schoolX = (600 - schoolWidth) / 2
      const schoolY = 320

      page.drawText(schoolText, {
        x: schoolX,
        y: schoolY,
        size: schoolFontSize,
        font: regularFont,
        color: rgb(0, 0, 0),
      })

      const bytes = await pdfDoc.save()
      const base64 = Buffer.from(bytes).toString("base64")

      return {
        success: true,
        message: `Certificate generated for member${memberIndex}`,
        data: base64,
      }
    }),
}
