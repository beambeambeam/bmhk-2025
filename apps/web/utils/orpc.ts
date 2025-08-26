import { createORPCClient } from "@orpc/client"
import { RPCLink } from "@orpc/client/fetch"
import { createTanstackQueryUtils } from "@orpc/tanstack-query"
import { QueryClient } from "@tanstack/react-query"

import type { AppRouterClient } from "../../api/src/types"

export const queryClient = new QueryClient({})

export const link = new RPCLink({
  url: `${process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3001"}/api/rpc`,
  fetch(url, options) {
    return fetch(url, {
      ...options,
      credentials: "include",
    })
  },
})

export const client: AppRouterClient = createORPCClient(link)
export const orpc = createTanstackQueryUtils(client)
