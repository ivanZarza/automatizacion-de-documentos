<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Vista Principal -->
    <div v-if="!showPreview && !showEdit" class="max-w-4xl mx-auto">
      <div class="flex items-center gap-3">
        <Boton 
          @click="previewDocument"
          variant="primary"
          class="inline-flex items-center"
        >
          📋 {{ config.title }}
        </Boton>
        <Boton
          @click="goToMasterForm"
          variant="secondary"
        >
          🧾 Formulario Maestro
        </Boton>
      </div>
    </div>

    <!-- Botón Sticky de Volver -->
    <div class="sticky-back-button">
      <Boton 
        @click="goToIndex"
        variant="secondary"
        class="w-full"
      >
        ← Inicio
      </Boton>
      <Boton
        @click="goToMasterForm"
        variant="secondary"
        class="w-full mt-2"
      >
        🧾 Formulario Maestro
      </Boton>
    </div>

    <!-- Vista Previa -->
    <div v-if="showPreview" class="max-w-4xl mx-auto">
      <!-- Botones Sticky (Editar y PDF) -->
      <div class="sticky-pdf-buttons">
        <Boton 
          v-if="config.fields && config.fields.length > 0"
          @click="editDocument"
          variant="secondary"
          class="sticky-pdf-button"
        >
          ✏️ Editar
        </Boton>
        <Boton 
          @click="generatePDF"
          variant="success"
          class="sticky-pdf-button"
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
    <div v-if="showEdit && config.fields && config.fields.length > 0" class="max-w-4xl mx-auto">
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
import { loadFromStorage, updateStoragePartially } from '../utils/storageManager'
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
  // Cargar datos de localStorage (base de datos central)
  const masterData = loadFromStorage()
  
  // Fusionar con configuración del documento
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
  // Merge inteligente: mantener datos anteriores + actualizar solo con valores
  const mergedData = { ...formData.value }
  Object.entries(newData).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      mergedData[key] = value
    }
  })
  formData.value = mergedData
  
  // Guardar en localStorage (base de datos central)
  updateStoragePartially(mergedData)
  
  saveChanges()
}

const goToIndex = () => {
  router.push('/')
}

const goToMasterForm = () => {
  router.push('/formulario-maestro')
}
</script>

<style scoped>
.sticky-back-button {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: auto;
  max-width: 150px;
}

.sticky-pdf-buttons {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
  display: flex;
  gap: 10px;
  flex-direction: column;
}

.sticky-pdf-button {
  min-width: 140px;
}
</style>
