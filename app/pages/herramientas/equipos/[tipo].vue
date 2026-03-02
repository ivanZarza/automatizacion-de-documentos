<template>
  <div class="pagina-equipos">
    <!-- Header -->
    <div class="header">
      <div>
        <NuxtLink to="/" class="volver">← Volver</NuxtLink>
        <h1>{{ config.icon }} {{ config.label }}</h1>
        <p class="descripcion">Gestiona {{ config.label.toLowerCase() }} para el formulario maestro</p>
      </div>
    </div>

    <!-- Formulario para agregar -->
    <div class="contenedor-formulario">
      <h2>➕ Agregar {{ config.label.slice(0, -1) }}</h2>
      <form @submit.prevent="guardarEquipo">
        <div class="form-fields">
          <div v-for="campo in campos" :key="campo" class="form-group">
            <label :for="campo">{{ formatearLabel(campo) }}</label>
            <select
              v-if="EQUIPMENT_TYPES[tipo].camposConfig?.[campo]?.type === 'select'"
              :id="campo"
              v-model="formulario[campo]"
              required
              class="form-input-select"
            >
              <option value="">Seleccionar...</option>
              <option
                v-for="option in EQUIPMENT_TYPES[tipo].camposConfig[campo].options"
                :key="option"
                :value="option"
              >
                {{ option }}
              </option>
            </select>
            <input
              v-else
              :id="campo"
              v-model="formulario[campo]"
              type="text"
              :placeholder="`Ingrese ${formatearLabel(campo).toLowerCase()}`"
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

    <!-- Equipos Registrados -->
    <div class="contenedor-equipos">
      <h2>{{ config.icon }} {{ config.label }} Registrados ({{ equipos.length }})</h2>
      
      <div v-if="equipos.length === 0" class="sin-equipos">
        <p>📭 No hay {{ config.label.toLowerCase() }} registrados aún</p>
      </div>

      <div v-else class="equipos-grid">
        <div v-for="equipo in equipos" :key="equipo.id" class="equipment-card">
          <div class="card-header">
            <strong>{{ equipo.marcaModelo || equipo.marca || 'Sin nombre' }}</strong>
          </div>
          
          <div class="card-details">
            <div v-for="(valor, clave) in equipo" :key="clave" v-show="clave !== 'id' && clave !== 'fechaCreacion'" class="detail">
              <span class="label">{{ formatearLabel(clave) }}:</span>
              <span class="value">{{ valor }}</span>
            </div>
          </div>

          <div class="card-actions">
            <button @click="llevarAlFormulario(equipo)" class="btn btn-llevar">📋 Llevar</button>
            <button @click="eliminarEquipo(equipo.id)" class="btn btn-eliminar">🗑️ Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useFormStore } from '../../../stores/formStore'
import { useEquipmentStore } from '../../../stores/equipmentStore'

const route = useRoute()
const router = useRouter()
const formStore = useFormStore()
const equipmentStore = useEquipmentStore()

const tipo = ref(null)
const formulario = ref({})

