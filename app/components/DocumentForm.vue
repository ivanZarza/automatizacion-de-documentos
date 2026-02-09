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

            <!-- File Input -->
            <div v-else-if="field.type === 'file'" class="space-y-3">
              <input 
                :key="field.name"
                type="file"
                :accept="field.accept || '*'"
                class="w-full text-lg border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                @change="handleFileUpload($event, field.name)"
              />
              <div v-if="formData[field.name]" class="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p class="text-sm text-gray-700">Archivo seleccionado:</p>
                <img v-if="field.accept?.includes('image')" :src="formData[field.name]" style="max-width: 300px; max-height: 150px; object-fit: contain; border-radius: 4px;" />
                <p v-else class="text-sm text-blue-600 break-all">{{ extractFileName(formData[field.name]) }}</p>
              </div>
            </div>
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

// Guardar automáticamente en localStorage cada vez que cambian los datos
const saveFormDataToLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('formDataMaestro', JSON.stringify(formData.value))
    } catch (e) {
      console.error('Error saving form data to localStorage:', e)
    }
  }
}

// Watch para guardar automáticamente
watch(() => formData.value, () => {
  saveFormDataToLocalStorage()
}, { deep: true })

const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      // Guardar el contenido del archivo como data URL
      formData.value[fieldName] = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const extractFileName = (dataUrl) => {
  if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
    return 'Imagen cargada'
  }
  return dataUrl
}

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
