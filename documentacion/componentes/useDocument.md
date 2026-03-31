# Documentación - useDocument.js

## Descripción General
`useDocument.js` es un composable de Vue 3 que centraliza la lógica de gestión de documentos. Proporciona funciones para abrir/cerrar modales, previsualizar, editar, guardar cambios y generar PDFs. Diseñado para ser reutilizable en cualquier tipo de documento.

## Ubicación
`app/composables/useDocument.js`

## Características
- ✅ Gestión centralizada de estados del documento
- ✅ Control de modal, preview y edición
- ✅ Generación de PDF con html2pdf.js
- ✅ Configuración flexible según el documento
- ✅ Opciones dinámicas basadas en configuración
- ✅ Fácil de reutilizar en múltiples páginas

## Importación

```javascript
import { useDocument } from '@/composables/useDocument'
```

## Uso Básico

```javascript
const documentConfig = {
  defaultData: {
    // Datos iniciales del documento
    autorizante: 'Guillermo Cruz Beltrán',
    dniAutorizante: '31.335.276-F'
    // ... más campos
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
  closeModal,
  previewDocument,
  closePreview,
  editDocument,
  closeEdit,
  saveChanges,
  generatePDF,
  getModalOptions
} = useDocument(documentConfig)
```

## Parámetro de Configuración: `documentConfig`

### Estructura de `documentConfig`

```javascript
{
  defaultData: Object,      // (Requerido) Datos iniciales del documento
  fileName: String,         // (Opcional) Nombre del archivo PDF
  canPreview: Boolean,      // (Opcional) Mostrar opción previsualizar (default: true)
  canEdit: Boolean,         // (Opcional) Mostrar opción editar (default: true)
  canGeneratePDF: Boolean   // (Opcional) Mostrar opción PDF (default: true)
}
```

### `defaultData` (Requerido)
Objeto con los datos iniciales del documento. Las claves se usarán en el formulario.

**Ejemplo:**
```javascript
defaultData: {
  autorizante: 'Guillermo Cruz Beltrán',
  dniAutorizante: '31.335.276-F',
  domicilioAutorizante: 'DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz',
  representante: 'Solay Ingenieros, S.L.',
  dniRepresentante: 'B09848912',
  domicilioRepresentante: 'Calle Ebro, 35 – 41012, Sevilla, Sevilla',
  organismo: 'Ayuntamiento de Puerto Real (Cádiz)',
  gestiones: 'SOLICITUD DE LICENCIA DE OBRA MENOR...',
  fecha: '18/11/2025'
}
```

### `fileName` (Opcional)
Nombre del archivo PDF que se generará. Si no se especifica, usa 'documento.pdf'.

**Valor por defecto:** `'documento.pdf'`  
**Ejemplo:**
```javascript
fileName: 'autorizacion-representacion.pdf'
```

### `canPreview`, `canEdit`, `canGeneratePDF` (Opcionales)
Booleanos que controlan qué opciones se muestran en el modal. Permite personalizar qué acciones están disponibles para cada documento.

**Valor por defecto:** `true` (todas las opciones habilitadas)  
**Ejemplo:**
```javascript
documentConfig: {
  // Este documento solo permite previsualizar y editar, no generar PDF
  canPreview: true,
  canEdit: true,
  canGeneratePDF: false
}
```

## Estados Reactivos

### `showModal` (ref)
Controla si el modal está visible.

**Tipo:** `Boolean`  
**Valor inicial:** `false`  
**Uso:**
```vue
<DocumentModal :isOpen="showModal" />
```

### `showPreview` (ref)
Controla si se muestra la vista previa del documento.

**Tipo:** `Boolean`  
**Valor inicial:** `false`  
**Uso:**
```vue
<div v-if="showPreview">
  <!-- Vista previa del documento -->
</div>
```

### `showEdit` (ref)
Controla si se muestra el formulario de edición.

**Tipo:** `Boolean`  
**Valor inicial:** `false`  
**Uso:**
```vue
<div v-if="showEdit">
  <!-- Formulario de edición -->
</div>
```

### `formData` (ref)
Objeto con los datos actuales del documento. Se actualiza cuando el usuario edita el formulario.

**Tipo:** `Object`  
**Valor inicial:** Copia de `documentConfig.defaultData`  
**Uso:**
```vue
<MyComponent v-bind="formData" />
```

## Métodos Retornados

### `openModal()`
Abre el modal de opciones.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Ejemplo:**
```javascript
const handleClick = () => {
  openModal()
}
```

### `closeModal()`
Cierra el modal de opciones.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Ejemplo:**
```javascript
const handleCancel = () => {
  closeModal()
}
```

