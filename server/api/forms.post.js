// Ruta POST para guardar un formulario en PostgreSQL
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
    const body = await readBody(event)
    if (!body || !body.nombre || !body.formulario) {
      return { error: 'Faltan campos requeridos: nombre y formulario' }
    }

    // Verificar si existe un registro con ese nombre
    const checkQuery = 'SELECT id FROM generacion_docs WHERE nombre = $1'
    const checkResult = await client.query(checkQuery, [body.nombre])

    let result
    if (checkResult.rows.length > 0) {
      // Actualizar registro existente
      const updateQuery = `
        UPDATE generacion_docs 
        SET formulario = $1, updated_at = NOW()
        WHERE nombre = $2
        RETURNING *
      `
      result = await client.query(updateQuery, [JSON.stringify(body.formulario), body.nombre])
    } else {
      // Insertar nuevo registro
      const insertQuery = `
        INSERT INTO generacion_docs (nombre, formulario)
        VALUES ($1, $2)
        RETURNING *
      `
      result = await client.query(insertQuery, [body.nombre, JSON.stringify(body.formulario)])
    }

    return {
      ok: true,
      message: 'Datos guardados correctamente en PostgreSQL',
      data: result.rows[0]
    }
  } catch (err) {
    console.error('[forms.post] Error:', err)
    return { error: err.message }
  } finally {
    client.release()
  }
})
