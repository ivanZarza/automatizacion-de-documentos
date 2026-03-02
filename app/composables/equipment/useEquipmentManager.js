import { ref } from 'vue'

// Datos de equipos (definidos directamente en el composable)
const DATOS_EQUIPOS = {
  inversores: [
    { id: 'inv_001', marca: 'Fronius', modelo: 'Symo 5.0', potencia: '5.0', vccMaxima: '600V', vccMinima: '150V', conexion: 'Trifásica', fechaCreacion: '2026-03-02T10:00:00Z' },
    { id: 'inv_002', marca: 'SMA', modelo: 'Sunny Boy 6.0', potencia: '6.0', vccMaxima: '550V', vccMinima: '125V', conexion: 'Monofásica', fechaCreacion: '2026-03-02T10:05:00Z' }
  ],
  generadores: [
    { id: 'gen_001', marca: 'Honda', modelo: 'EG6500', potencia: '5.5', especificacion: 'Gasolina', fechaCreacion: '2026-03-02T10:00:00Z' },
    { id: 'gen_002', marca: 'Yamaha', modelo: 'EF7200E', potencia: '7.2', especificacion: 'Gasolina', fechaCreacion: '2026-03-02T10:05:00Z' }
  ],
  baterias: [
    { id: 'bat_001', marcaModelo: 'LG RESU10H', tipoBateria: 'Litio', tensionNominal: '48', profundidadDescarga: '90', tensionMaxima: '58', tensionMinima: '40', energiaTotal: '10', potenciaMaximaSalida: '5', fechaCreacion: '2026-03-02T10:00:00Z' },
    { id: 'bat_002', marcaModelo: 'Tesla Powerwall 2', tipoBateria: 'Litio', tensionNominal: '220', profundidadDescarga: '95', tensionMaxima: '265', tensionMinima: '180', energiaTotal: '13.5', potenciaMaximaSalida: '7', fechaCreacion: '2026-03-02T10:05:00Z' }
  ],
  modulos: [
    { id: 'mod_001', marca: 'JA Solar JAM72S30 450/MR', potenciaPicoModulo: '450', potenciaPicoGenerador: '4500', intensidadIpmp: '10', tensionVpmp: '400', orientacion: 'Sur', inclinacion: '30', totalModulos: '10', modulosEnSerie: '10', ramasEnParalelo: '1', disposicionModulos: 'Cubierta Teja - Aporticada', fechaCreacion: '2026-03-02T10:00:00Z' },
    { id: 'mod_002', marca: 'Suntech STP390S', potenciaPicoModulo: '390', potenciaPicoGenerador: '3900', intensidadIpmp: '9.5', tensionVpmp: '380', orientacion: 'Sur', inclinacion: '25', totalModulos: '10', modulosEnSerie: '10', ramasEnParalelo: '1', disposicionModulos: 'Cubierta Plana', fechaCreacion: '2026-03-02T10:05:00Z' }
  ]
}

