import type { RegisterUserResult } from './auth.dto.js'
import { AuthRepository } from './auth.repository.js'
import type { PasswordHasher } from '../../@commons/interfaces/passwordHasher.js'

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordHasher: PasswordHasher
  ) {}

  async register(
    email: string,
    password: string
  ): Promise<RegisterUserResult | null> {
    const passwordHash = await this.passwordHasher.hashPassword(password)

    const user = await this.authRepository.register(email, passwordHash)
    if (!user) {
      return null
    }

    return user
  }
}
