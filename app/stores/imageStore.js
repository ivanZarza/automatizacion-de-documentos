import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('images', () => {
  // Estado: almacena todas las imágenes cargadas
  const images = ref({})

  // Guardar una imagen por fieldName
  const setImage = (fieldName, base64Data) => {
    if (!fieldName || !base64Data) {
      console.warn(`[ImageStore] Intento de guardar imagen inválida:`, { fieldName, hasData: !!base64Data })
      return
    }
    images.value[fieldName] = base64Data
  }

  // Obtener una imagen por fieldName
  const getImage = (fieldName) => {
    return images.value[fieldName] || null
  }

  // Obtener todas las imágenes
  const getAllImages = () => {
    return { ...images.value }
  }

  // Eliminar una imagen específica
  const deleteImage = (fieldName) => {
    delete images.value[fieldName]
  }

  // Limpiar todas las imágenes
  const clearAllImages = () => {
    images.value = {}
  }

  // Cargar múltiples imágenes a la vez
  const setImages = (imageData) => {
    images.value = { ...images.value, ...imageData }
  }

  return {
    images,
    setImage,
    getImage,
    getAllImages,
    deleteImage,
    clearAllImages,
    setImages
  }
})
