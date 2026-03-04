<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormStore } from '../../../stores/formStore'
import { useEquipmentStore } from '../../../stores/equipmentStore'

const formStore = useFormStore()
const equipmentStore = useEquipmentStore()
const router = useRouter()

const tipo = 'inversores'
const cargando = ref(false)
const formulario = ref<Record<string, any>>({
  marcaModelo: '',
  potencia: '',
  vccMaxima: '',
  vccMinima: '',
  conexion: '',
  relacionTension: ''
})

const label = 'Inversores'
const icon = '⚡'
const campos = [
  { id: 'marcaModelo', label: 'Marca y Modelo' },
  { id: 'potencia', label: 'Potencia' },
  { id: 'vccMaxima', label: 'Vcc Máxima' },
  { id: 'vccMinima', label: 'Vcc Mínima' },
  { id: 'conexion', label: 'Conexión', type: 'select', options: ['Monofásica', 'Trifásica'] },
  { id: 'relacionTension', label: 'Relación Tensión', placeholder: 'Ej: 230/400' }
]
const fieldsMapping = {
  marca: 'marcaEquipo',
  modelo: 'modeloEquipo',
  potencia: 'potenciaInversor',
  vccMaxima: 'vccMaxima',
  vccMinima: 'vccMinima',
  conexion: 'conexionInversor'
}

// Ensure reactivity by wrapping the store logic in a computed property
const equipos = computed(() => equipmentStore.inversores || [])

onMounted(async () => {
  cargando.value = true
  await equipmentStore.cargarEquiposBD(tipo)
  cargando.value = false
})

const formatearLabel = (clave: string) => String(clave).replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()

const limpiarFormulario = () => {
  formulario.value = {}
  campos.forEach(c => formulario.value[c.id] = '')
}

const guardarEquipo = async () => {
  const tieneData = Object.values(formulario.value).some(v => v && String(v).trim() !== '')
  if (!tieneData) { alert('Por favor rellena al menos un campo'); return }
  try {
    await equipmentStore.agregarEquipo(tipo, { ...formulario.value })
    limpiarFormulario()
    alert('Equipo guardado')
  } catch (e: any) {
    console.error(e)
    alert('Error al guardar')
  }
}

const eliminarEquipo = async (id: string) => {
  if (!confirm('¿Eliminar equipo?')) return
  try { 
    await equipmentStore.eliminarEquipo(tipo, id); 
    alert('Eliminado') 
  } catch (e: any) { 
    console.error('Error al eliminar:', e); 
    alert(`❌ Error al eliminar el equipo: ${e?.message || e}`) 
  }
}

const llevarAlFormulario = (equipo: Record<string, any>) => {
  const datos: Record<string, any> = {
    e2_marcaModeloInversor: equipo.marcaModelo || `${equipo.marca || ''} ${equipo.modelo || ''}`.trim(),
    e2_potenciaNominalInversor: equipo.potencia,
    e2_formaOndaSalidaInversor: equipo.vccMaxima,
    e2_frecuenciaNominalInversor: equipo.vccMinima,
    e2_tipoConexionRed1: equipo.conexion,
    e2_relacionTensionInversor: equipo.relacionTension
  }

  // Usamos el nuevo método que no guarda en localStorage
  formStore.setFormDataUnsaved(datos)
  router.push('/formulario-maestro')
}

definePageMeta({ layout: 'default' })
</script>

