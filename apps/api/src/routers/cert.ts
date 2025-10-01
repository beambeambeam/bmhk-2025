import { protectedProcedure } from "@/lib/orpc"

export const certRouter = {
  generate: protectedProcedure.handler(async () => {
    return {
      success: true,
      message: "Certificate PDF generated",
    }
  }),
}
