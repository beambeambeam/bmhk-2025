import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import * as z from "zod"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<"email" | "name" | "role" | "createdAt">().withDefault([
    { id: "createdAt", desc: true },
  ]),
  email: parseAsString.withDefault(""),
  name: parseAsString.withDefault(""),
  role: parseAsArrayOf(z.enum(["super_admin", "admin", "staff"])).withDefault([]),
  filters: getFiltersStateParser().withDefault([]),
})

export type GetUsersSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
