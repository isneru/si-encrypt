import { imageRouter, textRouter } from "server/api/routers/crypto"
import { createTRPCRouter } from "server/api/trpc"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  crypts: createTRPCRouter({
    image: imageRouter,
    text: textRouter
  })
})

// export type definition of API
export type AppRouter = typeof appRouter
