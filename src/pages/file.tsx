import { CryptNav, FileCrypt, Layout } from "components"
import { type NextPage } from "next"
import { useMode } from "utils/hooks"

const File: NextPage = () => {
  const { mode, setMode } = useMode()

  return (
    <Layout title={"File Encryption"}>
      <CryptNav mode={mode} setMode={setMode} />
      <section className="mt-2 flex w-full max-w-[80%] flex-col items-center justify-center gap-4 font-semibold">
        <FileCrypt mode={mode} setMode={setMode} />
      </section>
    </Layout>
  )
}

export default File
