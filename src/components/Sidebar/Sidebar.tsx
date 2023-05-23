import { Cross2Icon, HamburgerMenuIcon } from "@radix-ui/react-icons"
import clsx from "clsx"
import Link from "next/link"
import { useState } from "react"
import { links } from "utils/links"

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <aside
      className={clsx(
        "flex h-full flex-col items-center gap-4 bg-zinc-900 p-5 text-white md:static md:w-96 md:justify-normal",
        {
          "absolute left-0 top-0 w-full justify-center": isOpen,
          "w-10": !isOpen
        }
      )}>
      <button
        className={clsx("md:hidden", {
          "absolute right-5 top-5": isOpen,
          static: !isOpen
        })}
        onClick={() => setIsOpen(val => !val)}>
        <Icon isOpen={isOpen} />
      </button>
      <div
        className={clsx("w-full flex-col gap-4", {
          flex: isOpen,
          "hidden md:flex": !isOpen
        })}>
        <Link href="/" className="flex text-xl font-bold">
          ENCRYPT <span className="ml-auto">SI</span>
        </Link>
        {links.map(link => (
          <Link
            key={link.name}
            className="w-full rounded-md bg-zinc-200 p-2 font-bold text-black hover:bg-zinc-100"
            href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
      <img src="/pporto.png" alt="P Porto" className="mt-auto grayscale" />
    </aside>
  )
}

const Icon = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <Cross2Icon width={20} height={20} />
  ) : (
    <HamburgerMenuIcon width={20} height={20} />
  )
}
