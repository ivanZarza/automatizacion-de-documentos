<template>
  <div class="bg-white p-10 rounded-lg shadow-lg flex justify-center items-center" style="max-width: 800px; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif; border: 2px solid #0066cc;">
    <div style="width: 100%;">
      <h2 class="text-4xl font-bold mb-8 text-blue-600 text-center border-b-2 border-gray-300 pb-4">{{ title }}</h2>
      <form @submit.prevent="submit" class="space-y-8">
        <div class="grid gap-8" :class="{ 'grid-cols-2': columns === 2, 'grid-cols-1': columns === 1 }">
          <div v-for="field in fields" :key="field.name" :class="{ 'col-span-full': field.fullWidth }">
            <label class="block text-lg font-semibold mb-4 text-gray-800">{{ field.label }}</label>
            
            <!-- Input Text -->
            <input 
              v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
              v-model="formData[field.name]"
              :type="field.type"
              :placeholder="field.placeholder"
              class="w-full text-lg border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            <!-- Input Date -->
            <input 
              v-else-if="field.type === 'date'"
              v-model="formData[field.name]"
              type="date"
              class="w-full text-lg border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />

            <!-- Textarea -->
            <textarea 
              v-else-if="field.type === 'textarea'"
              v-model="formData[field.name]"
              :placeholder="field.placeholder"
              :rows="field.rows || 4"
              class="w-full text-lg border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            ></textarea>

            <!-- Select -->
            <select 
              v-else-if="field.type === 'select'"
              v-model="formData[field.name]"
              class="w-full text-lg border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            >
              <option value="">{{ field.placeholder }}</option>
              <option v-for="option in field.options" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
        </div>

        <Boton 
          type="submit" 
          variant="success" 
          :class="''"
        >
          {{ submitButtonText }}
        </Boton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import Boton from './Boton.vue'

const props = defineProps({
  title: {
    type: String,
    default: 'Editar Documento'
  },
  fields: {
    type: Array,
    required: true,
    // Formato esperado:
    // {
    //   name: 'autorizante',
    //   label: 'Nombre del Autorizante',
    //   placeholder: 'Ej: Juan Pérez García',
    //   type: 'text', // text, email, tel, date, textarea, select
    //   fullWidth: false,
    //   rows: 3, // para textarea
    //   options: [] // para select
    // }
  },
  initialData: {
    type: Object,
    required: true
  },
  columns: {
    type: Number,
    default: 2
  },
  submitButtonText: {
    type: String,
    default: 'Guardar Cambios'
  }
})

const emit = defineEmits(['submit'])

const formData = ref({ ...props.initialData })

watch(() => props.initialData, (newData) => {
  formData.value = { ...newData }
}, { deep: true })

const submit = () => {
  emit('submit', formData.value)
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  text-align: left;
  color: #333;
  margin-bottom: 10px;
}

input, textarea, select {
  font-size: 18px;
  background-color: #f9f9ff;
}

input:focus, textarea:focus, select:focus {
  background-color: #ffffff;
}
</style>
