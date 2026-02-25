// Ruta GET para recuperar formularios
// Si se pasa ?nombre=... devuelve solo ese, si no, todos
import { promises as fs } from 'fs'
const DB_PATH = 'server/db/forms.json'

export default defineEventHandler(async (event) => {
  let data = []
  try {
    const file = await fs.readFile(DB_PATH, 'utf-8')
    data = JSON.parse(file)
  } catch (e) {
    data = []
  }
  const query = getQuery(event)
  if (query && query.nombre) {
    const found = data.find(d => d.nombre === query.nombre)
    return found || { error: 'No encontrado' }
  }
  return data
})
