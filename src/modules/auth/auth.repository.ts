import { Pool } from 'pg'

import type { RegisterUserResult } from './auth.dto.js'

export class AuthRepository {
  constructor(private readonly pool: Pool) {}

  async register(
    email: string,
    passwordHash: string
  ): Promise<RegisterUserResult | null> {
    const { rows } = await this.pool.query<RegisterUserResult>(
      `INSERT INTO users (email, password_hash)
       VALUES ($1, $2)
       ON CONFLICT (email) DO NOTHING
       RETURNING id, email, roles`,
      [email, passwordHash]
    )

    return rows[0] ?? null
  }
}
