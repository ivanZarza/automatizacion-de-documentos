<template>
  <div class="pagina-equipos">
    <!-- Header -->
    <div class="header">
      <div class="header-content">
        <NuxtLink to="/" class="volver">← Volver</NuxtLink>
        <h1 v-if="config">{{ config.icon }} {{ config.label }}</h1>
        <p class="descripcion" v-if="config">Gestiona {{ config.label.toLowerCase() }} para el formulario maestro</p>
      </div>
      <button v-if="config && equipos.length > 0" @click="limpiarLocalStorage" class="btn-limpiar-storage" title="Limpiar y restaurar datos por defecto">
        🔄 Restaurar datos
      </button>
    </div>

    <!-- Cargando -->
    <div v-if="cargando" class="loading">
      <p>⏳ Cargando...</p>
    </div>

    <!-- Contenido -->
    <template v-else-if="config && gestor">
      <!-- Formulario -->
      <div class="contenedor-formulario">
        <h2>➕ Agregar {{ config.label.slice(0, -1) }}</h2>
        <form @submit.prevent="guardarEquipo">
          <div class="form-fields">
            <div v-for="field in config.fields" :key="field.name" class="form-group">
              <label :for="`campo-${field.name}`">{{ field.label }}</label>
              <input
                :id="`campo-${field.name}`"
                v-model="formulario[field.name]"
                type="text"
                :placeholder="field.placeholder"
                required
              />
            </div>
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-guardar">💾 Guardar</button>
            <button type="button" @click="limpiarFormulario" class="btn btn-cancelar">❌ Limpiar</button>
          </div>
        </form>
      </div>

      <!-- Lista de equipos -->
      <div class="lista-container">
        <h3>{{ config.icon }} {{ config.label }} Registrados ({{ equipos.length }})</h3>
        
        <div v-if="equipos.length === 0" class="sin-equipos">
          <p>📭 No hay {{ config.label.toLowerCase() }} aún</p>
        </div>

        <div v-else class="equipos-grid">
          <div v-for="equipo in equipos" :key="equipo.id" class="equipment-card">
            <div class="card-header">
              <strong>{{ equipo.marcaModelo || `${equipo.marca} ${equipo.modelo}` }}</strong>
            </div>
            <div class="card-details">
              <div v-for="field in config.fields" :key="field.name" class="detail">
                <span class="label">{{ field.label }}:</span>
                <span class="value">{{ equipo[field.name] }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button @click="llevarAlFormulario(equipo)" class="btn-accion btn-llevar">📋 Llevar</button>
              <button @click="eliminarEquipo(equipo.id)" class="btn-accion btn-eliminar">🗑️ Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useFormStore } from '../../../stores/formStore'
import { useEquipmentManager, EQUIPMENT_TYPES } from '../../../composables/equipment/useEquipmentManager'
import EquipmentForm from '../../../components/equipment/EquipmentForm.vue'
import EquipmentList from '../../../components/equipment/EquipmentList.vue'

const route = useRoute()
const router = useRouter()
const formStore = useFormStore()

const tipo = ref(null)
const cargando = ref(true)
const gestor = ref(null)
const formulario = ref({})

// Usar computed para equipos - siempre refleja el estado del gestor
const equipos = computed(() => {
  if (!gestor.value) {
    console.log('[computed] equipos: sin gestor')
    return []
  }
  // gestor.value.equipos YA ES el ref reactivo, no necesita .value
  console.log('[computed] equipos actual:', gestor.value.equipos)
  return gestor.value.equipos || []
})

const config = computed(() => {
  if (!tipo.value) return null
  return EQUIPMENT_TYPES[tipo.value]
})

// Limpiar formulario (DEBE ESTAR ANTES DEL WATCH)
const limpiarFormulario = () => {
  formulario.value = {}
  if (config.value?.fields) {
    config.value.fields.forEach(field => {
      formulario.value[field.name] = ''
    })
  }
}

