import { FileUpload, Layout } from "components"
import { type NextPage } from "next"
import { useContext } from "react"
import { ImageEncryptionContext } from "utils/providers/encrypt/image"

const Image: NextPage = () => {
  const c = useContext(ImageEncryptionContext)

  return (
    <Layout title="Image Encryption">
      <FileUpload
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
      />
    </Layout>
  )
}

export default Image
