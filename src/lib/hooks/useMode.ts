import { CryptMode } from "lib/types/crypt"
import { useState } from "react"

export function useMode() {
  const [mode, setMode] = useState<CryptMode>("encrypt")

  return { mode, setMode }
}
