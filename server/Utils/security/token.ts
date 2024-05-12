import type { JwtPayload } from 'jsonwebtoken'
import jwt from 'jsonwebtoken'

export function jwtSign(payload: any, expiresIn?: string | number | null) {
  const runtimeConfig = useRuntimeConfig()
  let expiresInOrNull: string | number | null =
    expiresIn || runtimeConfig.authTokenExpiresIn

  if (expiresInOrNull === Infinity) {
    expiresInOrNull = null
  }

  const { authTokenSecret = 'authTokenSecret' } = runtimeConfig

  return jwt.sign(
    payload,
    String(authTokenSecret),
    expiresInOrNull
      ? {
          expiresIn: expiresInOrNull,
        }
      : undefined
  )
}

export interface Payload {
  email?: string
  token?: string
}

export type PayloadObj = string | JwtPayload | Payload | null

export function jwtVerify(token: string): PayloadObj | null {
  try {
    const runtimeConfig = useRuntimeConfig()
    const { authTokenSecret = 'authTokenSecret' } = runtimeConfig
    const payload: PayloadObj = jwt.verify(token, String(authTokenSecret))
    return payload
  } catch (error) {
    return null
  }
}
