<template>
  <div class="pagina-equipos">
    <!-- Header -->
    <div class="header">
      <NuxtLink to="/" class="volver">← Volver</NuxtLink>
      <h1 v-if="config">{{ config.icon }} {{ config.label }}</h1>
      <p class="descripcion" v-if="config">Gestiona {{ config.label.toLowerCase() }} para el formulario maestro</p>
    </div>

    <!-- Formulario de entrada -->
    <div v-if="gestor && config" class="contenedor-formulario">
      <h2>➕ Agregar {{ config.label.slice(0, -1) }}</h2>
      <EquipmentForm
        :campos="config.fields || []"
        :equipoEditando="equipoEditando"
        @guardar="guardarEquipo"
        @cancelar="cancelarEdicion"
      />
    </div>

    <!-- Lista de equipos -->
    <EquipmentList
      v-if="gestor && config"
      :equipos="gestor.equipos.value"
      :config="config"
      :editandoId="gestor.editandoId.value"
      @llevar-al-formulario="llevarAlFormulario"
      @editar="iniciarEdicion"
      @guardar="guardarEquipo"
      @eliminar="eliminarEquipo"
      @importar="importarDatos"
      @limpiar="limpiarTodo"
      @restaurar-defecto="restaurarPorDefecto"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
import { useFormStore } from '../../../stores/formStore'
import { useEquipmentManager, EQUIPMENT_TYPES } from '../../../composables/equipment/useEquipmentManager'
import EquipmentForm from '../../../components/equipment/EquipmentForm.vue'
import EquipmentList from '../../../components/equipment/EquipmentList.vue'

const route = useRoute()
const router = useRouter()
const formStore = useFormStore()

const tipo = computed(() => route.params.tipo)
const config = computed(() => EQUIPMENT_TYPES[tipo.value])

const gestor = ref(null)
const equipoEditando = ref(null)

// Inicializar gestor
const inicializar = () => {
  if (!tipo.value || !EQUIPMENT_TYPES[tipo.value]) {
    // Tipo inválido, redirigir
    router.push('/')
    return
  }

  gestor.value = useEquipmentManager(tipo.value)
  gestor.value.cargar()
}

// Guardar equipo (agregar o actualizar)
const guardarEquipo = (datos) => {
  if (gestor.value.editandoId.value) {
    // Actualizando
    gestor.value.editar(gestor.value.editandoId.value, datos)
  } else {
    // Agregando nuevo
    gestor.value.agregar(datos)
  }

  equipoEditando.value = null
  gestor.value.cancelarEdicion()
  
  // Forzar reactividad
  gestor.value.equipos.value = [...gestor.value.equipos.value]
}

// Iniciar edición
const iniciarEdicion = (equipo) => {
  equipoEditando.value = { ...equipo }
  gestor.value.iniciarEdicion(equipo.id)
}

// Cancelar edición
const cancelarEdicion = () => {
  equipoEditando.value = null
  gestor.value.cancelarEdicion()
}

// Eliminar equipo
const eliminarEquipo = (equipo) => {
  gestor.value.eliminar(equipo.id)
  // Forzar reactividad
  gestor.value.equipos.value = [...gestor.value.equipos.value]
}

// Llevar al formulario maestro
const llevarAlFormulario = (equipo) => {
  // Mapear campos del equipo al formulario maestro según el tipo
  const mapeoFormulario = mapearEquipoAFormulario(tipo.value, equipo)
  formStore.setFormData({ ...formStore.getFormData(), ...mapeoFormulario })

  // Navegar al formulario
  router.push('/formulario-maestro')
}

// Mapear equipos al formulario maestro
const mapearEquipoAFormulario = (tipoEquipo, equipo) => {
  const mapeos = {
    inversores: {
      e2_marcaModeloInversor: `${equipo.marca} ${equipo.modelo}`,
      e2_potenciaNominalInversor: equipo.potencia,
      e2_relacionTensionInversor: equipo.voltaje,
      e2_formaOndaSalidaInversor: equipo.especificacion
    },
    generadores: {
      e2_marcaModelo: `${equipo.marca} ${equipo.modelo}`,
      e2_potenciaPicoGenerador: equipo.potencia,
      e2_orientacionGenerador: equipo.especificacion
    },
    baterias: {
      e2_marcaModelo: `${equipo.marca} ${equipo.modelo}`,
      e2_tensionNominal: equipo.voltaje,
      e2_energiaTotal: equipo.capacidad,
      e2_tipoDeBateria: equipo.especificacion
    }
  }

  return mapeos[tipoEquipo] || {}
}

// Importar datos desde JSON
const importarDatos = (jsonString) => {
  if (gestor.value.importar(jsonString)) {
    alert('✅ Datos importados correctamente')
  } else {
    alert('❌ Error al importar los datos')
  }
}

// Limpiar todo
const limpiarTodo = () => {
  gestor.value.limpiar()
  // Forzar reactividad
  gestor.value.equipos.value = [...gestor.value.equipos.value]
}

// Restaurar por defecto
const restaurarPorDefecto = () => {
  gestor.value.restaurarPorDefecto()
  // Forzar reactividad
  gestor.value.equipos.value = [...gestor.value.equipos.value]
}

// Meta page
definePageMeta({
  layout: 'default'
})

// Inicializar al montar
onMounted(() => {
  inicializar()
})
</script>

<style scoped>
.pagina-equipos {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.header {
  margin-bottom: 2rem;
  padding-bottom: 1.5rem;
  border-bottom: 2px solid #eee;
}

.volver {
  display: inline-block;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  margin-bottom: 1rem;
  transition: color 0.3s ease;
  cursor: pointer;
}

.volver:hover {
  color: #0052a3;
  text-decoration: underline;
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

@media (max-width: 768px) {
  .pagina-equipos {
    padding: 1rem 0.5rem;
  }

  .header h1 {
    font-size: 1.5rem;
  }

  .contenedor-formulario {
    padding: 1rem;
  }
}
</style>
