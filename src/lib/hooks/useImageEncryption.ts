import { api } from "lib/api"
import { CustomKeyContext } from "lib/providers/customKey"
import { CryptMode } from "lib/types/crypt"
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState
} from "react"

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

  const handleOnDrop = {
    encrypt: (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const firstFile = e.dataTransfer.files[0]
      firstFile && firstFile.type.startsWith("image/")
        ? setImage(firstFile)
        : setIsWrong(true)
    },
    decrypt: (e: React.DragEvent<HTMLLabelElement>) => {
      e.preventDefault()
      setIsDragging(false)
      const firstFile = e.dataTransfer.files[0]
      if (firstFile) {
        const fileReader = new FileReader()
        fileReader.readAsText(firstFile)
        fileReader.onloadend = () => {
          const fileAsString = fileReader.result as string
          fileAsString && setEncryptedImage(fileAsString)
        }
      }
    }
  }

  const handleInputOnChange = {
    encrypt: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const firstFile = e.target.files[0]
      firstFile && firstFile.type.startsWith("image/")
        ? setImage(firstFile)
        : setIsWrong(true)
    },
    decrypt: (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) return
      const firstFile = e.target.files[0]
      if (firstFile) {
        const fileReader = new FileReader()
        fileReader.readAsText(firstFile)
        fileReader.onloadend = () => {
          const fileAsString = fileReader.result as string
          fileAsString && setEncryptedImage(fileAsString)
        }
      }
    }
  }

  function encrypt() {
    if (!image) return
    const reader = new FileReader()
    reader.readAsDataURL(image)
    reader.onloadend = () => {
      const imageAsString = reader.result as string
      encryptor.mutate(
        { image: imageAsString, key },
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
      { image: encryptedImage, key },
      {
        onSuccess: val => {
          console.log(val)
          const image = val.split(",")[1]
          const imageType = val.split(",")[0]?.split(";")[0]?.split(":")[1]
          const imageAsBlob = new Blob([Buffer.from(image!, "base64")], {
            type: imageType
          })
          const imageAsFile = new File([imageAsBlob], "decrypted", {
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
