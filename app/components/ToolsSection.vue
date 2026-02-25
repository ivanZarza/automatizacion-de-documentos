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
        <input v-model="busqueda" placeholder="Buscar por nombre..." class="tools-input" />
        <button @click="buscarFormulario" class="tools-btn">Buscar</button>
      </div>
      <div v-if="busqueda && formularioBuscado">
        <div class="tools-item">
          <strong>{{ formularioBuscado.nombre }}</strong>
          <button @click="confirmarCarga(formularioBuscado.formulario)" class="tools-btn">Cargar en Formulario Maestro</button>
        </div>
      </div>
      <div v-else>
        <div v-for="f in formularios" :key="f.nombre" class="tools-item">
          <strong>{{ f.nombre }}</strong>
          <button @click="confirmarCarga(f.formulario)" class="tools-btn">Cargar en Formulario Maestro</button>
        </div>
      </div>
      <!-- Espacio para futuras herramientas -->
      <div class="tools-extra">
        <h4>Gestión de generadores, inversores y baterías (próximamente)</h4>
      </div>
    </div>
  </SectionCard>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import SectionCard from './SectionCard.vue'

const isExpanded = ref(true)
const formularios = ref([])
const busqueda = ref('')
const formularioBuscado = ref(null)

async function cargarFormularios() {
  formularios.value = await $fetch('/api/forms')
}

function buscarFormulario() {
  if (!busqueda.value) {
    formularioBuscado.value = null
    return
  }
  $fetch('/api/forms?nombre=' + encodeURIComponent(busqueda.value)).then(res => {
    if (res && !res.error) {
      formularioBuscado.value = res
    } else {
      formularioBuscado.value = null
      alert('No se encontró ningún formulario con ese nombre.')
    }
  })
}

function confirmarCarga(datos) {
  if (confirm('¿Quieres cargar estos datos en el formulario maestro? Esto reemplazará los datos actuales.')) {
    localStorage.setItem('formularioMaestro', JSON.stringify(datos))
    alert('Datos cargados en el formulario maestro. Puedes ir a editarlo.')
  }
}

onMounted(cargarFormularios)
</script>

<style scoped>
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
  padding: 0.5rem 1rem;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 1rem;
}
.tools-btn {
  padding: 0.5rem 1.2rem;
  border-radius: 6px;
  background: #667eea;
  color: #fff;
  border: none;
  font-weight: 600;
  cursor: pointer;
}
.tools-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.5rem 0;
}
.tools-extra {
  margin-top: 2rem;
  color: #888;
}
</style>
