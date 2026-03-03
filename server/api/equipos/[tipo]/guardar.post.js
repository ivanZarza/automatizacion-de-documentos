import { getDbPool } from '../../../utils/db'

export default defineEventHandler(async (event) => {
  const { tipo } = event.context.params

  try {
    const body = await readBody(event)

    // Validar tipo
    const tiposValidos = ['inversores', 'generadores', 'baterias', 'modulos']
    if (!tiposValidos.includes(tipo)) {
      throw new Error(`Tipo de equipo no válido: ${tipo}`)
    }

    // Crear nuevo equipo con ID y nombre
    const id = `${tipo.slice(0, 3)}_${Date.now().toString(36)}${Math.random().toString(36).substring(2, 7)}`
    const nombre = body.marcaModelo || body.marca || 'Sin nombre'

    const pool = getDbPool()
    const client = await pool.connect()

    try {
      await client.query(`
        INSERT INTO equipos (id, tipo, nombre, datos)
        VALUES ($1, $2, $3, $4)
      `, [id, tipo, nombre, body])

      const nuevoEquipo = {
        id,
        tipo,
        fechaCreacion: new Date().toISOString(),
        ...body
      }

      console.log(`✅ Equipo guardado en BD (${tipo}):`, nuevoEquipo)

      return {
        success: true,
        equipo: nuevoEquipo,
        message: `Equipo agregado a ${tipo}`
      }

    } finally {
      client.release()
    }
  } catch (error) {
    console.error(`❌ Error al guardar equipo en BD:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error al guardar: ${error.message}`
    })
  }
})
