import { Cross2Icon } from "@radix-ui/react-icons"
import { AnimatePresence, motion } from "framer-motion"
import { ReactNode, createContext, useEffect, useState } from "react"

interface CustomKeyProviderProps {
  children: ReactNode
}

export const CustomKeyContext = createContext(
  {} as {
    key: string | undefined
  }
)

export const CustomKeyProvider = ({ children }: CustomKeyProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [key, setKey] = useState("")

  useEffect(() => {
    if (localStorage) {
      setKey(localStorage.getItem("customKey") ?? "")
    }
  }, [isModalOpen])

  function saveKey() {
    localStorage.setItem("customKey", key)
    closeModal()
  }

  function closeModal() {
    setKey("")
    setIsModalOpen(false)
  }

  function openModal() {
    setIsModalOpen(true)
  }

  function clearKey() {
    localStorage.removeItem("customKey")
    closeModal()
  }

  return (
    <CustomKeyContext.Provider value={{ key: !!key ? key : undefined }}>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 transition-opacity">
            <motion.div
              transition={{ type: "spring", bounce: 0.1, duration: 0.3 }}
              initial={{
                y: 100,
                opacity: 0
              }}
              animate={{
                y: 0,
                opacity: 1
              }}
              exit={{
                opacity: 0
              }}
              className="container flex h-full w-full flex-col gap-3 bg-white px-6 py-4 md:h-4/5 md:rounded-lg">
              <div className="flex w-full">
                <p className="text-2xl font-bold">Change Key</p>
                <button onClick={closeModal} className="ml-auto">
                  <Cross2Icon />
                </button>
              </div>
              <input
                className="mt-6 rounded-md border-2 border-zinc-800 bg-transparent px-2 py-3 outline-none focus:border-zinc-900"
                autoFocus
                type="text"
                value={key}
                onChange={e => setKey(e.target.value)}
              />
              <span className="font-medium text-zinc-800">
                Current key: {!!key ? key : "none"}
              </span>
              <div className="mt-auto flex items-center justify-center gap-4">
                <button
                  onClick={clearKey}
                  className="w-full rounded-md bg-zinc-900 p-3 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90">
                  Clear Key
                </button>
                <button
                  disabled={!key}
                  className="w-full rounded-md bg-zinc-900 p-3 text-white focus:shadow disabled:cursor-not-allowed disabled:opacity-90"
                  onClick={saveKey}>
                  Save
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
      <button
        className="absolute bottom-4 right-4 rounded-md bg-zinc-900 p-3 text-white focus:shadow"
        onClick={openModal}>
        Manage custom key
      </button>
    </CustomKeyContext.Provider>
  )
}
