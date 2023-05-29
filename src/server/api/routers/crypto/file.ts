import { createTRPCRouter, publicProcedure } from "server/api/trpc"
import { decryptFile, encryptFile } from "server/utils/crypto"
import { z } from "zod"

export const fileRouter = createTRPCRouter({
  encrypt: publicProcedure
    .input(z.object({ file: z.string(), key: z.string().optional() }))
    .mutation(async ({ input }) => {
      return encryptFile(input.file, input.key)
    }),
  decrypt: publicProcedure
    .input(z.object({ file: z.string(), key: z.string().optional() }))
    .mutation(async ({ input }) => {
      return decryptFile(input.file, input.key)
    })
})