// Configuración de campos por tipo de equipo
export const EQUIPMENT_TYPES = {
  inversores: {
    label: 'Inversores',
    fields: [
      { name: 'marca', label: 'Marca', placeholder: 'Ej: Fronius' },
      { name: 'modelo', label: 'Modelo', placeholder: 'Ej: Symo 5.0' },
      { name: 'potencia', label: 'Potencia (kW)', placeholder: 'Ej: 5.5' },
      { name: 'vccMaxima', label: 'Vcc MÁXIMA', placeholder: 'Ej: 600V' },
      { name: 'vccMinima', label: 'Vcc MÍNIMA', placeholder: 'Ej: 150V' },
      { name: 'conexion', label: 'Conexión', placeholder: 'Monofásica / Trifásica', type: 'select', options: ['Monofásica', 'Trifásica'] }
    ],
    storageKey: 'equipos_inversores',
    icon: '⚡',
    datosDefault: DATOS_EQUIPOS.inversores
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
    datosDefault: DATOS_EQUIPOS.generadores
  },
  baterias: {
    label: 'Baterías',
    fields: [
      { name: 'marcaModelo', label: 'MARCA Y MODELO', placeholder: 'Ej: LG RESU10H' },
      { name: 'tipoBateria', label: 'TIPO DE BATERÍA', placeholder: 'Ej: Litio' },
      { name: 'tensionNominal', label: 'TENSIÓN NOMINAL (V)', placeholder: 'Ej: 48' },
      { name: 'profundidadDescarga', label: 'PROFUNDIDAD DE DESCARGA', placeholder: 'Ej: 90' },
      { name: 'tensionMaxima', label: 'TENSIÓN MÁXIMA (V)', placeholder: 'Ej: 58' },
      { name: 'tensionMinima', label: 'TENSIÓN MÍNIMA (V)', placeholder: 'Ej: 40' },
      { name: 'energiaTotal', label: 'ENERGÍA TOTAL', placeholder: 'Ej: 10' },
      { name: 'potenciaMaximaSalida', label: 'POTENCIA MÁXIMA SALIDA', placeholder: 'Ej: 5' }
    ],
    storageKey: 'equipos_baterias',
    icon: '🔋',
    datosDefault: DATOS_EQUIPOS.baterias
  },
  modulos: {
    label: 'Módulos',
    fields: [
      { name: 'marca', label: 'MARCA Y MODELO', placeholder: 'Ej: JA Solar JAM72S30 450/MR' },
      { name: 'potenciaPicoModulo', label: 'POTENCIA PICO (Wp) DEL MÓDULO', placeholder: 'Ej: 450' },
      { name: 'potenciaPicoGenerador', label: 'POTENCIA PICO (Wp) DEL GENERADOR', placeholder: 'Ej: 4500' },
      { name: 'intensidadIpmp', label: 'INTENSIDAD MÁXIMA POTENCIA, Ipmp (A)', placeholder: 'Ej: 10' },
      { name: 'tensionVpmp', label: 'TENSIÓN MÁXIMA POTENCIA, Vpmp (V)', placeholder: 'Ej: 400' },
      { name: 'orientacion', label: 'ORIENTACIÓN', placeholder: 'Ej: Sur' },
      { name: 'inclinacion', label: 'INCLINACIÓN (º)', placeholder: 'Ej: 30' },
      { name: 'totalModulos', label: 'Nº TOTAL MÓDULOS', placeholder: 'Ej: 10' },
      { name: 'modulosEnSerie', label: 'Nº MÓDULOS EN SERIE', placeholder: 'Ej: 10' },
      { name: 'ramasEnParalelo', label: 'Nº RAMAS EN PARALELO', placeholder: 'Ej: 1' },
      { name: 'disposicionModulos', label: 'DISPOSICIÓN DE LOS MÓDULOS', placeholder: 'Seleccionar', type: 'select', options: ['Cubierta Teja - Aporticada', 'Cubierta Teja - Coplanar', 'Cubierta Plana', 'Pergola', 'Chapa Grecada - Aporticada', 'Chapa Grecada - Coplanar', 'Suelo', 'Paramento Vertical'] }
    ],
    storageKey: 'equipos_modulos',
    icon: '☀️',
    datosDefault: DATOS_EQUIPOS.modulos
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
    console.log(`[${tipo}] Iniciando cargar datos...`)
    
    try {
      if (typeof window !== 'undefined') {
        const datosGuardados = localStorage.getItem(config.storageKey)
        console.log(`[${tipo}] localStorage.getItem('${config.storageKey}'):`, datosGuardados)
        
        if (datosGuardados) {
          const parsed = JSON.parse(datosGuardados)
          
          // Validar estructura: si el primer item no tiene los campos esperados, limpiar
          if (parsed.length > 0 && config.fields.length > 0) {
            const primerItem = parsed[0]
            const primerCampo = config.fields[0].name
            
            if (!primerItem.hasOwnProperty(primerCampo)) {
              console.warn(`[${tipo}] ⚠️ Datos inconsistentes detectados - limpiando localStorage`)
              localStorage.removeItem(config.storageKey)
              console.log(`[${tipo}] localStorage limpiado`)
              // NO retornar aquí, continuar para cargar datos por defecto
            } else {
              equipos.value = parsed
              console.log(`✓ [${tipo}] Datos cargados de localStorage:`, equipos.value)
              return
            }
          } else {
            equipos.value = parsed
            console.log(`✓ [${tipo}] Datos cargados de localStorage:`, equipos.value)
            return
          }
        }
      }
    } catch (e) {
      console.warn(`[${tipo}] Error al cargar de localStorage:`, e)
      if (typeof window !== 'undefined') {
        localStorage.removeItem(config.storageKey)
      }
    }

    // Si no hay en localStorage, usar datos del archivo JSON
    try {
      const datosDefault = JSON.parse(JSON.stringify(config.datosDefault || []))
      equipos.value = datosDefault
      console.log(`✓ [${tipo}] Datos cargados por defecto:`, equipos.value)
      // Guardar los datos por defecto en localStorage también
      guardar()
    } catch (e) {
      console.error(`[${tipo}] Error al cargar datos por defecto:`, e)
      equipos.value = []
    }
  }

  // Guardar en localStorage
  const guardar = () => {
    if (typeof window === 'undefined') {
      console.warn(`[${tipo}] Window no está disponible, no se puede guardar`)
      return
    }

    try {
      const datos = JSON.stringify(equipos.value)
      localStorage.setItem(config.storageKey, datos)
      console.log(`✓ [${tipo}] Datos guardados en localStorage (${config.storageKey}):`)
      console.log(`  - Cantidad de items: ${equipos.value.length}`)
      console.log(`  - Contenido: ${datos}`)
      
      // Verificar que se guardó correctamente
      const verificar = localStorage.getItem(config.storageKey)
      console.log(`✓ [${tipo}] Verificación post-guardado:`, JSON.parse(verificar))
    } catch (e) {
      console.error(`[${tipo}] Error al guardar en localStorage:`, e)
    }
  }

  // Generar ID único
  const generarId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  // Agregar equipo
  const agregar = (datos) => {
    console.log(`[${tipo}] >>> AGREGAR: Iniciando con datos:`, datos)
    const nuevoEquipo = {
      id: generarId(),
      ...datos,
      fechaCreacion: new Date().toISOString()
    }
    console.log(`[${tipo}] >>> AGREGAR: Nuevo equipo creado:`, nuevoEquipo)
    equipos.value.push(nuevoEquipo)
    console.log(`[${tipo}] >>> AGREGAR: Array antes de guardar (${equipos.value.length} items):`, equipos.value)
    guardar()
    console.log(`[${tipo}] >>> AGREGAR: Guardado completado`)
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
