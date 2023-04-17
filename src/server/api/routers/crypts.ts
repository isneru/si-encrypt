import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decrypt, encrypt } from "server/utils/crypto"
import { z } from "zod"

export const cryptsRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ text: z.string(), iv: z.string() }))
    .mutation(async ({ input }) => {
      return encrypt(input.text)
    }),
  decrypt: publicProcedure
    .input(z.object({ encryptedText: z.string(), iv: z.string() }))
    .mutation(async ({ input }) => {
      return decrypt(input.encryptedText)
    })
})
