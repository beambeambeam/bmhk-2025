import { protectedProcedure } from "@/lib/orpc"
import { uploadFileToS3 } from "@/lib/upload"
import { db } from "@workspace/db"
import { teams, file, advisor, member, registerStatus } from "@workspace/db/schema"
import { eq, and } from "drizzle-orm"
import z from "zod"

// Helper function to get or create register status for a team
async function getOrCreateRegisterStatus(teamId: string) {
  const existingStatus = await db
    .select()
    .from(registerStatus)
    .where(eq(registerStatus.teamId, teamId))
    .limit(1)

  if (existingStatus.length > 0) {
    return existingStatus[0]
  }

  // Create new register status if it doesn't exist
  const newStatus = await db
    .insert(registerStatus)
    .values({
      teamId,
      team: "NOT_DONE",
      adviser: "NOT_DONE",
      member1: "NOT_DONE",
      member2: "NOT_DONE",
      member3: "NOT_HAVE",
    })
    .returning()

  return newStatus[0]
}

// Helper function to update register status
async function updateRegisterStatus(teamId: string, updates: Partial<typeof registerStatus.$inferInsert>) {
  return await db.update(registerStatus).set(updates).where(eq(registerStatus.teamId, teamId)).returning()
}

export const registerRouter = {
  team: {
    get: protectedProcedure.handler(async ({ context }) => {
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

    set: protectedProcedure
      .input(
        z.object({
          team_image: z.array(z.any()).min(1).max(1),
          team_name: z.string().min(1).max(20),
          school_name: z.string().min(1),
          quote: z.string().max(50),
          member_count: z.number().min(1).max(5),
        })
      )
      .handler(async ({ input, context }) => {
        if (!context.session?.user?.id) {
          throw new Error("User not authenticated")
        }

        const userId = context.session.user.id

        const existingTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

        // Check if registration is already submitted (for existing teams)
        if (existingTeam.length > 0) {
          const currentStatus = await getOrCreateRegisterStatus(existingTeam[0].id)
          if (currentStatus.submitRegister) {
            throw new Error("Cannot modify registration after submission")
          }
        }

        const teamImageFile = input.team_image.find((file): file is File => file instanceof File)

        let fileId: string | undefined

        if (teamImageFile) {
          const key = `uploads/${userId}/team/${Date.now()}_${encodeURIComponent(teamImageFile.name)}`
          const url = await uploadFileToS3({ file: teamImageFile, key })
          const fileRecord = await db
            .insert(file)
            .values({
              uploadBy: userId,
              resourceType: "TEAM_IMAGE",
              name: teamImageFile.name,
              size: teamImageFile.size,
              type: teamImageFile.type,
              url,
            })
            .returning()

          fileId = fileRecord[0].id
        }

        let teamResult

        if (existingTeam.length > 0) {
          const updatedTeam = await db
            .update(teams)
            .set({
              name: input.team_name,
              school: input.school_name,
              memberCount: input.member_count,
              quote: input.quote,
              award: "", // Keep award as empty string for now
              ...(fileId && { imageId: fileId }),
            })
            .where(eq(teams.userId, userId))
            .returning()

          teamResult = updatedTeam[0]
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
              memberCount: input.member_count,
              quote: input.quote,
              award: "", // Default empty award, will be set later
            })
            .returning()

          teamResult = teamRecord[0]
        }

        // Update register status to mark team as DONE
        await getOrCreateRegisterStatus(teamResult.id)
        await updateRegisterStatus(teamResult.id, { team: "DONE" })

        return {
          success: true,
          team: teamResult,
          message: existingTeam.length > 0 ? "Team updated successfully" : "Team registered successfully",
        }
      }),
  },

  adviser: {
    get: protectedProcedure.handler(async ({ context }) => {
      if (!context.session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const userId = context.session.user.id

      // First get the user's team
      const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

      if (userTeam.length === 0) {
        return {
          success: true,
          adviser: null,
          message: "No team found for user",
        }
      }

      const team = userTeam[0]

      // Get the adviser for this team
      const existingAdviser = await db.select().from(advisor).where(eq(advisor.teamId, team.id)).limit(1)

      if (existingAdviser.length === 0) {
        return {
          success: true,
          adviser: null,
          message: "No adviser found for team",
        }
      }

      const adviser = existingAdviser[0]

      // Get the documents
      const nationalDoc = adviser.nationalDocId
        ? await db.select().from(file).where(eq(file.id, adviser.nationalDocId)).limit(1)
        : []

      const teacherDoc = adviser.teacherDocId
        ? await db.select().from(file).where(eq(file.id, adviser.teacherDocId)).limit(1)
        : []

      const adviserWithDocs = {
        ...adviser,
        nationalDoc:
          nationalDoc.length > 0
            ? {
                id: nationalDoc[0].id,
                upload_by: nationalDoc[0].uploadBy,
                resource_type: nationalDoc[0].resourceType,
                upload_at: nationalDoc[0].uploadAt,
                name: nationalDoc[0].name,
                size: nationalDoc[0].size,
                type: nationalDoc[0].type,
                url: nationalDoc[0].url,
              }
            : null,
        teacherDoc:
          teacherDoc.length > 0
            ? {
                id: teacherDoc[0].id,
                upload_by: teacherDoc[0].uploadBy,
                resource_type: teacherDoc[0].resourceType,
                upload_at: teacherDoc[0].uploadAt,
                name: teacherDoc[0].name,
                size: teacherDoc[0].size,
                type: teacherDoc[0].type,
                url: teacherDoc[0].url,
              }
            : null,
      }

      return {
        success: true,
        adviser: adviserWithDocs,
        message: "Adviser found",
      }
    }),

    set: protectedProcedure
      .input(
        z.object({
          prefix: z.enum(["MR", "MS", "MRS"]),
          thai_firstname: z.string().min(1),
          thai_middlename: z.string().optional(),
          thai_lastname: z.string().min(1),
          english_firstname: z.string().min(1),
          english_middlename: z.string().optional(),
          english_lastname: z.string().min(1),
          food_allergy: z.string().min(1),
          food_type: z.string().min(1),
          drug_allergy: z.string().min(1),
          email: z.string().email().min(1),
          phone_number: z.string().min(1),
          line_id: z.string().optional(),
          national_doc: z.array(z.any()).min(1).max(1),
          teacher_doc: z.array(z.any()).min(1).max(1),
        })
      )
      .handler(async ({ input, context }) => {
        if (!context.session?.user?.id) {
          throw new Error("User not authenticated")
        }

        const userId = context.session.user.id

        // First get the user's team
        const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

        if (userTeam.length === 0) {
          throw new Error("User must register a team first")
        }

        const team = userTeam[0]

        // Check if registration is already submitted
        const currentStatus = await getOrCreateRegisterStatus(team.id)
        if (currentStatus.submitRegister) {
          throw new Error("Cannot modify registration after submission")
        }

        // Process the uploaded files
        const nationalDocFile = input.national_doc.find((file): file is File => file instanceof File)
        const teacherDocFile = input.teacher_doc.find((file): file is File => file instanceof File)

        let nationalDocId: string | undefined
        let teacherDocId: string | undefined

        if (nationalDocFile) {
          const key = `uploads/${userId}/adviser/national/${Date.now()}_${encodeURIComponent(nationalDocFile.name)}`
          const url = await uploadFileToS3({ file: nationalDocFile, key })
          const nationalDocRecord = await db
            .insert(file)
            .values({
              uploadBy: userId,
              resourceType: "ADVISER_NATIONAL_DOC",
              name: nationalDocFile.name,
              size: nationalDocFile.size,
              type: nationalDocFile.type,
              url,
            })
            .returning()

          nationalDocId = nationalDocRecord[0].id
        }

        if (teacherDocFile) {
          const key = `uploads/${userId}/adviser/teacher/${Date.now()}_${encodeURIComponent(teacherDocFile.name)}`
          const url = await uploadFileToS3({ file: teacherDocFile, key })
          const teacherDocRecord = await db
            .insert(file)
            .values({
              uploadBy: userId,
              resourceType: "ADVISER_TEACHER_DOC",
              name: teacherDocFile.name,
              size: teacherDocFile.size,
              type: teacherDocFile.type,
              url,
            })
            .returning()

          teacherDocId = teacherDocRecord[0].id
        }

        // Check if adviser already exists
        const existingAdviser = await db.select().from(advisor).where(eq(advisor.teamId, team.id)).limit(1)

        let adviserResult

        if (existingAdviser.length > 0) {
          // Update existing adviser
          const updatedAdviser = await db
            .update(advisor)
            .set({
              prefix: input.prefix,
              thaiFirstname: input.thai_firstname,
              thaiMiddlename: input.thai_middlename,
              thaiLastname: input.thai_lastname,
              firstName: input.english_firstname,
              middleName: input.english_middlename,
              lastname: input.english_lastname,
              foodAllergy: input.food_allergy,
              foodType: input.food_type,
              drugAllergy: input.drug_allergy,
              email: input.email,
              phoneNumber: input.phone_number,
              lineId: input.line_id,
              ...(nationalDocId && { nationalDocId }),
              ...(teacherDocId && { teacherDocId }),
            })
            .where(eq(advisor.teamId, team.id))
            .returning()

          adviserResult = updatedAdviser[0]
        } else {
          // Create new adviser
          if (!nationalDocId || !teacherDocId) {
            throw new Error("Both national document and teacher document are required")
          }

          const adviserRecord = await db
            .insert(advisor)
            .values({
              teamId: team.id,
              prefix: input.prefix,
              thaiFirstname: input.thai_firstname,
              thaiMiddlename: input.thai_middlename,
              thaiLastname: input.thai_lastname,
              firstName: input.english_firstname,
              middleName: input.english_middlename,
              lastname: input.english_lastname,
              foodAllergy: input.food_allergy,
              foodType: input.food_type,
              drugAllergy: input.drug_allergy,
              email: input.email,
              phoneNumber: input.phone_number,
              lineId: input.line_id,
              nationalDocId,
              teacherDocId,
            })
            .returning()

          adviserResult = adviserRecord[0]
        }

        // Update register status to mark adviser as DONE
        await getOrCreateRegisterStatus(team.id)
        await updateRegisterStatus(team.id, { adviser: "DONE" })

        return {
          success: true,
          adviser: adviserResult,
          message:
            existingAdviser.length > 0 ? "Adviser updated successfully" : "Adviser registered successfully",
        }
      }),
  },

  member: {
    get: protectedProcedure
      .input(z.object({ memberIndex: z.number().min(1).max(3) }))
      .handler(async ({ input, context }) => {
        if (!context.session?.user?.id) {
          throw new Error("User not authenticated")
        }

        const userId = context.session.user.id

        // First get the user's team
        const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

        if (userTeam.length === 0) {
          return {
            success: true,
            member: null,
            message: "No team found for user",
          }
        }

        const team = userTeam[0]

        // Get the member for this team and index
        const existingMember = await db
          .select()
          .from(member)
          .where(and(eq(member.teamId, team.id), eq(member.index, input.memberIndex)))
          .limit(1)

        if (existingMember.length === 0) {
          return {
            success: true,
            member: null,
            message: "No member found for team",
          }
        }

        const memberData = existingMember[0]

        // Get the documents
        const nationalDoc = memberData.nationalDocId
          ? await db.select().from(file).where(eq(file.id, memberData.nationalDocId)).limit(1)
          : []

        const p7Doc = memberData.p7DocId
          ? await db.select().from(file).where(eq(file.id, memberData.p7DocId)).limit(1)
          : []

        const facePic = memberData.facePicId
          ? await db.select().from(file).where(eq(file.id, memberData.facePicId)).limit(1)
          : []

        const memberWithDocs = {
          ...memberData,
          nationalDoc:
            nationalDoc.length > 0
              ? {
                  id: nationalDoc[0].id,
                  upload_by: nationalDoc[0].uploadBy,
                  resource_type: nationalDoc[0].resourceType,
                  upload_at: nationalDoc[0].uploadAt,
                  name: nationalDoc[0].name,
                  size: nationalDoc[0].size,
                  type: nationalDoc[0].type,
                  url: nationalDoc[0].url,
                }
              : null,
          p7Doc:
            p7Doc.length > 0
              ? {
                  id: p7Doc[0].id,
                  upload_by: p7Doc[0].uploadBy,
                  resource_type: p7Doc[0].resourceType,
                  upload_at: p7Doc[0].uploadAt,
                  name: p7Doc[0].name,
                  size: p7Doc[0].size,
                  type: p7Doc[0].type,
                  url: p7Doc[0].url,
                }
              : null,
          facePic:
            facePic.length > 0
              ? {
                  id: facePic[0].id,
                  upload_by: facePic[0].uploadBy,
                  resource_type: facePic[0].resourceType,
                  upload_at: facePic[0].uploadAt,
                  name: facePic[0].name,
                  size: facePic[0].size,
                  type: facePic[0].type,
                  url: facePic[0].url,
                }
              : null,
        }

        return {
          success: true,
          member: memberWithDocs,
          message: "Member found",
        }
      }),

    set: protectedProcedure
      .input(
        z.object({
          memberIndex: z.number().min(1).max(3),
          prefix: z.enum(["MR", "MS", "MRS"]),
          thai_firstname: z.string().min(1),
          thai_middlename: z.string().optional(),
          thai_lastname: z.string().min(1),
          english_firstname: z.string().min(1),
          english_middlename: z.string().optional(),
          english_lastname: z.string().min(1),
          food_allergy: z.string().min(1),
          food_type: z.string().min(1),
          drug_allergy: z.string().min(1),
          email: z.string().email().min(1),
          phone_number: z.string().min(1),
          line_id: z.string().optional(),
          parent: z.string().min(1),
          parent_phone: z.string().min(1),
          national_doc: z.array(z.any()).min(1).max(1),
          face_picture: z.array(z.any()).min(1).max(1),
          p7_doc: z.array(z.any()).min(1).max(1),
        })
      )
      .handler(async ({ input, context }) => {
        if (!context.session?.user?.id) {
          throw new Error("User not authenticated")
        }

        const userId = context.session.user.id

        // First get the user's team
        const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

        if (userTeam.length === 0) {
          throw new Error("User must register a team first")
        }

        const team = userTeam[0]

        // Check if registration is already submitted
        const currentStatus = await getOrCreateRegisterStatus(team.id)
        if (currentStatus.submitRegister) {
          throw new Error("Cannot modify registration after submission")
        }

        // Process the uploaded files
        const nationalDocFile = input.national_doc.find((file): file is File => file instanceof File)
        const facePictureFile = input.face_picture.find((file): file is File => file instanceof File)
        const p7DocFile = input.p7_doc.find((file): file is File => file instanceof File)

        let nationalDocId: string | undefined
        let facePicId: string | undefined
        let p7DocId: string | undefined

        if (nationalDocFile) {
          const key = `uploads/${userId}/member/${input.memberIndex}/national/${Date.now()}_${encodeURIComponent(nationalDocFile.name)}`
          const url = await uploadFileToS3({ file: nationalDocFile, key })
          const nationalDocRecord = await db
            .insert(file)
            .values({
              uploadBy: userId,
              resourceType: "MEMBER_NATIONAL_DOC",
              name: nationalDocFile.name,
              size: nationalDocFile.size,
              type: nationalDocFile.type,
              url,
            })
            .returning()

          nationalDocId = nationalDocRecord[0].id
        }

        if (facePictureFile) {
          const key = `uploads/${userId}/member/${input.memberIndex}/face/${Date.now()}_${encodeURIComponent(facePictureFile.name)}`
          const url = await uploadFileToS3({ file: facePictureFile, key })
          const facePicRecord = await db
            .insert(file)
            .values({
              uploadBy: userId,
              resourceType: "MEMBER_FACE_PICTURE",
              name: facePictureFile.name,
              size: facePictureFile.size,
              type: facePictureFile.type,
              url,
            })
            .returning()

          facePicId = facePicRecord[0].id
        }

        if (p7DocFile) {
          const key = `uploads/${userId}/member/${input.memberIndex}/p7/${Date.now()}_${encodeURIComponent(p7DocFile.name)}`
          const url = await uploadFileToS3({ file: p7DocFile, key })
          const p7DocRecord = await db
            .insert(file)
            .values({
              uploadBy: userId,
              resourceType: "MEMBER_P7_DOC",
              name: p7DocFile.name,
              size: p7DocFile.size,
              type: p7DocFile.type,
              url,
            })
            .returning()

          p7DocId = p7DocRecord[0].id
        }

        // Check if member already exists
        const existingMember = await db
          .select()
          .from(member)
          .where(and(eq(member.teamId, team.id), eq(member.index, input.memberIndex)))
          .limit(1)

        let memberResult

        if (existingMember.length > 0) {
          // Update existing member
          const updatedMember = await db
            .update(member)
            .set({
              prefix: input.prefix,
              thaiFirstname: input.thai_firstname,
              thaiMiddlename: input.thai_middlename,
              thaiLastname: input.thai_lastname,
              firstName: input.english_firstname,
              middleName: input.english_middlename,
              lastname: input.english_lastname,
              foodAllergy: input.food_allergy,
              foodType: input.food_type,
              drugAllergy: input.drug_allergy,
              email: input.email,
              phoneNumber: input.phone_number,
              lineId: input.line_id,
              parent: input.parent,
              parentPhoneNumber: input.parent_phone,
              ...(nationalDocId && { nationalDocId }),
              ...(facePicId && { facePicId }),
              ...(p7DocId && { p7DocId }),
            })
            .where(and(eq(member.teamId, team.id), eq(member.index, input.memberIndex)))
            .returning()

          memberResult = updatedMember[0]
        } else {
          // Create new member
          if (!nationalDocId || !facePicId || !p7DocId) {
            throw new Error("All documents are required")
          }

          const memberRecord = await db
            .insert(member)
            .values({
              index: input.memberIndex,
              teamId: team.id,
              prefix: input.prefix,
              thaiFirstname: input.thai_firstname,
              thaiMiddlename: input.thai_middlename,
              thaiLastname: input.thai_lastname,
              firstName: input.english_firstname,
              middleName: input.english_middlename,
              lastname: input.english_lastname,
              foodAllergy: input.food_allergy,
              foodType: input.food_type,
              drugAllergy: input.drug_allergy,
              email: input.email,
              phoneNumber: input.phone_number,
              lineId: input.line_id,
              parent: input.parent,
              parentPhoneNumber: input.parent_phone,
              nationalDocId,
              facePicId,
              p7DocId,
            })
            .returning()

          memberResult = memberRecord[0]
        }

        // Update register status to mark the specific member as DONE
        await getOrCreateRegisterStatus(team.id)
        const memberField = `member${input.memberIndex}` as "member1" | "member2" | "member3"
        await updateRegisterStatus(team.id, { [memberField]: "DONE" })

        return {
          success: true,
          member: memberResult,
          message:
            existingMember.length > 0 ? "Member updated successfully" : "Member registered successfully",
        }
      }),
  },

  status: {
    get: protectedProcedure.handler(async ({ context }) => {
      if (!context.session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const userId = context.session.user.id

      // Get the user's team
      const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

      if (userTeam.length === 0) {
        return {
          success: true,
          registerStatus: null,
          message: "No team found for user",
        }
      }

      const team = userTeam[0]
      const status = await getOrCreateRegisterStatus(team.id)

      return {
        success: true,
        registerStatus: status,
        message: "Register status retrieved successfully",
      }
    }),

    update: protectedProcedure
      .input(
        z.object({
          team: z.enum(["NOT_DONE", "DONE", "NOT_HAVE"]).optional(),
          adviser: z.enum(["NOT_DONE", "DONE", "NOT_HAVE"]).optional(),
          member1: z.enum(["NOT_DONE", "DONE", "NOT_HAVE"]).optional(),
          member2: z.enum(["NOT_DONE", "DONE", "NOT_HAVE"]).optional(),
          member3: z.enum(["NOT_DONE", "DONE", "NOT_HAVE"]).optional(),
        })
      )
      .handler(async ({ input, context }) => {
        if (!context.session?.user?.id) {
          throw new Error("User not authenticated")
        }

        const userId = context.session.user.id

        // Get the user's team
        const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

        if (userTeam.length === 0) {
          throw new Error("User must register a team first")
        }

        const team = userTeam[0]
        const currentStatus = await getOrCreateRegisterStatus(team.id)

        // Validate member3 status based on team member count
        if (input.member3 !== undefined) {
          if (team.memberCount === 2 && input.member3 !== "NOT_HAVE") {
            throw new Error("Member3 status must be NOT_HAVE for 2-member teams")
          }
          if (team.memberCount === 3 && input.member3 === "NOT_HAVE") {
            throw new Error("Member3 status cannot be NOT_HAVE for 3-member teams")
          }
        }

        // Prevent changing status if already submitted
        if (currentStatus.submitRegister) {
          throw new Error("Cannot modify registration status after submission")
        }

        const updatedStatus = await updateRegisterStatus(team.id, input)

        return {
          success: true,
          registerStatus: updatedStatus[0],
          message: "Register status updated successfully",
        }
      }),

    submit: protectedProcedure.handler(async ({ context }) => {
      if (!context.session?.user?.id) {
        throw new Error("User not authenticated")
      }

      const userId = context.session.user.id

      // Get the user's team
      const userTeam = await db.select().from(teams).where(eq(teams.userId, userId)).limit(1)

      if (userTeam.length === 0) {
        throw new Error("User must register a team first")
      }

      const team = userTeam[0]
      const status = await getOrCreateRegisterStatus(team.id)

      // Check if all required forms are completed
      const requiredFields = ["team", "adviser", "member1", "member2"]
      const hasIncompleteFields = requiredFields.some(
        (field) => status[field as keyof typeof status] !== "DONE"
      )

      if (hasIncompleteFields) {
        throw new Error("All required forms must be completed before submitting")
      }

      if (team.memberCount === 3) {
        if (status.member3 !== "DONE") {
          throw new Error("All team members must be registered before submitting")
        }
      } else if (team.memberCount === 2) {
        if (status.member3 !== "NOT_HAVE") {
          throw new Error("Invalid member3 status for 2-member team")
        }
      }

      if (status.submitRegister) {
        throw new Error("Registration has already been submitted")
      }

      const updatedStatus = await updateRegisterStatus(team.id, {
        submitRegister: new Date(),
      })

      return {
        success: true,
        registerStatus: updatedStatus[0],
        message: "Registration submitted successfully",
      }
    }),
  },
}
