<template>
  <SectionCard
    title="🛠️ Herramientas"
    :isExpanded="isExpanded"
    @toggle="isExpanded = !isExpanded"
    :count="formularios.length"
    :isEmpty="formularios.length === 0"
  >
    <div class="tools-content">
      <div v-if="bdDisponible === false" class="bd-warning">
        ⚠️ BD desconectada - mostrando formularios locales
      </div>
      <div class="tools-search">
        <input v-model="busqueda" placeholder="Buscar por nombre..." class="tools-input" />
        <button @click="buscarFormulario" class="tools-btn">Buscar</button>
      </div>
      <div v-if="busqueda && formularioBuscado">
        <div class="tools-item">
          <strong>{{ formularioBuscado.nombre }}</strong>
          <span v-if="!formularioBuscado.synced" class="local-badge">LOCAL</span>
          <button @click="confirmarCarga(formularioBuscado.formulario)" class="tools-btn">Cargar en Formulario Maestro</button>
        </div>
      </div>
      <div v-else>
        <div v-for="f in formularios" :key="f.nombre" class="tools-item">
          <strong>{{ f.nombre }}</strong>
          <span v-if="!f.synced" class="local-badge">LOCAL</span>
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

const isExpanded = ref(false)
const formularios = ref([])
const busqueda = ref('')
const formularioBuscado = ref(null)
const bdDisponible = ref(null) // null=sin probar, true=OK, false=error

async function cargarFormularios() {
  // PASO 1: Intentar desde BD
  try {
    console.log('📡 Intentando cargar desde BD...')
    const resultadoBD = await $fetch('/api/forms')
    if (resultadoBD && Array.isArray(resultadoBD)) {
      formularios.value = resultadoBD.map(f => ({ ...f, synced: true }))
      bdDisponible.value = true
      console.log('✅ Formularios cargados desde BD')
      return
    }
  } catch (err) {
    console.error('❌ Error al cargar desde BD:', err.message)
    bdDisponible.value = false
  }

  // PASO 2: Si BD falla, cargar desde localStorage
  console.log('📦 Cargando desde localStorage...')
  const formulariosBD = formularios.value
  
  // Buscar en localStorage todos los formularios guardados
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

  // Combinar: BD primero (synced), luego locales nuevos
  const todosFormularios = [...formulariosBD]
  
  // Agregar locales que NO están en BD
  formulariosLocales.forEach(local => {
    if (!todosFormularios.find(f => f.nombre === local.nombre)) {
      todosFormularios.push({ ...local, synced: false })
    }
  })

  formularios.value = todosFormularios
  console.log(`✅ Total formularios: ${todosFormularios.length} (${formulariosBD.length} en BD, ${formulariosLocales.length} locales)`)
}

function buscarFormulario() {
  if (!busqueda.value) {
    formularioBuscado.value = null
    return
  }

  // Primero intentar desde BD
  if (bdDisponible.value !== false) {
    $fetch('/api/forms?nombre=' + encodeURIComponent(busqueda.value))
      .then(res => {
        if (res && !res.error) {
          formularioBuscado.value = { ...res, synced: true }
          alert(`✅ Formulario encontrado en BD: "${busqueda.value}"`)
        } else {
          const local = buscarEnLocalSilencioso()
          if (local) {
            formularioBuscado.value = local
            alert(`✅ Formulario encontrado localmente: "${busqueda.value}"`)
          } else {
            formularioBuscado.value = null
            alert(`❌ No se encontró ningún formulario con ese nombre.`)
          }
        }
      })
      .catch(() => {
        // Si BD falla, buscar en localStorage
        const local = buscarEnLocalSilencioso()
        if (local) {
          formularioBuscado.value = local
          alert(`✅ Formulario encontrado localmente: "${busqueda.value}"`)
        } else {
          formularioBuscado.value = null
          alert(`❌ No se encontró ningún formulario con ese nombre.`)
        }
      })
  } else {
    // Si sabemos que BD no está disponible, ir directo a local
    const local = buscarEnLocalSilencioso()
    if (local) {
      formularioBuscado.value = local
      alert(`✅ Formulario encontrado localmente: "${busqueda.value}"`)
    } else {
      formularioBuscado.value = null
      alert(`❌ No se encontró ningún formulario con ese nombre.`)
    }
  }
}

function buscarEnLocalSilencioso() {
  const key = `form_${busqueda.value}`
  const data = localStorage.getItem(key)
  if (data) {
    try {
      return { ...JSON.parse(data), synced: false }
    } catch (err) {
      console.error('Error al parsear formulario local:', err)
      return null
    }
  }
  return null
}

function confirmarCarga(datos) {
  if (confirm('¿Quieres cargar estos datos en el formulario maestro? Esto reemplazará los datos actuales.')) {
    // Guardar en la clave correcta que usa formulario-maestro.vue
    localStorage.setItem('formDataMaestro', JSON.stringify(datos))
    alert('✅ Datos cargados en el formulario maestro. Puedes ir a editarlo.')
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

.local-badge {
  display: inline-block;
  background-color: #ffc107;
  color: #000;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
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
