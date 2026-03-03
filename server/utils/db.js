import { Pool } from 'pg'

let pool

export function getDbPool() {
  if (!pool) {
    pool = new Pool({
      host: process.env.DATABASE_HOST || '51.91.159.188',
      port: parseInt(process.env.DATABASE_PORT) || 5433,
      user: process.env.DATABASE_USER || 'postgres',
      password: process.env.DATABASE_PASSWORD || 'yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG',
      database: process.env.DATABASE_NAME || 'postgres'
    })
  }
  return pool
}
