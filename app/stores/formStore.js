import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFormStore = defineStore('form', () => {
  // Estado: almacena los datos del formulario completado
  const formData = ref({})
  
  // Estado: almacena si hay un formulario activo
  const isFormSubmitted = ref(false)

  // Cargar datos del localStorage al inicializar
  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('formDataMaestro')
        if (saved) {
          formData.value = JSON.parse(saved)
          isFormSubmitted.value = true
        }
      } catch (e) {
        console.error('Error loading form data from localStorage:', e)
      }
    }
  }

  // Guardar datos en localStorage
  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('formDataMaestro', JSON.stringify(formData.value))
      } catch (e) {
        console.error('Error saving form data to localStorage:', e)
      }
    }
  }

  // Acción: guardar datos del formulario
  const setFormData = (data) => {
    formData.value = { ...data }
    isFormSubmitted.value = true
    saveToLocalStorage()
  }

  // Acción: obtener datos del formulario
  const getFormData = () => {
    return formData.value
  }

  // Acción: limpiar formulario
  const clearFormData = () => {
    formData.value = {}
    isFormSubmitted.value = false
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('formDataMaestro')
      } catch (e) {
        console.error('Error removing form data from localStorage:', e)
      }
    }
  }

  // Acción: obtener un campo específico
  const getField = (fieldName) => {
    return formData.value[fieldName] || ''
  }

  // Computed: verificar si hay datos
  const hasData = computed(() => {
    return Object.keys(formData.value).length > 0
  })

  return {
    formData,
    isFormSubmitted,
    hasData,
    setFormData,
    getFormData,
    clearFormData,
    getField,
    loadFromLocalStorage,
    saveToLocalStorage
  }
})
