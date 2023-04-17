import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decrypt, encrypt } from "server/utils/crypto"
import { z } from "zod"

export const cryptsRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      return encrypt(input.text)
    }),
  decrypt: publicProcedure
    .input(z.object({ iv: z.string(), encryptedText: z.string() }))
    .mutation(async ({ input }) => {
      return decrypt({ encryptedText: input.encryptedText, iv: input.iv })
    })
})
