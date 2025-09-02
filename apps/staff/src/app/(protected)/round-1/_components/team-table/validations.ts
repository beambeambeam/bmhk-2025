import { getFiltersStateParser, getSortingStateParser } from "@/lib/parsers"
import { createSearchParamsCache, parseAsArrayOf, parseAsInteger, parseAsString } from "nuqs/server"
import * as z from "zod"

export const searchParamsCache = createSearchParamsCache({
  page: parseAsInteger.withDefault(1),
  perPage: parseAsInteger.withDefault(10),
  sort: getSortingStateParser<
    | "name"
    | "school"
    | "memberCount"
    | "award"
    | "createdAt"
    | "regisStatusTeam"
    | "regisStatusAdviser"
    | "regisStatusMember1"
    | "regisStatusMember2"
    | "regisStatusMember3"
  >().withDefault([{ id: "createdAt", desc: true }]),
  name: parseAsString.withDefault(""),
  school: parseAsString.withDefault(""),
  memberCount: parseAsArrayOf(z.enum(["2", "3"])).withDefault([]),
  regisStatusTeam: parseAsArrayOf(z.enum(["DONE", "NOT_DONE", "NOT_HAVE"])).withDefault([]),
  regisStatusAdviser: parseAsArrayOf(z.enum(["DONE", "NOT_DONE", "NOT_HAVE"])).withDefault([]),
  regisStatusMember1: parseAsArrayOf(z.enum(["DONE", "NOT_DONE", "NOT_HAVE"])).withDefault([]),
  regisStatusMember2: parseAsArrayOf(z.enum(["DONE", "NOT_DONE", "NOT_HAVE"])).withDefault([]),
  regisStatusMember3: parseAsArrayOf(z.enum(["DONE", "NOT_DONE", "NOT_HAVE"])).withDefault([]),
  award: parseAsArrayOf(z.enum(["FIRST_ROUND", "SECOND_ROUND"])).withDefault([]),
  filters: getFiltersStateParser().withDefault([]),
})

export type GetRound1TeamsSchema = Awaited<ReturnType<typeof searchParamsCache.parse>>
