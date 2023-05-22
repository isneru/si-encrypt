import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decryptFile, encryptFile } from "server/utils/crypto"
import { z } from "zod"

export const fileRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      return encryptFile(input.image)
    }),
  decrypt: publicProcedure
    .input(z.object({ image: z.string() }))
    .mutation(async ({ input }) => {
      return decryptFile(input.image)
    })
})
