import type { RouterClient } from "@orpc/server"

import type { AppRouter } from "./routers"

export type { AppRouter } from "./routers"

export type AppRouterClient = RouterClient<AppRouter>