// Configuración de campos por tipo
const EQUIPMENT_TYPES = {
  inversores: {
    label: 'Inversores',
    icon: '⚡',
    campos: ['marcaModelo', 'potenciaNominal', 'relacionTension', 'vccMaxima', 'vccMinima', 'tipoConexion'],
    camposConfig: {
      tipoConexion: { type: 'select', options: ['Monofásica', 'Trifásica'] }
    },
    fieldsMapping: {
      marcaModelo: 'e2_marcaModeloInversor',
      potenciaNominal: 'e2_potenciaNominalInversor',
      relacionTension: 'e2_relacionTensionInversor',
      vccMaxima: 'e2_formaOndaSalidaInversor',
      vccMinima: 'e2_frecuenciaNominalInversor',
      tipoConexion: 'e2_tipoConexionRed'
    }
  },
  generadores: {
    label: 'Generadores',
    icon: '🔧',
    campos: ['marca', 'modelo', 'potencia', 'especificacion'],
    camposConfig: {},
    fieldsMapping: {
      marca: 'e2_marcaModelo',
      modelo: 'e2_marcaModelo',
      potencia: 'e2_potenciaPicoGenerador',
      especificacion: 'e2_orientacionGenerador'
    }
  },
  baterias: {
    label: 'Baterías',
    icon: '🔋',
    campos: ['marcaModelo', 'tipoBateria', 'tensionNominal', 'profundidadDescarga', 'tensionMaxima', 'tensionMinima', 'energiaTotal', 'potenciaMaximaSalida', 'maximoPicoDePotencia'],
    camposConfig: {},
    fieldsMapping: {
      marcaModelo: 'e2_marcaModelo',
      tipoBateria: 'e2_tipoDeBateria',
      tensionNominal: 'e2_tensionNominal',
      profundidadDescarga: 'e2_profundidadDescarga',
      tensionMaxima: 'e2_tensionMaxima',
      tensionMinima: 'e2_tensionMinima',
      energiaTotal: 'e2_energiaTotal',
      potenciaMaximaSalida: 'e2_potenciaMaximaSalida',
      maximoPicoDePotencia: 'e2_maximoPicoDePotencia'
    }
  },
  modulos: {
    label: 'Módulos',
    icon: '☀️',
    campos: ['marcaModelo', 'potenciaPicoModulo', 'potenciaPicoGenerador', 'intensidadIpmp', 'tensionVpmp', 'orientacion', 'inclinacion', 'totalModulos', 'modulosEnSerie', 'ramasEnParalelo', 'disposicionModulos'],
    camposConfig: {
      disposicionModulos: { type: 'select', options: ['Cubierta Teja - Aporticada', 'Cubierta Teja - Coplanar', 'Cubierta Plana', 'Pergola', 'Chapa Grecada - Aporticada', 'Chapa Grecada - Coplanar', 'Suelo', 'Paramento Vertical'] }
    },
    fieldsMapping: {
      marcaModelo: 'e2_marcaModeloModulo',
      potenciaPicoModulo: 'e2_potenciaPicoModulo',
      potenciaPicoGenerador: 'e2_potenciaPicoGenerador',
      intensidadIpmp: 'e2_intensidadIpmpGenerador',
      tensionVpmp: 'e2_tensionVpmpGenerador',
      orientacion: 'e2_orientacionGenerador',
      inclinacion: 'e2_inclinacionGenerador',
      totalModulos: 'e2_totalModulos',
      modulosEnSerie: 'e2_modulosEnSerie',
      ramasEnParalelo: 'e2_ramasEnParalelo',
      disposicionModulos: 'disposicionModulos'
    }
  }
}

const config = computed(() => EQUIPMENT_TYPES[tipo.value] || {})

const campos = computed(() => config.value.campos || [])

const equipos = computed(() => {
  if (!tipo.value) return []
  // Acceder directamente a las refs para que Vue las rastree
  if (tipo.value === 'inversores') return equipmentStore.inversores
  if (tipo.value === 'generadores') return equipmentStore.generadores
  if (tipo.value === 'baterias') return equipmentStore.baterias
  if (tipo.value === 'modulos') return equipmentStore.modulos
  return []
})

