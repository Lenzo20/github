import bct from 'bcrypt'

export async function authToken(value: string) {
  if (value) {
    const hashPassword = await bct.hash(value, 8)

    return hashPassword
  }

  throw new Error('Value invalid')
}

export async function authPassword(
  value: string,
  hashPassword: string,
  newPassword: string,
): Promise<string> {
  if (value) {
    try {
      if (bct.compareSync(value, hashPassword)) {
        const newHashPassword = await authToken(newPassword)
        return newHashPassword
      }
    } catch (error) {
      return 'Value invalid'
    }
  }

  return 'Value invalid'
}
