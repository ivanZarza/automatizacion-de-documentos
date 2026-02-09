import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useFormStore = defineStore('form', () => {
  // Estado: almacena los datos del formulario completado
  const formData = ref({})
  
  // Estado: almacena si hay un formulario activo
  const isFormSubmitted = ref(false)

  // Acción: guardar datos del formulario
  const setFormData = (data) => {
    formData.value = { ...data }
    isFormSubmitted.value = true
  }

  // Acción: obtener datos del formulario
  const getFormData = () => {
    return formData.value
  }

  // Acción: limpiar formulario
  const clearFormData = () => {
    formData.value = {}
    isFormSubmitted.value = false
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
    getField
  }
})
