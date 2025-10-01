import { publicProcedure } from "@/lib/orpc"
import { certRouter } from "@/routers/cert"
import { registerRouter } from "@/routers/register"
import type { RouterClient } from "@orpc/server"

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK"
  }),
  register: registerRouter,
  cert: certRouter,
}
export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
