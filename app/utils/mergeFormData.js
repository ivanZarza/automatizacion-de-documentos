/**
 * Utilidad para fusionar datos del formulario maestro con datos específicos del documento
 * 
 * El flujo es:
 * 1. Usuario completa formulario maestro → datos guardados en Pinia
 * 2. Usuario selecciona documento → esta función merge los datos
 * 3. Documento recibe: {defaultData de documento, ...datos maestros}
 */

import { useFormStore } from '../stores/formStore'

/**
 * Fusionar datos maestros con configuración del documento
 * @param {Object} documentConfig - La configuración del documento (con defaultData)
 * @returns {Object} Datos fusionados listos para pasar al componente de documento
 */
export const mergeMasterDataWithDocument = (documentConfig) => {
  const formStore = useFormStore()
  
  // Obtener datos maestros del store
  const masterData = formStore.hasData ? formStore.getFormData() : {}
  
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
 * @param {Object} documentConfig - La configuración del documento
 * @param {Object} mergedData - Los datos fusionados
 * @returns {Object} Solo los campos que existen en defaultData del documento
 */
export const filterDataForDocument = (documentConfig, mergedData) => {
  const documentDefaults = documentConfig.defaultData || {}
  const filtered = {}
  
  // Solo incluir campos que existen en la configuración del documento
  Object.keys(documentDefaults).forEach(key => {
    filtered[key] = mergedData[key] !== undefined ? mergedData[key] : documentDefaults[key]
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
