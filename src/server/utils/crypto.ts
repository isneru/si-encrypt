import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export type EncryptData = {
  iv: string
  encryptedText: string
}

export const algorithm = "aes-256-cbc"
export const key = randomBytes(32)
export const iv = randomBytes(16)

export function encrypt(text: string): EncryptData {
  const cipher = createCipheriv(algorithm, Buffer.from(key), iv)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return { iv: iv.toString("hex"), encryptedText: encrypted.toString("hex") }
}

export function decrypt(data: EncryptData): string {
  const iv = Buffer.from(data.iv, "hex")
  const encryptedText = Buffer.from(data.encryptedText, "hex")
  const decipher = createDecipheriv(algorithm, Buffer.from(key), iv)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
