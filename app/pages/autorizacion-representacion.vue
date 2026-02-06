<script setup>
import Boton from '../components/Boton.vue'
import { useDocument } from '../composables/useDocument'
import DocumentModal from '../components/DocumentModal.vue'
import DocumentForm from '../components/DocumentForm.vue'
import AutorizacionRepresentacion from '../components/AutorizacionRepresentacion.vue'
import { ref, onMounted } from 'vue'

const documentConfig = {
  defaultData: {
    autorizante: 'Guillermo Cruz Beltrán',
    dniAutorizante: '31.335.276-F',
    domicilioAutorizante: 'DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz',
    representante: 'Solay Ingenieros, S.L.',
    dniRepresentante: 'B09848912',
    domicilioRepresentante: 'Calle Ebro, 35 – 41012, Sevilla, Sevilla',
    organismo: 'Ayuntamiento de Puerto Real (Cádiz)',
    gestiones: 'SOLICITUD DE LICENCIA DE OBRA MENOR CON DECLARACIÓN RESPONSABLE O AUTORIZACIÓN URBANÍSTICA',
    fecha: '18/11/2025'
  },
  fileName: 'autorizacion-representacion.pdf',
  canPreview: true,
  canEdit: true,
  canGeneratePDF: true
}

const { 
  showModal, 
  showPreview, 
  showEdit, 
  formData, 
  openModal,
  previewDocument,
  editDocument,
  closeModal,
  closePreview,
  closeEdit,
  saveChanges,
  getModalOptions,
  generatePDF
} = useDocument(documentConfig)

// Mostrar vista previa directamente al cargar la página
onMounted(() => {
  generatedDate.value = new Date().toLocaleDateString('es-ES')
  previewDocument()
})

const formFields = [
  { name: 'autorizante', label: 'Nombre del Autorizante', placeholder: 'Ej: Guillermo Cruz Beltrán', type: 'text' },
  { name: 'dniAutorizante', label: 'DNI/NIF del Autorizante', placeholder: 'Ej: 31.335.276-F', type: 'text' },
  { name: 'domicilioAutorizante', label: 'Domicilio del Autorizante', placeholder: 'Calle, número, código postal, localidad, provincia', type: 'text', fullWidth: true },
  { name: 'representante', label: 'Nombre del Representante', placeholder: 'Ej: Solay Ingenieros, S.L.', type: 'text' },
  { name: 'dniRepresentante', label: 'DNI/NIF del Representante', placeholder: 'Ej: B09848912', type: 'text' },
  { name: 'domicilioRepresentante', label: 'Domicilio del Representante', placeholder: 'Calle, número, código postal, localidad, provincia', type: 'text', fullWidth: true },
  { name: 'organismo', label: 'Organismo Administrativo', placeholder: 'Ej: Ayuntamiento de Puerto Real (Cádiz)', type: 'text', fullWidth: true },
  { name: 'gestiones', label: 'Gestiones a Realizar', placeholder: 'Descripción detallada de las gestiones autorizadas', type: 'textarea', rows: 4, fullWidth: true },
  { name: 'fecha', label: 'Fecha del Documento', placeholder: 'DD/MM/YYYY', type: 'date' }
]

const handleFormSubmit = (newData) => {
  formData.value = newData
  saveChanges()
}

const generatedDate = ref('')
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Vista Principal (sin modal) -->
    <div v-if="!showPreview && !showEdit" class="max-w-4xl mx-auto">
      <Boton 
        @click="previewDocument"
        variant="primary"
        class="inline-flex items-center"
      >
        📋 Autorización de Representación
      </Boton>
    </div>

    <!-- Vista Previa -->
    <div v-if="showPreview" class="max-w-4xl mx-auto">
      <div class="flex gap-2 mb-4">
        <Boton 
          @click="closePreview"
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
        <AutorizacionRepresentacion 
          v-bind="formData"
          :generatedDate="generatedDate"
        />
      </client-only>
    </div>

    <!-- Vista Editar -->
    <div v-if="showEdit" class="max-w-4xl mx-auto">
      <Boton 
        @click="closeEdit"
        variant="secondary"
        class="mb-4"
      >
        ← Volver
      </Boton>
      <DocumentForm 
        title="Editar Autorización de Representación"
        :fields="formFields"
        :initialData="formData"
        @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>
