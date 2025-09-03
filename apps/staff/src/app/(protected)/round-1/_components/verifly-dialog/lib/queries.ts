"use server"

import { protectedActionContext } from "@/lib/orpc/actionable"
import { protectedProcedure } from "@/lib/orpc/procedures"
import { db, teams, advisor, member } from "@workspace/db"
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
          nationalDocId: adviser.nationalDocId,
          teacherDocId: adviser.teacherDocId,
          createdAt: adviser.createdAt,
          updatedAt: adviser.updatedAt,
        },
      }
    } catch (error) {
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
          nationalDocId: m.nationalDocId,
          p7DocId: m.p7DocId,
          facePicId: m.facePicId,
          createdAt: m.createdAt,
          updatedAt: m.updatedAt,
        },
      }
    } catch (error) {
      return { member: null }
    }
  })
  .actionable({
    context: protectedActionContext,
  })
