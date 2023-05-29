import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"
import { api } from "utils/api"
import { CustomKeyContext } from "utils/providers/customKey"
import { CryptMode } from "utils/types/crypt"

export function useImageEncryption(
  setMode: Dispatch<SetStateAction<CryptMode>>
) {
  const { key } = useContext(CustomKeyContext)
  const [image, setImage] = useState<File>()
  const [encryptedImage, setEncryptedImage] = useState<string>()
  const [isWrong, setIsWrong] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const encryptor = api.crypts.image.encrypt.useMutation()
  const decryptor = api.crypts.image.decrypt.useMutation()

  useEffect(() => {
    if (isWrong) {
      const timeout = setTimeout(() => setIsWrong(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isWrong])

  function handleOnDrop(e: React.DragEvent<HTMLLabelElement>) {
    e.preventDefault()
    setIsDragging(false)
    const firstFile = e.dataTransfer.files[0]
    if (firstFile && firstFile.type.startsWith("image/")) {
      setImage(firstFile)
    }
    if (firstFile && !firstFile.type.startsWith("image/")) {
      setIsWrong(true)
    }
  }

  function handleInputOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const firstFile = e.target.files[0]
    firstFile && firstFile.type.startsWith("image/")
      ? setImage(firstFile)
      : setIsWrong(true)
  }

  function encrypt() {
    if (!image) return
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => {
      const imageAsString = reader.result as string
      encryptor.mutate(
        {
          image: imageAsString,
          key
        },
        {
          onSuccess: val => {
            setMode("decrypt")
            setImage(undefined)
            setEncryptedImage(val)
          }
        }
      )
    }
  }

  function decrypt() {
    if (!encryptedImage) return

    decryptor.mutate(
      {
        image: encryptedImage,
        key
      },
      {
        onSuccess: val => {
          const image = val.split(",")[1]
          const imageType = val.split(",")[0]?.split(";")[0]?.split(":")[1]
          const imageAsBlob = new Blob([Buffer.from(image!, "base64")], {
            type: imageType
          })
          const imageAsFile = new File([imageAsBlob], "encrypted", {
            type: imageType
          })
          setMode("encrypt")
          setEncryptedImage(undefined)
          setImage(imageAsFile)
        }
      }
    )
  }

  return {
    image,
    encryptedImage,
    isWrong,
    isDragging,
    setIsDragging,
    encrypt,
    decrypt,
    handleOnDrop,
    handleInputOnChange
  }
}
