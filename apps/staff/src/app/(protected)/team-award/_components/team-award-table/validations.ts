import { getFiltersStateParser } from "@/lib/parsers"
import { createSearchParamsCache, parseAsInteger, parseAsString } from "nuqs/server"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  name: parseAsString.withDefault(""),
  codeName: parseAsString.withDefault(""),
  school: parseAsString.withDefault(""),
  award: parseAsString.withDefault(""),
  filters: getFiltersStateParser().withDefault([]),
})

export type GetTeamAwardsSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
