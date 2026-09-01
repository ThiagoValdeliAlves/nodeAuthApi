import { Router } from 'express'

import { authController } from '../../container.js'

const authRoutes = Router()

authRoutes.post('/register', (req, res) => authController.register(req, res))

export default authRoutes
