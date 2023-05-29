import clsx from "clsx"
import { Dispatch, SetStateAction, useState } from "react"
import { useFileEncryption } from "utils/hooks"
import { CryptMode } from "utils/types/crypt"

interface FileCryptProps {
  mode: CryptMode
  setMode: Dispatch<SetStateAction<CryptMode>>
}

export const FileCrypt = ({ mode, setMode }: FileCryptProps) => {
  const [isDownloadable, setIsDownloadable] = useState(false)
  const {
    encrypt,
    decrypt,
    encryptedFile,
    handleInputOnChange,
    handleOnDrop,
    file,
    isDragging,
    setIsDragging
  } = useFileEncryption(setMode)

  if (mode === "encrypt") {
    return (
      <fieldset className="flex w-full flex-col gap-2">
        <label
          className={clsx(
            "relative flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 text-xl font-normal transition-all",
            {
              "border-zinc-900": !isDragging && !file,
              "border-blue-600 bg-blue-300/50": isDragging,
              "border-emerald-600 bg-emerald-300/50": file
            }
          )}
          onDragOver={e => e.preventDefault()}
          onDragEnter={() => !isDragging && setIsDragging(true)}
          onDragLeave={() => isDragging && setIsDragging(false)}
          onDrop={handleOnDrop}
          htmlFor="file">
          {!!file ? (
            <>
              {file.type.includes("image") && (
                <img
                  className="h-full w-full object-cover"
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                />
              )}
              <span className="absolute bottom-2 rounded bg-zinc-900 p-1 text-white">
                {file.name}
              </span>
            </>
          ) : (
            <span className="text-zinc-900">Drag and drop a file here</span>
          )}
          <input hidden type="file" id="file" onChange={handleInputOnChange} />
        </label>
        <button
          disabled={!file && !encryptedFile}
          className="w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
          type="button"
          onClick={encrypt}>
          Encrypt
        </button>
        {isDownloadable && file && (
          <a
            className="w-full rounded-md bg-zinc-900 p-2 text-center text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
            href={URL.createObjectURL(file)}
            download={file.name}>
            Download
          </a>
        )}
      </fieldset>
    )
  }

  return (
    <fieldset className="flex w-full flex-col gap-2">
      <label
        className={clsx(
          "relative flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 text-xl font-normal transition-all",
          {
            "border-zinc-900": !isDragging && !file,
            "border-blue-600 bg-blue-300/50": isDragging,
            "border-emerald-600 bg-emerald-300/50": file
          }
        )}
        onDragOver={e => e.preventDefault()}
        onDragEnter={() => !isDragging && setIsDragging(true)}
        onDragLeave={() => isDragging && setIsDragging(false)}
        onDrop={handleOnDrop}
        htmlFor="encrypted-img">
        <span className="text-zinc-900">
          {encryptedFile ? "Encrypted File" : "Drag and drop a file here"}
        </span>
        <input
          hidden
          type="file"
          id="encrypted-img"
          onChange={handleInputOnChange}
        />
      </label>
      <button
        disabled={!file && !encryptedFile}
        className="w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
        type="button"
        onClick={() => {
          decrypt()
          setIsDownloadable(true)
        }}>
        Decrypt
      </button>
    </fieldset>
  )
}