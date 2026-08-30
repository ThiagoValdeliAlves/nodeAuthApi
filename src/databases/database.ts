import { Pool } from 'pg'

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 10,
  min: 0
})

pool.on('error', (err) => {
  console.error('Erro inesperado em conexão pool:', err)
  process.exit(1)
})

export async function initDatabase() {
  console.log('Iniciando banco de dados...')
  await pool.query('SELECT 1')
  console.log('Banco de dados iniciado com sucesso!')
}
