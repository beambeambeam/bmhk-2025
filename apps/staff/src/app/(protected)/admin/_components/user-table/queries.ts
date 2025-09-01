"use server"

import { GetUsersSchema } from "@/app/(protected)/admin/_components/user-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, user } from "@workspace/db"

export async function getUsers(input: GetUsersSchema) {
  return await unstable_cache(
    async () => {
      try {
        return {
          data: [],
          pageCount: 0,
        }
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
