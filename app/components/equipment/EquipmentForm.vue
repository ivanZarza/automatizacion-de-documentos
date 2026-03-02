<template>
  <div class="equipment-form">
    <form @submit.prevent="enviar">
      <div class="form-group" v-for="field in campos" :key="field.name">
        <label :for="`field-${field.name}`" class="form-label">
          {{ field.label }}
        </label>
        <input
          :id="`field-${field.name}`"
          v-model="formData[field.name]"
          type="text"
          :placeholder="field.placeholder"
          class="form-input"
          required
        />
      </div>

      <div class="form-buttons">
        <button type="submit" class="btn btn-guardar">
          💾 {{ equipoEditando ? 'Guardar Cambios' : 'Agregar Equipo' }}
        </button>
        <button type="button" @click="cancelar" class="btn btn-cancelar">
          ❌ Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
  campos: {
    type: Array,
    required: true
  },
  equipoEditando: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['guardar', 'cancelar'])

const formData = ref({})

// Inicializar o limpiar formulario
const inicializarFormulario = () => {
  if (props.equipoEditando) {
    formData.value = { ...props.equipoEditando }
  } else {
    formData.value = {}
    props.campos.forEach(field => {
      formData.value[field.name] = ''
    })
  }
}

watch(() => props.equipoEditando, () => {
  inicializarFormulario()
}, { immediate: true })

const enviar = () => {
  emit('guardar', formData.value)
}

const cancelar = () => {
  emit('cancelar')
}
</script>

<style scoped>
.equipment-form {
  background: white;
  border: 2px solid #0066cc;
  border-radius: 8px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
  font-size: 0.95rem;
}

.form-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 0.95rem;
  font-family: inherit;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #0066cc;
  box-shadow: 0 0 0 2px rgba(0, 102, 204, 0.1);
}

.form-buttons {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  flex: 1;
}

.btn-guardar {
  background: #4caf50;
  color: white;
}

.btn-guardar:hover {
  background: #45a049;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.btn-cancelar {
  background: #f44336;
  color: white;
}

.btn-cancelar:hover {
  background: #da190b;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

@media (max-width: 768px) {
  .equipment-form {
    padding: 1rem;
  }

  .form-buttons {
    flex-direction: column;
  }
}
</style>