### `previewDocument()`
Cierra el modal y muestra la vista previa del documento.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Ejemplo:**
```javascript
// Se llama automáticamente desde las opciones del modal
```

### `closePreview()`
Cierra la vista previa y vuelve a la pantalla principal.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Ejemplo:**
```vue
<button @click="closePreview">← Volver</button>
```

### `editDocument()`
Cierra el modal y muestra el formulario de edición.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Ejemplo:**
```javascript
// Se llama automáticamente desde las opciones del modal
```

### `closeEdit()`
Cierra el formulario de edición sin guardar cambios.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Ejemplo:**
```vue
<button @click="closeEdit">← Volver sin guardar</button>
```

### `saveChanges()`
Guarda los cambios del formulario y muestra la vista previa.

**Parámetros:** ninguno  
**Retorna:** ninguno  
**Uso Típico:** Se llama desde el evento `@submit` del componente `DocumentForm`

**Ejemplo:**
```javascript
const handleFormSubmit = (newData) => {
  formData.value = newData
  saveChanges()
}
```

### `generatePDF()` (Async)
Genera un PDF del documento y lo descarga automáticamente.

**Parámetros:** ninguno  
**Retorna:** Promise (async)  
**Dependencias:** html2pdf.js instalado y disponible  
**Ejemplo:**
```javascript
const handleGeneratePDF = async () => {
  await generatePDF()
}
```

**Requisitos:**
- El elemento del documento debe tener el atributo `data-pdf-content`
- html2pdf.js debe estar instalado: `yarn add html2pdf.js`

### `getModalOptions()`
Retorna un array de opciones para el modal basado en la configuración.

**Parámetros:** ninguno  
**Retorna:** `Array` de opciones del modal  
**Estructura de cada opción:**
```javascript
{
  id: 'preview',
  label: 'Previsualizar',
  icon: '👁️',
  colorClass: 'bg-blue-500 hover:bg-blue-600',
  action: previewDocument // Función enlazada
}
```

**Ejemplo:**
```vue
<DocumentModal 
  :isOpen="showModal"
  :options="getModalOptions()"
/>
```

## Ejemplo Completo de Implementación

```vue
<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <!-- Modal -->
    <DocumentModal 
      :isOpen="showModal"
      title="Mi Documento"
      :options="getModalOptions()"
      @close="closeModal"
    />

    <!-- Vista Principal -->
    <div v-if="!showPreview && !showEdit">
      <button @click="openModal">Abrir Documento</button>
    </div>

    <!-- Vista Previa -->
    <div v-if="showPreview">
      <button @click="closePreview">← Volver</button>
      <MyDocumentComponent v-bind="formData" />
    </div>

    <!-- Vista Editar -->
    <div v-if="showEdit">
      <button @click="closeEdit">← Volver</button>
      <DocumentForm 
        :fields="formFields"
        :initialData="formData"
        @submit="handleFormSubmit"
      />
    </div>
  </div>
</template>

<script setup>
import { useDocument } from '@/composables/useDocument'
import DocumentModal from '@/components/DocumentModal.vue'
import DocumentForm from '@/components/DocumentForm.vue'
import MyDocumentComponent from '@/components/MyDocumentComponent.vue'

const documentConfig = {
  defaultData: {
    campo1: 'valor1',
    campo2: 'valor2'
  },
  fileName: 'mi-documento.pdf',
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
  closeModal,
  closePreview,
  closeEdit,
  saveChanges,
  getModalOptions
} = useDocument(documentConfig)

const formFields = [
  { name: 'campo1', label: 'Campo 1', placeholder: 'Ingrese valor', type: 'text' },
  { name: 'campo2', label: 'Campo 2', placeholder: 'Ingrese valor', type: 'text' }
]

const handleFormSubmit = (newData) => {
  formData.value = newData
  saveChanges()
}
</script>
```

## Casos de Uso

1. **Documentos administrativos** - Autorización, certificados, etc.
2. **Formularios complejos** - Registros, solicitudes, etc.
3. **Generación de reportes** - Exportar a PDF

## Ventajas

- Código centralizado y reutilizable
- Lógica separada de la presentación (separation of concerns)
- Fácil de mantener y extender
- Estados reactivos automáticos
- Integración perfecta con componentes de Vue 3

## Notas Importantes

- El composable **no persiste datos** automáticamente; implementa guardado según necesidad
- Para generar PDF, asegúrate de que el elemento tiene `data-pdf-content`
- La generación de PDF requiere html2pdf.js instalado
- Los estados se reinician cada vez que se importa el composable
