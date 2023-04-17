import { Layout } from "components"
import { type NextPage } from "next"
import { useContext } from "react"
import { EncryptionContext } from "utils/providers/encryption"

const Test: NextPage = () => {
  const { fieldsets } = useContext(EncryptionContext)

  const algorithm = "TEST"

  return (
    <Layout title="Home" h1={algorithm}>
      <form className="flex w-full max-w-[80%] items-center justify-center gap-4 font-semibold">
        {fieldsets.map(({ id, label, input, button }) => (
          <fieldset className="flex w-full flex-col" key={id}>
            <label htmlFor={id}>{label}</label>
            <textarea
              className="resize-none rounded-md border-2 border-zinc-800 bg-transparent px-2 py-1 outline-none focus:border-zinc-900"
              id={id}
              value={input.value}
              onChange={input.onChange}
            />
            <button
              className="mt-2 w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow"
              type="button"
              onClick={button.onClick}>
              {button.label}
            </button>
          </fieldset>
        ))}
      </form>
    </Layout>
  )
}

export default Test
