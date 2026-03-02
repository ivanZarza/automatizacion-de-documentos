<template>
  <div class="equipment-list">
    <!-- Encabezado con contador -->
    <div class="list-header">
      <h3 class="list-titulo">
        {{ config.icon }} {{ config.label }}
        <span class="contador" v-if="equipos.length > 0">
          ({{ equipos.length }})
        </span>
      </h3>
    </div>

    <!-- Lista vacía -->
    <div v-if="equipos.length === 0" class="list-vacia">
      <p>📭 No hay {{ config.label.toLowerCase() }} registrados</p>
      <p class="hint">Agrega uno usando el formulario arriba</p>
    </div>

    <!-- Lista de equipos -->
    <div v-else class="list-contenedor">
      <EquipmentCard
        v-for="equipo in equipos"
        :key="equipo.id"
        :equipo="equipo"
        :campos="config.fields"
        :en-edicion="editandoId === equipo.id"
      >
        <template #acciones="{ equipo: eq }">
          <EquipmentActions
            :equipo="eq"
            :mostrar-guardar="editandoId === eq.id"
            @llevar-al-formulario="$emit('llevar-al-formulario', eq)"
            @editar="$emit('editar', eq)"
            @guardar="$emit('guardar', eq)"
            @eliminar="$emit('eliminar', eq)"
          />
        </template>
      </EquipmentCard>
    </div>

    <!-- Exportar/Importar/Restaurar -->
    <div class="list-footer">
      <button @click="exportarDatos" class="btn-secundario">
        📤 Exportar JSON
      </button>
      <label class="btn-secundario">
        📥 Importar JSON
        <input
          type="file"
          accept=".json"
          @change="importarDatos"
          style="display: none"
        />
      </label>
      <button @click="restaurarDefecto" class="btn-info">
        🔄 Restaurar por defecto
      </button>
      <button @click="limpiarTodo" class="btn-peligroso">
        🗑️ Limpiar Todo
      </button>
    </div>
  </div>
</template>

<script setup>
import EquipmentCard from './EquipmentCard.vue'
import EquipmentActions from './EquipmentActions.vue'

const props = defineProps({
  equipos: {
    type: Array,
    required: true
  },
  config: {
    type: Object,
    required: true
  },
  editandoId: {
    type: String,
    default: null
  }
})

const emit = defineEmits([
  'llevar-al-formulario',
  'editar',
  'guardar',
  'eliminar',
  'exportar',
  'importar',
  'limpiar',
  'restaurar-defecto'
])

const exportarDatos = () => {
  const json = JSON.stringify(props.equipos, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${props.config.storageKey}.json`
  a.click()
  URL.revokeObjectURL(url)
  emit('exportar')
}

const importarDatos = (event) => {
  const file = event.target.files?.[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = (e) => {
    try {
      const contenido = e.target?.result
      emit('importar', contenido)
      event.target.value = '' // Limpiar input
    } catch (error) {
      alert('❌ Error al leer el archivo')
    }
  }
  reader.readAsText(file)
}

const limpiarTodo = () => {
  if (confirm('⚠️ ¿Eliminar TODOS los equipos? Esta acción no se puede deshacer.')) {
    emit('limpiar')
  }
}

const restaurarDefecto = () => {
  if (confirm('🔄 ¿Restaurar los datos por defecto del archivo?')) {
    emit('restaurar-defecto')
  }
}
</script>

<style scoped>
.equipment-list {
  background: white;
  border-radius: 8px;
  padding: 1.5rem;
  border: 1px solid #e0e0e0;
  margin-top: 2rem;
}

.list-header {
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #f0f0f0;
}

.list-titulo {
  font-size: 1.3rem;
  color: #333;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.contador {
  background: #e3f2fd;
  color: #0066cc;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
}

.list-vacia {
  text-align: center;
  padding: 2rem 1rem;
  color: #999;
}

.list-vacia p {
  margin: 0.5rem 0;
}

.list-vacia .hint {
  font-size: 0.9rem;
  color: #bbb;
}

.list-contenedor {
  margin-bottom: 1.5rem;
}

.list-footer {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  padding-top: 1.5rem;
  border-top: 2px solid #f0f0f0;
}

.btn-secundario,
.btn-info,
.btn-peligroso {
  padding: 0.75rem 1.25rem;
  border: 1px solid #ccc;
  background: white;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-secundario {
  color: #0066cc;
  border-color: #0066cc;
}

.btn-secundario:hover {
  background: #e3f2fd;
  transform: translateY(-2px);
}

.btn-info {
  color: #17a2b8;
  border-color: #17a2b8;
}

.btn-info:hover {
  background: #d1ecf1;
  transform: translateY(-2px);
}

.btn-peligroso {
  color: #f44336;
  border-color: #f44336;
}

.btn-peligroso:hover {
  background: #ffebee;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .equipment-list {
    padding: 1rem;
  }

  .list-footer {
    gap: 0.5rem;
  }

  .btn-secundario,
  .btn-peligroso {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
