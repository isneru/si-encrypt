import { useState } from "react"
import { CryptMode } from "utils/types/crypt"

export function useMode() {
  const [mode, setMode] = useState<CryptMode>("encrypt")

  return { mode, setMode }
}
