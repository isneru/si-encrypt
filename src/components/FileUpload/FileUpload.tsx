import clsx from "clsx"

interface FileUploadProps {
  isDragging: boolean
  file: File | undefined
  isWrong: boolean
  setDragging: () => void
  unsetDragging: () => void
  handleOnDrop: (e: React.DragEvent<HTMLLabelElement>) => void
  handleEncrypt: () => void
  setFile: (file: File | undefined) => void
  encryptedFile: string | undefined
  handleDecrypt: () => void
  handleInputOnChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept: string
}

export const FileUpload = (props: FileUploadProps) => {
  return (
    <>
      <form
        onSubmit={e => e.preventDefault()}
        className="mt-10 flex w-full max-w-[80%] items-center justify-center gap-4 font-semibold">
        <label
          className={clsx(
            "relative flex aspect-video w-full flex-col items-center justify-center overflow-hidden rounded-md border-2 text-xl font-normal transition-all",
            {
              "border-zinc-900":
                !props.isDragging && !props.file && !props.isWrong,
              "border-blue-600 bg-blue-300/50": props.isDragging,
              "border-emerald-600 bg-emerald-300/50": props.file,
              "border-red-600 bg-red-300/50": props.isWrong
            }
          )}
          onDragOver={e => e.preventDefault()}
          onDragEnter={props.setDragging}
          onDragLeave={props.unsetDragging}
          onDrop={props.handleOnDrop}
          htmlFor="file">
          {!!props.file && !props.encryptedFile && (
            <>
              {props.file.type.includes("image") && (
                <img
                  className="h-full w-full object-cover"
                  src={URL.createObjectURL(props.file)}
                  alt={props.file.name}
                />
              )}
            </>
          )}
          {!props.file ? (
            <span className="text-zinc-900">
              {props.accept === "image/*"
                ? "Drag and drop an image here"
                : "Drag and drop a file here"}
            </span>
          ) : (
            <span className="absolute bottom-2 rounded bg-zinc-900 p-1 text-white">
              {props.file.name}
            </span>
          )}
        </label>
        <input
          hidden
          accept={props.accept}
          type="file"
          id="file"
          onChange={props.handleInputOnChange}
        />
      </form>
      <button
        disabled={!props.file && !props.encryptedFile}
        className="mt-2 w-full max-w-[80%] rounded-md bg-zinc-900 p-2 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
        type="button"
        onClick={!!props.file ? props.handleEncrypt : props.handleDecrypt}>
        {!!props.file ? "Encrypt" : "Decrypt"}
      </button>
    </>
  )
}
