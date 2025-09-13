"use server"

import { GetTeamAwardsSchema } from "@/app/(protected)/team-award/_components/team-award-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams, round1Verification } from "@workspace/db"
import { and, asc, ilike, eq, isNotNull } from "@workspace/db/orm"

export async function getTeamAwards(input: GetTeamAwardsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const orderBy = [asc(teams.index)]

        const baseWhere = and(
          // Only show teams where round-1-verification status is DONE
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
          input.award ? ilike(teams.award, `%${input.award}%`) : undefined
        )

        const { data, total } = await db.transaction(async (tx) => {
          const allTeams = await tx
            .select({
              id: teams.id,
              name: teams.name,
              school: teams.school,
              award: teams.award,
              index: teams.index,
              createdAt: teams.createdAt,
            })
            .from(teams)
            .innerJoin(round1Verification, eq(round1Verification.teamId, teams.id))
            .where(baseWhere)
            .orderBy(...orderBy)

          const data = allTeams.slice(offset, offset + input.perPage)
          const total = allTeams.length

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
      tags: ["team-awards"],
    }
  )()
}
