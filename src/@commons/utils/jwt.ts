import jwt from 'jsonwebtoken'

import type { AuthToken } from '../interfaces/authToken.js'
import type { JwtPayload } from '../interfaces/jwt.js'

export class JwtAuthToken implements AuthToken {
  generate(payload: JwtPayload) {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não definida')
    }

    return jwt.sign(payload, jwtSecret, { expiresIn: '1h' })
  }

  verify(token: string): JwtPayload {
    const jwtSecret = process.env.JWT_SECRET
    if (!jwtSecret) {
      throw new Error('JWT_SECRET não definida')
    }

    const decoded = jwt.verify(token, jwtSecret)
    if (typeof decoded === 'string') {
      throw new Error('Payload do JWT inválido')
    }

    return decoded as JwtPayload
  }
}
