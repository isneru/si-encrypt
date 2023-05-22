import { ReactNode } from "react"
import { FileEncryptionProvider } from "utils/providers/encrypt/file"
import { ImageEncryptionProvider } from "utils/providers/encrypt/image"
import { TextEncryptionProvider } from "utils/providers/encrypt/text"

interface EncryptionProviderProps {
  children: ReactNode
}

export const EncryptionProvider = ({ children }: EncryptionProviderProps) => {
  return (
    <TextEncryptionProvider>
      <ImageEncryptionProvider>
        <FileEncryptionProvider>{children}</FileEncryptionProvider>
      </ImageEncryptionProvider>
    </TextEncryptionProvider>
  )
}
