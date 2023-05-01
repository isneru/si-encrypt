import { ChangeEvent, createContext, ReactNode, useState } from "react"
import toast from "react-hot-toast"
import { api } from "utils/api"
import { Fieldset } from "utils/types/encryption"

interface TextEncryptionContextData {
  fieldsets: Fieldset[]
}

export const TextEncryptionContext = createContext(
  {} as TextEncryptionContextData
)

interface TextEncryptionProviderProps {
  children: ReactNode
}

export const TextEncryptionProvider = ({
  children
}: TextEncryptionProviderProps) => {
  const [text, setText] = useState("")
  const [encryptedText, setEncryptedText] = useState("")

  const encryptor = api.crypts.text.encrypt.useMutation()
  const decryptor = api.crypts.text.decrypt.useMutation()

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
        onSuccess: val => {
          setEncryptedText(val)
          setText("")
        },
        onError: () => toast.error("Encryption failed")
      }
    )
  }

  function decrypt() {
    decryptor.mutate(
      { encryptedText },
      {
        onSuccess: val => {
          setText(val)
          setEncryptedText("")
        },
        onError: () => toast.error("Decryption failed")
      }
    )
  }

  return (
    <TextEncryptionContext.Provider value={{ fieldsets }}>
      {children}
    </TextEncryptionContext.Provider>
  )
}
