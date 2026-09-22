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
                  
                  <!-- BOTÓN PARA GENERAR DOCUMENTO DE FACTURA -->
                  <Boton 
                    v-if="groupFields.some(f => f.facturaGroup)"
                    type="button" 
                    variant="primary" 
                    class="btn-generar-factura-inline"
                    @click.stop="generarDocumentoFactura(groupFields[0].facturaGroup)"
                  >
                    📄 Generar DR Corriente Pago
                  </Boton>
                </div>

                <!-- Contenido del grupo -->
                <div v-if="groupName === '__sin-grupo__' || expandedGroups[`${activeSubsection}-${groupName}`]"
                  class="group-content">
                  <div class="fields-grid">
                    <div v-for="field in groupFields" :key="field.name" class="field-wrapper">
                      <label v-if="field.type !== 'checkbox'" class="field-label">
                        {{ field.label }} <span v-if="field.required" style="color: #ef4444; font-weight: bold;">*</span>
                      </label>
                      <input v-if="field.type === 'text' || field.type === 'email' || field.type === 'tel'"
                        v-model="formData[field.name]" :type="field.type" :placeholder="field.placeholder"
                        class="field-input" :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''" @blur="onFieldBlur(field.name)" />
                      <div v-else-if="field.type === 'url' && field.preview" class="url-preview-wrapper">
                        <input v-model="formData[field.name]" type="url" :placeholder="field.placeholder"
                          class="field-input" :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''" @blur="onFieldBlur(field.name)" />
                        <div v-if="formData[field.name]" class="file-preview">
                          <img :src="formData[field.name]" class="file-preview-image"
                            style="max-width:200px;max-height:100px;object-fit:contain;" />
                        </div>
                      </div>
                      <input v-else-if="field.type === 'url'" v-model="formData[field.name]" type="url"
                        :placeholder="field.placeholder" class="field-input" :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''" @blur="onFieldBlur(field.name)" />
                      <input v-else-if="field.type === 'date'" v-model="formData[field.name]" type="date"
                        class="field-input" :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''" />
                      <textarea v-else-if="field.type === 'textarea'" v-model="formData[field.name]"
                        :placeholder="field.placeholder" :rows="field.rows || 3"
                        class="field-input field-textarea" :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''" @blur="onFieldBlur(field.name)"></textarea>
                      <!-- Campo Combobox / Autocomplete con Texto Libre -->
                      <div v-else-if="field.type === 'combobox' || field.isCombobox" class="combobox-wrapper" style="position: relative; width: 100%;">
                        <input
                          :id="field.name"
                          type="text"
                          v-model="formData[field.name]"
                          :placeholder="field.placeholder || 'Escriba o seleccione...'"
                          class="field-input"
                          :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''"
                          @focus="activeCombobox = field.name"
                          @blur="onComboboxBlur"
                          @input="activeCombobox = field.name"
                          autocomplete="off"
                        />
                        <div
                          v-if="activeCombobox === field.name && getComboboxFilteredOptions(field).length > 0"
                          class="combobox-dropdown"
                          style="position: absolute; top: calc(100% + 4px); left: 0; right: 0; max-height: 220px; overflow-y: auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); z-index: 9999;"
                        >
                          <div
                            v-for="option in getComboboxFilteredOptions(field)"
                            :key="option.value || option.label || option"
                            class="combobox-item"
                            style="padding: 10px 14px; cursor: pointer; border-bottom: 1px solid #f1f5f9; font-size: 0.875rem; color: #1e293b; transition: background 0.15s ease;"
                            @mousedown.prevent="selectComboboxOption(field.name, option)"
                          >
                            {{ option.label || option.value || option }}
                          </div>
                        </div>
                      </div>
                      <select v-else-if="field.type === 'select'" v-model="formData[field.name]" class="field-input"
                        :style="field.required ? 'border-color: #ef4444; border-width: 2px;' : ''">
                        <option value="">{{ field.placeholder || 'Seleccionar...' }}</option>
                        <option v-for="option in field.options" :key="option.value || option"
                          :value="option.value || option">{{ option.label || option }}</option>
                      </select>
                      <!-- SELECT DEPENDIENTE (municipios filtrados por provincia) -->
                      <select v-else-if="field.type === 'dependent-select'" v-model="formData[field.name]" class="field-input">
                        <option value="">{{ field.placeholder || 'Seleccionar...' }}</option>
                        <option v-for="opt in getDependentOptions(field)" :key="opt" :value="opt">{{ opt }}</option>
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
                            <span>{{ (formData[field.name] || formData[`${field.name}_filename`]) ? `Cambiar archivo o arrastra aquí` : `Seleccionar archivo o
                              arrastra aquí` }}</span>
                          </label>
                          <input :id="field.name" :key="field.name" type="file" :accept="field.accept || '*'"
                            class="file-input-hidden" @change="handleFileUpload($event, field.name)" />
                          <div v-if="formData[field.name] || formData[`${field.name}_filename`]" class="file-preview">
                            <p class="file-preview-text">✓ Archivo seleccionado:</p>
                            <p class="file-preview-name">{{ formData[`${field.name}_filename`] || (formData[field.name]?.startsWith('data:image/') ? 'Imagen cargada' : 'Documento cargado') }}</p>
                            <img v-if="formData[field.name]?.startsWith('data:image/')" :src="formData[field.name]"
                              class="file-preview-image" />
                            <button type="button" class="btn-remove-file" @click.stop="removeFile(field.name)"
                              title="Quitar archivo">
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
                                fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
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
              <p class="automation-hint">Se abrirá una ventana del navegador para completar la firma con su certificado.</p>
            </div>

            <div v-if="activeSubsection === 'REGISTRO'" class="automation-actions">
              <Boton type="button" variant="primary" class="btn-launch-automation" @click="handleLaunchRegistro">
                🏛️ Lanzar Registro CEE (Junta de Andalucía)
              </Boton>
              <p class="automation-hint">Se abrirá una ventana del navegador para registrar el Certificado Energético.</p>
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
import { useRouter } from 'vue-router'
import Boton from './Boton.vue'
import { masterFormFields } from '../config/masterFormFields'
import { saveImageToStorage } from '../utils/storageManager'
import { useEquipmentStore } from '../stores/equipmentStore'
import { municipiosPorProvincia } from '../config/municipiosOptions'
import municipiosAndalucia from '../config/municipiosAndalucia.json'

