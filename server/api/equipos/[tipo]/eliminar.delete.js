import { getDbPool } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const { tipo } = event.context.params

  try {
    const body = await readBody(event)
    const { id } = body

    if (!id) {
      throw new Error('ID de equipo requerido')
    }

    // Validar tipo
    const tiposValidos = ['inversores', 'generadores', 'baterias', 'modulos']
    if (!tiposValidos.includes(tipo)) {
      throw new Error(`Tipo de equipo no válido: ${tipo}`)
    }

    const pool = getDbPool()
    const client = await pool.connect()

    try {
      const result = await client.query(`
        DELETE FROM equipos 
        WHERE id = $1 AND tipo = $2
        RETURNING *
      `, [id, tipo])

      if (result.rowCount === 0) {
        throw new Error(`Equipo con ID ${id} no encontrado en la BD`)
      }

      console.log(`🗑️ Equipo eliminado de ${tipo} en BD:`, result.rows[0])

      return {
        success: true,
        equipo: result.rows[0],
        message: `Equipo eliminado de ${tipo}`
      }

    } finally {
      client.release()
    }
  } catch (error) {
    console.error(`❌ Error al eliminar equipo:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error al eliminar: ${error.message}`
    })
  }
})
