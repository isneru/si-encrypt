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

interface ImageEncryptionContextData {
  isWrong: boolean
  setIsWrong: Dispatch<SetStateAction<boolean>>
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

export const ImageEncryptionContext = createContext(
  {} as ImageEncryptionContextData
)

interface ImageEncryptionProviderProps {
  children: ReactNode
}

export const ImageEncryptionProvider = ({
  children
}: ImageEncryptionProviderProps) => {
  const [file, setFile] = useState<File>()
  const [encryptedFile, setEncryptedFile] = useState<string>()
  const [isWrong, setIsWrong] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const encryptor = api.crypts.image.encrypt.useMutation()
  const decryptor = api.crypts.image.decrypt.useMutation()

  function setDragging() {
    return setIsDragging(true)
  }

  function unsetDragging() {
    return setIsDragging(false)
  }

  function handleOnDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setIsDragging(false)
    const firstFile = e.dataTransfer.files[0]
    if (firstFile && firstFile.type.startsWith("image/")) {
      setFile(firstFile)
    }
    if (firstFile && !firstFile.type.startsWith("image/")) {
      setIsWrong(true)
    }
  }

  function handleInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const firstFile = e.target.files[0]
    if (firstFile && firstFile.type.startsWith("image/")) {
      setFile(firstFile)
    }
    if (firstFile && !firstFile.type.startsWith("image/")) {
      setIsWrong(true)
    }
  }

  function handleEncrypt() {
    if (!file) return
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      const imageAsString = reader.result as string
      encryptor.mutate(
        {
          image: imageAsString
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
          const image = val.split(",")[1]
          const imageType = val.split(",")[0]?.split(";")[0]?.split(":")[1]
          const imageAsBlob = new Blob([Buffer.from(image!, "base64")], {
            type: imageType
          })
          const imageAsFile = new File([imageAsBlob], "decryptedImage", {
            type: imageType
          })
          setEncryptedFile(undefined)
          setFile(imageAsFile)
        }
      }
    )
  }

  return (
    <ImageEncryptionContext.Provider
      value={{
        isWrong,
        setIsWrong,
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
    </ImageEncryptionContext.Provider>
  )
}
