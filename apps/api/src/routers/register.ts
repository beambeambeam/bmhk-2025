import { protectedProcedure } from "@/lib/orpc"
import { db } from "@workspace/db"
import { teams, file } from "@workspace/db/schema"
import { eq } from "drizzle-orm"
import z from "zod"

export const registerRouter = {
  team: protectedProcedure
    .input(
      z.object({
        team_image: z.file(),
        team_name: z.string().min(1).max(20),
        school_name: z.string().min(1),
        quote: z.string().max(50),
        number_of_member: z.number().min(1).max(5),
        advisor: z.string().min(1),
        award: z.string().min(1),
      })
    )
    .handler(async ({ input, context }) => {
      if (!context.session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const userId = context.session.user.id

      const existingTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

      if (existingTeam.length > 0) {
        throw new Error("User already has a registered team")
      }

      // Handle file upload - for now, we'll create a placeholder file record
      // In a real implementation, you'd upload the file to a storage service
      const fileRecord = await db
        .insert(file)
        .values({
          uploadBy: userId,
          resourceType: "TEAM_IMAGE",
          name: input.team_image.name,
          size: input.team_image.size,
          type: input.team_image.type,
          url: "", // This would be the actual file URL after upload
        })
        .returning()

      const fileId = fileRecord[0].id

      // Create the team record
      const teamRecord = await db
        .insert(teams)
        .values({
          userId: userId,
          imageId: fileId,
          name: input.team_name,
          school: input.school_name,
          memberAmount: input.number_of_member,
          advisor: input.advisor,
          quote: input.quote,
          award: input.award,
        })
        .returning()

      return {
        success: true,
        team: teamRecord[0],
        message: "Team registered successfully",
      }
    }),
}
