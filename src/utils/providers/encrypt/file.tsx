import {
  ChangeEvent,
  Dispatch,
  DragEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useState
} from "react"
import { api } from "utils/api"

interface FileEncryptionContextData {
  isDragging: boolean
  file: File | undefined
  setDragging(): void
  unsetDragging(): void
  handleOnDrop(e: DragEvent<HTMLLabelElement>): void
  handleEncrypt(): void
  setFile: Dispatch<SetStateAction<File | undefined>>
  handleInputOnChange(e: ChangeEvent<HTMLInputElement>): void
  handleDecrypt(): void
  encryptedFile: string | undefined
}

export const FileEncryptionContext = createContext(
  {} as FileEncryptionContextData
)

interface FileEncryptionProviderProps {
  children: ReactNode
}

export const FileEncryptionProvider = ({
  children
}: FileEncryptionProviderProps) => {
  const [file, setFile] = useState<File>()
  const [encryptedFile, setEncryptedFile] = useState<string>()
  const [isDragging, setIsDragging] = useState(false)

  const encryptor = api.crypts.file.encrypt.useMutation()
  const decryptor = api.crypts.file.decrypt.useMutation()

  function setDragging() {
    return setIsDragging(false)
  }

  function unsetDragging() {
    return setIsDragging(true)
  }

  function handleOnDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setIsDragging(false)
    const firstFile = e.dataTransfer.files[0]
    setFile(firstFile)
  }

  function handleInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const firstFile = e.target.files[0]
    if (firstFile && firstFile.type.startsWith("file/")) {
      setFile(firstFile)
    }
  }

  function handleEncrypt() {
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const fileAsString = reader.result as string
      encryptor.mutate(
        {
          image: fileAsString
        },
        {
          onSuccess: val => {
            setFile(undefined)
            setEncryptedFile(val)
          }
        }
      )
    }
  }

  function handleDecrypt() {
    if (!encryptedFile) return
    decryptor.mutate(
      {
        image: encryptedFile
      },
      {
        onSuccess: val => {
          const file = val.split(",")[1]
          const fileType = val.split(",")[0]?.split(";")[0]?.split(":")[1]
          const fileAsBlob = new Blob([Buffer.from(file!, "base64")], {
            type: fileType
          })
          const fileAsFile = new File([fileAsBlob], "decryptedFile", {
            type: fileType
          })
          setEncryptedFile(undefined)
          setFile(fileAsFile)
        }
      }
    )
  }

  return (
    <FileEncryptionContext.Provider
      value={{
        isDragging,
        file,
        handleOnDrop,
        setDragging,
        unsetDragging,
        handleEncrypt,
        setFile,
        handleInputOnChange,
        handleDecrypt,
        encryptedFile
      }}>
      {children}
    </FileEncryptionContext.Provider>
  )
}
