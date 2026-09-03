import type { JwtPayload } from './jwt.js'
import type { User } from './user.js'

export interface AuthToken {
  generate(payload: JwtPayload): string
  verify(token: string): JwtPayload
}

export interface AuthResponse {
  token: string
  data: Pick<User, 'id' | 'email' | 'roles'>
}
