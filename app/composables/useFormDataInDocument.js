import { useFormStore } from '../stores/formStore'
import { computed } from 'vue'

export function useFormDataInDocument() {
  const formStore = useFormStore()

  // Obtener todos los datos
  const allData = computed(() => formStore.formData)

  // Obtener un campo específico con fallback a props o valor por defecto
  const getFieldValue = (fieldName, defaultValue = '') => {
    return formStore.getField(fieldName) || defaultValue
  }

  // Verificar si hay datos del formulario
  const hasFormData = computed(() => formStore.hasData)

  // Obtener datos con fallback a un objeto alternativo (para mantener compatibilidad)
  const getDataWithFallback = (propsData = {}) => {
    if (hasFormData.value) {
      return { ...propsData, ...formStore.formData }
    }
    return propsData
  }

  // NUEVO: Crear un proxy reactivo que sobrescriba props con datos de Pinia
  const createReactiveProps = (props) => {
    return new Proxy(props, {
      get: (target, prop) => {
        // Si hay datos en Pinia y existe la propiedad, devolver del store
        if (hasFormData.value && formStore.formData[prop] !== undefined) {
          return formStore.formData[prop]
        }
        // Si no, devolver del prop original
        return target[prop]
      }
    })
  }

  // NUEVO: Crear computed properties automáticas para múltiples campos
  const createReactiveComputeds = (fieldNames, props = {}) => {
    const computeds = {}
    fieldNames.forEach(fieldName => {
      computeds[fieldName] = computed(() => {
        return formStore.formData[fieldName] || props[fieldName] || ''
      })
    })
    return computeds
  }

  return {
    allData,
    getFieldValue,
    hasFormData,
    getDataWithFallback,
    createReactiveProps,
    createReactiveComputeds
  }
}

