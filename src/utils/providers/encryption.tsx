import { ChangeEvent, createContext, ReactNode, useState } from "react"
import toast from "react-hot-toast"
import { ivAsString } from "server/utils/crypto"
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
      { text, iv: ivAsString },
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
      { encryptedText, iv: ivAsString },
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
    <EncryptionContext.Provider value={{ fieldsets }}>
      {children}
    </EncryptionContext.Provider>
  )
}
