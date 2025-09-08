"use server"

import { os } from "@orpc/server"

export const healthCheck = os
  .handler(async () => {
    return {
      message: "ping",
    }
  })
  .actionable()
