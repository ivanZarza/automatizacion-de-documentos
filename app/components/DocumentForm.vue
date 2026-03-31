<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h2 class="form-title">{{ title }}</h2>

      <!-- NAVEGACIÓN POR SUBSECCIONES (TABS) -->
      <div class="tabs-container">
        <div class="tabs-wrapper">
          <button v-for="(_, subsectionName) in groupedFieldsBySection" :key="subsectionName" type="button"
            class="tab-button" :class="{ 'active': activeSubsection === subsectionName }"
            @click="activeSubsection = subsectionName" :style="{ borderBottomColor: getSectionColor(subsectionName) }">
            <span class="tab-label">{{ getSubsectionLabel(subsectionName) }}</span>
          </button>
        </div>
      </div>

      <form @submit.prevent="submit" class="form-content">
        <Transition name="fade" mode="out-in">
          <div :key="activeSubsection" v-if="activeSubsection && groupedFieldsBySection[activeSubsection]"
            class="section-container" :style="{ borderLeftColor: getSectionColor(activeSubsection) }">

            <div class="section-content">
              <!-- Agrupar campos por "group" si existen -->
              <template v-for="(groupFields, groupName) in groupFieldsByGroup(groupedFieldsBySection[activeSubsection])"
                :key="groupName">
                <!-- Header del grupo (colapsable si tiene group) -->
                <div v-if="groupName !== '__sin-grupo__'" class="group-header"
                  @click="toggleGroup(activeSubsection, groupName)">
                  <span class="group-toggle-icon"
                    :class="{ 'is-open': expandedGroups[`${activeSubsection}-${groupName}`] }">▶</span>
                  <h4 class="group-title">{{ groupName }}</h4>
                </div>

                <!-- Contenido del grupo -->
                <div v-if="groupName === '__sin-grupo__' || expandedGroups[`${activeSubsection}-${groupName}`]"
                  class="group-content">
                  <div class="fields-grid">
                    <div v-for="field in groupFields" :key="field.name" class="field-wrapper">
                      <label v-if="field.type !== 'checkbox'" class="field-label">{{ field.label }}</label>
                      <input v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                        v-model="formData[field.name]" :type="field.type" :placeholder="field.placeholder"
                        class="field-input" />
                      <div v-else-if="field.type === 'url' && field.preview" class="url-preview-wrapper">
                        <input v-model="formData[field.name]" type="url" :placeholder="field.placeholder"
                          class="field-input" />
                        <div v-if="formData[field.name]" class="file-preview">
                          <img :src="formData[field.name]" class="file-preview-image"
                            style="max-width:200px;max-height:100px;object-fit:contain;" />
                        </div>
                      </div>
                      <input v-else-if="field.type === 'url'" v-model="formData[field.name]" type="url"
                        :placeholder="field.placeholder" class="field-input" />
                      <input v-else-if="field.type === 'date'" v-model="formData[field.name]" type="date"
                        class="field-input" />
                      <textarea v-else-if="field.type === 'textarea'" v-model="formData[field.name]"
                        :placeholder="field.placeholder" :rows="field.rows || 3"
                        class="field-input field-textarea"></textarea>
                      <select v-else-if="field.type === 'select'" v-model="formData[field.name]" class="field-input">
                        <option value="">{{ field.placeholder || 'Seleccionar...' }}</option>
                        <option v-for="option in field.options" :key="option.value || option"
                          :value="option.value || option">{{ option.label || option }}</option>
                      </select>
                      <div v-else-if="field.type === 'equipment-autocomplete'" class="autocomplete-wrapper"
                        style="width: 100%;">
                        <select :id="field.name" v-model="formData[field.name]" class="field-input"
                          @change="handleEquipmentSelect($event.target.value, field)">
                          <option value="">{{ field.placeholder || 'Seleccione equipo...' }}</option>

                          <option
                            v-if="formData[field.name] && !(equipmentStore[field.equipmentType] || []).some(eq => (eq.marcaModelo || `${eq.marca || ''} ${eq.modelo || ''}`.trim()) === formData[field.name])"
                            :value="formData[field.name]">
                            {{ formData[field.name] }} (Personalizado)
                          </option>

                          <option v-for="eq in (equipmentStore[field.equipmentType] || [])" :key="eq.id"
                            :value="eq.marcaModelo || `${eq.marca || ''} ${eq.modelo || ''}`.trim()">
                            {{ eq.marcaModelo || `${eq.marca || ''} ${eq.modelo || ''}`.trim() }}
                          </option>
                        </select>
                      </div>
                      <div v-else-if="field.type === 'checkbox'" class="checkbox-wrapper">
                        <input :id="field.name" v-model="formData[field.name]" type="checkbox" class="checkbox-input" />
                        <label :for="field.name" class="checkbox-label">{{ field.label }}</label>
                      </div>
                      <div v-else-if="field.type === 'file'" class="file-wrapper">
                        <div class="file-drop-area" :class="{ 'drag-over': dragOverField === field.name }"
                          @dragover.prevent="onDragOver(field.name)" @dragleave.prevent="onDragLeave"
                          @drop.prevent="onDrop($event, field.name)">
                          <label :for="field.name" class="file-input-label">
                            <svg class="file-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                              viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                              stroke-linecap="round" stroke-linejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="17 8 12 3 7 8"></polyline>
                              <line x1="12" y1="3" x2="12" y2="15"></line>
                            </svg>
                            <span>{{ formData[field.name] ? `Cambiar archivo o arrastra aquí` : `Seleccionar archivo o
                              arrastra aquí` }}</span>
                          </label>
                          <input :id="field.name" :key="field.name" type="file" :accept="field.accept || '*'"
                            class="file-input-hidden" @change="handleFileUpload($event, field.name)" />
                          <div v-if="formData[field.name]" class="file-preview">
                            <p class="file-preview-text">✓ Archivo seleccionado:</p>
                            <img v-if="formData[field.name]?.startsWith('data:image/')" :src="formData[field.name]"
                              class="file-preview-image" />
                            <p v-else class="file-preview-name">{{ extractFileName(formData[field.name]) || 'Documento PDF cargado' }}</p>
                            <button type="button" class="btn-remove-file" @click.stop="removeFile(field.name)" title="Quitar archivo">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                              <span>Quitar</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <!-- BOTONES DE ACCIÓN ESPECÍFICOS -->
            <div v-if="activeSubsection === 'PRESENTACIÓN'" class="automation-actions">
              <Boton type="button" variant="primary" class="btn-launch-automation" @click="handleLaunchAutomation">
                🚀 Lanzar Automatización (Junta de Andalucía)
              </Boton>
              <p class="automation-hint">Se abrirá una ventana del navegador para completar la firma con su certificado.
              </p>
            </div>
          </div>
        </Transition>

        <div class="form-actions">
          <Boton type="submit" variant="success" class="form-submit">
            {{ submitButtonText }}
          </Boton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const dragOverField = ref(null)

