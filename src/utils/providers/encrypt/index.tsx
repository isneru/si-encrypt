import { ReactNode } from "react"
import { ImageEncryptionProvider } from "utils/providers/encrypt/image"
import { TextEncryptionProvider } from "utils/providers/encrypt/text"

interface EncryptionProviderProps {
  children: ReactNode
}

export const EncryptionProvider = ({ children }: EncryptionProviderProps) => {
  return (
    <TextEncryptionProvider>
      <ImageEncryptionProvider>{children}</ImageEncryptionProvider>
    </TextEncryptionProvider>
  )
}
