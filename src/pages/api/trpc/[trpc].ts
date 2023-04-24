import { createNextApiHandler } from "@trpc/server/adapters/next"

import { env } from "env.mjs"
import { appRouter } from "server/api/root"
import { createTRPCContext } from "server/api/trpc"

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext: createTRPCContext,
  onError:
    env.NODE_ENV === "development"
      ? ({ path, error }) => {
          console.error(
            `❌ tRPC failed on ${path ?? "<no-path>"}: ${error.message}`
          )
        }
      : undefined
})
// allow more than 1mb of data to be sent to the API
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "8mb"
    }
  }
}
