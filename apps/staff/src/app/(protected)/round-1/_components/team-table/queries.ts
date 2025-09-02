"use server"

import { GetRound1TeamsSchema } from "@/app/(protected)/round-1/_components/team-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams, registerStatus } from "@workspace/db"
import { and, asc, count, desc, ilike, eq, or } from "@workspace/db/orm"

export async function getRound1Teams(input: GetRound1TeamsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const where = and(
          input.name ? ilike(teams.name, `%${input.name}%`) : undefined,
          input.school ? ilike(teams.school, `%${input.school}%`) : undefined,
          input.memberCount.length > 0
            ? or(...input.memberCount.map((count) => eq(teams.memberCount, parseInt(count))))
            : undefined,
          input.regisStatusTeam && input.regisStatusTeam.length > 0
            ? or(...input.regisStatusTeam.map((status) => eq(registerStatus.team, status)))
            : undefined,
          input.regisStatusAdviser && input.regisStatusAdviser.length > 0
            ? or(...input.regisStatusAdviser.map((status) => eq(registerStatus.adviser, status)))
            : undefined,
          input.regisStatusMember1 && input.regisStatusMember1.length > 0
            ? or(...input.regisStatusMember1.map((status) => eq(registerStatus.member1, status)))
            : undefined,
          input.regisStatusMember2 && input.regisStatusMember2.length > 0
            ? or(...input.regisStatusMember2.map((status) => eq(registerStatus.member2, status)))
            : undefined,
          input.regisStatusMember3 && input.regisStatusMember3.length > 0
            ? or(...input.regisStatusMember3.map((status) => eq(registerStatus.member3, status)))
            : undefined
        )

        const sortableColumns = {
          name: teams.name,
          school: teams.school,
          memberCount: teams.memberCount,
          createdAt: teams.createdAt,
          regisStatusTeam: registerStatus.team,
          regisStatusAdviser: registerStatus.adviser,
          regisStatusMember1: registerStatus.member1,
          regisStatusMember2: registerStatus.member2,
          regisStatusMember3: registerStatus.member3,
        } as const

        const orderBy =
          input.sort.length > 0
            ? input.sort
                .filter((item) => item.id in sortableColumns)
                .map((item) =>
                  item.desc
                    ? desc(sortableColumns[item.id as keyof typeof sortableColumns])
                    : asc(sortableColumns[item.id as keyof typeof sortableColumns])
                )
            : [asc(teams.createdAt)]

        const { data, total } = await db.transaction(async (tx) => {
          const data = await tx
            .select({
              id: teams.id,
              name: teams.name,
              school: teams.school,
              memberCount: teams.memberCount,
              createdAt: teams.createdAt,
              regisStatusTeam: registerStatus.team,
              regisStatusAdviser: registerStatus.adviser,
              regisStatusMember1: registerStatus.member1,
              regisStatusMember2: registerStatus.member2,
              regisStatusMember3: registerStatus.member3,
            })
            .from(teams)
            .leftJoin(registerStatus, eq(registerStatus.teamId, teams.id))
            .limit(input.perPage)
            .offset(offset)
            .where(where)
            .orderBy(...orderBy)

          const total = await tx
            .select({
              count: count(),
            })
            .from(teams)
            .leftJoin(registerStatus, eq(registerStatus.teamId, teams.id))
            .where(where)
            .execute()
            .then((res) => res[0]?.count ?? 0)

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
      tags: ["round1-teams"],
    }
  )()
}
