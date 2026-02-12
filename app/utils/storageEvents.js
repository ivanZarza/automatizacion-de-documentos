/**
 * Sistema de eventos para localStorage
 * Permite que los componentes se suscriban a cambios en localStorage
 */

const listeners = []

/**
 * Suscribirse a cambios en localStorage
 * @param {Function} callback - Función a ejecutar cuando cambia localStorage
 * @returns {Function} Función para desuscribirse
 */
export const onStorageChange = (callback) => {
  listeners.push(callback)
  
  // Retornar función para desuscribirse
  return () => {
    const index = listeners.indexOf(callback)
    if (index > -1) {
      listeners.splice(index, 1)
    }
  }
}

/**
 * Notificar a todos los listeners que storage cambió
 * @param {Object} newData - Los nuevos datos
 */
export const notifyStorageChange = (newData) => {
  listeners.forEach(callback => {
    try {
      callback(newData)
    } catch (error) {
      console.error('Error en listener de storage:', error)
    }
  })
}
