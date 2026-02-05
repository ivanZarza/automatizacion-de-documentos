# Guía de Integración - Sistema de Generación de Documentos

## Descripción General
Esta guía explica cómo usar el sistema completo de generación y gestión de documentos en Nuxt 4, integrando todos los componentes, composables y estilos para crear un flujo profesional de gestión documental.

## Arquitectura del Sistema

```
App
├── Composable: useDocument
│   ├── Gestiona estados (showModal, showPreview, showEdit)
│   ├── Controlador de acciones (openModal, closeModal, etc.)
│   └── Generador de PDF (generatePDF)
│
├── Componentes
│   ├── DocumentModal (Opciones del documento)
│   ├── DocumentForm (Edición de datos)
│   └── DocumentTemplate (Visualización)
│
└── Página
    ├── Estados: showModal, showPreview, showEdit
    ├── Datos: formData
    └── Flujo: Principal → Modal → Preview/Edit
```

## Flujo de Usuario

```
1. Usuario ve página con botón "Ver Documento"
   ↓
2. Hace clic → Modal aparece con 3 opciones
   ├─ 👁️ Previsualizar
   ├─ ✏️ Editar
   └─ 📄 Generar PDF
   ↓
3. Selecciona acción
   ├─ Previsualizar → Ve documento formateado (Ir al paso 4)
   ├─ Editar → Ve formulario editable (Ir al paso 5)
   └─ Generar PDF → Descarga PDF directamente
   ↓
4. Vista Previsualizar
   ├─ Botón "← Volver" (vuelve a paso 2)
   └─ Botón "Descargar PDF" (genera PDF)
   ↓
5. Vista Editar
   ├─ Formulario con campos
   ├─ Botón "← Volver" (cancela cambios)
   └─ Botón "Guardar" (guarda y muestra preview)
```

## Estructura de Carpetas

```
app/
├── components/
│   ├── DocumentModal.vue          # Modal con opciones
│   ├── DocumentForm.vue           # Formulario editable
│   ├── AutorizacionRepresentacion.vue  # Template específico
│   └── [OtrosDocumentos].vue      # Más templates
│
├── composables/
│   └── useDocument.js             # Lógica de gestión
│
├── pages/
│   ├── index.vue                  # Página principal
│   └── autorizacion-representacion.vue  # Página del documento
│
└── app.vue                        # Root component
```

## Paso 1: Instalación y Setup

### Dependencias Requeridas

```bash
yarn add html2pdf.js jspdf @nuxt/ui tailwindcss
```

### Configurar Tailwind (nuxt.config.ts)

```typescript
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    configPath: '~/tailwind.config.js'
  }
})
```

### Crear composable (app/composables/useDocument.js)

```javascript
import { ref, computed } from 'vue'

export const useDocument = (config = {}) => {
  const showModal = ref(false)
  const showPreview = ref(false)
  const showEdit = ref(false)
  const formData = ref({ ...config.defaultData || {} })

  const openModal = () => {
    showModal.value = true
  }

  const closeModal = () => {
    showModal.value = false
  }

  const previewDocument = () => {
    showModal.value = false
    showPreview.value = true
  }

  const closePreview = () => {
    showPreview.value = false
  }

  const editDocument = () => {
    showModal.value = false
    showEdit.value = true
  }

  const closeEdit = () => {
    showEdit.value = false
  }

  const saveChanges = () => {
    showEdit.value = false
    showPreview.value = true
  }

  const generatePDF = async () => {
    const { default: html2pdf } = await import('html2pdf.js')
    const element = document.querySelector('[data-pdf-content]')
    
    if (element) {
      const opt = {
        margin: 10,
        filename: config.fileName || 'documento.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
      }
      html2pdf().set(opt).from(element).save()
    }
  }

  const getModalOptions = () => {
    const options = []

    if (config.canPreview !== false) {
      options.push({
        id: 'preview',
        label: 'Previsualizar',
        icon: '👁️',
        colorClass: 'bg-blue-500 hover:bg-blue-600',
        action: previewDocument
      })
    }

    if (config.canEdit !== false) {
      options.push({
        id: 'edit',
        label: 'Editar',
        icon: '✏️',
        colorClass: 'bg-yellow-500 hover:bg-yellow-600',
        action: editDocument
      })
    }

    if (config.canGeneratePDF !== false) {
      options.push({
        id: 'pdf',
        label: 'Generar PDF',
        icon: '📄',
        colorClass: 'bg-red-500 hover:bg-red-600',
        action: generatePDF
      })
    }

    return options
  }

  return {
    showModal,
    showPreview,
    showEdit,
    formData,
    openModal,
    closeModal,
    previewDocument,
    closePreview,
    editDocument,
    closeEdit,
    saveChanges,
    generatePDF,
    getModalOptions
  }
}
```

