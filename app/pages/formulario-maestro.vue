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

    <!-- Botones Sticky -->
    <div class="sticky-buttons">
      <Boton 
        @click="goToIndex"
        variant="secondary"
      >
        ← Volver
      </Boton>
      <Boton 
        @click="clearAllData"
        variant="danger"
        class="mt-2"
      >
        🗑️ Borrar Todos los Datos
      </Boton>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import DocumentForm from '../components/DocumentForm.vue'
import Boton from '../components/Boton.vue'
import { useFormStore } from '../stores/formStore'
import { masterFormFields, getMasterFormDefaultData } from '../config/masterFormFields'
import { loadFromStorage, saveToStorage, clearStorage, loadImagesFromStorage, clearImagesFromStorage } from '../utils/storageManager'


const router = useRouter()
const formStore = useFormStore()

// Inicializar formData
const formData = ref({})

/**
 * Función para cargar datos del localStorage (incluye imágenes)
 */
const loadMasterData = () => {
  const savedData = loadFromStorage()
  const unsavedData = formStore.hasData ? formStore.getFormData() : {}
  
  // Limpiar formData para forzar cambio de referencia si es necesario
  const newData = {}
  
  // Si hay datos guardados en localStorage, usarlos; si no, usar valores por defecto
  if (savedData && Object.keys(savedData).length > 0) {
    Object.assign(newData, savedData, unsavedData)
  } else {
    Object.assign(newData, getMasterFormDefaultData(), unsavedData)
  }
  
  formData.value = newData
}

onMounted(() => {
  // Cargar datos la primera vez (solo al montar, sin listener de cambios)
  loadMasterData()
})

const handleFormSubmit = (newData) => {
  formData.value = newData
  
  // Guardar datos en localStorage (base de datos central de todo: datos + imágenes)
  saveToStorage(newData)
  
  // Redirigir a página de selección de documento
  router.push('/seleccionar-documento')
}

const clearAllData = () => {
  // Confirmación con mensaje claro
  const confirmed = confirm(
    '⚠️ ATENCIÓN: Estás a punto de borrar TODOS los datos guardados.\n\n' +
    'Esta acción:\n' +
    '• Elimina todos los datos del formulario maestro\n' +
    '• Elimina todas las imágenes\n' +
    '• Elimina todos los datos de los documentos\n' +
    '• NO se puede deshacer\n\n' +
    '¿Estás seguro de que deseas continuar?'
  )
  
  if (confirmed) {
    // Limpiar localStorage
    clearStorage()
    clearImagesFromStorage()
    
    // Reiniciar formulario con valores por defecto
    formData.value = getMasterFormDefaultData()
    
    // Mostrar mensaje de confirmación
    alert('✓ Todos los datos han sido borrados correctamente.')
  }
}

const goToIndex = () => {
  router.push('/')
}
</script>

<style scoped>
.sticky-buttons {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 150px;
}

.mt-2 {
  margin-top: 8px;
}
</style>
