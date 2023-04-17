import { ChangeEvent, createContext, ReactNode, useState } from "react"
import toast from "react-hot-toast"
import { iv } from "server/utils/crypto"
import { api } from "utils/api"
import { Fieldset } from "utils/types/encryption"

interface EncryptionContextData {
  fieldsets: Fieldset[]
}

export const EncryptionContext = createContext({} as EncryptionContextData)

interface EncryptionProviderProps {
  children: ReactNode
}

export const EncryptionProvider = ({ children }: EncryptionProviderProps) => {
  const [text, setText] = useState("")
  const [encryptedText, setEncryptedText] = useState("")
  const [ivValue, setIvValue] = useState(iv.toString("hex"))

  const encryptor = api.crypts.encrypt.useMutation()
  const decryptor = api.crypts.decrypt.useMutation()

  const fieldsets = [
    {
      id: "to-encrypt",
      label: "Text to be encrypted:",
      input: {
        value: text,
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
          setText(e.target.value)
      },
      button: {
        onClick: encrypt,
        label: "Encrypt"
      }
    },
    {
      id: "encrypted",
      label: "Encrypted text:",
      input: {
        value: encryptedText,
        onChange: (e: ChangeEvent<HTMLTextAreaElement>) =>
          setEncryptedText(e.target.value)
      },
      button: {
        onClick: decrypt,
        label: "Decrypt"
      }
    }
  ]

  function encrypt() {
    encryptor.mutate(
      { text },
      {
        onSuccess: ({ encryptedText, iv }) => {
          setEncryptedText(encryptedText)
          setIvValue(iv)
        },
        onError: () => toast.error("Encryption failed")
      }
    )
    setText("")
  }

  function decrypt() {
    decryptor.mutate(
      { encryptedText, iv: ivValue },
      {
        onSuccess: val => setText(val),
        onError: () => toast.error("Decryption failed")
      }
    )
    setEncryptedText("")
    setIvValue("")
  }

  return (
    <EncryptionContext.Provider value={{ fieldsets }}>
      {children}
    </EncryptionContext.Provider>
  )
}
