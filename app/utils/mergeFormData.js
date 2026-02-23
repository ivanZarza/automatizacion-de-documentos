/**
 * Utilidad para fusionar datos del formulario maestro con datos específicos del documento
 * 
 * El flujo es:
 * 1. Usuario completa formulario maestro → datos guardados en localStorage
 * 2. Usuario selecciona documento → esta función merge los datos
 * 3. Documento recibe: {defaultData de documento, ...datos maestros}
 */

import { loadFromStorage } from './storageManager'

/**
 * Fusionar datos maestros con configuración del documento
 * @param {Object} documentConfig - La configuración del documento (con defaultData)
 * @returns {Object} Datos fusionados listos para pasar al componente de documento
 */
export const mergeMasterDataWithDocument = (documentConfig) => {
  // Obtener datos maestros de localStorage
  const masterData = loadFromStorage()
  
  // Obtener datos por defecto del documento
  const documentDefaults = documentConfig.defaultData || {}
  
  // Fusionar: primero defaults, luego maestro (maestro sobrescribe si existe)
  const mergedData = {
    ...documentDefaults,
    ...masterData
  }
  
  return mergedData
}

/**
 * Obtener solo los campos que el documento necesita (evita contaminar con campos extra)
 * Opción A: Fusiona maestro + defaults, maestro sobrescribe pero solo si tiene valor
 * @param {Object} documentConfig - La configuración del documento
 * @param {Object} mergedData - Los datos fusionados
 * @returns {Object} Solo los campos que existen en defaultData del documento
 */
export const filterDataForDocument = (documentConfig, mergedData) => {
  const documentDefaults = documentConfig.defaultData || {}
  const fieldMapping = documentConfig.fieldMapping || {}
  const filtered = {}
  
  // Para cada campo en el documento:
  // 1. Si existe mapeo, buscar el valor en el campo mapeado
  // 2. Si existe en maestro Y no está vacío → usa maestro
  // 3. Si existe en maestro pero está vacío → usa default
  // 4. Si no existe en maestro → usa default
  Object.keys(documentDefaults).forEach(key => {
    let masterValue
    
    // Si existe un mapeo para este campo, usar el campo mapeado
    if (fieldMapping[key]) {
        if (typeof fieldMapping[key] === 'function') {
          masterValue = fieldMapping[key](mergedData)
        } else {
          masterValue = mergedData[fieldMapping[key]]
        }
    } else {
      // Si no hay mapeo, buscar directamente en mergedData
      masterValue = mergedData[key]
    }
    
    const defaultValue = documentDefaults[key]
    
    // Si el maestro tiene valor (no vacío, no null, no undefined)
    if (masterValue !== undefined && masterValue !== null && masterValue !== '') {
      filtered[key] = masterValue
    } else {
      // Si no, usa el valor por defecto
      filtered[key] = defaultValue
    }
  })
  
  return filtered
}

/**
 * Función combinada: merge + filter en uno
 * Recomendado para usar en componentes de documento
 * @param {Object} documentConfig - La configuración del documento
 * @returns {Object} Datos listos para usar
 */
export const getMergedDocumentData = (documentConfig) => {
  const mergedData = mergeMasterDataWithDocument(documentConfig)
  return filterDataForDocument(documentConfig, mergedData)
}

/**
 * Auxiliar para composables en componentes de documento
 * Retorna un objeto con helpers para obtener datos
 */
export const useDocumentData = (documentConfig) => {
  const mergedData = getMergedDocumentData(documentConfig)
  
  return {
    /**
     * Obtener valor de un campo, con fallback
     * @param {string} fieldName - Nombre del campo
     * @param {*} defaultValue - Valor por defecto si no existe
     * @returns {*} El valor del campo
     */
    getField: (fieldName, defaultValue = '') => {
      return mergedData[fieldName] !== undefined ? mergedData[fieldName] : defaultValue
    },
    
    /**
     * Obtener todos los datos fusionados
     * @returns {Object} Datos completos
     */
    getAllData: () => mergedData,
    
    /**
     * Verificar si existe un campo
     * @param {string} fieldName - Nombre del campo
     * @returns {boolean}
     */
    hasField: (fieldName) => {
      return fieldName in mergedData && mergedData[fieldName] !== ''
    }
  }
}
