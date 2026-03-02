import { promises as fs } from 'fs'
import path from 'path'

const DATA_DIR = './server/data'

const EQUIPMENT_FILES = {
  inversores: 'inversores.json',
  generadores: 'generadores.json',
  baterias: 'baterias.json'
}

async function getEquipmentFile(tipo) {
  const fileName = EQUIPMENT_FILES[tipo]
  if (!fileName) {
    throw new Error(`Tipo de equipamiento no válido: ${tipo}`)
  }
  
  const filePath = path.join(DATA_DIR, fileName)
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return JSON.parse(content)
  } catch (error) {
    console.warn(`Archivo ${fileName} no encontrado, retornando array vacío`)
    return []
  }
}

async function saveEquipmentFile(tipo, data) {
  const fileName = EQUIPMENT_FILES[tipo]
  if (!fileName) {
    throw new Error(`Tipo de equipamiento no válido: ${tipo}`)
  }
  
  const filePath = path.join(DATA_DIR, fileName)
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8')
}

export default defineEventHandler(async (event) => {
  const method = event.node.req.method
  const url = new URL(event.node.req.url || '', `http://${event.node.req.headers.host}`)
  const tipo = url.searchParams.get('tipo')

  if (!tipo) {
    return { error: 'Parámetro "tipo" requerido (inversores, generadores, baterias)' }
  }

  if (!EQUIPMENT_FILES[tipo]) {
    return { error: `Tipo no válido: ${tipo}` }
  }

  try {
    if (method === 'GET') {
      // Obtener todos los equipamientos del tipo especificado
      const equipment = await getEquipmentFile(tipo)
      return {
        ok: true,
        tipo,
        data: equipment,
        count: equipment.length
      }
    }

    if (method === 'POST') {
      // Agregar nuevo equipamiento
      const body = await readBody(event)
      
      if (!body || !body.marca || !body.modelo) {
        return { error: 'Campos requeridos: marca, modelo' }
      }

      const equipment = await getEquipmentFile(tipo)
      
      // Generar ID único
      const newId = `${tipo.substring(0, 3).toUpperCase()}${String(equipment.length + 1).padStart(3, '0')}`
      
      const newItem = {
        id: newId,
        ...body,
        createdAt: new Date().toISOString()
      }

      equipment.push(newItem)
      await saveEquipmentFile(tipo, equipment)

      return {
        ok: true,
        message: `${tipo} agregado correctamente`,
        data: newItem
      }
    }

    if (method === 'DELETE') {
      // Eliminar equipamiento
      const body = await readBody(event)
      
      if (!body || !body.id) {
        return { error: 'ID requerido para eliminar' }
      }

      let equipment = await getEquipmentFile(tipo)
      const initialLength = equipment.length
      equipment = equipment.filter(item => item.id !== body.id)

      if (equipment.length === initialLength) {
        return { error: `No encontrado equipamiento con ID: ${body.id}` }
      }

      await saveEquipmentFile(tipo, equipment)

      return {
        ok: true,
        message: `${tipo} eliminado correctamente`
      }
    }

    if (method === 'PUT') {
      // Actualizar equipamiento
      const body = await readBody(event)
      
      if (!body || !body.id) {
        return { error: 'ID requerido para actualizar' }
      }

      let equipment = await getEquipmentFile(tipo)
      const index = equipment.findIndex(item => item.id === body.id)

      if (index === -1) {
        return { error: `No encontrado equipamiento con ID: ${body.id}` }
      }

      equipment[index] = {
        ...equipment[index],
        ...body,
        id: body.id, // Mantener el ID original
        createdAt: equipment[index].createdAt // Mantener fecha original
      }

      await saveEquipmentFile(tipo, equipment)

      return {
        ok: true,
        message: `${tipo} actualizado correctamente`,
        data: equipment[index]
      }
    }

    return { error: 'Método no permitido' }
  } catch (error) {
    console.error('[equipment.js] Error:', error)
    return { error: error.message }
  }
})
