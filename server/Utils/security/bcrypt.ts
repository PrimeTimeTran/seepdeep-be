import bcrypt from 'bcryptjs'

export const encryptPassword = async (password: string) => {
  return await bcrypt.hash(password, 10)
}

export const decryptPassword = async (password: string, hash: string) => {
  return await bcrypt.compare(password, hash)
}
