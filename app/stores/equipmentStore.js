import { defineStore } from 'pinia'
import { ref } from 'vue'

// Importar datos de los archivos
import equiposInversores from '../data/equipos_inversores.json'
import equiposGeneradores from '../data/equipos_generadores.json'
import equiposBaterias from '../data/equipos_baterias.json'
import equiposModulos from '../data/equipos_modulos.json'

export const useEquipmentStore = defineStore('equipment', () => {
  // Estado: Arrays de equipos en memoria
  const inversores = ref([...equiposInversores])
  const generadores = ref([...equiposGeneradores])
  const baterias = ref([...equiposBaterias])
  const modulos = ref([...equiposModulos])

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

  // Acción: Agregar equipo nuevo (con persistencia)
  const agregarEquipo = async (tipo, datos) => {
    try {
      const response = await $fetch(`/api/equipos/${tipo}/guardar`, {
        method: 'POST',
        body: datos
      })

      // Agregar a array en memoria
      const equiposArray = getEquipos(tipo)
      equiposArray.value.push(response.equipo)
      
      console.log(`✅ Equipo agregado a ${tipo}:`, response.equipo)
      return response.equipo
    } catch (error) {
      console.error(`❌ Error al guardar equipo:`, error)
      throw error
    }
  }

  // Acción: Eliminar equipo (con persistencia)
  const eliminarEquipo = async (tipo, id) => {
    try {
      await $fetch(`/api/equipos/${tipo}/eliminar`, {
        method: 'DELETE',
        body: { id }
      })

      const equiposArray = getEquipos(tipo)
      const indice = equiposArray.value.findIndex(e => e.id === id)
      if (indice !== -1) {
        const eliminado = equiposArray.value.splice(indice, 1)
        console.log(`🗑️ Equipo eliminado de ${tipo}:`, eliminado)
        return true
      }
      return false
    } catch (error) {
      console.error(`❌ Error al eliminar equipo:`, error)
      throw error
    }
  }

  // Acción: Obtener equipo por ID
  const obtenerEquipo = (tipo, id) => {
    const equiposArray = getEquipos(tipo)
    return equiposArray.value.find(e => e.id === id)
  }

  // Acción: Restaurar datos por defecto
  const restaurarDatos = (tipo) => {
    const datosDefault = {
      inversores: equiposInversores,
      generadores: equiposGeneradores,
      baterias: equiposBaterias,
      modulos: equiposModulos
    }
    
    if (datosDefault[tipo]) {
      getEquipos(tipo).value = [...datosDefault[tipo]]
      console.log(`♻️ Datos restaurados para ${tipo}`)
    }
  }

  return {
    inversores,
    generadores,
    baterias,
    modulos,
    getEquipos,
    agregarEquipo,
    eliminarEquipo,
    obtenerEquipo,
    restaurarDatos
  }
})