function onDragOver(fieldName) {
  dragOverField.value = fieldName
}

function onDragLeave() {
  dragOverField.value = null
}

async function onDrop(event, fieldName) {
  dragOverField.value = null
  const files = event.dataTransfer.files
  if (files && files.length > 0) {
    const fakeEvent = { target: { files } }
    await handleFileUpload(fakeEvent, fieldName)
  }
}
import { ref, watch, computed, onMounted, nextTick } from 'vue'
import Boton from './Boton.vue'
import { masterFormFields } from '../config/masterFormFields'
import { saveImageToStorage } from '../utils/storageManager'
import { useEquipmentStore } from '../stores/equipmentStore'

const equipmentStore = useEquipmentStore()

onMounted(async () => {
  await equipmentStore.cargarEquiposBD('inversores')
  await equipmentStore.cargarEquiposBD('baterias')
  await equipmentStore.cargarEquiposBD('modulos')
})

const handleEquipmentSelect = (value, field) => {
  if (!value || !field.mapping || !field.equipmentType) return;

  const equiposDelTipo = equipmentStore[field.equipmentType] || []
  const selectedEq = equiposDelTipo.find(eq => {
    const nombreVisual = eq.marcaModelo || `${eq.marca || ''} ${eq.modelo || ''}`.trim()
    return nombreVisual === value
  })

  if (selectedEq) {
    Object.entries(field.mapping).forEach(([origen, destino]) => {
      if (selectedEq[origen] !== undefined && selectedEq[origen] !== null && selectedEq[origen] !== '') {
        formData.value[destino] = selectedEq[origen]
      }
    })
    console.log(`[DocumentForm] Auto-completado aplicado para ${field.name} desde equipo ${selectedEq.id}`)
  }
}

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
const activeSubsection = ref('')
const expandedGroups = ref({})
const isAutomating = ref(false)

