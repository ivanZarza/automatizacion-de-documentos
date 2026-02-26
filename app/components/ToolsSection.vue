<template>
  <SectionCard
    title="🛠️ Herramientas"
    :isExpanded="isExpanded"
    @toggle="isExpanded = !isExpanded"
    :count="formularios.length"
    :isEmpty="formularios.length === 0"
  >
    <div class="tools-content">
      <div class="tools-search">
        <input 
          v-model="busqueda" 
          placeholder="Buscar en BD..." 
          class="tools-input"
          @keyup.enter="buscarEnBD"
        />
        <button @click="buscarEnBD" class="tools-btn tools-btn-search">Buscar</button>
      </div>

      <div v-if="formulariosBuscados.length > 0">
        <div class="search-results-header">
          📦 Se encontraron {{ formulariosBuscados.length }} coincidencia(s)
        </div>
        <div v-for="(f, idx) in formulariosBuscados" :key="idx" class="tools-item tools-item-search-result">
          <strong>{{ f.nombre }}</strong>
          <div class="tools-buttons">
            <button @click="confirmarCarga(f.formulario)" class="tools-btn tools-btn-load">al formulario</button>
          </div>
        </div>
        <button @click="limpiarBusqueda" class="tools-btn tools-btn-cancel" style="width: 100%; margin-top: 1rem;">Limpiar búsqueda</button>
      </div>

      <div v-else-if="formulariosFiltrados.length > 0">
        <div v-for="f in formulariosFiltrados" :key="f.nombre" class="tools-item">
          <strong>{{ f.nombre }}</strong>
          <span class="local-badge">LOCAL</span>
          <div class="tools-buttons">
            <button @click="confirmarCarga(f.formulario)" class="tools-btn tools-btn-load">Cargar en Formulario Maestro</button>
            <button @click="descargarFormulario(f)" class="tools-btn tools-btn-download">📥 Descargar</button>
            <button @click="eliminarFormulario(f.nombre)" class="tools-btn tools-btn-delete">🗑️ Eliminar</button>
          </div>
        </div>
      </div>
      <div v-else class="tools-empty">
        <p v-if="formularios.length === 0">No hay formularios guardados localmente</p>
        <p v-else>No se encontraron formularios con "{{ busqueda }}"</p>
      </div>

      <!-- Espacio para futuras herramientas -->
      <div class="tools-extra">
        <h4>Gestión de generadores, inversores y baterías (próximamente)</h4>
      </div>
    </div>
  </SectionCard>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import SectionCard from './SectionCard.vue'

const isExpanded = ref(false)
const formularios = ref([])
const busqueda = ref('')
const formularioBuscado = ref(null)
const formulariosBuscados = ref([])
const buscando = ref(false)

const formulariosFiltrados = computed(() => {
  return formularios.value
})

function cargarFormularios() {
  const formulariosLocales = []
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key && key.startsWith('form_')) {
      try {
        const data = JSON.parse(localStorage.getItem(key))
        if (data) {
          formulariosLocales.push(data)
        }
      } catch (err) {
        console.error(`Error al parsear ${key}:`, err)
      }
    }
  }

  formularios.value = formulariosLocales
}

function normalizarTexto(texto) {
  // Remover acentos y convertir a minúsculas
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .trim()
}

async function buscarEnBD() {
  if (!busqueda.value.trim()) {
    alert('⚠️ Por favor ingresa un nombre para buscar')
    return
  }

  buscando.value = true
  try {
    const textoBuscaNormalizado = normalizarTexto(busqueda.value)
    
    const resultado = await $fetch('/api/forms', {
      query: { nombre: busqueda.value }
    })
    
    if (resultado && resultado.error) {
      // Error en la respuesta
      formulariosBuscados.value = []
      alert('❌ No se encontró ningún formulario en BD con ese nombre')
    } else if (resultado && resultado.nombre) {
      // El resultado es un único formulario (objeto)
      formulariosBuscados.value = [{
        nombre: resultado.nombre,
        formulario: resultado.formulario || resultado.datos || {}
      }]
    } else if (Array.isArray(resultado) && resultado.length > 0) {
      // El resultado es un array de formularios
      // Filtramos por coincidencia normalizada local
      const formulariosFiltrados = resultado.filter(f => 
        normalizarTexto(f.nombre).includes(textoBuscaNormalizado)
      )
      
      if (formulariosFiltrados.length > 0) {
        formulariosBuscados.value = formulariosFiltrados.map(f => ({
          nombre: f.nombre,
          formulario: f.formulario || f.datos || {}
        }))
      } else {
        formulariosBuscados.value = []
        alert('❌ No se encontró ningún formulario en BD que coincida con ese nombre')
      }
    } else {
      formulariosBuscados.value = []
      alert('❌ No se encontró ningún formulario en BD')
    }
  } catch (err) {
    console.error('Error al buscar en BD:', err)
    formulariosBuscados.value = []
    alert('❌ Error al buscar en la base de datos')
  } finally {
    buscando.value = false
  }
}

