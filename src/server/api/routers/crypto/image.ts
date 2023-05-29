import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decryptImage, encryptImage } from "server/utils/crypto"
import { z } from "zod"

export const imageRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ image: z.string(), key: z.string().optional() }))
    .mutation(async ({ input }) => {
      return encryptImage(input.image, input.key)
    }),
  decrypt: publicProcedure
    .input(z.object({ image: z.string(), key: z.string().optional() }))
    .mutation(async ({ input }) => {
      return decryptImage(input.image, input.key)
    })
})
