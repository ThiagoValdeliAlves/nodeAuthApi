import type { UserRoles } from '../types/user.js'

export interface JwtPayload {
  id: string
  email: string
  roles: UserRoles
}
