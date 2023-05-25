import { CryptNav, ImageCrypt, Layout } from "components"
import { type NextPage } from "next"
import { useMode } from "utils/hooks"

const ImagePage: NextPage = () => {
  const { mode, setMode } = useMode()

  return (
    <Layout title="Image Encryption">
      <CryptNav mode={mode} setMode={setMode} />
      <section className="mt-2 flex w-full max-w-[80%] flex-col items-center justify-center gap-4 font-semibold">
        {/*     <FileUpload
          accept="image/*"
          handleOnDrop={c.handleOnDrop}
          setDragging={c.setDragging}
          unsetDragging={c.unsetDragging}
          encryptedFile={c.encryptedFile}
          file={c.file}
          isDragging={c.isDragging}
          isWrong={c.isWrong}
          handleDecrypt={c.handleDecrypt}
          handleEncrypt={c.handleEncrypt}
          handleInputOnChange={c.handleInputOnChange}
          setFile={c.setFile}
        /> */}
        <ImageCrypt mode={mode} setMode={setMode} />
      </section>
    </Layout>
  )
}

export default ImagePage
