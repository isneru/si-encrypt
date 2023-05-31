import { api } from "lib/api"
import { CustomKeyContext } from "lib/providers/customKey"
import { CryptMode } from "lib/types/crypt"
import { Dispatch, SetStateAction, useContext, useState } from "react"
import toast from "react-hot-toast"

interface TextCryptProps {
  mode: CryptMode
  setMode: Dispatch<SetStateAction<CryptMode>>
}

export const TextCrypt = ({ mode, setMode }: TextCryptProps) => {
  const { key } = useContext(CustomKeyContext)
  const [text, setText] = useState("")
  const [encryptedText, setEncryptedText] = useState("")

  const encryptor = api.crypts.text.encrypt.useMutation()
  function onEncryptSuccess(val: string) {
    setMode("decrypt")
    setEncryptedText(val)
    setText("")
  }
  function onEncryptError() {
    toast.error("Encryption failed")
  }
  function encrypt() {
    encryptor.mutate(
      { text, key },
      { onSuccess: onEncryptSuccess, onError: onEncryptError }
    )
  }

  const decryptor = api.crypts.text.decrypt.useMutation()
  function onDecryptSuccess(val: string) {
    setMode("encrypt")
    setText(val)
    setEncryptedText("")
  }
  function onDecryptError() {
    toast.error("Decryption failed")
  }
  function decrypt() {
    decryptor.mutate(
      { encryptedText, key },
      { onSuccess: onDecryptSuccess, onError: onDecryptError }
    )
  }

  if (mode === "encrypt") {
    return (
      <fieldset className="flex w-full flex-col">
        <label htmlFor="to-encrypt">Text to be encrypted:</label>
        <textarea
          className="resize-none rounded-md border-2 border-zinc-800 bg-transparent px-2 py-1 outline-none focus:border-zinc-900"
          id="to-encrypt"
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <button
          disabled={!text}
          className="mt-2 w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
          type="button"
          onClick={encrypt}>
          Encrypt
        </button>
      </fieldset>
    )
  }
  return (
    <fieldset className="flex w-full flex-col">
      <label htmlFor="encrypted">Encrypted text:</label>
      <textarea
        className="resize-none rounded-md border-2 border-zinc-800 bg-transparent px-2 py-1 outline-none focus:border-zinc-900"
        id="encrypted"
        value={encryptedText}
        onChange={e => setEncryptedText(e.target.value)}
      />
      <button
        disabled={!encryptedText}
        className="mt-2 w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
        type="button"
        onClick={decrypt}>
        Decrypt
      </button>
    </fieldset>
  )
}