// Mapa de fuentes de datos para selects dependientes
const dependentSelectSources = {
  municipiosPorProvincia,
}

/**
 * Devuelve las opciones para un campo dependent-select.
 * Busca en la fuente de datos correspondiente usando el valor del campo padre.
 */
function getDependentOptions(field) {
  if (!field.dependsOn || !field.optionsSource) return []
  const parentValue = formData.value[field.dependsOn] || ''
  const source = dependentSelectSources[field.optionsSource]
  if (!source || !parentValue) return []
  return source[parentValue] || []
}

const equipmentStore = useEquipmentStore()
const router = useRouter()

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

// Lógica para Combobox / Autocomplete con Texto Libre
const activeCombobox = ref(null)

const removeAccents = (str) => {
  return str ? str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase() : ''
}

const getMunicipiosForProvincia = (prov) => {
  if (!prov) return null
  if (municipiosAndalucia[prov]) return municipiosAndalucia[prov]
  const provClean = removeAccents(prov)
  for (const [k, v] of Object.entries(municipiosAndalucia)) {
    if (removeAccents(k) === provClean) {
      return v
    }
  }
  return null
}

const getComboboxFilteredOptions = (field) => {
  let opts = field.options || []

  // Para campos de municipio, obtener dinámicamente según provincia o catálogo global
  if (field.name === 'localidadEmplazamiento' || field.name === 'registro_t3_localidad') {
    const provKey = field.name === 'localidadEmplazamiento' ? 'provinciaEmplazamiento' : 'registro_t3_provincia'
    const currentProv = formData.value[provKey]
    const munesProv = getMunicipiosForProvincia(currentProv)

    if (munesProv) {
      opts = munesProv
    } else {
      // Si no se ha elegido provincia aún, cargar la lista completa de municipios de Andalucía
      opts = Object.values(municipiosAndalucia).flat()
    }
  }

  const rawQuery = (formData.value[field.name] || '').toString().trim()
  if (!rawQuery) {
    return opts.slice(0, 100)
  }

  const queryClean = removeAccents(rawQuery)

  return opts.filter(opt => {
    const label = (opt.label || opt.value || opt).toString()
    const labelClean = removeAccents(label)
    return labelClean.includes(queryClean)
  }).slice(0, 100)
}