## Paso 2: Crear Componentes Base

### DocumentModal.vue

```vue
<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg shadow-lg p-6 max-w-md w-full mx-4">
      <h2 class="text-xl font-bold mb-4">{{ title }}</h2>
      <div class="space-y-3">
        <button
          v-for="option in options"
          :key="option.id"
          :class="option.colorClass"
          class="w-full py-2 px-4 rounded text-white font-semibold transition"
          @click="option.action"
        >
          {{ option.icon }} {{ option.label }}
        </button>
      </div>
      <button
        @click="$emit('close')"
        class="w-full mt-4 py-2 px-4 rounded bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold"
      >
        Cancelar
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: Boolean,
  title: String,
  options: Array
})

defineEmits(['close'])
</script>
```

### DocumentForm.vue

```vue
<template>
  <form @submit.prevent="submit" class="space-y-4">
    <h2 class="text-xl font-bold mb-6">{{ title }}</h2>
    
    <div class="grid gap-4" :class="columnClasses">
      <div v-for="field in fields" :key="field.name" class="flex flex-col">
        <label class="font-semibold mb-2">{{ field.label }}</label>
        
        <input
          v-if="['text', 'email', 'tel', 'date'].includes(field.type)"
          :type="field.type"
          v-model="localData[field.name]"
          :placeholder="field.placeholder"
          class="border rounded px-3 py-2"
        />
        
        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="localData[field.name]"
          :placeholder="field.placeholder"
          class="border rounded px-3 py-2 h-24"
        />
        
        <select
          v-else-if="field.type === 'select'"
          v-model="localData[field.name]"
          class="border rounded px-3 py-2"
        >
          <option value="">{{ field.placeholder }}</option>
          <option v-for="opt in field.options" :key="opt" :value="opt">
            {{ opt }}
          </option>
        </select>
      </div>
    </div>
    
    <button
      type="submit"
      class="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded"
    >
      {{ submitButtonText }}
    </button>
  </form>
</template>

<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  title: String,
  fields: Array,
  initialData: Object,
  columns: { type: Number, default: 1 },
  submitButtonText: { type: String, default: 'Guardar' }
})

const emit = defineEmits(['submit'])

const localData = ref({ ...props.initialData })

const columnClasses = computed(() => {
  return props.columns === 2 ? 'grid-cols-2' : 'grid-cols-1'
})

watch(() => props.initialData, (newVal) => {
  localData.value = { ...newVal }
}, { deep: true })

const submit = () => {
  emit('submit', localData.value)
}
</script>
```

## Paso 3: Crear Componente de Documento

### AutorizacionRepresentacion.vue (ver documentación específica)

```vue
<template>
  <div data-pdf-content class="max-w-4xl mx-auto p-12 bg-white">
    <div class="border-t-4 border-blue-600 pt-4 pb-8">
      <h1 class="text-2xl font-bold text-center">AUTORIZACIÓN DE REPRESENTACIÓN</h1>
    </div>
    <!-- ... contenido ... -->
  </div>
</template>

<script setup>
defineProps({
  autorizante: String,
  dniAutorizante: String,
  domicilioAutorizante: String,
  representante: String,
  dniRepresentante: String,
  domicilioRepresentante: String,
  organismo: String,
  gestiones: String,
  fecha: String
})
</script>
```

## Paso 4: Crear Página de Documento

### autorizacion-representacion.vue

