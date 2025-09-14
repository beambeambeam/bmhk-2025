import { getFiltersStateParser } from "@/lib/parsers"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import * as z from "zod"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  name: parseAsString.withDefault(""),
  codeName: parseAsString.withDefault(""),
  school: parseAsString.withDefault(""),
  memberCount: parseAsArrayOf(z.enum(["2", "3"])).withDefault([]),
  email: parseAsString.withDefault(""),
  filters: getFiltersStateParser().withDefault([]),
})

export type GetRound1CompTeamsSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