/**
 * Construye el objeto formData inicial aplicando:
 * 1. Los valores que vienen de initialData (BD / localStorage)
 * 2. Los field.value por defecto de masterFormFields (si el campo está vacío)
 * 3. El mapFrom: propaga el valor del campo origen al campo destino (si el destino está vacío)
 */
const buildInitialFormData = (baseData = {}) => {
  const result = {}

  // Paso 1 y 2: initialData + field.value como fallback
  masterFormFields.forEach(field => {
    const fromBase = baseData[field.name]
    const hasValue = fromBase !== undefined && fromBase !== null && fromBase !== ''
    result[field.name] = hasValue ? fromBase : (field.value ?? '')
  })

  // Paso 3: mapFrom — al cargar datos, propagar el origen al destino si el destino sigue vacío
  masterFormFields.forEach(field => {
    if (!field.mapFrom) return
    const destValue = result[field.name]
    const sourceValue = result[field.mapFrom]
    if ((!destValue || destValue === '') && sourceValue) {
      // Caso especial: nombre_presentador necesita parsear apellidos
      if (field.name === 'nombre_presentador' && sourceValue) {
        let nombre = sourceValue, ap1 = '', ap2 = ''
        if (sourceValue.includes(',')) {
          const partes = sourceValue.split(',')
          nombre = partes[1].trim()
          const apellidos = partes[0].trim().split(' ')
          ap1 = apellidos[0] || ''
          ap2 = apellidos.slice(1).join(' ') || ''
        } else {
          const partes = sourceValue.trim().split(' ')
          if (partes.length >= 3) {
            nombre = partes[0]; ap1 = partes[1]; ap2 = partes.slice(2).join(' ')
          } else if (partes.length === 2) {
            nombre = partes[0]; ap1 = partes[1]
          }
        }
        if (!result.nombre_presentador || result.nombre_presentador === '') result.nombre_presentador = nombre
        if (!result.apellido1_presentador || result.apellido1_presentador === '') result.apellido1_presentador = ap1
        if (!result.apellido2_presentador || result.apellido2_presentador === '') result.apellido2_presentador = ap2
        return
      }
      result[field.name] = sourceValue
    }
  })

  return result
}

// Inicialización con valores por defecto + mapFrom aplicado
const formDataInit = buildInitialFormData(props.initialData)
Object.assign(formData.value, formDataInit)

watch(() => props.initialData, (newData) => {
  formData.value = buildInitialFormData(newData)
}, { deep: true })

const toggleGroup = (subsectionName, groupName) => {
  const groupKey = `${subsectionName}-${groupName}`
  expandedGroups.value[groupKey] = !expandedGroups.value[groupKey]
}

// Lógica de sincronización automática (Edificio/L3 vs Vivienda/L4)
const syncConfig = {
  edificio: {
    edificioVivienda: 'rehabilitacion a nivel de edificio',
    edificioViviendaJUS: 'edificio',
    l3l4: 'Línea 3',
    tipoEdificioFvAerotermia: 'EDIFICIO DE VIVIENDA UNIFAMILIAR',
    parrafoTexto: 'Estas ayudas tienen por objeto la financiación de obras o actuaciones en los edificios de uso predominante residencial en las que se obtenga una mejora acreditada de la eficiencia energética, con especial atención a la envolvente edificatoria en edificios de tipología residencial colectiva, incluyendo sus viviendas, y en las viviendas unifamiliares.',
    textoOpcional1: 'Estas ayudas tienen por objeto la financiación de actuaciones u obras de mejora de la eficiencia energética en edificios, en concreto en una vivienda unifamiliar no perteneciente a un bloque de viviendas '
  },
  vivienda: {
    edificioVivienda: 'mejora de la eficiencia energetica en viviendas',
    edificioViviendaJUS: 'vivienda',
    l3l4: 'Línea 4',
    tipoEdificioFvAerotermia: 'VIVIENDAS',
    parrafoTexto: 'Estas ayudas tienen por objeto la financiación de actuaciones u obras de mejora de la eficiencia energética en las viviendas, ya sean unifamiliares o pertenecientes a edificios plurifamiliares',
    textoOpcional1: 'Estas ayudas tienen por objeto la financiación de actuaciones u obras de mejora de la eficiencia energética en las viviendas, ya sean unifamiliares o pertenecientes a edificios plurifamiliares'
  }
}

