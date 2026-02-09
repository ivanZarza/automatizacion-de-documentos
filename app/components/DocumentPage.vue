<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Vista Principal -->
    <div v-if="!showPreview && !showEdit" class="max-w-4xl mx-auto">
      <Boton 
        @click="previewDocument"
        variant="primary"
        class="inline-flex items-center"
      >
        📋 {{ config.title }}
      </Boton>
    </div>

    <!-- Vista Previa -->
    <div v-if="showPreview" class="max-w-4xl mx-auto">
      <div class="flex gap-2 mb-4">
        <Boton 
          @click="goToIndex"
          variant="secondary"
        >
          ← Volver
        </Boton>
        <Boton 
          @click="editDocument"
          variant="secondary"
        >
          ✏️ Editar
        </Boton>
        <Boton 
          @click="generatePDF"
          variant="success"
        >
          📄 PDF
        </Boton>
      </div>
      <client-only>
        <component 
          :is="documentComponent" 
          v-bind="formData"
          :generatedDate="generatedDate"
        />
      </client-only>
    </div>

    <!-- Vista Editar -->
    <div v-if="showEdit" class="max-w-4xl mx-auto">
      <Boton 
        @click="goToIndex"
        variant="secondary"
        class="mb-4"
      >
        ← Volver
      </Boton>
      <DocumentForm 
        :title="`Editar ${config.title}`"
        :fields="config.fields"
        :initialData="formData"
        @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import Boton from '../components/Boton.vue'
import DocumentForm from '../components/DocumentForm.vue'
import { useDocument } from '../composables/useDocument'
import { getMergedDocumentData } from '../utils/mergeFormData'
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  config: {
    type: Object,
    required: true
  },
  documentComponent: {
    type: Object,
    required: true
  }
})

// Cargar datos fusionados en onMounted, NO en setup
const mergedDefaultData = ref({})

// Configuración dinámica que se actualiza cuando mergedDefaultData cambia
const documentConfig = computed(() => ({
  defaultData: mergedDefaultData.value,
  fileName: props.config.fileName,
  ...props.config.capabilities
}))

const { 
  showPreview, 
  showEdit, 
  formData, 
  previewDocument,
  editDocument,
  closePreview,
  closeEdit,
  saveChanges,
  generatePDF
} = useDocument(documentConfig.value)

const generatedDate = ref('')

onMounted(() => {
  // Aquí es donde cargamos los datos fusionados
  // Pinia ya está inicializado en este punto
  mergedDefaultData.value = getMergedDocumentData(props.config)
  
  // Actualizar formData con los datos fusionados
  formData.value = { ...mergedDefaultData.value }
  
  generatedDate.value = new Date().toLocaleDateString('es-ES')
  previewDocument()
})

const handleFormSubmit = (newData) => {
  formData.value = newData
  saveChanges()
}

const goToIndex = () => {
  router.push('/')
}
</script>
