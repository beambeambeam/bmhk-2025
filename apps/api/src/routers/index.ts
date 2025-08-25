import { publicProcedure } from "@/lib/orpc"
<<<<<<< HEAD
import { registerRouter } from "@/routers/register"
=======
>>>>>>> 9e6ac1d (release: pre landing release (#55))
import type { RouterClient } from "@orpc/server"

export const appRouter = {
  healthCheck: publicProcedure.handler(() => {
    return "OK"
  }),
<<<<<<< HEAD
  register: registerRouter,
=======
>>>>>>> 9e6ac1d (release: pre landing release (#55))
}
export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
