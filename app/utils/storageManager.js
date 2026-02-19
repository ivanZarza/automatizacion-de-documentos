/**
 * Storage Manager - localStorage como base de datos central
 * Proporciona funciones para guardar, cargar y gestionar datos en localStorage
 */

import { notifyStorageChange } from './storageEvents'

const STORAGE_KEY_MAESTRO = 'formDataMaestro'

/**
 * Guardar datos en localStorage (base de datos central)
 * NOTA: Excluye automáticamente los campos de tipo 'file' para evitar exceder la cuota
 * @param {Object} data - Datos a guardar
 */
export const saveToStorage = (data) => {
  try {
    // Excluir campos de tipo 'file' conocidos para no abusar de localStorage
    const fileFields = new Set([
      'otros_imagenPlanoSituacion',
      'otros_imagenPlanoEmplazamiento',
      'otros_PlanoCubiertaNuevo',
      'h_esquemaUnifilar',
      'firma',
      // Campos file de otros documentos
      'fotoCertificado',
      'imagenAdjunta'
    ])
    
    const filteredData = {}
    Object.entries(data).forEach(([key, value]) => {
      if (!fileFields.has(key)) {
        filteredData[key] = value
      }
    })
    
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(filteredData))
    // Notificar a los listeners
    notifyStorageChange(filteredData)
  } catch (error) {
    console.error('Error guardando en localStorage:', error)
  }
}

/**
 * Cargar datos de localStorage
 * @returns {Object} Datos guardados o objeto vacío
 */
export const loadFromStorage = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY_MAESTRO)
    return data ? JSON.parse(data) : {}
  } catch (error) {
    console.error('Error cargando de localStorage:', error)
    return {}
  }
}

/**
 * Actualizar parcialmente los datos en localStorage
 * Útil para actualizar solo campos específicos sin perder el resto
 * NOTA: Excluye automáticamente los campos de tipo 'file' para evitar exceder la cuota
 * @param {Object} newData - Datos parciales a actualizar
 */
export const updateStoragePartially = (newData) => {
  try {
    // Excluir campos de tipo 'file' conocidos para no abusar de localStorage
    const fileFields = new Set([
      'otros_imagenPlanoSituacion',
      'otros_imagenPlanoEmplazamiento',
      'otros_PlanoCubiertaNuevo',
      'h_esquemaUnifilar',
      'firma',
      // Campos file de otros documentos
      'fotoCertificado',
      'imagenAdjunta'
    ])
    
    const filteredData = {}
    Object.entries(newData).forEach(([key, value]) => {
      if (!fileFields.has(key)) {
        filteredData[key] = value
      }
    })
    
    const currentData = loadFromStorage()
    const mergedData = { ...currentData, ...filteredData }
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(mergedData))
    // Notificar a los listeners
    notifyStorageChange(mergedData)
    return mergedData
  } catch (error) {
    console.error('Error actualizando localStorage:', error)
    return currentData || {}
  }
}

/**
 * Limpiar localStorage (solo datos maestro)
 */
export const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY_MAESTRO)
  } catch (error) {
    console.error('Error limpiando localStorage:', error)
  }
}

/**
 * Verificar si hay datos guardados
 * @returns {Boolean}
 */
export const hasStorageData = () => {
  const data = loadFromStorage()
  return Object.keys(data).length > 0
}

/**
 * Obtener un campo específico del storage
 * @param {String} fieldName - Nombre del campo
 * @returns {any} Valor del campo o undefined
 */
export const getStorageField = (fieldName) => {
  const data = loadFromStorage()
  return data[fieldName]
}

/**
 * Establecer un campo específico en el storage
 * @param {String} fieldName - Nombre del campo
 * @param {any} value - Valor a guardar
 */
export const setStorageField = (fieldName, value) => {
  const data = loadFromStorage()
  data[fieldName] = value
  saveToStorage(data)
}
