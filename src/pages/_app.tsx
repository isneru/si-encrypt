import { type AppType } from "next/app"
import { api } from "utils/api"

import { Toaster } from "react-hot-toast"
import "styles/globals.css"

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <Component {...pageProps} />
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "bg-zinc-900 text-white"
        }}
      />
    </>
  )
}

export default api.withTRPC(MyApp)
