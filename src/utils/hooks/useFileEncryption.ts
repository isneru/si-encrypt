import { Dispatch, SetStateAction, useContext, useState } from "react"
import { api } from "utils/api"
import { CustomKeyContext } from "utils/providers/customKey"
import { CryptMode } from "utils/types/crypt"

export function useFileEncryption(
  setMode: Dispatch<SetStateAction<CryptMode>>
) {
  const { key } = useContext(CustomKeyContext)
  const [file, setFile] = useState<File>()
  const [encryptedFile, setEncryptedFile] = useState<string>()
  const [isDragging, setIsDragging] = useState(false)

  const encryptor = api.crypts.file.encrypt.useMutation()
  const decryptor = api.crypts.file.decrypt.useMutation()

  const handleOnDrop = {
    encrypt: (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const firstFile = e.dataTransfer.files[0]
      firstFile && setFile(firstFile)
    },
    decrypt: (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const firstFile = e.dataTransfer.files[0]
      if (firstFile) {
        const fileReader = new FileReader()
        fileReader.readAsText(firstFile, "UTF-8")
        fileReader.onload = () => {
          const fileAsString = fileReader.result as string
          fileAsString && setEncryptedFile(fileAsString)
        }
      }
    }
  }

  const handleInputOnChange = {
    encrypt: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const firstFile = e.target.files[0]
      firstFile && setFile(firstFile)
    },
    decrypt: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const firstFile = e.target.files[0]
      if (firstFile) {
        const fileReader = new FileReader()
        fileReader.readAsText(firstFile, "UTF-8")
        fileReader.onload = () => {
          const fileAsString = fileReader.result as string
          fileAsString && setEncryptedFile(fileAsString)
        }
      }
    }
  }

  function encrypt() {
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const fileAsString = reader.result as string
      encryptor.mutate(
        {
          file: fileAsString,
          key
        },
        {
          onSuccess: val => {
            setMode("decrypt")
            setFile(undefined)
            setEncryptedFile(val)
          }
        }
      )
    }
  }

  function decrypt() {
    if (!encryptedFile) return
    decryptor.mutate(
      {
        file: encryptedFile,
        key
      },
      {
        onSuccess: val => {
          const file = val.split(",")[1]
          const fileType = val.split(",")[0]?.split(";")[0]?.split(":")[1]
          const fileAsBlob = new Blob([Buffer.from(file!, "base64")], {
            type: fileType
          })
          const fileAsFile = new File([fileAsBlob], "decrypted", {
            type: fileType
          })

          setMode("encrypt")
          setEncryptedFile(undefined)
          setFile(fileAsFile)
        }
      }
    )
  }

  return {
    file,
    encryptedFile,
    isDragging,
    setIsDragging,
    encrypt,
    decrypt,
    handleOnDrop,
    handleInputOnChange
  }
}