```vue
<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Modal -->
    <DocumentModal
      :isOpen="showModal"
      title="Autorización de Representación"
      :options="getModalOptions()"
      @close="closeModal"
    />

    <!-- Vista Principal -->
    <div v-if="!showPreview && !showEdit" class="flex items-center justify-center min-h-screen">
      <button
        @click="openModal"
        class="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
      >
        Ver Autorización
      </button>
    </div>

    <!-- Vista Previsualizar -->
    <div v-if="showPreview" class="p-4">
      <button
        @click="closePreview"
        class="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
      >
        ← Volver
      </button>
      <AutorizacionRepresentacion v-bind="formData" />
      <div class="flex gap-4 mt-6 justify-center">
        <button
          @click="generatePDF"
          class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded"
        >
          Descargar PDF
        </button>
      </div>
    </div>

    <!-- Vista Editar -->
    <div v-if="showEdit" class="max-w-2xl mx-auto p-4">
      <button
        @click="closeEdit"
        class="mb-4 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
      >
        ← Volver sin guardar
      </button>
      <DocumentForm
        title="Editar Datos"
        :fields="formFields"
        :initialData="formData"
        :columns="2"
        submitButtonText="Guardar y Previsualizar"
        @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { useDocument } from '@/composables/useDocument'
import DocumentModal from '@/components/DocumentModal.vue'
import DocumentForm from '@/components/DocumentForm.vue'
import AutorizacionRepresentacion from '@/components/AutorizacionRepresentacion.vue'

const documentConfig = {
  defaultData: {
    autorizante: 'Guillermo Cruz Beltrán',
    dniAutorizante: '31.335.276-F',
    domicilioAutorizante: 'DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz',
    representante: 'Solay Ingenieros, S.L.',
    dniRepresentante: 'B09848912',
    domicilioRepresentante: 'Calle Ebro, 35 – 41012, Sevilla, Sevilla',
    organismo: 'Ayuntamiento de Puerto Real (Cádiz)',
    gestiones: 'SOLICITUD DE LICENCIA DE OBRA MENOR para Instalación de Panel Fotovoltaico',
    fecha: new Date().toLocaleDateString('es-ES')
  },
  fileName: 'autorizacion-representacion.pdf'
}

const {
  showModal,
  showPreview,
  showEdit,
  formData,
  openModal,
  closeModal,
  closePreview,
  closeEdit,
  generatePDF,
  getModalOptions
} = useDocument(documentConfig)

const formFields = [
  { name: 'autorizante', label: 'Autorizante', placeholder: 'Nombre completo', type: 'text' },
  { name: 'dniAutorizante', label: 'DNI Autorizante', placeholder: 'XX.XXX.XXX-X', type: 'text' },
  { name: 'domicilioAutorizante', label: 'Domicilio Autorizante', placeholder: 'Dirección completa', type: 'text' },
  { name: 'representante', label: 'Representante', placeholder: 'Nombre o Razón Social', type: 'text' },
  { name: 'dniRepresentante', label: 'DNI/CIF Representante', placeholder: 'XX.XXX.XXX-X', type: 'text' },
  { name: 'domicilioRepresentante', label: 'Domicilio Representante', placeholder: 'Dirección completa', type: 'text' },
  { name: 'organismo', label: 'Organismo', placeholder: 'Ayuntamiento o institución', type: 'text' },
  { name: 'gestiones', label: 'Gestiones Autorizadas', placeholder: 'Descripción de las gestiones', type: 'textarea' },
  { name: 'fecha', label: 'Fecha', placeholder: 'DD/MM/YYYY', type: 'date' }
]

const handleFormSubmit = (newData) => {
  formData.value = newData
  showEdit.value = false
  showPreview.value = true
}
</script>
```

## Paso 5: Crear Página Principal

### index.vue

```vue
<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
    <div class="flex items-center justify-center min-h-screen p-4">
      <div class="max-w-md text-center">
        <h1 class="text-4xl font-bold mb-4 text-gray-800">Generador de Documentos</h1>
        <p class="text-lg text-gray-600 mb-8">Sistema profesional de gestión y generación de documentos PDF</p>
        
        <NuxtLink
          to="/autorizacion-representacion"
          class="inline-block px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg transition"
        >
          Ir a Autorización de Representación →
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
```

