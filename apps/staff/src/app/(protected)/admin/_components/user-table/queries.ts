"use server"

import { GetUsersSchema } from "@/app/(protected)/admin/_components/user-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, user } from "@workspace/db"
import { and, asc, count, desc, ilike, ne } from "@workspace/db/orm"

export async function getUsers(input: GetUsersSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const where = and(
          input.email ? ilike(user.email, `%${input.email}%`) : undefined,
          input.name ? ilike(user.name, `%${input.name}%`) : undefined,
          input.role ? ilike(user.role, `%${input.role}%`) : undefined,
          ne(user.role, "user")
        )

        const sortableColumns = {
          email: user.email,
          name: user.name,
          role: user.role,
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
            : [asc(user.createdAt)]

        const { data, total } = await db.transaction(async (tx) => {
          const data = await tx
            .select()
            .from(user)
            .limit(input.perPage)
            .offset(offset)
            .where(where)
            .orderBy(...orderBy)

          const total = await tx
            .select({
              count: count(),
            })
            .from(user)
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
      } catch (_error) {
        return { data: [], pageCount: 0 }
      }
    },
    [JSON.stringify(input)],
    {
      revalidate: 1,
      tags: ["users"],
    }
  )()
}
