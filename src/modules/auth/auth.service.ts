import { AuthRepository } from './auth.repository.js'
import type {
  AuthResponse,
  AuthToken
} from '../../@commons/interfaces/authToken.js'
import type { PasswordHasher } from '../../@commons/interfaces/passwordHasher.js'

export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly passwordHasher: PasswordHasher,
    private readonly authToken: AuthToken
  ) {}

  async register(
    email: string,
    password: string
  ): Promise<AuthResponse | null> {
    const passwordHash = await this.passwordHasher.hashPassword(password)

    const user = await this.authRepository.register(email, passwordHash)
    if (!user) {
      return null
    }

    const token = this.authToken.generate({
      id: String(user.id),
      email: user.email,
      roles: user.roles
    })

    return {
      token: token,
      data: {
        id: user.id,
        email: user.email,
        roles: user.roles
      }
    }
  }
}
