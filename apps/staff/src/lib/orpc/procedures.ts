import { ORPCError, os } from "@orpc/server"

import type { Context } from "./context"

export const o = os.$context<Context>()

export const publicProcedure = o

const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED")
  }
  return next({
    context: {
      session: context.session,
    },
  })
})

export const protectedProcedure = publicProcedure.use(requireAuth)

// Optional auth middleware for routes that work with or without authentication
const optionalAuth = o.middleware(async ({ context, next }) => {
  return next({
    context: {
      session: context.session,
    },
  })
})

export const optionalAuthProcedure = publicProcedure.use(optionalAuth)
