import { Pool } from 'pg'

let pool

export function getDbPool() {
  let host = process.env.DATABASE_HOST || '51.91.159.188'
  if (host === '127.0.0.1' || host === 'localhost') host = '51.91.159.188'

  // Recreamos siempre el pool para evitar cacheos de Nitro en dev
  if (pool) {
    try { pool.end() } catch (e) { }
  }

  pool = new Pool({
    host,
    port: parseInt(process.env.DATABASE_PORT) || 5433,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG',
    database: process.env.DATABASE_NAME || 'postgres'
  })

  return pool
}