const triggerFields = ['edificioVivienda', 'edificioViviendaJUS', 'l3l4', 'tipoEdificioFvAerotermia']
let isInternalChange = false
// Clon para detectar qué campo cambió específicamente (en deep watch newVal == oldVal)
let lastTriggerValues = { ...Object.fromEntries(triggerFields.map(f => [f, formData.value[f]])) }

watch(formData, (newVal) => {
  if (isInternalChange) return

  // Buscar si alguno de los campos trigger ha cambiado comparando con el último estado guardado
  const changedField = triggerFields.find(field => newVal[field] !== lastTriggerValues[field])
  if (!changedField) return

  const value = newVal[changedField]

  // Actualizar el estado previo para la próxima comparación
  triggerFields.forEach(f => lastTriggerValues[f] = newVal[f])

  if (!value) return

  // Determinar el "modo" detectado
  let detectedMode = null
  if (Object.values(syncConfig.edificio).includes(value)) detectedMode = 'edificio'
  else if (Object.values(syncConfig.vivienda).includes(value)) detectedMode = 'vivienda'

  if (detectedMode) {
    console.log(`[DocumentForm] Sincronización activada: Modo detectado "${detectedMode}" por cambio en ${changedField}`)
    isInternalChange = true
    const config = syncConfig[detectedMode]
    Object.keys(config).forEach(field => {
      formData.value[field] = config[field]
      // Sincronizar también lastTriggerValues para evitar re-disparos inmediatos
      if (triggerFields.includes(field)) {
        lastTriggerValues[field] = config[field]
      }
    })
    nextTick(() => {
      isInternalChange = false
    })
  }
}, { deep: true })

// Lógica de sincronización automática 'mapFrom' para automatización
watch(formData, (newVal, oldVal) => {
  if (isInternalChange) return

  masterFormFields.forEach(field => {
    if (field.mapFrom) {
      const sourceValue = newVal[field.mapFrom]
      const targetValue = newVal[field.name]
      const sourceOldValue = oldVal ? oldVal[field.mapFrom] : null

      // Si el origen ha cambiado y el destino está vacío o era igual al origen anterior...
      if (sourceOldValue !== undefined && sourceValue !== sourceOldValue) {
        if (!targetValue || targetValue === sourceOldValue) {
          
          if (field.name === 'nombre_presentador' && sourceValue) {
            let nombre = sourceValue
            let ap1 = ''
            let ap2 = ''
            if (sourceValue.includes(',')) {
              const partes = sourceValue.split(',')
              nombre = partes[1].trim()
              const apellidos = partes[0].trim().split(' ')
              ap1 = apellidos[0] || ''
              ap2 = apellidos.slice(1).join(' ') || ''
            } else {
              const partes = sourceValue.trim().split(' ')
              if (partes.length >= 3) {
                nombre = partes.slice(2).join(' ') // Si es "Apellido1 Apellido2 Nombre"
                ap1 = partes[0]
                ap2 = partes[1]
                // Ajuste heurístico simple (si el usuario lo introduce normal "Nombre Apellido1 Apellido2"):
                nombre = partes[0]
                ap1 = partes[1]
                ap2 = partes.slice(2).join(' ')
              } else if (partes.length === 2) {
                nombre = partes[0]
                ap1 = partes[1]
              }
            }
            formData.value.nombre_presentador = nombre
            if (!formData.value.apellido1_presentador) formData.value.apellido1_presentador = ap1
            if (!formData.value.apellido2_presentador) formData.value.apellido2_presentador = ap2
            return
          }

          formData.value[field.name] = sourceValue
        }
      }
    }
  })
}, { deep: true })

// Guardar automáticamente en localStorage controlado por DocumentPage
// (No auto-guardamos aquí para evitar loops infinitos con listeners)

