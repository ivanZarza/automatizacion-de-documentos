import { ref } from 'vue'
import equiposInversores from '../../data/equipos_inversores.json'
import equiposGeneradores from '../../data/equipos_generadores.json'
import equiposBaterias from '../../data/equipos_baterias.json'

// Configuración de campos por tipo de equipo
export const EQUIPMENT_TYPES = {
  inversores: {
    label: 'Inversores',
    fields: [
      { name: 'marca', label: 'Marca', placeholder: 'Ej: Fronius' },
      { name: 'modelo', label: 'Modelo', placeholder: 'Ej: Symo' },
      { name: 'potencia', label: 'Potencia (kW)', placeholder: 'Ej: 5.5' },
      { name: 'voltaje', label: 'Voltaje (V)', placeholder: 'Ej: 230V/400V' },
      { name: 'especificacion', label: 'Especificación', placeholder: 'Ej: Monofásico' }
    ],
    storageKey: 'equipos_inversores',
    icon: '⚡',
    datosDefault: equiposInversores
  },
  generadores: {
    label: 'Generadores',
    fields: [
      { name: 'marca', label: 'Marca', placeholder: 'Ej: Honda' },
      { name: 'modelo', label: 'Modelo', placeholder: 'Ej: EG6500' },
      { name: 'potencia', label: 'Potencia (kW)', placeholder: 'Ej: 5.5' },
      { name: 'especificacion', label: 'Especificación', placeholder: 'Ej: Gasolina' }
    ],
    storageKey: 'equipos_generadores',
    icon: '🔧',
    datosDefault: equiposGeneradores
  },
  baterias: {
    label: 'Baterías',
    fields: [
      { name: 'marca', label: 'Marca', placeholder: 'Ej: LG' },
      { name: 'modelo', label: 'Modelo', placeholder: 'Ej: RESU10H' },
      { name: 'voltaje', label: 'Voltaje (V)', placeholder: 'Ej: 48V' },
      { name: 'capacidad', label: 'Capacidad (kWh)', placeholder: 'Ej: 10' },
      { name: 'especificacion', label: 'Especificación', placeholder: 'Ej: Litio' }
    ],
    storageKey: 'equipos_baterias',
    icon: '🔋',
    datosDefault: equiposBaterias
  }
}

// Composable principal
export const useEquipmentManager = (tipo) => {
  const config = EQUIPMENT_TYPES[tipo]
  if (!config) {
    throw new Error(`Tipo de equipo no válido: ${tipo}`)
  }

  const equipos = ref([])
  const editandoId = ref(null)

  // Cargar datos: primero intenta localStorage, si no hay usa archivos por defecto
  const cargar = () => {
    try {
      if (typeof window !== 'undefined') {
        const datosGuardados = localStorage.getItem(config.storageKey)
        if (datosGuardados) {
          equipos.value = JSON.parse(datosGuardados)
          return
        }
      }
    } catch (e) {
      console.warn('Error al cargar de localStorage:', e)
    }

    // Si no hay en localStorage, usar datos del archivo JSON
    equipos.value = JSON.parse(JSON.stringify(config.datosDefault || []))
  }

  // Guardar en localStorage
  const guardar = () => {
    if (typeof window === 'undefined') return

    try {
      localStorage.setItem(config.storageKey, JSON.stringify(equipos.value))
    } catch (e) {
      console.error('Error al guardar en localStorage:', e)
    }
  }

  // Generar ID único
  const generarId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Agregar equipo
  const agregar = (datos) => {
    const nuevoEquipo = {
      id: generarId(),
      ...datos,
      fechaCreacion: new Date().toISOString()
    }
    equipos.value.push(nuevoEquipo)
    guardar()
    return nuevoEquipo
  }

  // Obtener equipo por ID
  const obtenerPorId = (id) => {
    return equipos.value.find(e => e.id === id)
  }

  // Editar equipo
  const editar = (id, datos) => {
    const indice = equipos.value.findIndex(e => e.id === id)
    if (indice !== -1) {
      equipos.value[indice] = {
        ...equipos.value[indice],
        ...datos,
        fechaActualizacion: new Date().toISOString()
      }
      guardar()
      editandoId.value = null
      return equipos.value[indice]
    }
    return null
  }

  // Guardar o actualizar (útil para sobrescribir)
  const guardarOActualizar = (id, datos) => {
    if (id) {
      return editar(id, datos)
    } else {
      return agregar(datos)
    }
  }

  // Eliminar equipo
  const eliminar = (id) => {
    const indice = equipos.value.findIndex(e => e.id === id)
    if (indice !== -1) {
      equipos.value.splice(indice, 1)
      guardar()
      return true
    }
    return false
  }

  // Obtener todos
  const obtenerTodos = () => {
    return equipos.value
  }

  // Exportar a JSON
  const exportar = () => {
    return JSON.stringify(equipos.value, null, 2)
  }

  // Importar desde JSON
  const importar = (jsonString) => {
    try {
      const datos = JSON.parse(jsonString)
      if (Array.isArray(datos)) {
        equipos.value = datos
        guardar()
        return true
      }
    } catch (e) {
      console.error('Error al importar:', e)
    }
    return false
  }

  // Limpiar todo
  const limpiar = () => {
    equipos.value = []
    guardar()
  }

  // Restaurar datos por defecto del archivo
  const restaurarPorDefecto = () => {
    equipos.value = JSON.parse(JSON.stringify(config.datosDefault || []))
    guardar()
  }

  // Iniciar sesión de edición
  const iniciarEdicion = (id) => {
    editandoId.value = id
  }

  // Cancelar edición
  const cancelarEdicion = () => {
    editandoId.value = null
  }

  return {
    equipos,
    editandoId,
    config,
    cargar,
    guardar,
    agregar,
    obtenerPorId,
    editar,
    guardarOActualizar,
    eliminar,
    obtenerTodos,
    exportar,
    importar,
    limpiar,
    restaurarPorDefecto,
    iniciarEdicion,
    cancelarEdicion
  }
}
