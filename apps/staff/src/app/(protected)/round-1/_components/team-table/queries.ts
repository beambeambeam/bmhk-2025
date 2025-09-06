"use server"

import { GetRound1TeamsSchema } from "@/app/(protected)/round-1/_components/team-table/validations"
import { unstable_cache } from "@/lib/unstable-cache"
import { db, teams, registerStatus, round1Verification, user } from "@workspace/db"
import { and, asc, count, ilike, eq, or, lte, gte, isNotNull, isNull, sql } from "@workspace/db/orm"

export async function getRound1Teams(input: GetRound1TeamsSchema) {
  return await unstable_cache(
    async () => {
      try {
        const offset = (input.page - 1) * input.perPage

        const baseWhere = and(
          isNotNull(registerStatus.submitRegister),
          input.name ? ilike(teams.name, `%${input.name}%`) : undefined,
          (() => {
            const q = input.codeName?.trim()
            if (!q) return undefined
            const digits = q.replace(/\D/g, "")
            if (!digits) return undefined
            return eq(teams.index, parseInt(digits, 10))
          })(),
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
          input.verifyStatus && input.verifyStatus.length > 0
            ? or(
                ...input.verifyStatus.map((status) =>
                  status === "NO_CHECK"
                    ? isNull(round1Verification.id)
                    : eq(round1Verification.status, status)
                )
              )
            : undefined,
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

        const orderBy = [asc(registerStatus.submitRegister)]

        const { data, total } = await db.transaction(async (tx) => {
          const data = await tx
            .select({
              id: teams.id,
              name: teams.name,
              school: teams.school,
              memberCount: teams.memberCount,
              index: teams.index,
              createdAt: teams.createdAt,
              regisStatusTeam: registerStatus.team,
              regisStatusAdviser: registerStatus.adviser,
              regisStatusMember1: registerStatus.member1,
              regisStatusMember2: registerStatus.member2,
              regisStatusMember3: registerStatus.member3,
              submitRegister: registerStatus.submitRegister,
              verificationStatus: round1Verification.status,
              verificationTime: round1Verification.verifiedAt,
              verifiedBy: round1Verification.verifiedBy,
              verifiedByUsername: user.name,
              submissionRank: sql<number>`ROW_NUMBER() OVER (ORDER BY ${registerStatus.submitRegister} ASC)`,
            })
            .from(teams)
            .leftJoin(registerStatus, eq(registerStatus.teamId, teams.id))
            .leftJoin(round1Verification, eq(round1Verification.teamId, teams.id))
            .leftJoin(user, eq(user.id, round1Verification.verifiedBy))
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
            .leftJoin(round1Verification, eq(round1Verification.teamId, teams.id))
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