// Comprimir imagen: redimensionar + reducir calidad
const compressImage = (file) => {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = (e) => {
      const img = new Image()
      img.src = e.target.result
      img.onload = () => {
        const canvas = document.createElement('canvas')
        let width = img.width
        let height = img.height

        // Redimensionar si es muy grande (máximo 800x600)
        const MAX_WIDTH = 800
        const MAX_HEIGHT = 600

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width)
            width = MAX_WIDTH
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height)
            height = MAX_HEIGHT
          }
        }

        canvas.width = width
        canvas.height = height

        const ctx = canvas.getContext('2d')
        ctx.fillStyle = '#fff'
        ctx.fillRect(0, 0, width, height)
        ctx.drawImage(img, 0, 0, width, height)

        // Exportar como JPEG con 70% de calidad (reduce significativamente el tamaño)
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.7)

        resolve(compressedDataUrl)
      }
    }
  })
}

const handleFileUpload = async (event, fieldName) => {
  const file = event.target.files[0]

  if (file) {
    try {
      // Comprimir imagen si es tipo imagen
      if (file.type.startsWith('image/')) {
        const compressedDataUrl = await compressImage(file)
        formData.value[fieldName] = compressedDataUrl

        // Guardar imagen comprimida en localStorage
        saveImageToStorage(fieldName, compressedDataUrl)
      } else {
        // Para archivos no-imagen, guardar como está
        const reader = new FileReader()
        reader.onload = (e) => {
          const base64Data = e.target.result
          formData.value[fieldName] = base64Data
          saveImageToStorage(fieldName, base64Data)
        }
        reader.readAsDataURL(file)
      }
    } catch (error) {
      console.error('[DocumentForm] Error al comprimir imagen:', error)
    }
  }
}

