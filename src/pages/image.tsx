import { Cross2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { Layout } from "components"
import { type NextPage } from "next"
import { useState } from "react"

const ImagePage: NextPage = () => {
  const algorithm = "Encrypt Image"

  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File>()
  const [isWrong, setIsWrong] = useState(false)

  return (
    <Layout title={algorithm} h1={algorithm}>
      <form className="flex w-full max-w-[80%] items-center justify-center gap-4 font-semibold">
        <label
          className={clsx(
            "relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-md border-2 bg-zinc-200 text-xl font-normal transition-all",
            {
              "border-zinc-900": !isDragging,
              "border-blue-600 bg-blue-200": isDragging,
              "border-emerald-600 bg-emerald-200": !!file,
              "border-red-600 bg-red-200": isWrong
            }
          )}
          onDragOver={e => e.preventDefault()}
          onDragEnter={e => setIsDragging(true)}
          onDragLeave={e => setIsDragging(false)}
          onDrop={e => {
            e.preventDefault()
            setIsDragging(false)
            const file = e.dataTransfer.files[0]
            if (file && file.type.startsWith("image/")) {
              setFile(file)
            }
            if (file && !file.type.startsWith("image/")) {
              setIsWrong(true)
              const timeout = setTimeout(() => setIsWrong(false), 2000)
              return () => clearTimeout(timeout)
            }
          }}
          htmlFor="img">
          {!!file && (
            <img
              className="h-full w-full object-cover"
              src={URL.createObjectURL(file)}
              alt={file.name}
            />
          )}
          {!!file && (
            <div className="absolute bottom-5 z-10 flex items-center justify-center gap-2 rounded-lg bg-zinc-900 p-2 leading-none text-white">
              <span className="text-white">{file.name}</span>
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
          onChange={e => {
            if (!e.target.files) return
            const file = e.target.files[0]
            if (file && file.type.startsWith("image/")) {
              setFile(file)
            }
            if (file && !file.type.startsWith("image/")) {
              setIsWrong(true)
              const timeout = setTimeout(() => setIsWrong(false), 2000)
              return () => clearTimeout(timeout)
            }
          }}
        />
      </form>
    </Layout>
  )
}

export default ImagePage
