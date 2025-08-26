import { protectedProcedure } from "@/lib/orpc"
import { db } from "@workspace/db"
import { teams, file } from "@workspace/db/schema"
import { eq } from "drizzle-orm"
import z from "zod"

export const registerRouter = {
  getTeam: protectedProcedure.handler(async ({ context }) => {
    if (!context.session?.user?.id) {
      throw new Error("User not authenticated")
    }

    const userId = context.session.user.id

    const existingTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

    if (existingTeam.length === 0) {
      return {
        success: true,
        team: null,
        message: "No team found for user",
      }
    }

    const team = existingTeam[0]

    const teamImage = await db.select().from(file).where(eq(file.id, team.imageId)).limit(1)

    const teamWithImage = {
      ...team,
      image:
        teamImage.length > 0
          ? {
              id: teamImage[0].id,
              upload_by: teamImage[0].uploadBy,
              resource_type: teamImage[0].resourceType,
              upload_at: teamImage[0].uploadAt,
              name: teamImage[0].name,
              size: teamImage[0].size,
              type: teamImage[0].type,
              url: teamImage[0].url,
            }
          : null,
    }

    return {
      success: true,
      team: teamWithImage,
      message: "Team found",
    }
  }),

  setTeam: protectedProcedure
    .input(
      z.object({
        team_image: z.array(z.any()).min(1).max(1),
        team_name: z.string().min(1).max(20),
        school_name: z.string().min(1),
        quote: z.string().max(50),
        number_of_member: z.number().min(1).max(5),
      })
    )
    .handler(async ({ input, context }) => {
      if (!context.session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const userId = context.session.user.id

      const existingTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

      const teamImageFile = input.team_image.find((file): file is File => file instanceof File)

      let fileId: string | undefined

      if (teamImageFile) {
        const fileRecord = await db
          .insert(file)
          .values({
            uploadBy: userId,
            resourceType: "TEAM_IMAGE",
            name: teamImageFile.name,
            size: teamImageFile.size,
            type: teamImageFile.type,
            url: "",
          })
          .returning()

        fileId = fileRecord[0].id
      }

      if (existingTeam.length > 0) {
        const updatedTeam = await db
          .update(teams)
          .set({
            name: input.team_name,
            school: input.school_name,
            memberAmount: input.number_of_member,
            advisor: "",
            quote: input.quote,
            award: "",
            ...(fileId && { imageId: fileId }),
          })
          .where(eq(teams.userId, userId))
          .returning()

        return {
          success: true,
          team: updatedTeam[0],
          message: "Team updated successfully",
        }
      } else {
        if (!fileId) {
          throw new Error("Team image is required")
        }

        const teamRecord = await db
          .insert(teams)
          .values({
            userId: userId,
            imageId: fileId,
            name: input.team_name,
            school: input.school_name,
            memberAmount: input.number_of_member,
            advisor: "", // Auto-added by system
            quote: input.quote,
            award: "", // Auto-added by system
          })
          .returning()

        return {
          success: true,
          team: teamRecord[0],
          message: "Team registered successfully",
        }
      }
    }),
}