// Inicializar cuando el tipo change
watch(() => route.params.tipo, async (nuevoTipo) => {
  if (!nuevoTipo) return
  
  console.log(`📌 Inicializando página para tipo: ${nuevoTipo}`)
  cargando.value = true
  tipo.value = nuevoTipo
  
  try {
    // Crear gestor
    gestor.value = useEquipmentManager(nuevoTipo)
    console.log(`✓ Gestor creado para ${nuevoTipo}`)
    
    // Cargar equipos
    gestor.value.cargar()
    console.log(`✓ Equipos cargados - gestor.value.equipos:`, gestor.value.equipos)
    console.log(`✓ Equipos cargados - gestor.value.equipos.value:`, gestor.value.equipos.value)
    console.log(`✓ Total de equipos:`, gestor.value.equipos.value?.length)
    
    // Inicializar formulario
    limpiarFormulario()
  } catch (error) {
    console.error('Error al inicializar:', error)
  } finally {
    cargando.value = false
  }
}, { immediate: true })

// Guardar equipo
const guardarEquipo = () => {
  if (!gestor.value) {
    alert('Error: Gestor no inicializado')
    return
  }

  // Validar que hay datos
  const tieneData = Object.values(formulario.value).some(v => v && String(v).trim() !== '')
  if (!tieneData) {
    alert('Por favor rellena al menos un campo')
    return
  }

  try {
    console.log(`💾 GUARDANDO EQUIPO - Datos del formulario:`, formulario.value)
    // Agregar equipo (esto actualiza automáticamente gestor.value.equipos)
    const nuevoEquipo = gestor.value.agregar({ ...formulario.value })
    console.log(`✓ Equipo agregado exitosamente:`, nuevoEquipo)
    console.log(`✓ Array total de equipos ahora (${gestor.value.equipos.length}):`, gestor.value.equipos)
    
    // Verificar localStorage directamente
    const almacenado = localStorage.getItem(gestor.config.storageKey)
    console.log(`✓ localStorage verificado - clave '${gestor.config.storageKey}':`, JSON.parse(almacenado))
    
    // Limpiar formulario
    limpiarFormulario()
    
    alert('✅ Equipo guardado correctamente')
  } catch (error) {
    console.error('Error al guardar:', error)
    alert(`❌ Error al guardar el equipo: ${error.message}`)
  }
}

// Limpiar localStorage (solo del tipo actual)
const limpiarLocalStorage = () => {
  if (!confirm('⚠️ ¿Está seguro? Esto eliminará TODOS los ' + config.value.label.toLowerCase() + ' guardados localmente')) return
  
  try {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(gestor.value.config.storageKey)
      console.log(`✓ localStorage limpiado para ${tipo.value}`)
      
      // Recargar datos (cargarán los por defecto)
      gestor.value.cargar()
      
      alert('✅ LocalStorage limpiado. Datos por defecto restaurados.')
    }
  } catch (error) {
    console.error('Error al limpiar localStorage:', error)
    alert('❌ Error al limpiar localStorage')
  }
}

// Eliminar equipo
const eliminarEquipo = (id) => {
  if (!confirm('¿Está seguro que desea eliminar este equipo?')) return
  
  try {
    console.log(`🗑️ Eliminando equipo con ID:`, id)
    gestor.value.eliminar(id)
    console.log(`✓ Equipo eliminado. Total ahora:`, gestor.value.equipos)
    alert('✅ Equipo eliminado')
  } catch (error) {
    console.error('Error:', error)
    alert('❌ Error al eliminar')
  }
}

