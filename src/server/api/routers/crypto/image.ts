import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decryptImage, encryptImage } from "server/utils/crypto"
import { z } from "zod"

export const imageRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      return encryptImage(input.image)
    }),
  decrypt: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      return decryptImage(input.image)
    })
})
