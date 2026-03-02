import fs from 'fs'
import path from 'path'

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

    // Ruta del archivo JSON
    const filePath = path.join(process.cwd(), 'app', 'data', `equipos_${tipo}.json`)
    
    // Leer el archivo actual
    if (!fs.existsSync(filePath)) {
      throw new Error(`Archivo no encontrado: ${filePath}`)
    }

    const contenido = fs.readFileSync(filePath, 'utf-8')
    let equipos = JSON.parse(contenido)

    // Encontrar y eliminar el equipo
    const indice = equipos.findIndex(e => e.id === id)
    
    if (indice === -1) {
      throw new Error(`Equipo con ID ${id} no encontrado`)
    }

    const eliminado = equipos.splice(indice, 1)[0]

    // Guardar en archivo
    fs.writeFileSync(filePath, JSON.stringify(equipos, null, 2))

    console.log(`🗑️ Equipo eliminado de ${tipo}:`, eliminado)

    return {
      success: true,
      equipo: eliminado,
      message: `Equipo eliminado de ${tipo}`
    }
  } catch (error) {
    console.error(`❌ Error al eliminar equipo:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error al eliminar: ${error.message}`
    })
  }
})
