import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useImageStore = defineStore('images', () => {
  // Estado: almacena todas las imágenes cargadas
  const images = ref({})

  // Guardar una imagen por fieldName
  const setImage = (fieldName, base64Data) => {
    images.value[fieldName] = base64Data
    console.log(`[ImageStore] Imagen guardada: ${fieldName}`)
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
    console.log(`[ImageStore] Imagen eliminada: ${fieldName}`)
  }

  // Limpiar todas las imágenes
  const clearAllImages = () => {
    images.value = {}
    console.log('[ImageStore] Todas las imágenes eliminadas')
  }

  // Cargar múltiples imágenes a la vez
  const setImages = (imageData) => {
    images.value = { ...images.value, ...imageData }
    console.log('[ImageStore] Imágenes cargadas:', Object.keys(imageData))
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