const selectComboboxOption = (fieldName, option) => {
  const val = typeof option === 'object' ? (option.label || option.value) : option
  formData.value[fieldName] = val
  activeCombobox.value = null

  // Si se selecciona un municipio y la provincia está vacía o desactualizada, auto-asignarla
  if (fieldName === 'localidadEmplazamiento' || fieldName === 'registro_t3_localidad') {
    const targetProvKey = fieldName === 'localidadEmplazamiento' ? 'provinciaEmplazamiento' : 'registro_t3_provincia'
    for (const [prov, munes] of Object.entries(municipiosAndalucia)) {
      if (munes.some(m => m.value === val || m.label === val)) {
        formData.value[targetProvKey] = prov
        break
      }
    }
  }
}

const onComboboxBlur = () => {
  setTimeout(() => {
    activeCombobox.value = null
  }, 200)
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
 * 2. Si no hay valor, el mapFrom (si el campo origen tiene valor)
 * 3. Si sigue vacío, el field.value por defecto
 */
const buildInitialFormData = (baseData = {}) => {
  const result = {}

  // Paso 1: Cargar valores desde baseData (datos guardados) y recortar espacios
  masterFormFields.forEach(field => {
    const fromBase = baseData[field.name]
    let val = fromBase !== undefined && fromBase !== null ? fromBase : ''
    if (typeof val === 'string') {
      val = val.trim()
    }
    result[field.name] = val

    // Si es un campo de tipo file, cargar también su filename/name si existe en baseData
    if (field.type === 'file') {
      const filenameKey = `${field.name}_filename`
      const nameKey = `${field.name}_name`
      let fromBaseFilename = baseData[filenameKey] !== undefined && baseData[filenameKey] !== null
        ? baseData[filenameKey]
        : (baseData[nameKey] !== undefined && baseData[nameKey] !== null ? baseData[nameKey] : '')
      
      // Si no existe el nombre pero sí el contenido base64, generar un nombre por defecto
      if (!fromBaseFilename && val && typeof val === 'string' && val.startsWith('data:')) {
        let ext = 'pdf'
        const mimeMatch = val.match(/^data:([^;]+);base64,/)
        if (mimeMatch) {
          const mime = mimeMatch[1]
          if (mime.includes('image/png')) ext = 'png'
          else if (mime.includes('image/jpeg') || mime.includes('image/jpg')) ext = 'jpg'
          else if (mime.includes('image/gif')) ext = 'gif'
          else if (mime.includes('pdf')) ext = 'pdf'
        }
        
        if (field.name === 'doc_autorizacion_rep') fromBaseFilename = `1.- MTD.${ext}`
        else if (field.name === 'doc_adicional_2') fromBaseFilename = `2.- CIE.${ext}`
        else if (field.name === 'doc_certificado_solidez') fromBaseFilename = `7.- Certificado de Solidez.${ext}`
        else {
          let label = field.label || field.name
          label = label.replace(/\s*\(Archivo\)\s*/i, '').replace(/\s*\(Imagen\)\s*/i, '').trim()
          fromBaseFilename = `${label}.${ext}`
        }
      } else if (fromBaseFilename) {
        // Normalizar nombres existentes eliminando prefijos extraños
        const clean = fromBaseFilename.replace(/^[\d\.\-_\s]+/, '').trim()
        if (field.name === 'doc_autorizacion_rep') fromBaseFilename = `1.- ${clean || 'MTD.pdf'}`
        else if (field.name === 'doc_adicional_2') fromBaseFilename = `2.- ${clean || 'CIE.pdf'}`
        else if (field.name === 'doc_certificado_solidez') fromBaseFilename = `7.- ${clean || 'Certificado de Adecuacion.pdf'}`
      }
      
      result[filenameKey] = fromBaseFilename
      result[nameKey] = fromBaseFilename
    }
  })

  // Paso 2: Para campos vacíos que tienen mapFrom, aplicar el mapeo desde el origen
  masterFormFields.forEach(field => {
    if (!field.mapFrom) return
    const destValue = result[field.name]
    const sourceValue = result[field.mapFrom]
    
    // Si el destino está vacío o tiene su valor por defecto, y el origen tiene valor, aplicamos el mapeo
    const isDefaultOrEmpty = destValue === undefined || destValue === null || destValue === '' || (field.value !== undefined && String(destValue).trim() === String(field.value).trim())
    if (isDefaultOrEmpty && sourceValue) {
      if (field.name === 'nombre_presentador') {
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

      let finalValue = typeof sourceValue === 'string' ? sourceValue.trim() : sourceValue
      if (field.mapTransform) {
        const lookupKey = typeof sourceValue === 'string'
          ? sourceValue.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
          : sourceValue
        if (field.mapTransform[lookupKey] !== undefined) {
          finalValue = field.mapTransform[lookupKey]
        } else if (field.mapTransform[sourceValue] !== undefined) {
          finalValue = field.mapTransform[sourceValue]
        } else {
          finalValue = '' // No coincide con la transformación (ej. Toledo), vaciar
        }
      }
      if (typeof finalValue === 'string') {
        finalValue = finalValue.trim()
      }
      result[field.name] = finalValue
    }
  })

  // Paso 3: Rellenar los campos que sigan vacíos con sus valores por defecto (field.value)
  masterFormFields.forEach(field => {
    if (result[field.name] === undefined || result[field.name] === null || result[field.name] === '') {
      // Si el campo tiene mapFrom y el origen tiene valor, significa que se mapeó a vacío intencionadamente (ej: Toledo no es una provincia andaluza válida)
      if (field.mapFrom && result[field.mapFrom]) {
        result[field.name] = ''
        return
      }
      result[field.name] = field.value !== undefined ? field.value : (field.type === 'checkbox' ? false : '')
    }
  })

  // Paso 4: Ajustar tiene_acumulacion basado en potencia_acumulacion y energia_almacenada
  const potAccum = result.potencia_acumulacion
  const energAccum = result.energia_almacenada
  const isNonZero = (val) => {
    if (val === undefined || val === null) return false
    const str = String(val).trim()
    if (str === '' || str === '0') return false
    const num = parseFloat(str.replace(',', '.'))
    return !isNaN(num) && num !== 0
  }
  result.tiene_acumulacion = (isNonZero(potAccum) || isNonZero(energAccum)) ? 'si' : 'no'

  return result
}

// Inicialización con valores por defecto + mapFrom aplicado
const formDataInit = buildInitialFormData(props.initialData)
Object.assign(formData.value, formDataInit)

// Clon para detectar cambios en campos origen de mapFrom (evita el bug de deep watch de Vue 3)
const lastMapFromSourceValues = {}
const initMapFromSourceValues = (data = {}) => {
  masterFormFields.forEach(field => {
    if (field.mapFrom) {
      lastMapFromSourceValues[field.mapFrom] = data[field.mapFrom] || ''
    }
  })
}
initMapFromSourceValues(formData.value)

watch(() => props.initialData, (newData) => {
  formData.value = buildInitialFormData(newData)
  initMapFromSourceValues(formData.value)
}, { deep: true })

const toggleGroup = (subsectionName, groupName) => {
  const groupKey = `${subsectionName}-${groupName}`
  expandedGroups.value[groupKey] = !expandedGroups.value[groupKey]
}

// Cuando cambia la delegación (provincia), resetear municipio si no pertenece a la nueva provincia
watch(() => formData.value.cod_delegacion, (newCod) => {
  if (!newCod) return
  const municipiosValidos = municipiosPorProvincia[newCod] || []
  const municipioActual = formData.value.municipio_presentador || ''
  if (municipioActual && !municipiosValidos.includes(municipioActual)) {
    formData.value.municipio_presentador = ''
  }
})

// Cuando cambia el municipio seleccionado, sincronizar con poblacion_presentador
watch(() => formData.value.municipio_presentador, (newMun) => {
  if (newMun) {
    formData.value.poblacion_presentador = newMun
  }
})

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

// Memoria para el two-way binding de los campos enlazados por mapFrom
let lastMapValues = {}
masterFormFields.forEach(field => {
  if (field.mapFrom) {
    lastMapValues[field.mapFrom] = formData.value[field.mapFrom]
    lastMapValues[field.name] = formData.value[field.name]
  }
})

// Lógica de sincronización bidireccional 'mapFrom'
watch(formData, (newVal) => {
  if (isInternalChange) return

  let hasChanges = false
  const changesToApply = {}

  masterFormFields.forEach(field => {
    if (field.mapFrom) {
      const sourceName = field.mapFrom
      const targetName = field.name

      const currentSource = newVal[sourceName]
      const currentTarget = newVal[targetName]
      
      const lastSource = lastMapValues[sourceName]
      const lastTarget = lastMapValues[targetName]

      // 1. ¿Ha cambiado el origen (Ej: Sección A)?
      if (currentSource !== lastSource) {
        let valueToInject = currentSource

        // Transformación si existe mapTransform
        if (field.mapTransform) {
          const lookupKey = typeof currentSource === 'string'
            ? currentSource.trim().toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            : currentSource
          if (field.mapTransform[lookupKey] !== undefined) {
            valueToInject = field.mapTransform[lookupKey]
          } else if (field.mapTransform[currentSource] !== undefined) {
            valueToInject = field.mapTransform[currentSource]
          }
        }
        
        // Si el destino es un select de objetos (ej: provincia/municipio), mapear de Nombre (Texto) a Código (Value)
        if (field.options && field.options.length > 0 && typeof field.options[0] === 'object') {
          const matchedOption = field.options.find(o => o.label && currentSource && String(o.label).trim().toUpperCase() === String(currentSource).trim().toUpperCase())
          if (matchedOption) valueToInject = matchedOption.value
        } else if (field.name === 'registro_t3_localidad' && currentSource) {
          // Si las opciones están vacías (ej. aún no se seleccionó provincia), buscar globalmente en municipiosAndalucia
          const targetStr = String(currentSource).trim().toUpperCase()
          for (const provCode in municipiosAndalucia) {
            const matchedOption = municipiosAndalucia[provCode].find(o => String(o.label).trim().toUpperCase() === targetStr)
            if (matchedOption) {
              valueToInject = matchedOption.value
              break
            }
          }
        }

        if (currentTarget !== valueToInject) {
          // Lógica especial para nombres (separar apellidos)
          if (field.name === 'nombre_presentador' && currentSource) {
            let nombre = currentSource, ap1 = '', ap2 = ''
            if (currentSource.includes(',')) {
              const partes = currentSource.split(',')
              nombre = partes[1].trim()
              const apellidos = partes[0].trim().split(' ')
              ap1 = apellidos[0] || ''; ap2 = apellidos.slice(1).join(' ') || ''
            } else {
              const partes = currentSource.trim().split(' ')
              if (partes.length >= 3) {
                nombre = partes[0]; ap1 = partes[1]; ap2 = partes.slice(2).join(' ')
              } else if (partes.length === 2) {
                nombre = partes[0]; ap1 = partes[1]
              }
            }
            changesToApply.nombre_presentador = nombre
            if (!newVal.apellido1_presentador) changesToApply.apellido1_presentador = ap1
            if (!newVal.apellido2_presentador) changesToApply.apellido2_presentador = ap2
          } else {
            // Sincronización normal Origen -> Destino
            changesToApply[targetName] = valueToInject
          }
          hasChanges = true
        }
      }
      // 2. ¿Ha cambiado el destino (Ej: REGISTRO T3)? -> TWO-WAY BINDING
      else if (currentTarget !== lastTarget) {
        let valueToInjectBack = currentTarget
        // Si el destino es un select de objetos (ej: provincia/municipio), mapear de Código (Value) a Nombre (Texto)
        if (field.options && field.options.length > 0 && typeof field.options[0] === 'object') {
          const matchedOption = field.options.find(o => String(o.value) === String(currentTarget))
          if (matchedOption) valueToInjectBack = matchedOption.label
        } else if (field.name === 'registro_t3_localidad' && currentTarget) {
          // Búsqueda inversa global si options está vacío por algún motivo
          for (const provCode in municipiosAndalucia) {
            const matchedOption = municipiosAndalucia[provCode].find(o => String(o.value) === String(currentTarget))
            if (matchedOption) {
              valueToInjectBack = matchedOption.label
              break
            }
          }
        }

        if (currentSource !== valueToInjectBack) {
          // No aplicamos reverse sync para nombre del presentador ni para campos de dirección del Registro
          const isAddressField = field.name === 'registro_t3_localidad' || field.name === 'registro_t3_provincia'
          if (field.name !== 'nombre_presentador' && !isAddressField) {
            changesToApply[sourceName] = valueToInjectBack
            hasChanges = true
          }
        }
      }
    }
  })

  // Ajustar tiene_acumulacion basado en potencia_acumulacion y energia_almacenada
  const potAccum = newVal.potencia_acumulacion
  const energAccum = newVal.energia_almacenada
  const isNonZero = (val) => {
    if (val === undefined || val === null) return false
    const str = String(val).trim()
    if (str === '' || str === '0') return false
    const num = parseFloat(str.replace(',', '.'))
    return !isNaN(num) && num !== 0
  }

  const tieneAcum = isNonZero(potAccum) || isNonZero(energAccum)
  const expectedTieneAcum = tieneAcum ? 'si' : 'no'
  if (newVal.tiene_acumulacion !== expectedTieneAcum) {
    changesToApply.tiene_acumulacion = expectedTieneAcum
    hasChanges = true
  }

  // Actualizar la memoria con los valores actuales ANTES de inyectar los cambios
  masterFormFields.forEach(field => {
    if (field.mapFrom) {
      lastMapValues[field.mapFrom] = newVal[field.mapFrom]
      lastMapValues[field.name] = newVal[field.name]
    }
  })

  // Aplicar los cambios detectados
  if (hasChanges) {
    isInternalChange = true
    Object.entries(changesToApply).forEach(([key, val]) => {
      formData.value[key] = val
      lastMapValues[key] = val // Sincronizar memoria inmediatamente
    })
    nextTick(() => {
      isInternalChange = false
    })
  }
}, { deep: true })

// Auto-rellenar normativas (Edificación e Instalaciones) según el año de construcción
watch(() => formData.value.registro_t3_anioConstruccion, (newVal) => {
  if (newVal) {
    const anio = parseInt(newVal)
    if (!isNaN(anio)) {
      // Normativa Edificación
      if (anio < 1980) {
        formData.value.registro_t9_edificacion = 'otro'
        if (!formData.value.registro_t9_otro_edif) formData.value.registro_t9_otro_edif = 'Anterior a NBE-CT-79'
      }
      else if (anio >= 1980 && anio <= 2006) formData.value.registro_t9_edificacion = 'nbe'
      else if (anio >= 2007 && anio <= 2013) formData.value.registro_t9_edificacion = 'cte'
      else if (anio >= 2014) formData.value.registro_t9_edificacion = 'cte_2013'

      // Normativa Instalación Térmica
      if (anio < 1998) {
        formData.value.registro_t9_instalacion = 'otro'
        if (!formData.value.registro_t9_otro_inst) formData.value.registro_t9_otro_inst = 'Anterior a RITE'
      }
      else if (anio >= 1998 && anio <= 2007) formData.value.registro_t9_instalacion = 'rite98'
      else if (anio > 2007) formData.value.registro_t9_instalacion = 'rite07'
    }
  }
})

// Dinamizar opciones de municipio al cambiar de provincia
watch(() => formData.value.provinciaEmplazamiento, (newProvincia) => {
  const localidadFieldA = masterFormFields.find(f => f.name === 'localidadEmplazamiento')
  if (localidadFieldA) {
    localidadFieldA.options = getMunicipiosForProvincia(newProvincia) || []
  }
}, { immediate: true })

watch(() => formData.value.registro_t3_provincia, (newProvincia) => {
  const localidadFieldT3 = masterFormFields.find(f => f.name === 'registro_t3_localidad')
  if (localidadFieldT3) {
    localidadFieldT3.options = getMunicipiosForProvincia(newProvincia) || []
  }
}, { immediate: true })

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
      // Normalizar nombre de archivo según la casilla (Solución 1: prefijos 1.-, 2.-, 7.- automáticos)
      let normalizedName = file.name
      const clean = file.name.replace(/^[\d\.\-_\s]+/, '').trim()
      if (fieldName === 'doc_autorizacion_rep') {
        normalizedName = `1.- ${clean || 'MTD.pdf'}`
      } else if (fieldName === 'doc_adicional_2') {
        normalizedName = `2.- ${clean || 'CIE.pdf'}`
      } else if (fieldName === 'doc_certificado_solidez') {
        normalizedName = `7.- ${clean || 'Certificado de Adecuacion.pdf'}`
      }

      // Guardar el nombre de archivo en formData y localStorage (soportando _filename y _name)
      formData.value[`${fieldName}_filename`] = normalizedName
      formData.value[`${fieldName}_name`] = normalizedName
      saveImageToStorage(`${fieldName}_filename`, normalizedName)
      saveImageToStorage(`${fieldName}_name`, normalizedName)
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
      console.error('[DocumentForm] Error al procesar archivo:', error)
    }
  }
}

