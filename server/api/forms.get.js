// Ruta GET para recuperar formularios de PostgreSQL
// Si se pasa ?nombre=... devuelve solo ese, si no, todos
import { Pool } from 'pg'

function getPool() {
  return new Pool({
    host: process.env.DATABASE_HOST || '51.91.159.188',
    port: parseInt(process.env.DATABASE_PORT) || 5433,
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD || 'yLDXHfdOBe3u9o3q19eyDm9EiXSWTuaI2shMDNkp22QjY6qTCoXD4NvtlFRdHGlG',
    database: process.env.DATABASE_NAME || 'postgres'
  })
}

export default defineEventHandler(async (event) => {
  const pool = getPool()
  const client = await pool.connect()
  try {
    const query = getQuery(event)
    
    if (query && query.nombre) {
      // Buscar formularios por nombre con búsqueda parcial e insensible a mayúsculas
      const selectQuery = 'SELECT * FROM generacion_docs WHERE nombre ILIKE $1 ORDER BY nombre ASC'
      const searchTerm = `%${query.nombre}%`
      const result = await client.query(selectQuery, [searchTerm])
      
      if (result.rows.length === 0) {
        return { error: 'No encontrado' }
      }
      // Si hay solo uno, devolverlo directamente
      if (result.rows.length === 1) {
        return result.rows[0]
      }
      // Si hay varios, devolverlos como array
      return result.rows
    } else {
      // Retornar todos los formularios ordenados por fecha de creación
      const selectQuery = 'SELECT * FROM generacion_docs ORDER BY created_at DESC'
      const result = await client.query(selectQuery)
      return result.rows || []
    }
  } catch (err) {
    console.error('[forms.get] Error:', err)
    return { error: err.message }
  } finally {
    client.release()
  }
})
