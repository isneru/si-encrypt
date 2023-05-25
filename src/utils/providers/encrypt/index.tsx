import { ReactNode } from "react"
import { FileEncryptionProvider } from "utils/providers/encrypt/file"

interface EncryptionProviderProps {
  children: ReactNode
}

export const EncryptionProvider = ({ children }: EncryptionProviderProps) => {
  return <FileEncryptionProvider>{children}</FileEncryptionProvider>
}
