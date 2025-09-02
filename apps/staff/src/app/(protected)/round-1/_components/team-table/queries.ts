"use server"

import { GetRound1TeamsSchema } from "@/app/(protected)/round-1/_components/team-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams } from "@workspace/db"
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
            : undefined
        )

        const sortableColumns = {
          name: teams.name,
          school: teams.school,
          memberCount: teams.memberCount,
          createdAt: teams.createdAt,
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
            .select()
            .from(teams)
            .limit(input.perPage)
            .offset(offset)
            .where(where)
            .orderBy(...orderBy)

          const total = await tx
            .select({
              count: count(),
            })
            .from(teams)
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
