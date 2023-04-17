import { type AppType } from "next/app"
import { api } from "utils/api"
import { EncryptionProvider } from "utils/providers/encryption"

import { Toaster } from "react-hot-toast"
import "styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <EncryptionProvider>
      <Component {...pageProps} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "bg-zinc-900 text-white"
        }}
      />
    </EncryptionProvider>
  )
}

export default api.withTRPC(MyApp)
