import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import * as z from "zod"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<any>().withDefault([{ id: "createdAt", desc: true }]),
  name: parseAsString.withDefault(""),
  school: parseAsString.withDefault(""),
  memberCount: parseAsArrayOf(z.enum(["2", "3"])).withDefault([]),
  award: parseAsArrayOf(z.enum(["FIRST_ROUND", "SECOND_ROUND"])).withDefault([]),
  filters: getFiltersStateParser().withDefault([]),
})

export type GetRound1TeamsSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