const removeFile = (fieldName) => {
  formData.value[fieldName] = ''
  formData.value[`${fieldName}_filename`] = ''
  formData.value[`${fieldName}_name`] = ''
  saveImageToStorage(fieldName, null)
  saveImageToStorage(`${fieldName}_filename`, null)
  saveImageToStorage(`${fieldName}_name`, null)
}

const extractFileName = (dataUrl) => {
  if (typeof dataUrl === 'string' && dataUrl.startsWith('data:')) {
    return 'Imagen cargada'
  }
  return dataUrl
}

const onFieldBlur = (fieldName) => {
  if (typeof formData.value[fieldName] === 'string') {
    formData.value[fieldName] = formData.value[fieldName].trim()
  }
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
  'PRESENTACIÓN': '#7C3AED',
  'REGISTRO': '#059669'
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
    'F', 'G', 'H', 'I', 'IMAGEN', 'LEGALIZACION', 'PRESENTACIÓN', 'REGISTRO', 'ACEPTACION']

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
  // Recortar espacios en blanco antes y después en todos los campos de texto
  Object.keys(formData.value).forEach(key => {
    if (typeof formData.value[key] === 'string') {
      formData.value[key] = formData.value[key].trim()
    }
  })

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
async function handleLaunchRegistro() {
  console.log('[DocumentForm] 🚀 Botón "Lanzar Registro CEE" pulsado.')
  if (isAutomating.value) {
    console.warn('[DocumentForm] ⚠️ Ya hay una automatización en curso.')
    return
  }

  const confirmLaunch = confirm('¿Deseas iniciar el registro del Certificado Energético? Se abrirá una ventana para firmar con tu certificado.')
  if (!confirmLaunch) {
    console.log('[DocumentForm] ℹ️ Usuario canceló la confirmación de Registro CEE.')
    return
  }

  isAutomating.value = true

  try {
    console.log('[DocumentForm] 💾 Auto-guardando datos en la Base de Datos (modo silencioso)...')
    await submit(true)

    console.log('[DocumentForm] 📤 Enviando petición a /api/automation-registro...')
    const form = formData.value
    console.log('[DocumentForm] 📦 Payload a enviar:', { datosKeysCount: Object.keys(form || {}).length })

    const response = await fetch('/api/automation-registro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ datos: form })
    })

    console.log('[DocumentForm] 📥 Respuesta HTTP recibida. Status:', response.status, response.statusText)
    const result = await response.json()
    console.log('[DocumentForm] 📋 Resultado deserializado:', result)

    if (result.success) {
      alert('🚀 ¡Registro CEE iniciado en segundo plano! Se ha abierto la ventana del navegador Chrome para continuar el trámite.')
    } else {
      console.error('[DocumentForm] ❌ Error reportado por el backend:', result.error)
      alert(`Error en el registro: ${result.error || 'Ocurrió un error inesperado'}`)
    }
  } catch (error) {
    console.error('[DocumentForm] 💥 Error de red o ejecución en registro:', error)
    alert(`Error de conexión con el servidor: ${error.message || error}`)
  } finally {
    isAutomating.value = false
    console.log('[DocumentForm] 🏁 Fin de handleLaunchRegistro.')
  }
}

