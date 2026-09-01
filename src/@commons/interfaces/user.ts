import type { UserRoles } from '../types/user.js'

export interface User {
  id: number
  email: string
  password_hash: string
  roles: UserRoles
  creation_date: Date
}
