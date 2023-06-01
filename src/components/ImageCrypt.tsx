import clsx from "clsx"
import { useImageEncryption } from "lib/hooks"
import { CryptMode } from "lib/types/crypt"
import { Dispatch, SetStateAction } from "react"

interface ImageCryptProps {
  mode: CryptMode
  setMode: Dispatch<SetStateAction<CryptMode>>
}

export const ImageCrypt = ({ mode, setMode }: ImageCryptProps) => {
  const {
    encrypt,
    decrypt,
    encryptedImage,
    handleInputOnChange,
    handleOnDrop,
    image,
    isDragging,
    isWrong,
    setIsDragging
  } = useImageEncryption(setMode)

  if (mode === "encrypt") {
    return (
      <fieldset className="flex w-full flex-col gap-2">
        <label
          className={clsx(
            "relative flex aspect-[21/9] w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-md border-2 text-xl font-normal transition-all",
            {
              "border-zinc-900": !isDragging && !image && !isWrong,
              "border-blue-600 bg-blue-300/50": isDragging,
              "border-emerald-600 bg-emerald-300/50": image,
              "border-red-600 bg-red-300/50": isWrong
            }
          )}
          onDragOver={e => e.preventDefault()}
          onDragEnter={() => !isDragging && setIsDragging(true)}
          onDragLeave={() => isDragging && setIsDragging(false)}
          onDrop={handleOnDrop[mode]}
          htmlFor="image">
          {!!image && image.type.includes("image") ? (
            <>
              <img
                className="h-full w-full object-cover"
                src={URL.createObjectURL(image)}
                alt={image.name}
              />
              <span className="absolute bottom-2 rounded bg-zinc-900 p-1 text-white">
                {image.name}
              </span>
            </>
          ) : (
            <span className="text-zinc-900">Drag and drop an image here</span>
          )}
          <input
            hidden
            accept="image/*"
            type="file"
            id="image"
            onChange={handleInputOnChange[mode]}
          />
        </label>
        <button
          disabled={!image && !encryptedImage}
          className="w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
          type="button"
          onClick={encrypt}>
          Encrypt
        </button>
        {image ? (
          <a
            className="w-full rounded-md bg-zinc-900 p-2 text-center text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
            href={URL.createObjectURL(image)}
            download="decrypted">
            Download
          </a>
        ) : (
          <button
            disabled
            className="w-full rounded-md bg-zinc-900 p-2 text-center text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90">
            Download
          </button>
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
            "border-zinc-900": !isDragging && !image && !isWrong,
            "border-blue-600 bg-blue-300/50": isDragging,
            "border-emerald-600 bg-emerald-300/50": image,
            "border-red-600 bg-red-300/50": isWrong
          }
        )}
        onDragOver={e => e.preventDefault()}
        onDragEnter={() => !isDragging && setIsDragging(true)}
        onDragLeave={() => isDragging && setIsDragging(false)}
        onDrop={handleOnDrop[mode]}
        htmlFor="encrypted-img">
        <span className="text-zinc-900">
          {encryptedImage ? "Encrypted Image" : "Drag and drop an image here"}
        </span>
        <input
          hidden
          type="file"
          id="encrypted-img"
          onChange={handleInputOnChange[mode]}
        />
      </label>
      <button
        disabled={!image && !encryptedImage}
        className="w-full rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
        type="button"
        onClick={decrypt}>
        Decrypt
      </button>
      {encryptedImage ? (
        <a
          className="w-full rounded-md bg-zinc-900 p-2 text-center text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
          download="encrypted"
          href={URL.createObjectURL(new File([encryptedImage], "encrypted"))}>
          Download
        </a>
      ) : (
        <button
          disabled
          className="w-full rounded-md bg-zinc-900 p-2 text-center text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90">
          Download
        </button>
      )}
    </fieldset>
  )
}
