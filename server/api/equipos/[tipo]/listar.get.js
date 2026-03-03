import { getDbPool } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const { tipo } = event.context.params

  try {
    // Validar tipo
    const tiposValidos = ['inversores', 'generadores', 'baterias', 'modulos']
    if (!tiposValidos.includes(tipo)) {
      throw new Error(`Tipo de equipo no válido: ${tipo}`)
    }

    const pool = getDbPool()
    const client = await pool.connect()

    try {
      // 1. Asegurar que la tabla existe
      await client.query(`
        CREATE TABLE IF NOT EXISTS equipos (
          id VARCHAR(100) PRIMARY KEY,
          tipo VARCHAR(50) NOT NULL,
          nombre VARCHAR(255) NOT NULL,
          datos JSONB NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );
      `)

      // 2. Obtener los equipos del tipo solicitado
      const result = await client.query(
        'SELECT * FROM equipos WHERE tipo = $1 ORDER BY created_at DESC',
        [tipo]
      )

      // Transformar para el frontend: unificar datos JSONB en la raíz del objeto
      const equipos = result.rows.map(row => {
        return {
          id: row.id,
          tipo: row.tipo,
          fechaCreacion: row.created_at,
          ...row.datos
        }
      })

      return equipos

    } finally {
      client.release()
    }
  } catch (error) {
    console.error(`❌ Error al listar equipos de ${tipo}:`, error)
    return []
  }
})
