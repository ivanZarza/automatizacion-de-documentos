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
        :editableFieldNames="editableFields"
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
import { getEditableFields } from '../config/editableFields'
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

// Estados locales
const showPreview = ref(false)
const showEdit = ref(false)
const formData = ref({})
const generatedDate = ref('')
const editableFields = ref([])

onMounted(() => {
  // Aquí es donde cargamos los datos fusionados
  // Pinia ya está inicializado en este punto
  const mergedData = getMergedDocumentData(props.config)
  
  // Inicializar formData con los datos fusionados
  formData.value = { ...mergedData }
  
  // Obtener lista de campos editables para este documento
  editableFields.value = getEditableFields(props.config.id)
  
  generatedDate.value = new Date().toLocaleDateString('es-ES')
  showPreview.value = true
})

const previewDocument = () => {
  showPreview.value = true
  showEdit.value = false
}

const editDocument = () => {
  showEdit.value = true
  showPreview.value = false
}

const saveChanges = () => {
  showPreview.value = true
  showEdit.value = false
}

const generatePDF = async () => {
  // Lógica para generar PDF
  const { generatePDF: generatePDFUtil } = useDocument({ defaultData: formData.value })
  await generatePDFUtil()
}

const handleFormSubmit = (newData) => {
  formData.value = newData
  saveChanges()
}

const goToIndex = () => {
  router.push('/')
}
</script>
