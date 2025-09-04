"use server"

import { protectedActionContext } from "@/lib/orpc/actionable"
import { protectedProcedure } from "@/lib/orpc/procedures"
import { getPresignedUrlForKey } from "@/lib/s3"
import { db, teams, advisor, member, file } from "@workspace/db"
import { and, eq } from "@workspace/db/orm"
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

      // Attach team image if available with presigned URL
      const teamImage = team.imageId
        ? await db.select().from(file).where(eq(file.id, team.imageId)).limit(1)
        : []

      const teamWithImage = {
        id: team.id,
        name: team.name,
        school: team.school,
        memberCount: team.memberCount,
        quote: team.quote,
        award: team.award,
        index: team.index,
        createdAt: team.createdAt,
        updatedAt: team.updatedAt,
        image:
          teamImage.length > 0
            ? {
                id: teamImage[0].id,
                name: teamImage[0].name,
                size: teamImage[0].size,
                type: teamImage[0].type,
                url: await getPresignedUrlForKey(teamImage[0].url),
              }
            : null,
      }

      return {
        team: teamWithImage,
      }
    } catch {
      return { team: null }
    }
  })
  .actionable({
    context: protectedActionContext,
  })

export const getAdviser = protectedProcedure
  .input(
    z.object({
      id: z.string().min(1),
    })
  )
  .handler(async ({ input }) => {
    try {
      const adviserData = await db.select().from(advisor).where(eq(advisor.teamId, input.id)).limit(1)

      if (adviserData.length === 0) {
        throw new Error("Adviser not found")
      }

      const adviser = adviserData[0]

      // Fetch files and attach presigned URLs
      const nationalDoc = adviser.nationalDocId
        ? await db.select().from(file).where(eq(file.id, adviser.nationalDocId)).limit(1)
        : []
      const teacherDoc = adviser.teacherDocId
        ? await db.select().from(file).where(eq(file.id, adviser.teacherDocId)).limit(1)
        : []

      return {
        adviser: {
          id: adviser.id,
          teamId: adviser.teamId,
          prefix: adviser.prefix,
          thaiFirstname: adviser.thaiFirstname,
          thaiMiddlename: adviser.thaiMiddlename,
          thaiLastname: adviser.thaiLastname,
          firstName: adviser.firstName,
          middleName: adviser.middleName,
          lastname: adviser.lastname,
          foodAllergy: adviser.foodAllergy,
          foodType: adviser.foodType,
          drugAllergy: adviser.drugAllergy,
          chronicDisease: adviser.chronicDisease,
          email: adviser.email,
          phoneNumber: adviser.phoneNumber,
          lineId: adviser.lineId,
          nationalDoc: nationalDoc.length
            ? {
                id: nationalDoc[0].id,
                name: nationalDoc[0].name,
                size: nationalDoc[0].size,
                type: nationalDoc[0].type,
                url: await getPresignedUrlForKey(nationalDoc[0].url),
              }
            : null,
          teacherDoc: teacherDoc.length
            ? {
                id: teacherDoc[0].id,
                name: teacherDoc[0].name,
                size: teacherDoc[0].size,
                type: teacherDoc[0].type,
                url: await getPresignedUrlForKey(teacherDoc[0].url),
              }
            : null,
          createdAt: adviser.createdAt,
          updatedAt: adviser.updatedAt,
        },
      }
    } catch {
      return { adviser: null }
    }
  })
  .actionable({
    context: protectedActionContext,
  })

export const getMember = protectedProcedure
  .input(
    z.object({
      id: z.string().min(1),
      index: z.number().min(1).max(3),
    })
  )
  .handler(async ({ input }) => {
    try {
      const memberData = await db
        .select()
        .from(member)
        .where(and(eq(member.teamId, input.id), eq(member.index, input.index)))
        .limit(1)

      if (memberData.length === 0) {
        throw new Error("Member not found")
      }

      const m = memberData[0]

      const nationalDoc = m.nationalDocId
        ? await db.select().from(file).where(eq(file.id, m.nationalDocId)).limit(1)
        : []
      const p7Doc = m.p7DocId ? await db.select().from(file).where(eq(file.id, m.p7DocId)).limit(1) : []
      const facePic = m.facePicId ? await db.select().from(file).where(eq(file.id, m.facePicId)).limit(1) : []

      return {
        member: {
          id: m.id,
          index: m.index,
          teamId: m.teamId,
          prefix: m.prefix,
          thaiFirstname: m.thaiFirstname,
          thaiMiddlename: m.thaiMiddlename,
          thaiLastname: m.thaiLastname,
          firstName: m.firstName,
          middleName: m.middleName,
          lastname: m.lastname,
          foodAllergy: m.foodAllergy,
          foodType: m.foodType,
          drugAllergy: m.drugAllergy,
          email: m.email,
          phoneNumber: m.phoneNumber,
          lineId: m.lineId,
          parent: m.parent,
          chronicDisease: m.chronicDisease,
          parentPhoneNumber: m.parentPhoneNumber,
          nationalDoc: nationalDoc.length
            ? {
                id: nationalDoc[0].id,
                name: nationalDoc[0].name,
                size: nationalDoc[0].size,
                type: nationalDoc[0].type,
                url: await getPresignedUrlForKey(nationalDoc[0].url),
              }
            : null,
          p7Doc: p7Doc.length
            ? {
                id: p7Doc[0].id,
                name: p7Doc[0].name,
                size: p7Doc[0].size,
                type: p7Doc[0].type,
                url: await getPresignedUrlForKey(p7Doc[0].url),
              }
            : null,
          facePic: facePic.length
            ? {
                id: facePic[0].id,
                name: facePic[0].name,
                size: facePic[0].size,
                type: facePic[0].type,
                url: await getPresignedUrlForKey(facePic[0].url),
              }
            : null,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
        },
      }
    } catch {
      return { member: null }
    }
  })
  .actionable({
    context: protectedActionContext,
  })
