"use server"

import { GetRound1CompTeamsSchema } from "@/app/(protected)/round-1-comp/_components/team-table/validations"
import { shouldColorSchoolRed } from "@/lib/school-utils"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams, round1Verification, member } from "@workspace/db"
import { and, asc, ilike, eq, or } from "@workspace/db/orm"

export async function getAllRound1CompTeamsForExport() {
  return await unstable_cache(
    async () => {
      try {
        const baseWhere = and(eq(round1Verification.status, "DONE"))

        const { data } = await db.transaction(async (tx) => {
          const allTeams = await tx
            .select({
              id: teams.id,
              name: teams.name,
              school: teams.school,
              memberCount: teams.memberCount,
              index: teams.index,
              createdAt: teams.createdAt,
              notes: round1Verification.notes,
              firstMemberEmail: member.email,
            })
            .from(teams)
            .innerJoin(round1Verification, eq(round1Verification.teamId, teams.id))
            .leftJoin(
              member,
              and(
                eq(member.teamId, teams.id),
                eq(member.index, 1) // First member
              )
            )
            .where(baseWhere)
            .orderBy(asc(teams.index))

          // Fetch all members for each team
          const teamsWithMembers = await Promise.all(
            allTeams.map(async (team) => {
              const members = await tx
                .select({
                  index: member.index,
                  prefix: member.prefix,
                  thaiFirstname: member.thaiFirstname,
                  thaiMiddlename: member.thaiMiddlename,
                  thaiLastname: member.thaiLastname,
                  firstName: member.firstName,
                  middleName: member.middleName,
                  lastname: member.lastname,
                  email: member.email,
                  phoneNumber: member.phoneNumber,
                  lineId: member.lineId,
                  parent: member.parent,
                  parentPhoneNumber: member.parentPhoneNumber,
                  foodAllergy: member.foodAllergy,
                  foodType: member.foodType,
                  drugAllergy: member.drugAllergy,
                  chronicDisease: member.chronicDisease,
                })
                .from(member)
                .where(eq(member.teamId, team.id))
                .orderBy(asc(member.index))

              return {
                ...team,
                members,
              }
            })
          )

          const allSchoolNames = teamsWithMembers.map((team) => team.school)

          const teamsWithRedFlag = teamsWithMembers.map((team) => ({
            ...team,
            rowShouldBeRed: shouldColorSchoolRed(team.school, allSchoolNames),
          }))

          return {
            data: teamsWithRedFlag,
          }
        })

        return { data: data }
      } catch {
        return { data: [] }
      }
    },
    ["all-round1-comp-teams-export"],
    {
      revalidate: 1,
      tags: ["round1-comp-teams"],
    }
  )()
}

export async function getRound1CompTeams(input: GetRound1CompTeamsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const orderBy = [asc(teams.index)]

        const baseWhere = and(
          eq(round1Verification.status, "DONE"),
          input.name ? ilike(teams.name, `%${input.name}%`) : undefined,
          (() => {
            const q = input.codeName?.trim()
            if (!q) return undefined
            const digits = q.replace(/\D/g, "")
            if (!digits) return undefined
            return eq(teams.index, parseInt(digits, 10))
          })(),
          input.school ? ilike(teams.school, `%${input.school}%`) : undefined,
          input.memberCount.length > 0
            ? or(...input.memberCount.map((count) => eq(teams.memberCount, parseInt(count))))
            : undefined,
          input.email ? ilike(member.email, `%${input.email}%`) : undefined
        )

        const { data, total } = await db.transaction(async (tx) => {
          const allTeams = await tx
            .select({
              id: teams.id,
              name: teams.name,
              school: teams.school,
              memberCount: teams.memberCount,
              index: teams.index,
              createdAt: teams.createdAt,
              notes: round1Verification.notes,
              firstMemberEmail: member.email,
            })
            .from(teams)
            .innerJoin(round1Verification, eq(round1Verification.teamId, teams.id))
            .leftJoin(
              member,
              and(
                eq(member.teamId, teams.id),
                eq(member.index, 1) // First member
              )
            )
            .where(baseWhere)
            .orderBy(...orderBy)

          // Fetch all members for each team
          const teamsWithMembers = await Promise.all(
            allTeams.map(async (team) => {
              const members = await tx
                .select({
                  index: member.index,
                  prefix: member.prefix,
                  thaiFirstname: member.thaiFirstname,
                  thaiMiddlename: member.thaiMiddlename,
                  thaiLastname: member.thaiLastname,
                  firstName: member.firstName,
                  middleName: member.middleName,
                  lastname: member.lastname,
                  email: member.email,
                  phoneNumber: member.phoneNumber,
                  lineId: member.lineId,
                  parent: member.parent,
                  parentPhoneNumber: member.parentPhoneNumber,
                  foodAllergy: member.foodAllergy,
                  foodType: member.foodType,
                  drugAllergy: member.drugAllergy,
                  chronicDisease: member.chronicDisease,
                })
                .from(member)
                .where(eq(member.teamId, team.id))
                .orderBy(asc(member.index))

              return {
                ...team,
                members,
              }
            })
          )

          const allSchoolNames = teamsWithMembers.map((team) => team.school)

          const teamsWithRedFlag = teamsWithMembers.map((team) => ({
            ...team,
            rowShouldBeRed: shouldColorSchoolRed(team.school, allSchoolNames),
          }))

          const data = teamsWithRedFlag.slice(offset, offset + input.perPage)
          const total = teamsWithRedFlag.length

          return {
            data,
            total,
          }
        })

        const pageCount = Math.ceil(total / input.perPage)
        return { data, pageCount }
      } catch {
        return { data: [], pageCount: 0 }
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 1,
      tags: ["round1-comp-teams"],
    }
  )()
}
