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
import { ref, onMounted } from 'vue'
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

// Fusionar datos maestros con defaults del documento
const mergedDefaultData = getMergedDocumentData(props.config)

// Preparar configuración para useDocument
const documentConfig = {
  defaultData: mergedDefaultData,
  fileName: props.config.fileName,
  ...props.config.capabilities
}

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
} = useDocument(documentConfig)

const generatedDate = ref('')

onMounted(() => {
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
