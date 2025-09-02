"use server"

import { GetRound1TeamsSchema } from "@/app/(protected)/round-1/_components/team-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams, registerStatus } from "@workspace/db"
import {
  and,
  asc,
  count,
  desc,
  ilike,
  eq,
  or,
  lt,
  lte,
  gt,
  gte,
  isNull,
  isNotNull,
  ne,
} from "@workspace/db/orm"

export async function getRound1Teams(input: GetRound1TeamsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const baseWhere = and(
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
            : undefined,
          // submitRegister filter from query param (?submitRegister=start,end)
          (() => {
            const sr = input.submitRegister
            if (!sr || typeof sr !== "string") return undefined
            const parts = sr.split(",")
            const toDate = (v: string) => {
              const n = Number(v)
              if (!Number.isNaN(n)) return new Date(n)
              const d = new Date(v)
              return isNaN(d.getTime()) ? undefined : d
            }
            const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0)
            const endOfDay = (d: Date) =>
              new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
            if (parts.length === 1) {
              const d = toDate(parts[0]!)
              if (!d) return undefined
              const start = startOfDay(d)
              const end = endOfDay(d)
              return and(
                isNotNull(registerStatus.submitRegister),
                gte(registerStatus.submitRegister, start),
                lte(registerStatus.submitRegister, end)
              )
            }
            if (parts.length >= 2) {
              const start = toDate(parts[0]!)
              const end = toDate(parts[1]!)
              if (start && end) {
                let rangeStart = start
                let rangeEnd = end
                if (rangeStart.getTime() === rangeEnd.getTime()) {
                  rangeStart = startOfDay(rangeStart)
                  rangeEnd = endOfDay(rangeEnd)
                }
                return and(
                  isNotNull(registerStatus.submitRegister),
                  gte(registerStatus.submitRegister, rangeStart),
                  lte(registerStatus.submitRegister, rangeEnd)
                )
              }
            }
            return undefined
          })()
        )

        // No advancedWhere; filtering handled in baseWhere or direct params

        const orderBy = [asc(teams.createdAt)]

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
              submitRegister: registerStatus.submitRegister,
            })
            .from(teams)
            .leftJoin(registerStatus, eq(registerStatus.teamId, teams.id))
            .limit(input.perPage)
            .offset(offset)
            .where(baseWhere)
            .orderBy(...orderBy)

          const total = await tx
            .select({
              count: count(),
            })
            .from(teams)
            .leftJoin(registerStatus, eq(registerStatus.teamId, teams.id))
            .where(baseWhere)
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
