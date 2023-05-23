import { FileUpload, Layout } from "components"
import { type NextPage } from "next"
import { useContext } from "react"
import { FileEncryptionContext } from "utils/providers/encrypt/file"

const File: NextPage = () => {
  const c = useContext(FileEncryptionContext)

  return (
    <Layout title={"File Encryption"}>
      <FileUpload
        accept="*"
        handleOnDrop={c.handleOnDrop}
        setDragging={c.setDragging}
        unsetDragging={c.unsetDragging}
        encryptedFile={c.encryptedFile}
        isWrong={false}
        file={c.file}
        isDragging={c.isDragging}
        handleDecrypt={c.handleDecrypt}
        handleEncrypt={c.handleEncrypt}
        handleInputOnChange={c.handleInputOnChange}
        setFile={c.setFile}
      />
    </Layout>
  )
}

export default File
