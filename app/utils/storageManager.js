/**
 * Storage Manager - localStorage como base de datos central
 * Proporciona funciones para guardar, cargar y gestionar datos en localStorage
 */

import { notifyStorageChange } from './storageEvents'

const STORAGE_KEY_MAESTRO = 'formDataMaestro'
const STORAGE_KEY_IMAGES = 'formDataImages'

/**
 * Guardar una imagen comprimida en localStorage (en el mismo objeto maestro)
 * @param {String} fieldName - Nombre del campo
 * @param {String} base64Data - Datos en base64 de la imagen
 */
export const saveImageToStorage = (fieldName, base64Data) => {
  try {
    // Actualizar el objeto maestro con la imagen
    const currentData = loadFromStorage()
    currentData[fieldName] = base64Data
    
    try {
      localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(currentData))
    } catch (quotaError) {
      console.error(`[StorageManager] ❌ localStorage LLENO - No se pudo guardar imagen`)
      throw new Error(`localStorage lleno: ${quotaError.message}`)
    }
  } catch (error) {
    console.error('[StorageManager] Error guardando imagen:', error.message)
  }
}

/**
 * Cargar todas las imágenes desde localStorage (del mismo objeto maestro)
 * @returns {Object} Objeto con todas las imágenes {fieldName: base64Data}
 */
export const loadImagesFromStorage = () => {
  try {
    const allData = loadFromStorage()
    const imageFields = new Set([
      'otros_imagenPlanoSituacion',
      'otros_imagenPlanoEmplazamiento',
      'otros_PlanoCubiertaNuevo',
      'h_esquemaUnifilar',
      'firma',
      'fotoCertificado',
      'imagenAdjunta'
    ])
    
    const images = {}
    Object.entries(allData).forEach(([key, value]) => {
      if (imageFields.has(key) && value && typeof value === 'string' && value.startsWith('data:')) {
        images[key] = value
      }
    })
    
    return images
  } catch (error) {
    console.error('[StorageManager] Error cargando imágenes:', error)
    return {}
  }
}

/**
 * Cargar una imagen específica desde localStorage
 * @param {String} fieldName - Nombre del campo
 * @returns {String|null} Datos en base64 o null
 */
export const getImageFromStorage = (fieldName) => {
  const data = loadFromStorage()
  const value = data[fieldName]
  if (value && typeof value === 'string' && value.startsWith('data:')) {
    return value
  }
  return null
}

/**
 * Eliminar una imagen del localStorage
 * @param {String} fieldName - Nombre del campo
 */
export const deleteImageFromStorage = (fieldName) => {
  try {
    const currentData = loadFromStorage()
    delete currentData[fieldName]
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(currentData))
  } catch (error) {
    console.error('[StorageManager] Error eliminando imagen:', error)
  }
}

/**
 * Limpiar todas las imágenes del localStorage
 */
export const clearImagesFromStorage = () => {
  try {
    const imageFields = new Set([
      'otros_imagenPlanoSituacion',
      'otros_imagenPlanoEmplazamiento',
      'otros_PlanoCubiertaNuevo',
      'h_esquemaUnifilar',
      'firma',
      'fotoCertificado',
      'imagenAdjunta'
    ])
    
    const currentData = loadFromStorage()
    imageFields.forEach(field => {
      delete currentData[field]
    })
    
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(currentData))
  } catch (error) {
    console.error('[StorageManager] Error limpiando imágenes:', error)
  }
}

/**
 * Guardar datos en localStorage (base de datos central)
 * NOTA: Ahora incluye las imágenes en el mismo objeto
 * @param {Object} data - Datos a guardar (incluyen imágenes si existen)
 */
export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(data))
    // Notificar a los listeners
    notifyStorageChange(data)
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error(`[StorageManager] ❌ localStorage LLENO. No hay suficiente espacio`)
    } else {
      console.error('[StorageManager] Error guardando en localStorage:', error)
    }
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
 * NOTA: Ahora incluye las imágenes en el mismo objeto
 * @param {Object} newData - Datos parciales a actualizar (pueden incluir imágenes)
 */
export const updateStoragePartially = (newData) => {
  try {
    const currentData = loadFromStorage()
    const mergedData = { ...currentData, ...newData }
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(mergedData))
    // Notificar a los listeners
    notifyStorageChange(mergedData)
    return mergedData
  } catch (error) {
    if (error.name === 'QuotaExceededError') {
      console.error(`[StorageManager] ❌ localStorage LLENO. No hay suficiente espacio`)
    } else {
      console.error('[StorageManager] Error actualizando localStorage:', error)
    }
    return loadFromStorage() || {}
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
