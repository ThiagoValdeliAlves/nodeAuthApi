import { BcryptPasswordHasher } from './@commons/utils/bcrypt.js'
import { pool } from './databases/database.js'
import { AuthController } from './modules/auth/auth.controller.js'
import { AuthRepository } from './modules/auth/auth.repository.js'
import { AuthService } from './modules/auth/auth.service.js'

const authRepository = new AuthRepository(pool)
const passwordHasher = new BcryptPasswordHasher()

const authService = new AuthService(authRepository, passwordHasher)

export const authController = new AuthController(authService)
