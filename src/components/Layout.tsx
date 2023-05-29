import { Sidebar } from "components"
import Head from "next/head"

interface LayoutProps {
  title: string
  children?: React.ReactNode
}

export const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="" /> */}
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="mx-auto flex h-screen w-full items-center justify-center">
        <Sidebar />
        <main className="relative flex h-full w-full flex-col items-center justify-center py-10">
          <h1 className="absolute top-10 text-5xl font-bold uppercase">
            {title}
          </h1>
          {children}
        </main>
      </div>
    </>
  )
}
