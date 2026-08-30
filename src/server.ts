import 'dotenv/config'

import app from './app.js'
import { initDatabase } from './databases/database.js'

const PORT = Number(process.env.PORT) || 3000

async function server() {
  try {
    await initDatabase()

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta: ${String(PORT)}`)
    })
  } catch (error) {
    console.error('Erro ao iniciar a aplicação:', error)
    process.exit(1)
  }
}

server().catch(console.error)