## Paso 6: Configurar app.vue

### app.vue

```vue
<template>
  <div>
    <NuxtPage />
  </div>
</template>
```

## Crear Nuevos Tipos de Documentos

### Paso 1: Crear componente template

```bash
cp app/components/AutorizacionRepresentacion.vue app/components/MiNuevoDocumento.vue
```

### Paso 2: Modificar props y template

```vue
<script setup>
defineProps({
  campo1: String,
  campo2: String,
  campo3: String
})
</script>

<template>
  <div data-pdf-content class="max-w-4xl mx-auto p-12">
    <!-- Tu contenido específico -->
  </div>
</template>
```

### Paso 3: Crear página

```bash
mkdir -p app/pages/nuevo-documento
# Copiar estructura de autorizacion-representacion.vue
```

### Paso 4: Adaptar configuración en la página

```javascript
const documentConfig = {
  defaultData: {
    campo1: 'valor1',
    campo2: 'valor2'
    // ... tus campos
  },
  fileName: 'mi-documento.pdf'
}

const formFields = [
  { name: 'campo1', label: 'Campo 1', placeholder: '...', type: 'text' },
  { name: 'campo2', label: 'Campo 2', placeholder: '...', type: 'text' }
  // ... tus campos
]
```

## Estructura de Archivos Final

```
GeneracionDocumentacion/
├── app/
│   ├── components/
│   │   ├── DocumentModal.vue
│   │   ├── DocumentForm.vue
│   │   ├── AutorizacionRepresentacion.vue
│   │   └── [Otros documentos]
│   ├── composables/
│   │   └── useDocument.js
│   ├── pages/
│   │   ├── index.vue
│   │   └── autorizacion-representacion.vue
│   └── app.vue
├── documentacion/
│   ├── DocumentModal.md
│   ├── DocumentForm.md
│   ├── useDocument.md
│   ├── AutorizacionRepresentacion.md
│   └── README.md (este archivo)
├── nuxt.config.ts
├── package.json
├── tailwind.config.js
└── tsconfig.json
```

## Comandos Útiles

### Desarrollo
```bash
yarn dev              # Inicia servidor en localhost:3000
yarn build            # Compila para producción
yarn preview          # Preview de producción
```

### Estructura
```bash
yarn lint             # Valida código
yarn type-check       # Valida tipos TypeScript
```

## Troubleshooting

### "Cannot find module 'html2pdf.js'"
```bash
yarn add html2pdf.js
```

### Documento no genera PDF
- Verifica que el elemento tenga `data-pdf-content`
- Comprueba que html2pdf.js está importado dinámicamente
- Abre la consola del navegador (F12) para ver errores

### Formulario no actualiza documento
- Verifica que los nombres de campos coinciden entre form y componente
- Usa `v-bind` para pasar todos los props: `<MyComponent v-bind="formData" />`

### Estilos no se aplican en PDF
- Usa clases Tailwind en lugar de CSS personalizado
- Inline styles funcionan mejor en PDFs
- Test con `@media print` en navegador antes de PDF

## Mejoras Futuras

1. **Persistencia**: Agregar guardado en base de datos
2. **Templates múltiples**: Sistema de templates dinámicos
3. **Firmas digitales**: Integración de firmas
4. **Autenticación**: Control de acceso por usuario
5. **Historial**: Registro de documentos generados
6. **Versiones**: Control de versiones de documentos

## Recursos Adicionales

- [Documentación DocumentModal.md](./DocumentModal.md)
- [Documentación DocumentForm.md](./DocumentForm.md)
- [Documentación useDocument.md](./useDocument.md)
- [Documentación AutorizacionRepresentacion.md](./AutorizacionRepresentacion.md)
- [Vue 3 Docs](https://vuejs.org)
- [Nuxt 4 Docs](https://nuxt.com)
- [Tailwind CSS](https://tailwindcss.com)
- [html2pdf.js](https://ekoopmans.github.io/html2pdf.js/)
