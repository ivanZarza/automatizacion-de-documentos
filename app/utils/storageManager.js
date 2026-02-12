/**
 * Storage Manager - localStorage como base de datos central
 * Proporciona funciones para guardar, cargar y gestionar datos en localStorage
 */

import { notifyStorageChange } from './storageEvents'

const STORAGE_KEY_MAESTRO = 'formDataMaestro'

/**
 * Guardar datos en localStorage (base de datos central)
 * @param {Object} data - Datos a guardar
 */
export const saveToStorage = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY_MAESTRO, JSON.stringify(data))
    // Notificar a los listeners
    notifyStorageChange(data)
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
 * @param {Object} newData - Datos parciales a actualizar
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
