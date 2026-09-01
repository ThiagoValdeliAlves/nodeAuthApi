import type { User } from '../../@commons/interfaces/user.js'

export type RegisterUserResult = Pick<User, 'id' | 'email' | 'roles'>
