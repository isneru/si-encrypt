import { ChangeEvent } from "react"

export type Fieldset = {
  id: string
  label: string
  input: FieldsetInput
  button: FieldsetButton
}

export type FieldsetInput = {
  value: string
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

export type FieldsetButton = {
  onClick: () => void
  label: string
}

export type CryptMode = "encrypt" | "decrypt"