function limpiarBusqueda() {
  busqueda.value = ''
  formulariosBuscados.value = []
}

function confirmarCarga(datos) {
  if (confirm('¿Quieres cargar estos datos en el formulario maestro? Esto reemplazará los datos actuales.')) {
    localStorage.setItem('formDataMaestro', JSON.stringify(datos))
    alert('✅ Datos cargados en el formulario maestro. Puedes ir a editarlo.')
  }
}

function descargarFormulario(formulario) {
  try {
    const datos = JSON.stringify(formulario.formulario, null, 2)
    const blob = new Blob([datos], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${formulario.nombre}.json`
    link.click()
    URL.revokeObjectURL(url)
  } catch (err) {
    console.error('Error al descargar formulario:', err)
    alert('❌ Error al descargar el formulario')
  }
}

function eliminarFormulario(nombre) {
  if (confirm(`¿Estás seguro de que deseas eliminar "${nombre}"?`)) {
    const key = `form_${nombre}`
    localStorage.removeItem(key)
    formularios.value = formularios.value.filter(f => f.nombre !== nombre)
    alert(`✅ Formulario "${nombre}" eliminado`)
  }
}

onMounted(cargarFormularios)
</script>

<style scoped>
.bd-warning {
  background-color: #fff3cd;
  color: #856404;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 600;
  text-align: center;
}

.bd-info {
  background-color: #d1ecf1;
  color: #0c5460;
  padding: 0.75rem 1rem;
  border-radius: 6px;
  margin-bottom: 1rem;
  font-weight: 500;
  text-align: center;
  border: 1px solid #bee5eb;
}

.local-badge {
  display: inline-block;
  background-color: #28a745;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0 0.5rem;
}

.tools-content {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 1.5rem 0;
}

.tools-search {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}

.tools-input {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
}

.tools-input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.tools-btn {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

.tools-btn:hover:not(:disabled) {
  background-color: #0056b3;
}

.tools-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.tools-btn-load {
  background-color: #28a745;
  flex: 1;
  min-width: 150px;
  padding: 0.5rem 1.5rem;
}

.tools-btn-load:hover {
  background-color: #218838;
}

.tools-btn-download {
  background-color: #17a2b8;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  white-space: nowrap;
}

.tools-btn-download:hover {
  background-color: #138496;
}

.tools-btn-delete {
  background-color: #dc3545;
  padding: 0.5rem 0.75rem;
  font-size: 0.85rem;
  white-space: nowrap;
}

.tools-btn-delete:hover {
  background-color: #c82333;
}

.tools-btn-export {
  background-color: #FFC107;
  color: #000;
  width: 100%;
}

.tools-btn-export:hover:not(:disabled) {
  background-color: #e0a800;
}

.tools-btn-search {
  background-color: #6c757d;
  min-width: 100px;
}

.tools-btn-search:hover {
  background-color: #5a6268;
}

.tools-btn-cancel {
  background-color: #6c757d;
}

.tools-btn-cancel:hover {
  background-color: #5a6268;
}

.search-badge {
  display: inline-block;
  background-color: #007bff;
  color: #fff;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  margin: 0 0.5rem;
}

.search-results-header {
  background-color: #e7f3ff;
  color: #0056b3;
  padding: 0.75rem;
  border-radius: 4px;
  font-weight: 600;
  margin-bottom: 0.75rem;
  border: 1px solid #b3d9ff;
}

.tools-item-search-result {
  border: 2px solid #007bff;
  background-color: #e7f3ff;
  flex-wrap: nowrap !important;
  justify-content: flex-start;
}

.tools-item-search-result strong {
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tools-item-search-result .search-badge {
  margin: 0 0.5rem;
  flex-shrink: 0;
}

.tools-item-search-result .tools-buttons {
  flex-basis: auto;
  margin-left: auto;
}

.tools-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
  flex-wrap: wrap;
}

.tools-buttons {
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
  flex-basis: 100%;
}

.tools-item strong {
  flex-basis: 100%;
  display: block;
  margin-bottom: 0.5rem;
}

.tools-empty {
  text-align: center;
  color: #888;
  padding: 1.5rem 0;
  font-size: 0.9rem;
}

.tools-export {
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #ddd;
}

.tools-extra {
  margin-top: 2rem;
  color: #888;
}
</style>