<template>
  <div class="pagina-equipos">
    <div class="header-content">
      <NuxtLink to="/" class="volver">← Volver</NuxtLink>
      <h1>{{ icon }} {{ label }}</h1>
      <p class="descripcion">Gestiona inversores para el formulario maestro</p>
    </div>

    <div v-if="cargando" class="loading"><p>⏳ Cargando...</p></div>

    <div v-else class="content">
      <div class="contenedor-formulario">
        <h2>➕ Nuevo Inversor</h2>
        <form @submit.prevent="guardarEquipo">
          <div class="form-fields">
            <div v-for="campo in campos" :key="campo.id" class="form-group">
              <label :for="campo.id">{{ campo.label || formatearLabel(campo.id) }}</label>
              
              <select v-if="campo.type === 'select'" :id="campo.id" v-model="formulario[campo.id]">
                <option value="" disabled selected>Seleccione {{ campo.label }}</option>
                <option v-for="opt in campo.options" :key="opt" :value="opt">{{ opt }}</option>
              </select>
              
              <input v-else :id="campo.id" v-model="formulario[campo.id]" type="text" :placeholder="campo.placeholder || `Ingrese ${campo.label || formatearLabel(campo.id)}`" />
            </div>
          </div>
          <div class="form-buttons">
            <button type="submit" class="btn btn-guardar">💾 Guardar</button>
            <button type="button" @click="limpiarFormulario" class="btn btn-cancelar">❌ Limpiar</button>
          </div>
        </form>
      </div>

      <div class="contenedor-equipos">
        <h2>{{ icon }} {{ label }} Registrados ({{ equipos.length }})</h2>
        <div v-if="equipos.length === 0" class="sin-equipos"><p>📭 No hay inversores registrados aún</p></div>
        <div v-else class="equipos-grid">
          <div v-for="e in (equipos as Record<string, any>[])" :key="e.id" class="equipment-card">
            <div class="card-header"><strong>{{ e.marcaModelo || e.marca || 'Sin nombre' }}</strong></div>
            <div class="card-details">
              <div v-for="(v, k) in e" :key="k" v-show="k !== 'id' && k !== 'fechaCreacion'" class="detail">
                <span class="label">{{ formatearLabel(k) }}:</span>
                <span class="value">{{ v }}</span>
              </div>
            </div>
            <div class="card-actions">
              <button @click="llevarAlFormulario(e)" class="btn-llevar">📋 Llevar</button>
              <button @click="eliminarEquipo(e.id)" class="btn-eliminar">🗑️ Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.pagina-equipos{max-width:1200px;margin:0 auto;padding:2rem 1rem}
.header-content{margin-bottom:2rem;padding-bottom:1.5rem;border-bottom:2px solid #eee}
.volver{color:#0066cc;text-decoration:none;font-weight:600;margin-bottom:1rem;display:inline-block}
.descripcion{color:#666}
.loading{text-align:center;padding:3rem 1rem;color:#666}
.contenedor-formulario,.contenedor-equipos{background:#f9f9f9;border-radius:8px;padding:2rem;border-left:4px solid #0066cc;margin-bottom:1.5rem}
.form-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:1rem}
.form-group label{font-weight:600;margin-bottom:.5rem;display:block}
.form-group input, .form-group select{width:100%;padding:.75rem;border:1px solid #ddd;border-radius:4px;box-sizing:border-box}
.form-buttons{display:flex;gap:1rem;justify-content:flex-end}
.btn{padding:.75rem 1.5rem;border-radius:4px;border:none;font-weight:600;cursor:pointer}
.btn-guardar{background:#28a745;color:#fff}.btn-cancelar{background:#6c757d;color:#fff}
.equipos-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(350px,1fr));gap:1.5rem}
.equipment-card{background:#fff;border:1px solid #ddd;border-radius:8px;overflow:hidden}
.card-header{padding:1rem;background:#f0f0f0;border-bottom:1px solid #ddd}
.card-details{padding:1rem}
.detail{display:flex;justify-content:space-between;padding:.5rem 0;border-bottom:1px solid #f0f0f0}
.card-actions{display:flex;gap:.5rem;padding:1rem;background:#fafafa}
.btn-llevar{flex:1;background:#2196f3;color:#fff;padding:.6rem 1rem}.btn-eliminar{flex:1;background:#dc3545;color:#fff;padding:.6rem 1rem}
@media(max-width:768px){.form-fields{grid-template-columns:1fr}.form-buttons{flex-direction:column}.btn{width:100%}.equipos-grid{grid-template-columns:1fr}}
</style>
