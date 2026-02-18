<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h2 class="form-title">{{ title }}</h2>
      <form @submit.prevent="submit" class="form-content">
        <!-- Agrupar campos por sección y subsección -->
        <div v-for="(groupedFields, sectionLetter) in groupedFieldsBySection" :key="sectionLetter" class="section-container" :data-section="sectionLetter" :style="{ borderLeftColor: getSectionColor(sectionLetter) }">
          <!-- Header Desplegable de Sección -->
          <div 
            class="section-header"
            @click="toggleSection(sectionLetter)"
            :style="{ backgroundColor: sectionColorMap[sectionLetter] }"
          >
            <span class="section-toggle-icon" :class="{ 'is-open': expandedSections[sectionLetter] }">
              ●
            </span>
            <h3 class="section-title">Sección {{ sectionLetter }}</h3>
          </div>
          
          <!-- Contenido Desplegable -->
          <div v-if="expandedSections[sectionLetter]" class="section-content">
            <div v-for="(subFields, subsection) in groupFieldsBySubsection(groupedFields)" :key="subsection" class="subsection-container">
              <h4 class="subsection-title">{{ getSubsectionLabel(subsection) }}</h4>
              <div class="fields-grid">
                <div v-for="field in subFields" :key="field.name" class="field-wrapper">
                  <label class="field-label">{{ field.label }}</label>
                  <!-- Input Text -->
                  <input 
                    v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                    v-model="formData[field.name]"
                    :type="field.type"
                    :placeholder="field.placeholder"
                    class="field-input"
                  />
                  <!-- Input URL con previsualización de imagen -->
                  <div v-else-if="field.type === 'url' && field.preview" class="url-preview-wrapper">
                    <input
                      v-model="formData[field.name]"
                      type="url"
                      :placeholder="field.placeholder"
                      class="field-input"
                    />
                    <div v-if="formData[field.name]" class="file-preview">
                      <img :src="formData[field.name]" class="file-preview-image" style="max-width:200px;max-height:100px;object-fit:contain;" />
                    </div>
                  </div>
                  <input 
                    v-else-if="field.type === 'url'"
                    v-model="formData[field.name]"
                    type="url"
                    :placeholder="field.placeholder"
                    class="field-input"
                  />
                  <!-- Input Date -->
                  <input 
                    v-else-if="field.type === 'date'"
                    v-model="formData[field.name]"
                    type="date"
                    class="field-input"
                  />
                  <!-- Textarea -->
                  <textarea 
                    v-else-if="field.type === 'textarea'"
                    v-model="formData[field.name]"
                    :placeholder="field.placeholder"
                    :rows="field.rows || 3"
                    class="field-input field-textarea"
                  ></textarea>
                  <!-- Select -->
                  <select 
                    v-else-if="field.type === 'select'"
                    v-model="formData[field.name]"
                    class="field-input"
                  >
                    <option value="">{{ field.placeholder }}</option>
                    <option v-for="option in field.options" :key="option.value || option" :value="option.value || option">
                      {{ option.label || option }}
                    </option>
                  </select>
                  <!-- File Input -->
                  <div v-else-if="field.type === 'file'" class="file-wrapper">
                    <label :for="field.name" class="file-input-label">
                      <svg class="file-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      <span>{{ formData[field.name] ? 'Cambiar archivo' : 'Seleccionar archivo' }}</span>
                    </label>
                    <input 
                      :id="field.name"
                      :key="field.name"
                      type="file"
                      :accept="field.accept || '*'"
                      class="file-input-hidden"
                      @change="handleFileUpload($event, field.name)"
                    />
                    <div v-if="formData[field.name]" class="file-preview">
                      <p class="file-preview-text">✓ Archivo seleccionado:</p>
                      <img v-if="field.accept?.includes('image')" :src="formData[field.name]" class="file-preview-image" />
                      <p v-else class="file-preview-name">{{ extractFileName(formData[field.name]) }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        <Boton 
          type="submit" 
          variant="success" 
          class="form-submit"
        >
          {{ submitButtonText }}
        </Boton>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import Boton from './Boton.vue'
import { masterFormFields } from '../config/masterFormFields'
import { updateStoragePartially } from '../utils/storageManager'

const props = defineProps({
  title: {
    type: String,
    default: 'Editar Documento'
  },
  fields: { type: Array, default: () => [] },
  editableFieldNames: { type: Array, default: () => [] },
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
const expandedSections = ref({})

const toggleSection = (sectionLetter) => {
  expandedSections.value[sectionLetter] = !expandedSections.value[sectionLetter]
}

watch(() => props.initialData, (newData) => {
  formData.value = { ...newData }
}, { deep: true })

// Guardar automáticamente en localStorage cada vez que cambian los datos
// Usa updateStoragePartially para hacer merge (no sobrescribe todo)
const saveFormDataToLocalStorage = () => {
  if (typeof window !== 'undefined') {
    try {
      // Solo guardar campos con valor para no contaminar el storage
      const fieldsToSave = Object.fromEntries(
        Object.entries(formData.value).filter(([_, value]) => 
          value !== '' && value !== null && value !== undefined
        )
      )
      updateStoragePartially(fieldsToSave)
      console.log('[DocumentForm] Auto-saved to localStorage:', fieldsToSave)
    } catch (e) {
      console.error('[DocumentForm] Error saving form data to localStorage:', e)
    }
  }
}

// Watch para guardar automáticamente (con debounce)
let saveTimeout
watch(() => formData.value, () => {
  clearTimeout(saveTimeout)
  saveTimeout = setTimeout(() => {
    saveFormDataToLocalStorage()
  }, 500) // Esperar 500ms de inactividad antes de guardar
}, { deep: true })

const handleFileUpload = (event, fieldName) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
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

const filterEditableFields = () => {
  if (props.editableFieldNames.length === 0) {
    return props.fields
  }
  return props.fields.filter(field => props.editableFieldNames.includes(field.name))
}

// Colores suaves por sección
const sectionColorMap = {
  'A': '#E8F4F8',
  'B': '#E8F8E8',
  'C': '#FFF4E8',
  'D': '#F8E8F8',
  'E': '#FFE8F0',
  'E1': '#FFE8F0',
  'E2': '#FFF0E8',
  'F': '#FFE8E8',
  'G': '#E8F0FF',
  'H': '#FFFFF0',
  'I': '#F0E8FF'
}

const sectionLineColorMap = {
  'A': '#2E7D95',
  'B': '#2E952E',
  'C': '#D97706',
  'D': '#8B5A8B',
  'E': '#D97706',
  'E1': '#D97706',
  'E2': '#CC7722',
  'F': '#DC2626',
  'G': '#0369A1',
  'H': '#B8860B',
  'I': '#7C3AED'
}

const getSectionColor = (section) => {
  return sectionLineColorMap[section] || '#666'
}

const groupedFieldsBySection = computed(() => {
  const grouped = {}
  const editable = filterEditableFields()
  
  editable.forEach(field => {
    let section = 'Otros'
    
    // Detectar sección por prefijo del nombre
    if (field.name.startsWith('e1_')) section = 'E1'
    else if (field.name.startsWith('e2_')) section = 'E2'
    else if (field.name.startsWith('f_')) section = 'F'
    else if (field.name.startsWith('g_')) section = 'G'
    else if (field.name.startsWith('h_')) section = 'H'
    else if (field.name.startsWith('i_')) section = 'I'
    else if (field.name.startsWith('apellidos') || field.name.startsWith('nif') || field.name === 'correoElectronico' || field.name === 'telefono' || field.name === 'representante' || field.name === 'dniRepresentante' || field.name === 'domicilio' || field.name === 'localidad' || field.name === 'provincia' || field.name === 'codigoPostal') section = 'A'
    else if (field.name.startsWith('emplazamiento') || (field.name === 'numero' && !field.name.includes('Tecnico')) || field.name === 'bloque' || field.name === 'escalera' || field.name === 'piso' || field.name === 'localidadEmplazamiento' || field.name === 'provinciaEmplazamiento' || field.name === 'codigoPostalEmplazamiento' || field.name === 'correoElectronicoEmplazamiento' || field.name === 'referenciaCatastral' || field.name === 'tipoInstalacion' || field.name === 'usoDestino') section = 'B'
    else if (field.name.startsWith('nombreTecnico') || field.name.startsWith('numeroCertificado') || field.name.startsWith('numeroInstalador') || field.name.startsWith('domicilioTecnico') || field.name.startsWith('localidadTecnico') || field.name.startsWith('telefonoTecnico') || field.name.startsWith('codigoPostalTecnico') || field.name.startsWith('numeroTecnico')) section = 'C'
    else if (field.name.startsWith('modalidad')) section = 'D'
    
    if (!grouped[section]) {
      grouped[section] = []
    }
    grouped[section].push(field)
  })
  
  // Ordenar secciones
  const sortOrder = ['A', 'B', 'C', 'D', 'E', 'E1', 'E2', 'F', 'G', 'H', 'I', 'Otros','LEGALIZACION', 'ACEPTACION']
  const sorted = {}
  sortOrder.forEach(key => {
    if (grouped[key]) {
      sorted[key] = grouped[key]
    }
  })
  
  return sorted
})

// Inicializar todas las secciones como expandidas cuando se calcula groupedFieldsBySection
watch(() => Object.keys(groupedFieldsBySection.value), (sections) => {
  sections.forEach(section => {
    if (expandedSections.value[section] === undefined) {
      expandedSections.value[section] = true
    }
  })
}, { immediate: true })

const submit = () => {
  // Filtrar solo campos con valor (evitar contaminar el maestro con vacíos)
  const filteredData = Object.fromEntries(
    Object.entries(formData.value).filter(([_, value]) => 
      value !== '' && value !== null && value !== undefined
    )
  )
  emit('submit', filteredData)
}

// Usar props.fields si llegan; si no, usar masterFormFields (respeta el orden)
// Si editableFieldNames está presente, filtrar para mostrar solo esos campos
const fieldsToRender = computed(() => {
  const source = (props.fields && props.fields.length) ? props.fields : masterFormFields
  if (!props.editableFieldNames || props.editableFieldNames.length === 0) return source
  return source.filter(f => props.editableFieldNames.includes(f.name))
})

// Agrupar campos por subsección
function groupFieldsBySubsection(fields) {
  const grouped = {}
  fields.forEach(field => {
    const subsection = field.subsection || 'Sin subsección'
    if (!grouped[subsection]) grouped[subsection] = []
    grouped[subsection].push(field)
  })
  return grouped
}
// Etiquetas de subsección
function getSubsectionLabel(subsection) {
  const labels = {
    'E1.1': 'E1.1 - Módulo Fotovoltaico',
    'E1.2': 'E1.2 - Generador Fotovoltaico',
    'E1.3': 'E1.3 - Baterías',
    'E1.4': 'E1.4 - Regulador',
    'E1.5': 'E1.5 - Inversor',
    'E1.6': 'E1.6 - Otros',
    'E1.7': 'E1.7 - Información de la Demanda',
    'E2.1': 'E2.1 - Conexión a la Red',
    'E2.2': 'E2.2 - Módulo Fotovoltaico',
    'E2.3': 'E2.3 - Generador Fotovoltaico',
    'E2.4': 'E2.4 - Inversor',
    'E2.5': 'E2.5 - Baterías',
    'E2.6': 'E2.6 - Protecciones Externas',
    'F': 'F - Medidas de Protección',
    'G': 'G - Características de Líneas y Circuitos',
    'H': 'H - Esquema Unifilar',
    'I': 'I - Plano de Emplazamiento',
    'LEGALIZACION': 'LEGALIZACIÓN'
  }
  return labels[subsection] || subsection
}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background: #ffffff;
}

.form-wrapper {
  width: 100%;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e5e7eb;
}

.form-content {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.section-container {
  background-color: #f9fafb;
  border-left: 4px solid #3b82f6;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  cursor: pointer;
  user-select: none;
  transition: all 0.2s ease;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
}

.section-header:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

.section-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: 18px;
  color: #374151;
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.section-toggle-icon.is-open {
  transform: rotate(90deg);
}

.section-content {
  padding: 20px;
  animation: slideDown 0.2s ease-out;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.section-title {
  font-size: 16px;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0;
  margin-top: 0;
}

.section-title::before {
  content: attr(data-section);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #e0e7ff;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 700;
}

.fields-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.fields-grid > .field-wrapper:nth-child(odd):last-child {
  grid-column: 1 / 2;
}

.field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field-label {
  font-size: 13px;
  font-weight: 500;
  color: #374151;
  margin-bottom: 4px;
}

.field-input,
.field-textarea {
  padding: 10px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 14px;
  color: #1f2937;
  background-color: #ffffff;
  transition: all 0.2s ease;
  font-family: inherit;
}

.field-input:focus,
.field-textarea:focus {
  outline: none;
  border-color: #3b82f6;
  background-color: #f0f9ff;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

.field-input::placeholder,
.field-textarea::placeholder {
  color: #9ca3af;
}

.field-textarea {
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
}

.file-wrapper {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.file-input-label {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 16px 20px;
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border: 2px dashed #3b82f6;
  border-radius: 8px;
  color: #1e40af;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.file-input-label:hover {
  background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
  border-color: #1e3a8a;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(30, 58, 138, 0.2);
}

.file-icon {
  width: 20px;
  height: 20px;
  stroke: currentColor;
}

.file-input-hidden {
  display: none;
}

.file-preview {
  padding: 12px;
  background-color: #f0fdf4;
  border-left: 4px solid #16a34a;
  border-radius: 6px;
  font-size: 13px;
  color: #166534;
}

.file-preview-text {
  margin: 0 0 8px 0;
  font-weight: 500;
}

.file-preview-image {
  max-width: 100%;
  max-height: 200px;
  border-radius: 4px;
  margin-top: 8px;
  border: 1px solid #dcfce7;
}

.file-preview-name {
  margin: 0;
  word-break: break-all;
  font-family: 'Courier New', monospace;
}

.form-submit {
  margin-top: 24px;
  padding: 12px 24px;
  background-color: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}

.form-submit:hover {
  background-color: #2563eb;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
}

.form-submit:active {
  background-color: #1d4ed8;
}

/* Colores suaves para cada sección */
.section-container[data-section="A"] {
  background-color: #f0f9ff;
  border-left-color: #2e7d95;
}

.section-container[data-section="B"] {
  background-color: #f0fdf4;
  border-left-color: #2e952e;
}

.section-container[data-section="C"] {
  background-color: #fffbf0;
  border-left-color: #d97706;
}

.section-container[data-section="D"] {
  background-color: #faf5ff;
  border-left-color: #8b5a8b;
}

.section-container[data-section="E"],
.section-container[data-section="E1"],
.section-container[data-section="E2"] {
  background-color: #fdf2f8;
  border-left-color: #d97706;
}

.section-container[data-section="F"] {
  background-color: #fef2f2;
  border-left-color: #dc2626;
}

.section-container[data-section="G"] {
  background-color: #f0f9ff;
  border-left-color: #0369a1;
}

.section-container[data-section="H"] {
  background-color: #fffef2;
  border-left-color: #b8860b;
}

.section-container[data-section="I"] {
  background-color: #faf5ff;
  border-left-color: #7c3aed;
}

.subsection-container {
  background: #f0f0f0;
  border-left: 3px solid #8b5a8b;
  margin-bottom: 18px;
  padding: 12px 18px;
  border-radius: 6px;
}

.subsection-title {
  font-size: 14px;
  font-weight: bold;
  color: #8b5a8b;
  margin-bottom: 10px;
}

/* Responsive */
@media (max-width: 768px) {
  .fields-grid {
    grid-template-columns: 1fr;
  }

  .form-title {
    font-size: 20px;
  }

  .form-container {
    padding: 12px;
  }

  .section-container {
    padding: 16px;
  }
}
</style>
