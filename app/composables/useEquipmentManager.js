import { ref, computed } from 'vue'

export const useEquipmentManager = (tipoEquipo) => {
  const equipment = ref([])
  const loading = ref(false)
  const error = ref(null)
  const selectedId = ref(null)

  /**
   * Obtener todos los equipamientos
   */
  const fetchEquipment = async () => {
    loading.value = true
    error.value = null
    try {
      const { data } = await $fetch('/api/equipment', {
        query: { tipo: tipoEquipo }
      })
      equipment.value = data || []
      return equipment.value
    } catch (err) {
      error.value = err.message || 'Error al cargar datos'
      console.error(`Error cargando ${tipoEquipo}:`, err)
      equipment.value = []
      return []
    } finally {
      loading.value = false
    }
  }

  /**
   * Agregar nuevo equipamiento
   */
  const addEquipment = async (newItem) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/equipment', {
        method: 'POST',
        query: { tipo: tipoEquipo },
        body: newItem
      })

      if (response.ok) {
        equipment.value.push(response.data)
        return response.data
      } else {
        error.value = response.error
        throw new Error(response.error)
      }
    } catch (err) {
      error.value = err.message || 'Error al agregar equipamiento'
      console.error(`Error agregando ${tipoEquipo}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Actualizar equipamiento existente
   */
  const updateEquipment = async (id, updatedItem) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/equipment', {
        method: 'PUT',
        query: { tipo: tipoEquipo },
        body: { id, ...updatedItem }
      })

      if (response.ok) {
        const index = equipment.value.findIndex(item => item.id === id)
        if (index !== -1) {
          equipment.value[index] = response.data
        }
        return response.data
      } else {
        error.value = response.error
        throw new Error(response.error)
      }
    } catch (err) {
      error.value = err.message || 'Error al actualizar equipamiento'
      console.error(`Error actualizando ${tipoEquipo}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Eliminar equipamiento
   */
  const deleteEquipment = async (id) => {
    loading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/equipment', {
        method: 'DELETE',
        query: { tipo: tipoEquipo },
        body: { id }
      })

      if (response.ok) {
        equipment.value = equipment.value.filter(item => item.id !== id)
        if (selectedId.value === id) {
          selectedId.value = null
        }
        return true
      } else {
        error.value = response.error
        throw new Error(response.error)
      }
    } catch (err) {
      error.value = err.message || 'Error al eliminar equipamiento'
      console.error(`Error eliminando ${tipoEquipo}:`, err)
      throw err
    } finally {
      loading.value = false
    }
  }

  /**
   * Obtener equipamiento seleccionado
   */
  const selectedEquipment = computed(() => {
    if (!selectedId.value) return null
    return equipment.value.find(item => item.id === selectedId.value)
  })

  /**
   * Seleccionar equipamiento por ID
   */
  const selectEquipment = (id) => {
    selectedId.value = id
  }

  /**
   * Obtener información del equipamiento seleccionado formateada
   */
  const getSelectedData = () => {
    if (!selectedEquipment.value) return {}
    
    // Retornar el objeto completo sin la fecha de creación
    const { createdAt, id, ...data } = selectedEquipment.value
    return data
  }

  return {
    equipment,
    loading,
    error,
    selectedId,
    selectedEquipment,
    fetchEquipment,
    addEquipment,
    updateEquipment,
    deleteEquipment,
    selectEquipment,
    getSelectedData
  }
}
