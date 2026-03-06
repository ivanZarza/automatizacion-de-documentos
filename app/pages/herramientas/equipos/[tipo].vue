<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormStore } from '../../../stores/formStore'
import { useEquipmentStore } from '../../../stores/equipmentStore'

const formStore = useFormStore()
const equipmentStore = useEquipmentStore()
const route = useRoute()
const router = useRouter()

const tipo = ref<string | null>(null)
const cargando = ref(true)
const formulario = ref<Record<string, any>>({})

const EQUIPMENT_TYPES: Record<string, any> = {
  inversores: { label: 'Inversores', icon: '⚡', campos: ['marca', 'modelo', 'potencia', 'vccMaxima', 'vccMinima', 'conexion'], fieldsMapping: {} },
  generadores: { label: 'Generadores', icon: '🔧', campos: ['marca', 'modelo', 'potencia', 'especificacion'], fieldsMapping: {} },
  baterias: { label: 'Baterías', icon: '🔋', campos: ['marcaModelo', 'tipoBateria', 'tensionNominal'], fieldsMapping: {} },
  modulos: { label: 'Módulos', icon: '☀️', campos: ['marca', 'potenciaPicoModulo'], fieldsMapping: {} }
}

const config = computed(() => (tipo.value && EQUIPMENT_TYPES[tipo.value]) ? EQUIPMENT_TYPES[tipo.value] : null)
const campos = computed(() => config.value?.campos || [])
const equipos = computed(() => (tipo.value ? equipmentStore.getEquipos(tipo.value).value : []) || [])

const modoEdicion = ref(false)
const idEditable = ref<string | null>(null)

const formatearLabel = (clave: string) => String(clave).replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()

const limpiarFormulario = () => {
  formulario.value = {}
  campos.value.forEach((c: string) => (formulario.value[c] = ''))
  modoEdicion.value = false
  idEditable.value = null
}

