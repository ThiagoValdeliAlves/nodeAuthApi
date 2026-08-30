import 'dotenv/config'

import { initDatabase } from './databases/database.js'

async function server() {
  try {
    await initDatabase()
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error)
    process.exit(1)
  }
}

server().catch(console.error)