// Formatear labels de propiedades
const formatearLabel = (clave) => {
  return clave
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

// Limpiar formulario (DEBE ESTAR ANTES DEL WATCH)
const limpiarFormulario = () => {
  formulario.value = {}
  campos.value.forEach(campo => {
    formulario.value[campo] = ''
  })
}

// Inicializar tipo desde ruta
watch(() => route.params.tipo, (nuevoTipo) => {
  if (nuevoTipo) {
    tipo.value = nuevoTipo
    limpiarFormulario()
    console.log(`📌 Cargando equipos de tipo: ${nuevoTipo}`)
  }
}, { immediate: true })

// Guardar equipo
const guardarEquipo = async () => {
  // Validar que hay datos
  const tieneData = Object.values(formulario.value).some(v => v && String(v).trim() !== '')
  if (!tieneData) {
    alert('Por favor rellena al menos un campo')
    return
  }

  try {
    console.log(`💾 Guardando equipo:`, formulario.value)
    await equipmentStore.agregarEquipo(tipo.value, { ...formulario.value })
    console.log(`✅ Equipo agregado. Total ahora:`, equipos.value.length)
    
    limpiarFormulario()
    alert('✅ Equipo guardado correctamente')
  } catch (error) {
    console.error('Error al guardar:', error)
    alert(`❌ Error al guardar el equipo: ${error.message}`)
  }
}

// Llevar al formulario maestro
const llevarAlFormulario = (equipo) => {
  console.log(`📋 Llevando equipo al formulario maestro:`, equipo)
  
  const mapping = config.value.fieldsMapping
  if (!mapping) return

  const datosParaFormulario = {}

  // Mapear cada campo del equipo al campo del formulario
  Object.entries(mapping).forEach(([equipoField, formularioField]) => {
    const valor = equipo[equipoField]
    
    if (valor) {
      datosParaFormulario[formularioField] = valor
    }
  })

  console.log(`✅ Datos mapeados para formulario:`, datosParaFormulario)
  formStore.updateFormData(datosParaFormulario)
  router.push('/formulario-maestro')
}

// Eliminar equipo
const eliminarEquipo = async (id) => {
  if (!confirm('¿Está seguro que desea eliminar este equipo?')) return

  try {
    await equipmentStore.eliminarEquipo(tipo.value, id)
    console.log(`✅ Equipo eliminado`)
    alert('✅ Equipo eliminado correctamente')
  } catch (error) {
    console.error('Error al eliminar:', error)
    alert(`❌ Error al eliminar el equipo: ${error.message}`)
  }
}
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
}

.header h1 {
  margin: 1rem 0 0.5rem 0;
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

/* Formulario */
.contenedor-formulario {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
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
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-input-select {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.form-input-select:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 3px rgba(0, 102, 204, 0.1);
}

.form-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
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
  transform: translateY(-1px);
}

.btn-cancelar {
  background: #6c757d;
  color: white;
}

.btn-cancelar:hover {
  background: #5a6268;
  transform: translateY(-1px);
}

/* Equipos */
.contenedor-equipos {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  border-left: 4px solid #0066cc;
}

.contenedor-equipos h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
  color: #333;
  font-size: 1.2rem;
}

.sin-equipos {
  text-align: center;
  padding: 2rem;
  color: #999;
  font-size: 1.05rem;
}

.equipos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem;
}

.equipment-card {
  background: white;
  border-radius: 8px;
  border: 1px solid #ddd;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: all 0.3s ease;
}

.equipment-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

.card-header {
  background: #f0f0f0;
  padding: 1rem;
  border-bottom: 1px solid #ddd;
}

.card-header strong {
  color: #333;
  font-size: 1.1rem;
  word-break: break-word;
}

.card-details {
  padding: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.detail {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f0f0f0;
  font-size: 0.95rem;
}

.detail:last-child {
  border-bottom: none;
}

.detail .label {
  font-weight: 600;
  color: #666;
  flex: 0 0 40%;
}

.detail .value {
  color: #333;
  text-align: right;
  flex: 1;
  word-break: break-word;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  padding: 1rem;
  border-top: 1px solid #ddd;
  background: #fafafa;
}

.btn-llevar {
  flex: 1;
  background: #2196f3;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-llevar:hover {
  background: #0b7dda;
  transform: translateY(-1px);
}

.btn-eliminar {
  flex: 1;
  background: #dc3545;
  color: white;
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-eliminar:hover {
  background: #c82333;
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .form-fields {
    grid-template-columns: 1fr;
  }

  .equipos-grid {
    grid-template-columns: 1fr;
  }

  .form-buttons {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }

  .detail {
    flex-direction: column;
  }

  .detail .label {
    flex: unset;
    margin-bottom: 0.25rem;
  }

  .detail .value {
    text-align: left;
    flex: unset;
  }
}
</style>
