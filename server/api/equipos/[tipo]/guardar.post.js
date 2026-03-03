import fs from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  const { tipo } = event.context.params
  
  try {
    const body = await readBody(event)
    
    // Validar tipo
    const tiposValidos = ['inversores', 'generadores', 'baterias', 'modulos']
    if (!tiposValidos.includes(tipo)) {
      throw new Error(`Tipo de equipo no válido: ${tipo}`)
    }

    // Ruta del archivo JSON
    const filePath = path.join(process.cwd(), 'app', 'data', `equipos_${tipo}.json`)
    
    // Leer el archivo actual
    let equipos = []
    if (fs.existsSync(filePath)) {
      const contenido = fs.readFileSync(filePath, 'utf-8')
      equipos = JSON.parse(contenido)
    }

    // Crear nuevo equipo con ID único
    const nuevoEquipo = {
      id: `${tipo.slice(0, 3)}_${Date.now().toString(36)}${Math.random().toString(36).substr(2)}`,
      ...body,
      fechaCreacion: new Date().toISOString()
    }

    // Agregar al array
    equipos.push(nuevoEquipo)

    // Guardar en archivo
    fs.writeFileSync(filePath, JSON.stringify(equipos, null, 2))

    console.log(`✅ Equipo guardado en ${tipo}:`, nuevoEquipo)

    return {
      success: true,
      equipo: nuevoEquipo,
      message: `Equipo agregado a ${tipo}`
    }
  } catch (error) {
    console.error(`❌ Error al guardar equipo:`, error)
    throw createError({
      statusCode: 500,
      statusMessage: `Error al guardar: ${error.message}`
    })
  }
})
