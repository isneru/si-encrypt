import { CryptNav, Layout, TextCrypt } from "components"
import { type NextPage } from "next"
import { useMode } from "utils/hooks"

const Text: NextPage = () => {
  const { mode, setMode } = useMode()

  return (
    <Layout title="Text Encryption">
      <CryptNav mode={mode} setMode={setMode} />
      <section className="flex w-full max-w-[80%] items-center justify-center gap-4 font-semibold">
        <TextCrypt mode={mode} setMode={setMode} />
      </section>
    </Layout>
  )
}

export default Text
