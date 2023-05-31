import { createCipheriv, createDecipheriv, randomBytes } from "crypto"

export const keyBuffer = randomBytes(32)
export const ivBuffer = randomBytes(16)

function getKeyBuffer(userKey?: string) {
	if (userKey) {
		const keyBufferFill = Buffer.alloc(32, 0)
		const userKeyBuffer = Buffer.from(userKey, "utf-8")
		return Buffer.concat([userKeyBuffer, keyBufferFill]).subarray(0, 32)
	} else {
		return keyBuffer
	}
}

export function encryptText(text: string, userKey?: string) {
  const cipher = createCipheriv("aes-256-cbc", getKeyBuffer(userKey), ivBuffer)
  let encrypted = cipher.update(text)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decryptText(text: string, userKey?: string) {
  const encryptedText = Buffer.from(text, "hex")
  const decipher = createDecipheriv("aes-256-cbc", getKeyBuffer(userKey),ivBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export function encryptImage(imageString: string, userKey?: string) {
  const cipher = createCipheriv("aes-256-cbc", getKeyBuffer(userKey), ivBuffer)
  let encrypted = cipher.update(imageString)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decryptImage(image: string, userKey?: string) {
  const encryptedText = Buffer.from(image, "hex")
  const decipher = createDecipheriv("aes-256-cbc", getKeyBuffer(userKey),ivBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}

export function encryptFile(fileString: string, userKey?: string) {
  const cipher = createCipheriv("aes-256-cbc", getKeyBuffer(userKey), ivBuffer)
  let encrypted = cipher.update(fileString)
  encrypted = Buffer.concat([encrypted, cipher.final()])
  return encrypted.toString("hex")
}

export function decryptFile(file: string, userKey?: string) {
  const encryptedText = Buffer.from(file, "hex")
  const decipher = createDecipheriv("aes-256-cbc", getKeyBuffer(userKey),ivBuffer)
  let decrypted = decipher.update(encryptedText)
  decrypted = Buffer.concat([decrypted, decipher.final()])
  return decrypted.toString()
}
