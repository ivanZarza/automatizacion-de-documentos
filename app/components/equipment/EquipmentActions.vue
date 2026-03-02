<template>
  <div class="equipment-actions">
    <!-- Botón: Llevar al formulario maestro -->
    <button
      @click="$emit('llevar-al-formulario', equipo)"
      class="accion-btn btn-llevar"
      title="Llevar datos al formulario maestro"
    >
      📋 Llevar
    </button>

    <!-- Botón: Editar -->
    <button
      @click="$emit('editar', equipo)"
      class="accion-btn btn-editar"
      title="Editar este equipo"
    >
      ✏️ Editar
    </button>

    <!-- Botón: Guardar/Sobrescribir -->
    <button
      v-if="mostrarGuardar"
      @click="$emit('guardar', equipo)"
      class="accion-btn btn-guardar"
      title="Guardar cambios"
    >
      💾 Guardar
    </button>

    <!-- Botón: Eliminar -->
    <button
      @click="confirmarEliminacion"
      class="accion-btn btn-eliminar"
      title="Eliminar este equipo"
    >
      🗑️ Eliminar
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  equipo: {
    type: Object,
    required: true
  },
  mostrarGuardar: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['llevar-al-formulario', 'editar', 'guardar', 'eliminar'])

const confirmarEliminacion = () => {
  if (confirm(`¿Eliminar "${props.equipo.marca} ${props.equipo.modelo}"?`)) {
    emit('eliminar', props.equipo)
  }
}
</script>

<style scoped>
.equipment-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.accion-btn {
  padding: 0.5rem 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.btn-llevar {
  background: #2196f3;
  color: white;
}

.btn-llevar:hover {
  background: #0b7dda;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(33, 150, 243, 0.4);
}

.btn-editar {
  background: #ff9800;
  color: white;
}

.btn-editar:hover {
  background: #e68900;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(255, 152, 0, 0.4);
}

.btn-guardar {
  background: #4caf50;
  color: white;
}

.btn-guardar:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(76, 175, 80, 0.4);
}

.btn-eliminar {
  background: #f44336;
  color: white;
}

.btn-eliminar:hover {
  background: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(244, 67, 54, 0.4);
}

@media (max-width: 768px) {
  .accion-btn {
    padding: 0.4rem 0.6rem;
    font-size: 0.75rem;
  }
}
</style>