const editarEquipo = (equipo: any) => {
  modoEdicion.value = true
  idEditable.value = equipo.id
  // Rellenar formulario
  campos.value.forEach((c: string) => {
    formulario.value[c] = equipo[c] || ''
  })
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

watch(() => route.params.tipo, (t) => {
  if (t) {
    tipo.value = String(t)
    limpiarFormulario()
    cargando.value = false
  }
}, { immediate: true })

const guardarEquipo = async () => {
  const tieneData = Object.values(formulario.value).some(v => v && String(v).trim() !== '')
  if (!tieneData) { alert('Por favor rellena al menos un campo'); return }
  try {
    const datosEnvio = { ...formulario.value }
    if (modoEdicion.value && idEditable.value) {
      datosEnvio.id = idEditable.value
    }
    await equipmentStore.agregarEquipo(tipo.value as string, datosEnvio)
    limpiarFormulario()
    alert(modoEdicion.value ? 'Equipo actualizado' : 'Equipo guardado')
  } catch (e: any) {
    console.error(e)
    alert('Error al guardar')
  }
}

const limpiarLocalStorage = () => {
  if (!confirm('¿Limpiar datos locales?')) return
  if (typeof window !== 'undefined') { localStorage.clear(); window.location.reload() }
}

const eliminarEquipo = async (id: string) => {
  if (!confirm('¿Eliminar equipo?')) return
  try { await equipmentStore.eliminarEquipo(tipo.value as string, id); alert('Eliminado') } catch (e: any) { console.error('Error al eliminar:', e); alert(`❌ Error al eliminar el equipo: ${e?.message || e}`) }
}

const llevarAlFormulario = (equipo: Record<string, any>) => {
  const mapping = config.value?.fieldsMapping || {}
  const datos: Record<string, any> = {}
  Object.entries(mapping).forEach(([k, v]) => { if (equipo[k]) datos[v as string] = equipo[k] })
  formStore.updateFormData(datos)
  router.push('/formulario-maestro')
}

definePageMeta({ layout: 'default' })
</script>

<template>
  <div class="pagina-equipos">
    <div class="header-content">
      <NuxtLink to="/" class="volver">← Volver</NuxtLink>
      <h1 v-if="config">{{ config.icon }} {{ config.label }}</h1>
      <p class="descripcion" v-if="config">Gestiona {{ config.label.toLowerCase() }} para el formulario maestro</p>
    </div>

    <div v-if="cargando" class="loading">
      <p>⏳ Cargando...</p>
    </div>

    <div v-else-if="config" class="content">
      <div class="contenedor-formulario">
        <h2>{{ modoEdicion ? '✏️ Editar ' + config.label.slice(0, -1) : '➕ Nuevo ' + config.label.slice(0, -1) }}</h2>
        <form @submit.prevent="guardarEquipo">
          <div class="form-fields">
            <div v-for="campo in campos" :key="campo" class="form-group">
              <label :for="campo">{{ formatearLabel(campo) }}</label>
              <input :id="campo" v-model="formulario[campo]" type="text"
                :placeholder="`Ingrese ${formatearLabel(campo)}`" />
            </div>
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-guardar">{{ modoEdicion ? '💾 Actualizar' : '💾 Guardar' }}</button>
            <button type="button" @click="limpiarFormulario" class="btn btn-cancelar">{{ modoEdicion ? '❌ Cancelar' : '❌ Limpiar' }}</button>
          </div>
        </form>
      </div>

      <div class="contenedor-equipos">
        <h2>{{ config.icon }} {{ config.label }} Registrados ({{ equipos.length }})</h2>
        <div v-if="equipos.length === 0" class="sin-equipos">
          <p>📭 No hay {{ config.label.toLowerCase() }} registrados aún</p>
        </div>
        <div v-else class="equipos-grid">
          <div v-for="e in equipos" :key="e.id" class="equipment-card">
            <div class="card-header"><strong>{{ e.marcaModelo || e.marca || 'Sin nombre' }}</strong></div>
            <div class="card-details">
              <div v-for="(v, k) in e" :key="k" v-show="k !== 'id' && k !== 'fechaCreacion'" class="detail">
                <span class="label">{{ formatearLabel(k) }}:</span>
                <span class="value">{{ v }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button @click="llevarAlFormulario(e)" class="btn-llevar">📋 Llevar</button>
              <button @click="editarEquipo(e)" class="btn-editar">✏️ Editar</button>
              <button @click="eliminarEquipo(e.id)" class="btn-eliminar">🗑️ Eliminar</button>
            </div>
          </div>
        </div>
        <button v-if="equipos.length > 0" @click="limpiarLocalStorage" class="btn-limpiar-storage">🔄 Restaurar
          datos</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina-equipos {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem
}

.header-content {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee
}

.volver {
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  display: inline-block
}

.descripcion {
  color: #666
}

.loading {
  text-align: center;
  padding: 3rem 1rem;
  color: #666
}

.contenedor-formulario,
.contenedor-equipos {
  background: #f9f9f9;
  border-radius: 8px;
  padding: 2rem;
  border-left: 4px solid #0066cc;
  margin-bottom: 1.5rem
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem
}

.form-group label {
  font-weight: 600;
  margin-bottom: .5rem
}

.form-group input {
  padding: .75rem;
  border: 1px solid #ddd;
  border-radius: 4px
}

.form-buttons {
  display: flex;
  gap: 1rem;
  justify-content: flex-end
}

.btn {
  padding: .75rem 1.5rem;
  border-radius: 4px;
  border: none;
  font-weight: 600;
  cursor: pointer
}

.btn-guardar {
  background: #28a745;
  color: #fff
}

.btn-cancelar {
  background: #6c757d;
  color: #fff
}

.equipos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 1.5rem
}

.equipment-card {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden
}

.card-header {
  padding: 1rem;
  background: #f0f0f0;
  border-bottom: 1px solid #ddd
}

.card-details {
  padding: 1rem
}

.detail {
  display: flex;
  justify-content: space-between;
  padding: .5rem 0;
  border-bottom: 1px solid #f0f0f0
}

.card-actions {
  display: flex;
  gap: .5rem;
  padding: 1rem;
  background: #fafafa
}

.btn-llevar {
  flex: 1;
  background: #2196f3;
  color: #fff;
  padding: .6rem 1rem
}

.btn-eliminar {
  flex: 1;
  background: #dc3545;
  color: #fff;
  padding: .6rem 1rem
}

@media(max-width:768px) {
  .form-fields {
    grid-template-columns: 1fr
  }

  .form-buttons {
    flex-direction: column
  }

  .btn {
    width: 100%
  }

  .equipos-grid {
    grid-template-columns: 1fr
  }
}
</style>
