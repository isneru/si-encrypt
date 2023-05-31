import { motion } from "framer-motion"
import { CryptMode } from "lib/types/crypt"
import { Dispatch, SetStateAction } from "react"

interface CryptNavProps {
  mode: CryptMode
  setMode: Dispatch<SetStateAction<CryptMode>>
}

export const CryptNav = ({ mode, setMode }: CryptNavProps) => {
  const modes = ["encrypt", "decrypt"] as const
  return (
    <nav className="flex space-x-1">
      {modes.map(tab => (
        <button
          key={tab}
          onClick={() => setMode(tab)}
          className="relative rounded-full px-3 py-1.5 font-medium capitalize text-black transition"
          style={{
            WebkitTapHighlightColor: "transparent"
          }}>
          {mode === tab && (
            <motion.span
              layoutId="bubble"
              className="absolute inset-0 z-10 bg-white mix-blend-exclusion"
              style={{ borderRadius: 8 }}
              transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
            />
          )}
          {tab}
        </button>
      ))}
    </nav>
  )
}
