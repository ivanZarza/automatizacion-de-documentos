import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEquipmentStore = defineStore('equipment', () => {
  // Estado: Arrays de equipos en memoria
  const inversores = ref([])
  const generadores = ref([])
  const baterias = ref([])
  const modulos = ref([])

  // Getters por tipo
  const getEquipos = (tipo) => {
    const equiposMap = {
      inversores,
      generadores,
      baterias,
      modulos
    }
    return equiposMap[tipo] || ref([])
  }

  // Acción: Cargar equipos de la BD
  const cargarEquiposBD = async (tipo) => {
    try {
      const data = await $fetch(`/api/equipos/${tipo}/listar`)
      const equiposArray = getEquipos(tipo)
      equiposArray.value = [...data]
      console.log(`📥 Equipos cargados de ${tipo}:`, data)
    } catch (error) {
      console.error(`❌ Error al cargar equipos de ${tipo}:`, error)
    }
  }

  // Acción: Agregar equipo nuevo (con persistencia BD)
  const agregarEquipo = async (tipo, datos) => {
    try {
      const response = await $fetch(`/api/equipos/${tipo}/guardar`, {
        method: 'POST',
        body: datos
      })

      // Refrescar lista completa desde la BD para mantener sincronía
      await cargarEquiposBD(tipo)

      console.log(`✅ Equipo agregado a ${tipo}:`, response.equipo)
      return response.equipo
    } catch (error) {
      console.error(`❌ Error al guardar equipo:`, error)
      throw error
    }
  }

  // Acción: Eliminar equipo (con persistencia BD)
  const eliminarEquipo = async (tipo, id) => {
    try {
      await $fetch(`/api/equipos/${tipo}/eliminar`, {
        method: 'DELETE',
        body: { id }
      })

      // Refrescar lista completa desde la BD
      await cargarEquiposBD(tipo)
      return true
    } catch (error) {
      console.error(`❌ Error al eliminar equipo:`, error)
      throw error
    }
  }

  // Acción: Obtener equipo por ID (local)
  const obtenerEquipo = (tipo, id) => {
    const equiposArray = getEquipos(tipo)
    return equiposArray.value.find(e => e.id === id)
  }

  return {
    inversores,
    generadores,
    baterias,
    modulos,
    getEquipos,
    cargarEquiposBD,
    agregarEquipo,
    eliminarEquipo,
    obtenerEquipo
  }
})
