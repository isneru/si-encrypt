import { Cross2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { Layout } from "components"
import { type NextPage } from "next"
import { useContext, useEffect } from "react"
import { ImageEncryptionContext } from "utils/providers/encrypt/image"

const ImagePage: NextPage = () => {
  const c = useContext(ImageEncryptionContext)

  const algorithm = "Encrypt Image"

  useEffect(() => {
    if (c.isWrong) {
      const timeout = setTimeout(() => c.setIsWrong(false), 2000)
      return () => clearTimeout(timeout)
    }
  }, [c.isWrong, c.setIsWrong])

  return (
    <Layout title={algorithm} h1={algorithm}>
      <form
        onSubmit={e => e.preventDefault()}
        className="flex w-full max-w-[80%] items-center justify-center gap-4 font-semibold">
        <label
          className={clsx(
            "relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-md border-2 text-xl font-normal transition-all",
            {
              "border-zinc-900": !c.isDragging && !c.file && !c.isWrong,
              "border-blue-600 bg-blue-300/50": c.isDragging,
              "border-emerald-600 bg-emerald-300/50": c.file,
              "border-red-600 bg-red-300/50": c.isWrong
            }
          )}
          onDragOver={e => e.preventDefault()}
          onDragEnter={c.setDragging}
          onDragLeave={c.unsetDragging}
          onDrop={c.handleOnDrop}
          htmlFor="img">
          {!!c.file && (
            <>
              <img
                className="h-full w-full object-cover"
                src={URL.createObjectURL(c.file)}
                alt={c.file.name}
              />
              <div className="absolute bottom-5 right-5 z-10 flex flex-col items-center justify-center gap-2 rounded-lg bg-black/80 p-2 leading-none text-white">
                <span className="text-white">{c.file.name}</span>
                <div className="flex w-full gap-2">
                  <button
                    type="button"
                    className="flex grow items-center justify-center rounded-md bg-emerald-500 px-4 py-1 hover:bg-emerald-600"
                    onClick={c.handleEncrypt}>
                    Encrypt
                  </button>
                  <button
                    type="button"
                    className="rounded-md bg-red-500 p-1 hover:bg-red-600"
                    onClick={e => {
                      e.preventDefault()
                      c.setFile(undefined)
                    }}>
                    <Cross2Icon width={20} height={20} />
                  </button>
                </div>
              </div>
            </>
          )}
          {!c.file && (
            <span className="text-zinc-900">Drag and drop an image here</span>
          )}
        </label>
        <input
          hidden
          accept="image/*"
          type="file"
          id="img"
          onChange={c.handleInputOnChange}
        />
      </form>
      {!!c.encryptedFile && <button onClick={c.handleDecrypt}>Decrypt</button>}
    </Layout>
  )
}

export default ImagePage