// Llevar al formulario
const llevarAlFormulario = (equipo) => {
  const mapeo = {
    inversores: {
      e2_marcaModeloInversor: `${equipo.marca} ${equipo.modelo}`,
      e2_potenciaNominalInversor: equipo.potencia,
      e2_formaOndaSalidaInversor: equipo.vccMaxima,
      e2_frecuenciaNominalInversor: equipo.vccMinima,
      e2_tipoConexionRed: equipo.conexion
    },
    generadores: {
      e2_marcaModelo: `${equipo.marca} ${equipo.modelo}`,
      e2_potenciaPicoGenerador: equipo.potencia,
      e2_orientacionGenerador: equipo.especificacion
    },
    baterias: {
      e2_marcaModeloBateria: equipo.marcaModelo,
      e2_tipoDeBateria: equipo.tipoBateria,
      e2_tensionNominal: equipo.tensionNominal,
      e2_profundidadDescarga: equipo.profundidadDescarga,
      e2_tensionMaximaBateria: equipo.tensionMaxima,
      e2_tensionMinimaBateria: equipo.tensionMinima,
      e2_energiaTotal: equipo.energiaTotal,
      e2_potenciaMaximaSalida: equipo.potenciaMaximaSalida
    },
    modulos: {
      e2_marcaModeloModulo: equipo.marca,
      e2_potenciaPicoModulo: equipo.potenciaPicoModulo,
      e2_potenciaPicoGeneradorModulos: equipo.potenciaPicoGenerador,
      e2_intensidadIpmp: equipo.intensidadIpmp,
      e2_tensionVpmp: equipo.tensionVpmp,
      e2_orientacionModulos: equipo.orientacion,
      e2_inclinacionModulos: equipo.inclinacion,
      e2_numeroTotalModulos: equipo.totalModulos,
      e2_modulosEnSerie: equipo.modulosEnSerie,
      e2_ramasEnParalelo: equipo.ramasEnParalelo,
      e2_disposicionModulos: equipo.disposicionModulos
    }
  }
  
  const campo = mapeo[tipo.value]
  if (campo) {
    formStore.updateFormData(campo)
    router.push('/formulario-maestro')
  }
}

definePageMeta({
  layout: 'default'
})
</script>

<style scoped>
.pagina-equipos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
}

.header-content {
  flex: 1;
}

.header h1 {
  margin: 0.5rem 0 0 0;
  font-size: 2rem;
  color: #333;
}

.descripcion {
  margin: 0.5rem 0 0 0;
  color: #666;
  font-size: 1.05rem;
}

.volver {
  display: inline-block;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
}

.volver:hover {
  text-decoration: underline;
}

.loading {
  text-align: center;
  padding: 3rem 1rem;
  color: #666;
  font-size: 1.1rem;
}

.contenedor-formulario {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border-left: 4px solid #0066cc;
}

.contenedor-formulario h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.2rem;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
  font-size: 0.9rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.9rem;
}

.form-group input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.form-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-guardar {
  background: #28a745;
  color: white;
}

.btn-guardar:hover {
  background: #218838;
  transform: translateY(-2px);
}

.btn-cancelar {
  background: #dc3545;
  color: white;
}

.btn-cancelar:hover {
  background: #c82333;
  transform: translateY(-2px);
}

.lista-container {
  margin-top: 2rem;
}

.lista-container h3 {
  color: #333;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.sin-equipos {
  text-align: center;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  color: #666;
}

.equipos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.equipment-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.equipment-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-color: #0066cc;
}

.card-header {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
  color: #333;
}

.card-details {
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.detail {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.detail .label {
  font-weight: 600;
  color: #666;
}

.detail .value {
  color: #333;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.btn-accion {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-llevar {
  background: #2196f3;
  color: white;
}

.btn-llevar:hover {
  background: #0b7dda;
  transform: translateY(-2px);
}

.btn-eliminar {
  background: #dc3545;
  color: white;
}

.btn-eliminar:hover {
  background: #c82333;
  transform: translateY(-2px);
}

.btn-limpiar-storage {
  padding: 0.5rem 1rem;
  background: #ff9800;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-limpiar-storage:hover {
  background: #e68900;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .form-fields {
    grid-template-columns: 1fr;
  }

  .equipos-grid {
    grid-template-columns: 1fr;
  }
  
  .header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .btn-limpiar-storage {
    margin-top: 1rem;
    width: 100%;
  }
}
</style>

