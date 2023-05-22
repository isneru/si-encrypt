import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export type EncryptData = {
  iv: string
  encryptedText: string
}

export const keyAsBuffer = randomBytes(32)

export const ivAsBuffer = randomBytes(16)
export const ivAsString = ivAsBuffer.toString("hex")

// text encryption
export function encrypt(text: string) {
  const cipher = createCipheriv("aes-256-cbc", keyAsBuffer, ivAsBuffer)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decrypt(textToDecrypt: string): string {
  const encryptedText = Buffer.from(textToDecrypt, "hex")
  const decipher = createDecipheriv("aes-256-cbc", keyAsBuffer, ivAsBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

// image encryption
export function encryptImage(imageAsString: string) {
  const cipher = createCipheriv("aes-256-cbc", keyAsBuffer, ivAsBuffer)
  let encrypted = cipher.update(imageAsString)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decryptImage(imageToDecrypt: string): string {
  const encryptedText = Buffer.from(imageToDecrypt, "hex")
  const decipher = createDecipheriv("aes-256-cbc", keyAsBuffer, ivAsBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

// TODO: file encryption
export function encryptFile(fileAsString: string) {
  const cipher = createCipheriv("aes-256-cbc", keyAsBuffer, ivAsBuffer)
  let encrypted = cipher.update(fileAsString)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decryptFile(fileToDecrypt: string): string {
  const encryptedText = Buffer.from(fileToDecrypt, "hex")
  const decipher = createDecipheriv("aes-256-cbc", keyAsBuffer, ivAsBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