const removeFile = (fieldName) => {
  formData.value[fieldName] = ''
  saveImageToStorage(fieldName, null)
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

// Colores suave por subsección
const sectionColorMap = {
  'IMAGEN': '#E8F8E8',
  'LEGALIZACION': '#F8E8F8',
  'PRESENTACIÓN': '#F5F3FF'
}

const sectionLineColorMap = {
  'ACEPTACION': '#2E7D95',
  'A': '#2E7D95',
  'E1': '#D97706',
  'E1.3': '#D97706',
  'E1.4': '#CC7722',
  'E1.5': '#CC7722',
  'E1.6': '#CC7722',
  'E1.7': '#CC7722',
  'E2': '#CC7722',
  'F': '#DC2626',
  'G': '#0369A1',
  'H': '#B8860B',
  'I': '#7C3AED',
  'IMAGEN': '#2E952E',
  'LEGALIZACION': '#8B5A8B',
  'PRESENTACIÓN': '#7C3AED'
}

const getSectionColor = (section) => {
  return sectionLineColorMap[section] || '#666'
}

// Agrupar campos por su propiedad 'group'
const groupFieldsByGroup = (fields) => {
  const grouped = {}

  fields.forEach(field => {
    const groupName = field.group || '__sin-grupo__'
    if (!grouped[groupName]) {
      grouped[groupName] = []
    }
    grouped[groupName].push(field)
  })

  return grouped
}

const groupedFieldsBySection = computed(() => {
  const grouped = {}
  const editable = filterEditableFields()

  editable.forEach(field => {
    const section = field.subsection || 'Sin sección'
    if (!grouped[section]) {
      grouped[section] = []
    }
    grouped[section].push(field)
  })

  // Ordenar secciones con ACEPTACION al final
  const sortOrder = ['A', 'E1', 'E1.1', 'E1.2', 'E1.3', 'E1.4', 'E1.5', 'E1.6', 'E1.7',
    'E2', 'E2.1', 'E2.2', 'E2.3', 'E2.4', 'E2.5', 'E2.6',
    'F', 'G', 'H', 'I', 'IMAGEN', 'LEGALIZACION', 'ACEPTACION']

  const sorted = {}
  sortOrder.forEach(key => {
    if (grouped[key]) {
      sorted[key] = grouped[key]
    }
  })

  // Agregar cualquier sección no incluida en el orden
  Object.keys(grouped).forEach(key => {
    if (!sorted[key]) {
      sorted[key] = grouped[key]
    }
  })

  return sorted
})

// Inicializar todas las secciones como cerradas cuando se calcula groupedFieldsBySection
watch(() => Object.keys(groupedFieldsBySection.value), (sections) => {
  if (sections.length > 0 && !activeSubsection.value) {
    activeSubsection.value = sections[0]
  }

  sections.forEach(section => {
    // Inicializar también los grupos dentro de esta sección como cerrados
    const sectionFields = groupedFieldsBySection.value[section] || []
    const groups = new Set()
    sectionFields.forEach(field => {
      if (field.group && field.group !== '__sin-grupo__') {
        groups.add(field.group)
      }
    })

    groups.forEach(groupName => {
      const groupKey = `${section}-${groupName}`
      if (expandedGroups.value[groupKey] === undefined) {
        expandedGroups.value[groupKey] = false
      }
    })
  })
}, { immediate: true })


const submit = async (silent = false) => {
  // Filtrar solo campos con valor (evitar contaminar el maestro con vacíos)
  // Pero permitir false para checkboxes
  const filteredData = Object.fromEntries(
    Object.entries(formData.value).filter(([_, value]) =>
      (value !== '' && value !== null && value !== undefined) || value === false
    )
  )
  const nombre = formData.value.apellidosNombre
  if (!nombre || nombre.trim() === '') {
    alert('Debes rellenar el campo "apellidosNombre" para guardar el formulario.')
    return
  }

  let savedInDB = false
  let savedLocally = false

  // ✅ PASO 1: Intentar guardar en BD primero (es la fuente de verdad)
  try {
    console.log(`[GUARDANDO] Intentando enviar a BD: "${nombre}"`)

    const response = await $fetch('/api/forms', {
      method: 'POST',
      body: {
        nombre,
        formulario: filteredData
      }
    })

    if (response && !response.error) {
      savedInDB = true
      console.log(`[✅ BD] Guardado exitosamente en BD: "${nombre}"`)
    } else {
      console.log(`[❌ BD] Error en respuesta:`, response)
    }
  } catch (err) {
    console.error(`[❌ BD] Error al conectar/guardar en BD:`, err.message || err)
  }

  // ✅ PASO 2: Guardar en localStorage SOLO si falló BD (fallback)
  if (!savedInDB) {
    try {
      const localData = {
        nombre,
        formulario: filteredData,
        savedAt: new Date().toISOString(),
        synced: false
      }
      localStorage.setItem(`form_${nombre}`, JSON.stringify(localData))
      savedLocally = true
      console.log(`[✅ LOCAL] Guardado en localStorage como fallback: "${nombre}"`)
    } catch (err) {
      console.error(`[❌ LOCAL] Error al guardar localmente:`, err.message)
    }
  }

  // ✅ PASO 3: Mostrar estado final (solo si no es modo silencioso)
  if (!silent) {
    if (savedInDB) {
      alert(`✅ Formulario guardado en BD correctamente.\n"${nombre}"`)
    } else if (savedLocally) {
      alert(`⚠️ No se pudo conectar a BD. Formulario guardado localmente.\n"${nombre}"\n\nSe sincronizará con la BD cuando esté disponible.`)
    } else {
      alert(`❌ Error: No se pudo guardar en ningún lado.\n"${nombre}"`)
      return
    }
  }

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
async function handleLaunchAutomation() {
  if (isAutomating.value) return

  const confirmLaunch = confirm('¿Deseas iniciar la automatización? Se abrirá una ventana de Chrome para realizar los trámites en el portal de la Junta.')
  if (!confirmLaunch) return

  isAutomating.value = true
  
  // ✅ AUTO-GUARDADO ANTES DE LANZAR EL ROBOT
  console.log('[DocumentForm] Auto-guardando datos en la Base de Datos (modo silencioso)...')
  await submit(true) // Llama al UPSERT de PostgreSQL

  console.log('[DocumentForm] Iniciando automatización con los datos actuales...')

  const form = formData.value
  const robotPayload = {
    datos: {
      tipoDocumento: form.tipo_documento_presentador,
      nif: form.nif_presentador,
      nombre: form.nombre_presentador,
      apellido1: form.apellido1_presentador,
      apellido2: form.apellido2_presentador,
      sexo: form.sexo_presentador,
      delegacion: form.cod_delegacion,

      tipoVia: form.tipo_via_presentador,
      nombreVia: form.nombre_via_presentador,
      tipoNumeracion: form.tipo_numeracion_presentador,
      numero: form.numero_presentador,
      calificador: form.calificador_numero_presentador,
      bloque: form.bloque_presentador,
      escalera: form.escalera_presentador,
      piso: form.piso_presentador,
      puerta: form.puerta_presentador,
      margen: form.margen_presentador,
      codigoPostal: form.cp_presentador,
      provincia: form.provincia_presentador,
      municipioNombre: form.municipio_presentador,
      poblacion: form.poblacion_presentador,
      telefono: form.telefono_presentador,
      movil: form.movil_presentador,
      email: form.email_presentador,
      ps_distribuidora: form.ps_distribuidora,

      conRepresentante: form.con_representante_legal,
      representante: {
        tipoDocumento: form.rep_leg_tipo_documento,
        nif: form.rep_leg_nif,
        sexo: form.rep_leg_sexo,
        nombre: form.rep_leg_nombre,
        apellido1: form.rep_leg_apellido1,
        apellido2: form.rep_leg_apellido2,
      },

      conPersonaAutorizada: form.con_persona_autorizada,
      personaAutorizada: {
        tipoDocumento: form.per_aut_tipo_documento,
        nif: form.per_aut_nif,
        sexo: form.per_aut_sexo,
        nombre: form.per_aut_nombre,
        apellido1: form.per_aut_apellido1,
        apellido2: form.per_aut_apellido2,
      },

      otrosDatos75codigo: form.cnae_rite,
      otrosDatosNumero: form.numero_empresa_instaladora,
      codigoComunidadAutonoma: form.codigo_ccaa,

      fichaTecnica: {
        potencia: form.potencia_instalacion,
        uso: form.uso_instalacion,
        tipoSuministro: form.tipo_suministro,
        tension: form.tension_red,
        esAutoconsumo: form.es_autoconsumo,
        cau: form.cau_presentador,
        potenciaInstalada: form.potencia_instalada_ficha,
        acumulacion: form.tiene_acumulacion,
        potenciaAcumulacion: form.potencia_acumulacion,
        energiaMaximaAlmacenada: form.energia_almacenada,
        empresaInstaladora: form.nombre_empresa_instaladora,
        empresaInstaladoraDocTipo: form.empresa_instaladora_doc_tipo,
        empresaInstaladoraDoc: form.empresa_instaladora_doc,
        empresaDistribuidora: form.empresa_distribuidora,
        cups: form.cups_presentador,
      }
    },
    // Añadimos el flat data por si el script backend aún usa variables planas en alguna vista temporal
    flatFormData: form 
  }

  try {
    const response = await fetch('/api/automation/junta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(robotPayload)
    })

    const result = await response.json()

    if (result.success) {
      alert('¡Automatización completada con éxito!')
    } else {
      console.error('[DocumentForm] Error en automatización:', result.error)
      alert(`Error en la automatización: ${result.error || 'Ocurrió un error inesperado'}`)
    }
  } catch (error) {
    console.error('[DocumentForm] Error de red en automatización:', error)
    alert('Error de conexión con el servidor de automatización. Asegúrate de que el servidor esté en ejecución.')
  } finally {
    isAutomating.value = false
  }
}

function getSubsectionLabel(subsection) {
  const labels = {
    'A': 'A - Datos del Solicitante',
    'E1': 'E1 - Instalación Aislada',
    'E1.1': 'E1.1 - Módulo Fotovoltaico',
    'E1.2': 'E1.2 - Generador Fotovoltaico',
    'E1.3': 'E1.3 - Baterías',
    'E1.4': 'E1.4 - Regulador',
    'E1.5': 'E1.5 - Inversor',
    'E1.6': 'E1.6 - Otros Equipos',
    'E1.7': 'E1.7 - Información de la Demanda',
    'E2': 'E2 - Instalación Conectada a Red',
    'E2.1': 'E2.1 - Conexión a la Red',
    'E2.2': 'E2.2 - Módulo Fotovoltaico',
    'E2.3': 'E2.3 - Generador Fotovoltaico',
    'E2.4': 'E2.4 - Inversor',
    'E2.5': 'E2.5 - Baterías (Opcional)',
    'E2.6': 'E2.6 - Protecciones Externas',
    'F': 'F - Medidas de Protección',
    'G': 'G - Características de Líneas y Circuitos',
    'H': 'H - Esquema Unifilar',
    'I': 'I - Plano de Emplazamiento',
    'IMAGEN': 'Imágenes y Documentos',
    'LEGALIZACION': 'LEGALIZACIÓN',
    'ACEPTACION': 'ACEPTACIÓN',
  }
  return labels[subsection] || subsection
}
</script>

<style scoped>
.form-container {
  width: 100%;
  max-width: 1600px;
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

.fields-grid>.field-wrapper:nth-child(odd):last-child {
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

.file-drop-area {
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

.file-drop-area.drag-over {
  border-color: #1e40af;
  background: #e0e7ff;
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

.btn-remove-file {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-top: 8px;
  padding: 4px 8px;
  background-color: #fee2e2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove-file:hover {
  background-color: #fecaca;
  color: #991b1b;
}

.checkbox-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 0;
}

.checkbox-input {
  width: 18px;
  height: 18px;
  cursor: pointer;
  accent-color: #3b82f6;
}

.checkbox-label {
  cursor: pointer;
  font-size: 14px;
  color: #374151;
  user-select: none;
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

/* Estilos para grupos */
.group-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 16px;
  margin-bottom: 10px;
  padding: 10px 12px;
  background-color: #f3f4f6;
  border-left: 3px solid #6366f1;
  cursor: pointer;
  user-select: none;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.group-header:hover {
  background-color: #e5e7eb;
}

.group-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #6366f1;
  transform: rotate(0deg);
  transition: transform 0.2s ease;
  width: 16px;
  height: 16px;
}

.group-toggle-icon.is-open {
  transform: rotate(90deg);
}

.group-title {
  font-size: 13px;
  font-weight: 600;
  color: #374151;
  margin: 0;
}

.group-content {
  padding-left: 12px;
  border-left: 1px solid #d1d5db;
  margin-left: 8px;
  margin-bottom: 12px;
}

/* TABS STYLING */
.tabs-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  padding: 0.75rem 0;
  border-bottom: 2px solid #f3f4f6;
  margin-bottom: 1.5rem;
}

.tabs-wrapper {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 8px;
  scrollbar-width: thin;
}

.tab-button {
  display: flex;
  align-items: center;
  padding: 0.6rem 1.25rem;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  border-bottom-width: 3px;
  background: #f9fafb;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  color: #6b7280;
  font-weight: 600;
  font-size: 0.85rem;
  text-transform: uppercase;
}

.tab-button:hover {
  background: #f3f4f6;
  color: #374151;
  transform: translateY(-1px);
}

.tab-button.active {
  background: white;
  color: #111827;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.section-container {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  border-left-width: 6px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.section-content {
  padding: 0;
}

.form-actions {
  margin-top: 2rem;
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid #f3f4f6;
  padding-top: 2rem;
}

/* ANIMATIONS */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(8px);
}

/* Colores suaves para cada sección */
.section-container[data-section="A"] {
  background-color: #f0f9ff;
}

.section-container[data-section="B"] {
  background-color: #f0fdf4;
}

.section-container[data-section="C"] {
  background-color: #fffbf0;
}

.section-container[data-section="D"] {
  background-color: #faf5ff;
}

.section-container[data-section="E"],
.section-container[data-section="E1"],
.section-container[data-section="E2"] {
  background-color: #fdf2f8;
}

.section-container[data-section="F"] {
  background-color: #fef2f2;
}

.section-container[data-section="G"] {
  background-color: #f0f9ff;
}

.section-container[data-section="H"] {
  background-color: #fffef2;
}

.section-container[data-section="I"] {
  background-color: #faf5ff;
}

.section-container[data-section="PRESENTACIÓN"] {
  background-color: #f5f3ff;
}

/* AUTOMATION ACTIONS */
.automation-actions {
  margin-top: 2rem;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  border: 1px dashed #7c3aed;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.btn-launch-automation {
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 700;
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 10px 15px -3px rgba(124, 58, 237, 0.3);
}

.btn-launch-automation:hover {
  transform: scale(1.05);
  box-shadow: 0 20px 25px -5px rgba(124, 58, 237, 0.4);
}

.automation-hint {
  font-size: 0.875rem;
  color: #6b7280;
  text-align: center;
}

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

  .tabs-wrapper {
    padding-bottom: 12px;
  }
}
</style>
