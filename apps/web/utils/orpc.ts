import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { createTanstackQueryUtils } from "@orpc/tanstack-query"
import { QueryClient } from "@tanstack/react-query"

import type { AppRouterClient } from "../../api/src/routers"

export const queryClient = new QueryClient({})

export const link = new RPCLink({
  url: `http://localhost:3001/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: "include",
    })
  },
})

// Typed client with AppRouterClient type from the API
export const client: AppRouterClient = createORPCClient(link)

export const orpc = createTanstackQueryUtils(client)

// Export the type for use in other components
export type { AppRouterClient }
