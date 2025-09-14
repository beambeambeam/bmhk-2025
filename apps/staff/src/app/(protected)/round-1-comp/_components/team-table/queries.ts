"use server"

import { GetRound1CompTeamsSchema } from "@/app/(protected)/round-1-comp/_components/team-table/validations"
import { shouldColorSchoolRed } from "@/lib/school-utils"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams, round1Verification, member } from "@workspace/db"
import { and, asc, ilike, eq, or } from "@workspace/db/orm"

export async function getRound1CompTeams(input: GetRound1CompTeamsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const orderBy = [asc(teams.index)]

        const baseWhere = and(
          // Only teams with DONE verification status
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

          const allSchoolNames = allTeams.map((team) => team.school)

          const teamsWithRedFlag = allTeams.map((team) => ({
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
