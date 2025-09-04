import { Context, ORPCError, os } from "@orpc/server"
import { StaffRoles, AdminRoles, Roles } from "@workspace/auth"

export const o = os.$context<Context>()

export const publicProcedure = o

export const requireAuth = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED")
  }

  if (
    !context.session?.user?.role ||
    !StaffRoles.includes(context.session.user.role as (typeof StaffRoles)[number])
  ) {
    throw new ORPCError("UNAUTHORIZED")
  }

  return next({
    context: {
      session: context.session,
    },
  })
})

export const protectedProcedure = publicProcedure.use(requireAuth)

export const adminOnly = o.middleware(async ({ context, next }) => {
  if (!context.session?.user) {
    throw new ORPCError("UNAUTHORIZED")
  }

  if (
    !context.session?.user?.role ||
    (context.session.user.role !== Roles.ADMIN && context.session.user.role !== Roles.SUPER_ADMIN)
  ) {
    throw new ORPCError("UNAUTHORIZED")
  }

  return next({
    context: {
      session: context.session,
    },
  })
})

export const adminProcedure = protectedProcedure.use(adminOnly)