async function handleLaunchAutomation() {
  console.log('[DocumentForm] 🚀 Botón "Lanzar Automatización Junta" pulsado.')
  if (isAutomating.value) {
    console.warn('[DocumentForm] ⚠️ Ya hay una automatización en curso.')
    return
  }

  // Recortar espacios de los campos a validar antes de la verificación
  if (formData.value.ps_distribuidora) formData.value.ps_distribuidora = String(formData.value.ps_distribuidora).trim()
  if (formData.value.empresaDistribuidora) formData.value.empresaDistribuidora = String(formData.value.empresaDistribuidora).trim()
  if (formData.value.cnae_rite) formData.value.cnae_rite = String(formData.value.cnae_rite).trim()
  if (formData.value.cau_presentador) formData.value.cau_presentador = String(formData.value.cau_presentador).trim()

  // Validaciones obligatorias antes de proceder
  if (!formData.value.ps_distribuidora || formData.value.ps_distribuidora === '') {
    alert('Error: El campo "Empresa Distribuidora (Oficial)" es obligatorio antes de lanzar la presentación.')
    return
  }
  if (!formData.value.cnae_rite || formData.value.cnae_rite === '') {
    alert('Error: El campo "Actividad CNAE / RITE" es obligatorio antes de lanzar la presentación.')
    return
  }
  if (!formData.value.cau_presentador || formData.value.cau_presentador === '') {
    alert('Error: El campo "CAU" es obligatorio antes de lanzar la presentación.')
    return
  }

  const confirmLaunch = confirm('¿Deseas iniciar la automatización? Se abrirá una ventana de Chrome para realizar los trámites en el portal de la Junta.')
  if (!confirmLaunch) {
    console.log('[DocumentForm] ℹ️ Usuario canceló la confirmación de Automatización Junta.')
    return
  }

  isAutomating.value = true

  try {
    console.log('[DocumentForm] 💾 Auto-guardando datos en la Base de Datos (modo silencioso)...')
    await submit(true)

    console.log('[DocumentForm] 📤 Enviando petición a /api/automation-junta...')
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
          empresaDistribuidora: form.ps_distribuidora || '',
          cups: form.cups_presentador,
        }
      },
      flatFormData: form
    }

    const response = await fetch('/api/automation-junta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(robotPayload)
    })

    console.log('[DocumentForm] 📥 Respuesta HTTP recibida. Status:', response.status, response.statusText)
    const result = await response.json()
    console.log('[DocumentForm] 📋 Resultado deserializado:', result)

    if (result.success) {
      alert('🚀 ¡Automatización de la Junta iniciada en segundo plano! Se ha abierto la ventana del navegador Chrome para continuar el trámite.')
    } else {
      console.error('[DocumentForm] ❌ Error reportado por el backend:', result.error)
      alert(`Error en la automatización: ${result.error || 'Ocurrió un error inesperado'}`)
    }
  } catch (error) {
    console.error('[DocumentForm] 💥 Error de red o ejecución en automatización:', error)
    alert(`Error de conexión con el servidor: ${error.message || error}`)
  } finally {
    isAutomating.value = false
    console.log('[DocumentForm] 🏁 Fin de handleLaunchAutomation.')
  }
}

