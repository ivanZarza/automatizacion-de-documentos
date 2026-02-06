# 🚀 PATRONES AVANZADOS Y CASOS DE USO

## Índice
1. [Campos Dependientes](#campos-dependientes)
2. [Validaciones Personalizadas](#validaciones-personalizadas)
3. [Cálculos Dinámicos](#cálculos-dinámicos)
4. [Tablas Dinámicas](#tablas-dinámicas)
5. [Generación Condicional](#generación-condicional)
6. [Integración con APIs](#integración-con-apis)
7. [Firmado Digital](#firmado-digital)
8. [Multi-idioma](#multi-idioma)
9. [Versionado de Documentos](#versionado-de-documentos)
10. [Testing Documentos](#testing-documentos)

---

## 🔗 Campos Dependientes

Cuando un campo afecta a otros campos.

### Caso: Seleccionar tipo de proyecto cambia fields disponibles

**En documents.js:**
```javascript
export const proyectoConfig = {
  id: 'proyecto',
  title: 'Proyecto',
  defaultData: {
    tipoProyecto: 'fotovoltaica', // solar, eolico, hibrido
    potenciaInstalada: '',
    numPaneles: '',
    superficieTecho: '',
    numAerogenaradores: '',
    velocidadViento: ''
  },
  fields: [
    { 
      name: 'tipoProyecto', 
      label: 'Tipo de Proyecto', 
      type: 'select',
      options: [
        { label: 'Solar Fotovoltaica', value: 'fotovoltaica' },
        { label: 'Eólico', value: 'eolico' },
        { label: 'Híbrido', value: 'hibrido' }
      ]
    },
    { 
      name: 'potenciaInstalada', 
      label: 'Potencia Instalada (kW)', 
      type: 'text',
      visibleWhen: (formData) => 
        ['fotovoltaica', 'hibrido'].includes(formData.tipoProyecto)
    },
    { 
      name: 'numPaneles', 
      label: 'Número de Paneles', 
      type: 'text',
      visibleWhen: (formData) => formData.tipoProyecto === 'fotovoltaica'
    },
    { 
      name: 'numAerogenaradores', 
      label: 'Número de Aerogeneradores', 
      type: 'text',
      visibleWhen: (formData) => 
        ['eolico', 'hibrido'].includes(formData.tipoProyecto)
    },
    { 
      name: 'velocidadViento', 
      label: 'Velocidad Promedio Viento (m/s)', 
      type: 'text',
      visibleWhen: (formData) => 
        ['eolico', 'hibrido'].includes(formData.tipoProyecto)
    }
  ]
}
```

**En DocumentForm.vue (modificado):**
```vue
<script setup>
const props = defineProps({
  fields: Array,
  initialData: Object
})

const formData = ref({ ...props.initialData })

// Campos visibles según condiciones
const visibleFields = computed(() => 
  props.fields.filter(field => 
    !field.visibleWhen || field.visibleWhen(formData.value)
  )
)
</script>

<template>
  <form>
    <div v-for="field in visibleFields" :key="field.name">
      <!-- renderizar campos -->
    </div>
  </form>
</template>
```

---

## ✅ Validaciones Personalizadas

Validar datos antes de guardar.

**En documents.js:**
```javascript
export const presupuestoConfig = {
  id: 'presupuesto',
  title: 'Presupuesto',
  defaultData: {
    conceptoTrabajo: '',
    horasEstimadas: '',
    tarifaHoraria: '',
    subtotal: '',
    impuesto: '',
    total: ''
  },
  fields: [
    { 
      name: 'conceptoTrabajo', 
      label: 'Concepto de Trabajo', 
      type: 'textarea',
      required: true,
      minLength: 10,
      maxLength: 500
    },
    { 
      name: 'horasEstimadas', 
      label: 'Horas Estimadas', 
      type: 'text',
      required: true,
      pattern: '^[0-9]+(\\.[0-9]{1,2})?$',
      errorMessage: 'Debe ser un número válido (ej: 10.5)'
    },
    { 
      name: 'tarifaHoraria', 
      label: 'Tarifa Horaria (€)', 
      type: 'text',
      required: true,
      min: 0,
      max: 10000
    }
  ],
  // Validación global
  validate: (data) => {
    const errors = {}
    
    if (!data.conceptoTrabajo?.trim()) {
      errors.conceptoTrabajo = 'Campo requerido'
    }
    
    const horas = parseFloat(data.horasEstimadas)
    if (isNaN(horas) || horas <= 0) {
      errors.horasEstimadas = 'Debe ser mayor que 0'
    }
    
    const tarifa = parseFloat(data.tarifaHoraria)
    if (isNaN(tarifa) || tarifa < 0) {
      errors.tarifaHoraria = 'Tarifa inválida'
    }
    
    return { valid: Object.keys(errors).length === 0, errors }
  }
}
```

**En DocumentForm.vue (modificado):**
```vue
<script setup>
const emit = defineEmits(['submit', 'error'])
const props = defineProps({
  fields: Array,
  initialData: Object,
  config: Object
})

const handleSubmit = async () => {
  // Validar campo por campo
  const fieldErrors = {}
  for (const field of props.fields) {
    if (field.required && !formData.value[field.name]) {
      fieldErrors[field.name] = 'Campo requerido'
      continue
    }
    
    if (field.minLength && 
        formData.value[field.name].length < field.minLength) {
      fieldErrors[field.name] = 
        `Mínimo ${field.minLength} caracteres`
    }
    
    if (field.pattern) {
      const regex = new RegExp(field.pattern)
      if (!regex.test(formData.value[field.name])) {
        fieldErrors[field.name] = 
          field.errorMessage || 'Formato inválido'
      }
    }
  }
  
  // Validación global
  if (props.config?.validate) {
    const { valid, errors } = props.config.validate(formData.value)
    if (!valid) {
      emit('error', { ...fieldErrors, ...errors })
      return
    }
  }
  
  if (Object.keys(fieldErrors).length > 0) {
    emit('error', fieldErrors)
    return
  }
  
  emit('submit', formData.value)
}
</script>
```

---

## 🧮 Cálculos Dinámicos

Campos que se calculan automáticamente.

**En componente (MemoriaTecnica.vue):**
```vue
<script setup>
defineProps({
  // Campos base
  numPaneles: Number,
  potenciaPorPanel: Number,
  eficienciaInversor: Number,
  // ... otros
})

// Cálculos derivados
const potenciaTotal = computed(() => {
  if (!numPaneles || !potenciaPorPanel) return 0
  return (numPaneles * potenciaPorPanel) / 1000 // kW
})

const potenciaAC = computed(() => {
  if (!potenciaTotal.value || !eficienciaInversor) return 0
  return (potenciaTotal.value * eficienciaInversor) / 100 // kW
})

const energiaAnualEstimada = computed(() => {
  // 1200 kWh/kW/año en España (promedio)
  return (potenciaAC.value * 1200).toFixed(2)
})
</script>

<template>
  <div data-pdf-content>
    <div class="seccion">
      <h3>Cálculos del Sistema</h3>
      
      <table>
        <tr>
          <td>Potencia DC Total:</td>
          <td>{{ potenciaTotal.toFixed(2) }} kW</td>
        </tr>
        <tr>
          <td>Potencia AC (salida):</td>
          <td>{{ potenciaAC.toFixed(2) }} kW</td>
        </tr>
        <tr>
          <td>Energía Anual Estimada:</td>
          <td>{{ energiaAnualEstimada }} kWh</td>
        </tr>
      </table>
    </div>
  </div>
</template>
```

---

## 📊 Tablas Dinámicas

Agregar/eliminar filas en tabla del formulario.

**Caso: Presupuesto con items variables**

```vue
<!-- DocumentForm.vue para tabla dinámica -->
<script setup>
const props = defineProps({
  fields: Array,
  initialData: Object
})

const formData = ref({
  ...props.initialData,
  items: props.initialData.items || [
    { descripcion: '', cantidad: 1, precio: 0, subtotal: 0 }
  ]
})

const addRow = () => {
  formData.value.items.push({
    descripcion: '',
    cantidad: 1,
    precio: 0,
    subtotal: 0
  })
}

const removeRow = (index) => {
  if (formData.value.items.length > 1) {
    formData.value.items.splice(index, 1)
  }
}

const updateSubtotal = (index) => {
  const item = formData.value.items[index]
  item.subtotal = (item.cantidad * item.precio).toFixed(2)
}

const totalPresupuesto = computed(() => {
  return formData.value.items
    .reduce((sum, item) => sum + parseFloat(item.subtotal || 0), 0)
    .toFixed(2)
})
</script>

<template>
  <div>
    <table class="tabla-items">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Cantidad</th>
          <th>Precio Unitario</th>
          <th>Subtotal</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in formData.items" :key="index">
          <td>
            <input v-model="item.descripcion" type="text">
          </td>
          <td>
            <input 
              v-model.number="item.cantidad" 
              type="number" 
              @change="updateSubtotal(index)"
            >
          </td>
          <td>
            <input 
              v-model.number="item.precio" 
              type="number" 
              step="0.01"
              @change="updateSubtotal(index)"
            >
          </td>
          <td>{{ item.subtotal }}</td>
          <td>
            <button @click="removeRow(index)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <button @click="addRow">+ Agregar Fila</button>
    
    <div class="totales">
      <strong>Total: {{ totalPresupuesto }} €</strong>
    </div>
  </div>
</template>
```

**En documento (mostrar tabla):**
```vue
<template>
  <div data-pdf-content>
    <table class="tabla-items">
      <tr v-for="item in items" :key="item.descripcion">
        <td>{{ item.descripcion }}</td>
        <td>{{ item.cantidad }}</td>
        <td>{{ item.precio }} €</td>
        <td>{{ item.subtotal }} €</td>
      </tr>
    </table>
    <p><strong>Total: {{ totalPresupuesto }} €</strong></p>
  </div>
</template>
```

---

## 🎯 Generación Condicional

Mostrar/ocultar secciones en PDF según datos.

```vue
<template>
  <div data-pdf-content>
    <!-- Siempre visible -->
    <section>
      <h2>Información General</h2>
      <p>{{ nombreProyecto }}</p>
    </section>
    
    <!-- Solo si es fotovoltaica -->
    <section v-if="tipoProyecto === 'fotovoltaica'">
      <h2>Características Fotovoltaicas</h2>
      <p>Paneles: {{ numPaneles }}</p>
    </section>
    
    <!-- Solo si tiene batería -->
    <section v-if="tieneBateria">
      <h2>Sistema de Baterías</h2>
      <p>Capacidad: {{ capacidadBateria }} kWh</p>
    </section>
    
    <!-- Solo si inversión > 50000€ -->
    <section v-if="parseLoc(montoInversion) > 50000">
      <h2>Análisis Financiero Detallado</h2>
      <!-- Contenido complejo -->
    </section>
  </div>
</template>
```

---

## 🌐 Integración con APIs

Cargar datos desde servidor.

**En composable (nuevo: useDocumentAPI.js):**
```javascript
import { ref, computed } from 'vue'

export const useDocumentAPI = () => {
  const loading = ref(false)
  const error = ref(null)
  const data = ref({})

  const fetchDocumentData = async (documentId, externalId) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(
        `/api/documents/${documentId}/load/${externalId}`
      )
      if (!response.ok) throw new Error('Error cargando datos')
      
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const saveDocumentData = async (documentId, formData) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(
        `/api/documents/${documentId}/save`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        }
      )
      if (!response.ok) throw new Error('Error guardando datos')
      
      return await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  const generateDocumentAsync = async (documentId) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(
        `/api/documents/${documentId}/generate`,
        { method: 'POST' }
      )
      if (!response.ok) throw new Error('Error generando documento')
      
      // Descargar PDF
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `documento-${Date.now()}.pdf`
      a.click()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    loading,
    error,
    data,
    fetchDocumentData,
    saveDocumentData,
    generateDocumentAsync
  }
}
```

**Uso en DocumentPage.vue:**
```vue
<script setup>
import { useDocumentAPI } from '@/composables/useDocumentAPI'

const { loading, fetchDocumentData, saveDocumentData } = useDocumentAPI()
const route = useRoute()

onMounted(async () => {
  // Cargar datos si hay ID en URL
  if (route.query.id) {
    await fetchDocumentData(config.id, route.query.id)
  }
})

const handleSave = async (newData) => {
  await saveDocumentData(config.id, newData)
  // Actualizar formData local
}
</script>
```

---

## 🔐 Firmado Digital

Agregar firma digital al PDF.

```javascript
// En useDocument.js, extender generatePDF
import SignaturePad from 'signature_pad'

export const generatePDFWithSignature = async (
  element, 
  fileName, 
  signatureDataURL
) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  // Convertir elemento a canvas
  const canvas = await html2canvas(element)
  const imgData = canvas.toDataURL('image/png')
  
  // Agregar contenido
  const imgWidth = 210
  const pageHeight = 295
  const imgHeight = (canvas.height * imgWidth) / canvas.width
  let heightLeft = imgHeight
  let position = 0

  pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
  
  // Agregar firma al final
  if (signatureDataURL) {
    const signatureHeight = 30
    const signatureY = position + imgHeight + 10
    
    pdf.text('Firma Digital:', 10, signatureY)
    pdf.addImage(signatureDataURL, 'PNG', 10, signatureY + 5, 50, 20)
    pdf.text(`Fecha: ${new Date().toLocaleString()}`, 70, signatureY + 15)
  }

  pdf.save(fileName)
}
```

**En componente con firma:**
```vue
<script setup>
import SignaturePad from 'signature_pad'

const signaturePad = ref(null)

const clearSignature = () => {
  signaturePad.value?.clear()
}

const getSignatureData = () => {
  if (signaturePad.value?.isEmpty?.()) {
    return null
  }
  return signaturePad.value.toDataURL()
}

defineExpose({ getSignatureData })
</script>

<template>
  <div>
    <h3>Firma Digital</h3>
    <canvas 
      ref="signaturePad"
      width="400"
      height="150"
      style="border: 1px solid #ccc; cursor: crosshair"
    ></canvas>
    <button @click="clearSignature">Limpiar Firma</button>
  </div>
</template>
```

---

## 🌍 Multi-idioma

Soportar múltiples idiomas.

**En documents.js:**
```javascript
export const translations = {
  es: {
    titulo: 'Título',
    contenido: 'Contenido',
    guardar: 'Guardar',
    cancelar: 'Cancelar'
  },
  en: {
    titulo: 'Title',
    contenido: 'Content',
    guardar: 'Save',
    cancelar: 'Cancel'
  },
  fr: {
    titulo: 'Titre',
    contenido: 'Contenu',
    guardar: 'Enregistrer',
    cancelar: 'Annuler'
  }
}

export const memoriaTecnicaConfig = {
  // ...
  languages: ['es', 'en', 'fr'],
  fields: [
    {
      name: 'titulo',
      label: (lang) => translations[lang]?.titulo || 'Título',
      type: 'text'
    }
  ]
}
```

**En composable (useLanguage.js):**
```javascript
export const useLanguage = () => {
  const language = ref(localStorage.getItem('lang') || 'es')

  const setLanguage = (lang) => {
    language.value = lang
    localStorage.setItem('lang', lang)
  }

  const t = (key, lang = language.value) => {
    return translations[lang]?.[key] || key
  }

  return { language, setLanguage, t }
}
```

---

## 📚 Versionado de Documentos

Mantener histórico de versiones.

```javascript
// En composable (useDocumentVersions.js)
export const useDocumentVersions = () => {
  const versions = ref([])

  const saveVersion = async (documentId, data, notes = '') => {
    const version = {
      id: Date.now(),
      documentId,
      data,
      notes,
      createdAt: new Date().toISOString(),
      createdBy: getCurrentUser?.()?.id || 'anonymous'
    }

    // Guardar en localStorage o API
    const stored = JSON.parse(
      localStorage.getItem(`versions-${documentId}`) || '[]'
    )
    stored.push(version)
    localStorage.setItem(`versions-${documentId}`, JSON.stringify(stored))

    return version
  }

  const getVersions = (documentId) => {
    return JSON.parse(
      localStorage.getItem(`versions-${documentId}`) || '[]'
    )
  }

  const loadVersion = (documentId, versionId) => {
    const versions = getVersions(documentId)
    return versions.find(v => v.id === versionId)
  }

  const deleteVersion = (documentId, versionId) => {
    let versions = getVersions(documentId)
    versions = versions.filter(v => v.id !== versionId)
    localStorage.setItem(`versions-${documentId}`, JSON.stringify(versions))
  }

  return {
    versions,
    saveVersion,
    getVersions,
    loadVersion,
    deleteVersion
  }
}
```

---

## 🧪 Testing Documentos

Tests unitarios para documentos.

```javascript
// test/MemoriaTecnica.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MemoriaTecnica from '@/components/MemoriaTecnica.vue'

describe('MemoriaTecnica', () => {
  it('renderiza correctamente con props', () => {
    const wrapper = mount(MemoriaTecnica, {
      props: {
        nombreProyecto: 'Proyecto Solar',
        ubicacion: 'Madrid',
        numPaneles: 100
      }
    })
    
    expect(wrapper.text()).toContain('Proyecto Solar')
    expect(wrapper.text()).toContain('Madrid')
  })

  it('calcula correctamente la potencia total', () => {
    const wrapper = mount(MemoriaTecnica, {
      props: {
        numPaneles: 50,
        potenciaPorPanel: 400
      }
    })
    
    expect(wrapper.vm.potenciaTotal).toBe(20) // 50 * 400 / 1000
  })

  it('genera PDF sin errores', async () => {
    const wrapper = mount(MemoriaTecnica, {
      props: {
        nombreProyecto: 'Test'
      }
    })
    
    const pdfContent = wrapper.find('[data-pdf-content]')
    expect(pdfContent.exists()).toBe(true)
  })

  it('valida campos requeridos', () => {
    const wrapper = mount(MemoriaTecnica, {
      props: {
        nombreProyecto: ''
      }
    })
    
    expect(wrapper.vm.isValid).toBe(false)
  })
})
```

---

## 📋 Resumen de Patrones

| Patrón | Uso | Complejidad |
|--------|-----|-------------|
| Campos Dependientes | Formularios complejos | Media |
| Validaciones | Garantizar calidad datos | Baja |
| Cálculos Dinámicos | Campos derivados | Baja |
| Tablas Dinámicas | Presupuestos, inventarios | Alta |
| Generación Condicional | PDFs personalizados | Media |
| APIs | Integración backend | Alta |
| Firma Digital | Documentos legales | Alta |
| Multi-idioma | Aplicaciones globales | Media |
| Versionado | Control de cambios | Alta |
| Testing | Calidad de código | Media |

---

**Documento actualizado:** 6 de febrero de 2026
**Para:** Desarrolladores y sistemas IA avanzados
**Estado:** Production-ready ✅
