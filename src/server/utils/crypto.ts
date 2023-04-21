import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export type EncryptData = {
  iv: string
  encryptedText: string
}

export const algorithm = "aes-256-cbc"

export const keyAsBuffer = randomBytes(32)

export const ivAsBuffer = randomBytes(16)
export const ivAsString = ivAsBuffer.toString("hex")

export function encrypt(text: string) {
  const cipher = createCipheriv(algorithm, keyAsBuffer, ivAsBuffer)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decrypt(textToDecrypt: string): string {
  const encryptedText = Buffer.from(textToDecrypt, "hex")
  const decipher = createDecipheriv(algorithm, keyAsBuffer, ivAsBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export function encryptImage() {}

export function decryptImage() {}