// Función para generar documento específico de una factura
const generarDocumentoFactura = async (facturaIndex) => {
  console.log(`[DocumentForm] Generando documento para Factura ${facturaIndex}`)
  
  // Guardar datos actuales en el store
  await submit(true) // submit silencioso
  
  // Validar que existan los datos mínimos de la factura
  const numeroFactura = formData.value[`numeroFactura${facturaIndex}`] || ''
  const nombreEmpresa = formData.value[`acreedor${facturaIndex}`] || ''
  const cifEmpresa = formData.value[`cf${facturaIndex}`] || ''
  
  if (!numeroFactura) {
    alert(`⚠️ Por favor, ingresa el número de la Factura ${facturaIndex} antes de generar el documento.`)
    return
  }
  
  if (!nombreEmpresa || !cifEmpresa) {
    alert(`⚠️ Por favor, completa los datos de Acreedor y CF de la Factura ${facturaIndex} antes de generar el documento.`)
    return
  }
  
  // Datos comunes para todas las facturas (según fieldMapping del config)
  const datosComunes = {
    numeroExpediente: formData.value.expedienteEco || '',
    apellidosNombre: formData.value.apellidosNombre || '',
    nifCif: formData.value.nifCif || '',
    localidad: formData.value.localidadEmplazamiento || 'Málaga',
    dia: formData.value.diaFirmaJustificacion || '',
    mes: formData.value.mesFirmaJustificacion || '',
    anio: formData.value.anioFirmaJustificacion || '',
  }
  
  // Datos específicos de la factura (dinámicos según el índice)
  const datosFactura = {
    numeroFactura,
    nombreEmpresa,
    cifEmpresa,
  }
  
  // Navegar al documento con todos los datos
  router.push({
    path: '/justificaciones/declaracion-corriente-pago-acreedores',
    query: { ...datosComunes, ...datosFactura, facturaIndex }
  })
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
    'PRESENTACIÓN': 'PRESENTACIÓN',
    'REGISTRO': 'REGISTRO CEE',
    'ACEPTACION': 'ACEPTACIÓN',
    'JUSTIFICACION': 'JUSTIFICACIÓN',
    'FACTURAS': 'FACTURAS',
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
  flex: 1;
}

.btn-generar-factura-inline {
  margin-left: auto;
  font-size: 12px;
  padding: 6px 12px;
  white-space: nowrap;
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

/* FACTURA ACTIONS */
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
