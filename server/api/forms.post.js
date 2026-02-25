// Ruta POST para guardar un formulario
// Puedes cambiar el almacenamiento a una base de datos real si lo necesitas
import { promises as fs } from 'fs'
const DB_PATH = 'server/db/forms.json'

export default defineEventHandler(async (event) => {
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
  await fs.mkdir('server/db', { recursive: true })
  await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2))
  return { ok: true }
})
