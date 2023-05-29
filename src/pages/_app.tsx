import type { AppType } from "next/app"
import { Toaster } from "react-hot-toast"
import { api } from "utils/api"

import "styles/globals.css"
import { CustomKeyProvider } from "utils/providers/customKey"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <CustomKeyProvider>
      <Component {...pageProps} />
      <Toaster position="bottom-center" />
    </CustomKeyProvider>
  )
}

export default api.withTRPC(MyApp)
