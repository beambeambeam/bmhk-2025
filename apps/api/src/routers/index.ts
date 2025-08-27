import { publicProcedure } from "@/lib/orpc"
import { registerRouter } from "@/routers/register"
import type { RouterClient } from "@orpc/server"

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK"
  }),
  register: registerRouter,
}
export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
