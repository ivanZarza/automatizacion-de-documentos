// Ruta POST para guardar un formulario
// Puedes cambiar el almacenamiento a una base de datos real si lo necesitas
import { promises as fs } from 'fs'
import { join } from 'path'
const DB_PATH = join(process.cwd(), 'server/db/forms.json')

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    if (!body || !body.nombre || !body.formulario) {
      return { error: 'Faltan campos requeridos: nombre y formulario' }
    }
    
    let data = []
    try {
      const file = await fs.readFile(DB_PATH, 'utf-8')
      data = JSON.parse(file)
    } catch (e) {
      // Si no existe el archivo, se crea
      data = []
    }
    
    // Si ya existe un registro con ese nombre, lo sobreescribe
    const idx = data.findIndex(d => d.nombre === body.nombre)
    if (idx >= 0) {
      data[idx] = body
    } else {
      data.push(body)
    }
    
    const dbDir = join(process.cwd(), 'server/db')
    await fs.mkdir(dbDir, { recursive: true })
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
    return { ok: true, message: 'Datos guardados correctamente', path: DB_PATH }
  } catch (err) {
    console.error('[forms.post] Error:', err)
    return { error: err.message, path: DB_PATH }
  }
})
