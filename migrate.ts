import fs from 'node:fs'
import path from 'node:path'

import { pool } from './src/databases/database.js'

async function migrate() {
  const client = await pool.connect()

  try {
    await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      name TEXT PRIMARY KEY,
      executed_at TIMESTAMP DEFAULT NOW()
    )
  `)

    const migrationsDir = path.join(
      process.cwd(),
      'src',
      'databases',
      'migrations'
    )

    const files = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith('.sql'))
      .sort()

    for (const file of files) {
      const { rows } = await client.query(
        'SELECT 1 FROM migrations WHERE name = $1',
        [file]
      )
      if (rows.length > 0) {
        continue
      }
      console.log(`Executando ${file}...`)

      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8')
      await client.query('BEGIN')
      try {
        await client.query(sql)

        await client.query('INSERT INTO migrations (name) VALUES ($1)', [file])

        await client.query('COMMIT')

        console.log(`y: ${file}`)
      } catch (error) {
        console.log(`n: ${file}`)

        await client.query('ROLLBACK')
        throw error
      }
    }
  } finally {
    client.release()
  }

  await pool.end()
}

migrate().catch((error: unknown) => {
  console.error(error)
  process.exit(1)
})
