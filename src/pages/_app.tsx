import { api } from "lib/api"
import { CustomKeyProvider } from "lib/providers/customKey"
import type { AppType } from "next/app"
import { Toaster } from "react-hot-toast"

import "styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CustomKeyProvider>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </CustomKeyProvider>
  )
}

export default api.withTRPC(MyApp)
