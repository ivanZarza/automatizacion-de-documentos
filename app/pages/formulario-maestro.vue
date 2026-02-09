<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Título Principal -->
    <div class="max-w-6xl mx-auto mb-8">
      <h1 class="text-4xl font-bold text-blue-600 mb-2">Formulario Maestro - Memoria Técnica</h1>
      <p class="text-gray-600">Completa todos los campos técnicos de la instalación. Luego podrás seleccionar el documento a generar.</p>
    </div>

    <!-- Componente Formulario -->
    <div class="max-w-6xl mx-auto">
      <DocumentForm
        title="Datos Técnicos de la Instalación"
        :fields="masterFormFields"
        :initialData="formData"
        :columns="2"
        submitButtonText="Guardar Datos y Continuar"
        @submit="handleFormSubmit"
      />
    </div>

    <!-- Botón Sticky para volver -->
    <div class="sticky-back-button">
      <Boton 
        @click="goToIndex"
        variant="secondary"
      >
        ← Volver
      </Boton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DocumentForm from '../components/DocumentForm.vue'
import Boton from '../components/Boton.vue'
import { masterFormFields, getMasterFormDefaultData } from '../config/masterFormFields'
import { useFormStore } from '../stores/formStore'

const router = useRouter()
const formStore = useFormStore()

// Inicializar formData
const formData = ref({})

onMounted(() => {
  // Cargar datos del localStorage
  formStore.loadFromLocalStorage()
  
  // Si hay datos guardados en Pinia/localStorage, usarlos; si no, usar valores por defecto
  if (formStore.hasData) {
    formData.value = { ...formStore.getFormData() }
  } else {
    formData.value = getMasterFormDefaultData()
  }
})

const handleFormSubmit = (newData) => {
  formData.value = newData
  // Guardar datos en Pinia (que a su vez guardará en localStorage)
  formStore.setFormData(newData)
  // Redirigir a página de selección de documento
  router.push('/seleccionar-documento')
}

const goToIndex = () => {
  router.push('/')
}
</script>

<style scoped>
.sticky-back-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
}
</style>
