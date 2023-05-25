import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { api } from "utils/api"
import { CryptMode } from "utils/types/encryption"

export function useImageEncryption(
  setMode: Dispatch<SetStateAction<CryptMode>>
) {
  const [image, setImage] = useState<File>()
  const [encryptedImage, setEncryptedImage] = useState<string>()
  const [isWrong, setIsWrong] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const encryptor = api.crypts.image.encrypt.useMutation()

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
          image: imageAsString
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

  return {
    image,
    encryptedImage,
    isWrong,
    isDragging,
    setIsDragging,
    encrypt,
    handleOnDrop,
    handleInputOnChange
  }
}
