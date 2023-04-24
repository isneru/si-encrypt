import { Cross2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { Layout } from "components"
import { type NextPage } from "next"
import { useEffect, useState } from "react"
import { api } from "utils/api"

const ImagePage: NextPage = () => {
  const algorithm = "Encrypt Image"

  const encryptor = api.crypts.image.encrypt.useMutation()
  const decryptor = api.crypts.image.decrypt.useMutation()

  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File>()
  const [decryptedFile, setDecryptedFile] = useState<File>()
  const [encryptedFile, setEncryptedFile] = useState<string>()
  const [isWrong, setIsWrong] = useState(false)

  useEffect(() => {
    if (isWrong) {
      const timeout = setTimeout(() => setIsWrong(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [isWrong, setIsWrong])

  function disableDragging() {
    return setIsDragging(false)
  }

  function enableDragging() {
    return setIsDragging(true)
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

  function handleEncrypt(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (!file) return
    const reader = new FileReader()
    reader.readAsBinaryString(file)
    reader.onload = () => {
      const binaryString = reader.result
      encryptor.mutate(
        { image: binaryString as string },
        {
          onSuccess: val => {
            console.log(val)
            setEncryptedFile(val)
            setFile(undefined)
          }
        }
      )
    }
  }

  function handleDecrypt(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault()
    if (!encryptedFile) return
    decryptor.mutate(
      { image: encryptedFile },
      {
        onSuccess: file => {
          console.log(file)
          const newFile = new File([file], "decrypted.png", {
            type: "image/png"
          })
          setEncryptedFile(undefined)
          setDecryptedFile(newFile)
        }
      }
    )
  }

  return (
    <Layout title={algorithm} h1={algorithm}>
      <form className="flex w-full max-w-[80%] items-center justify-center gap-4 font-semibold">
        <label
          className={clsx(
            "relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-md border-2 text-xl font-normal transition-all",
            {
              "border-zinc-900": !isDragging && !file && !isWrong,
              "border-blue-600 bg-blue-300/50": isDragging,
              "border-emerald-600 bg-emerald-300/50": file,
              "border-red-600 bg-red-300/50": isWrong
            }
          )}
          onDragOver={e => e.preventDefault()}
          onDragEnter={enableDragging}
          onDragLeave={disableDragging}
          onDrop={handleOnDrop}
          htmlFor="img">
          {!!file && (
            <>
              <img
                className="h-full w-full object-cover"
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
              <div className="absolute bottom-5 right-5 z-10 flex flex-col items-center justify-center gap-2 rounded-lg bg-zinc-900 p-2 leading-none text-white">
                <span className="text-white">{file.name}</span>
                <div className="flex w-full gap-2">
                  <button
                    type="button"
                    className="flex grow items-center justify-center rounded-md bg-emerald-500 px-4 py-1 hover:bg-emerald-600"
                    onClick={handleEncrypt}>
                    Encrypt
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-500 p-1 hover:bg-red-600"
                    onClick={e => {
                      e.preventDefault()
                      setFile(undefined)
                    }}>
                    <Cross2Icon width={20} height={20} />
                  </button>
                </div>
              </div>
            </>
          )}
          {!file && (
            <span className="text-zinc-900">Drag and drop an image here</span>
          )}
        </label>
        <input
          hidden
          accept="image/*"
          type="file"
          id="img"
          onChange={handleInputOnChange}
        />
      </form>
      {!!encryptedFile && <button onClick={handleDecrypt}>Decrypt</button>}
    </Layout>
  )
}

export default ImagePage
