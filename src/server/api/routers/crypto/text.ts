import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decryptText, encryptText } from "server/utils/crypto"
import { z } from "zod"

export const textRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ text: z.string() }))
    .mutation(async ({ input }) => {
      return encryptText(input.text)
    }),
  decrypt: publicProcedure
    .input(z.object({ encryptedText: z.string() }))
    .mutation(async ({ input }) => {
      return decryptText(input.encryptedText)
    })
})
