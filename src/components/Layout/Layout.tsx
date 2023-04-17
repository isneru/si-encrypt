import { Sidebar } from "components"
import Head from "next/head"

interface LayoutProps {
  title: string
  h1: string
  children?: React.ReactNode
}

export const Layout = ({ title, children, h1 }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <meta name="description" content="" /> */}
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <div className="mx-auto flex h-screen w-full items-center justify-center">
        <Sidebar />
        <main className="flex w-full flex-col items-center gap-20">
          <h1 className="text-5xl font-bold uppercase">{h1}</h1>
          {children}
        </main>
      </div>
    </>
  )
}
