# 🏛️ ARQUITECTURA TÉCNICA DEL SISTEMA DE DOCUMENTOS PDF

## Descripción General

Sistema modular Vue.js 3 + Nuxt 4 para generar documentos PDF dinámicos con formularios editables. Diseñado para ser escalable y mantenible.

---

## 📊 DIAGRAMA GENERAL

```
┌─────────────────────────────────────────────────────────────────┐
│                    USUARIO EN NAVEGADOR                         │
└──────────────────────┬──────────────────────────────────────────┘
                       │
                       ▼
        ┌──────────────────────────────────────┐
        │      index.vue                       │
        │  (Listado de documentos disponibles) │
        │  getAllDocuments() de documents.js   │
        └──────────────────┬───────────────────┘
                           │
               ┌───────────┴───────────┐
               ▼                       ▼
    ┌────────────────────┐  ┌────────────────────┐
    │ memoria-tecnica.vue │  │acta-reunion.vue... │
    │   (página 1)       │  │   (página 2)       │
    └──────────┬─────────┘  └────────┬───────────┘
               │                     │
               └──────────┬──────────┘
                          ▼
        ┌─────────────────────────────────────┐
        │  DocumentPage.vue (GENÉRICO)        │
        │                                     │
        │ ├─ showPreview / showEdit           │
        │ ├─ useDocument() composable         │
        │ ├─ DocumentForm.vue (si showEdit)   │
        │ └─ Componente documento (si preview)│
        └──────────┬────────────────────────┘
                   │
        ┌──────────┴──────────┐
        ▼                     ▼
   ┌─────────────┐   ┌──────────────────┐
   │DocumentForm │   │MemoriaTecnica.vue│
   │  (editar)   │   │(preview/PDF)     │
   └─────────────┘   └──────────────────┘
                     (con data-pdf-content)
```

---

## 🗂️ ESTRUCTURA DE CARPETAS DETALLADA

```
app/
├── components/
│   ├── DocumentPage.vue              ⭐ GENÉRICO
│   │   ├─ Estados: showPreview, showEdit, showModal
│   │   ├─ useDocument() composable
│   │   ├─ Renderiza DocumentForm O componente documento
│   │   └─ Botones: Preview, Edit, PDF, Volver
│   │
│   ├── DocumentForm.vue              ⭐ GENÉRICO
│   │   ├─ Props: fields[], initialData
│   │   ├─ Itera fields y crea inputs dinámicos
│   │   ├─ Tipos: text, email, textarea, select, date, file
│   │   ├─ v-model con formData reactivo
│   │   └─ Emit: @submit con datos actualizados
│   │
│   ├── Boton.vue                     ⭐ GENÉRICO
│   │   ├─ Props: variant (primary, secondary, success)
│   │   └─ Estilos consistentes Tailwind
│   │
│   ├── MemoriaTecnica.vue            📄 DOCUMENTO
│   │   ├─ Props: 200+ campos individuales
│   │   ├─ Estructura: 9 secciones (A-I) + subsecciones
│   │   ├─ Estilos: Colores corporativos (#FFA02A)
│   │   └─ CSS print: page-break-inside: avoid
│   │
│   ├── AutorizacionRepresentacion.vue 📄 DOCUMENTO
│   │   └─ Similar a MemoriaTecnica pero más simple
│   │
│   └── [TuDocumento].vue             📄 DOCUMENTO
│       ├─ defineProps({ campo1, campo2, ... })
│       ├─ <div data-pdf-content> OBLIGATORIO
│       └─ Estilos con @media print
│
├── pages/
│   ├── index.vue                     🏠 PRINCIPAL
│   │   ├─ Importa getAllDocuments()
│   │   ├─ Loop v-for sobre documentos
│   │   └─ Links a cada ruta
│   │
│   ├── memoria-tecnica.vue           📄 PÁGINA DOCUMENTO
│   │   ├─ Import DocumentPage
│   │   ├─ Import MemoriaTecnica component
│   │   ├─ Import memoriaTecnicaConfig
│   │   └─ <DocumentPage :config :documentComponent />
│   │
│   └── [tu-documento].vue            📄 PÁGINA DOCUMENTO
│       └─ Mismo patrón que memoria-tecnica.vue
│
├── config/
│   ├── documents.js                  ⭐ CENTRAL
│   │   ├─ memoriaTecnicaConfig
│   │   │  ├─ id, title, description, route, fileName
│   │   │  ├─ defaultData: { campo1: 'valor', ... }
│   │   │  ├─ fields: [ { name, label, type, ... }, ... ]
│   │   │  └─ capabilities: { canPreview, canEdit, canGeneratePDF }
│   │   │
│   │   ├─ autorizacionRepresentacionConfig
│   │   ├─ [tuDocumentoConfig]
│   │   │
│   │   ├─ export documentConfigs = { ... }
│   │   ├─ export getDocumentConfig(id)
│   │   └─ export getAllDocuments()
│   │
│   └── (otras configuraciones)
│
├── composables/
│   ├── useDocument.js                ⭐ LÓGICA REUTILIZABLE
│   │   ├─ showPreview, showEdit, formData (refs)
│   │   ├─ previewDocument()
│   │   ├─ editDocument()
│   │   ├─ saveChanges()
│   │   ├─ generatePDF()
│   │   └─ closePreview(), closeEdit()
│   │
│   └── (otros composables)
│
└── app.vue                           🎬 ROOT
    └─ <NuxtPage />
```

---

## 🔄 FLUJO DE DATOS Y CICLO DE VIDA

### 1️⃣ CARGA INICIAL (User abre página)

```
User abre http://localhost:3000/mtd-instalacion-autoconsumo-monofasica-con-bateria
     ↓
mtd-instalacion-autoconsumo-monofasica-con-bateria.vue carga
     ↓
Importa: DocumentPage, MemoriaTecnica, memoriaTecnicaConfig
     ↓
DocumentPage carga con props:
  - config: { defaultData, fields, ... }
  - documentComponent: MemoriaTecnica
     ↓
useDocument() composable:
  - formData = { ...config.defaultData }
  - showPreview = true (previewDocument() automático)
     ↓
MemoriaTecnica renderiza con v-bind="formData"
     ↓
HTML con data-pdf-content listo para PDF
```

### 2️⃣ USUARIO HACE CLIC EN "EDITAR"

```
User hace clic botón "Editar"
     ↓
editDocument() activa showEdit = true
     ↓
DocumentForm renderiza con:
  - :fields="config.fields"
  - :initialData="formData"
     ↓
DocumentForm itera fields y crea inputs:
  - v-model="formData[field.name]"
  - Cada input atualiza formData reactivamente
```

### 3️⃣ USUARIO GUARDAR CAMBIOS

```
User hace clic "Guardar"
     ↓
DocumentForm emite @submit con newData
     ↓
DocumentPage recibe el evento:
  - formData.value = newData
  - saveChanges()
  - showEdit = false
  - showPreview = true
     ↓
MemoriaTecnica se re-renderiza con datos nuevos
```

### 4️⃣ USUARIO DESCARGA PDF

```
User hace clic "Descargar PDF"
     ↓
generatePDF() ejecuta:
  - Encuentra elemento con [data-pdf-content]
  - html2pdf.js lo convierte a PDF
  - Descarga con nombre de config.fileName
     ↓
PDF generado ✓
```

---

## 💾 MANEJO DE DATOS

### defaultData
```javascript
// TODOS los campos que aparecen en el PDF
defaultData: {
  campo1: 'valor por defecto',
  campo2: 'otro valor',
  campoNoEditable: 'solo lectura en PDF'
}
```

**Características:**
- ✅ Siempre presente en PDF
- ✅ Valor inicial en formulario
- ✅ Puede estar o NO en fields

### fields
```javascript
// SOLO campos editables en formulario
fields: [
  { name: 'campo1', label: '...', type: 'text', ... },
  { name: 'campo2', label: '...', type: 'textarea', ... },
  // campo3 NO está aquí = no editable, solo lectura
]
```

**Características:**
- ✅ Define qué es editable
- ✅ DEBE estar en defaultData
- ✅ name DEBE coincidir con prop del componente

### Sincronización
```
documents.js                MemoriaTecnica.vue
├─ defaultData             defineProps({
│  ├─ campo1 ────────────────> campo1: String
│  ├─ campo2 ────────────────> campo2: String
│  └─ campo3 ─────────┐ (no prop = no se usa)
│                     │
└─ fields            ├────> v-model en formulario
   ├─ { name: 'campo1' }
   ├─ { name: 'campo2' }
   └─ (campo3 no está = no editable)
```

---

## 🎨 GENERACIÓN DE PDF

### Proceso
```
<div data-pdf-content>
  Elemento HTML con contenido renderizado
</div>
     ↓ (user hace clic PDF)
html2pdf.js detecta [data-pdf-content]
     ↓
Convierte HTML a Canvas
     ↓
Convierte Canvas a PDF
     ↓
jsPDF gestiona descarga
     ↓
Descarga: config.fileName
```

### CSS para PDF
```css
@media print {
  /* Crítico para que colores aparezcan */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  /* No cortar secciones/tablas */
  .seccion {
    page-break-inside: avoid;
  }
  
  table {
    page-break-inside: avoid;
  }
}
```

---

## 🧩 COMPONENTES GENÉRICOS (NO MODIFICAR)

### DocumentPage.vue
**Responsabilidad:** Orquestar la interfaz de usuario

```javascript
Props: {
  config: Object,           // Configuración del documento
  documentComponent: Object // Componente específico a renderizar
}

Estados:
- showPreview: boolean
- showEdit: boolean
- showModal: boolean
- formData: Object (ref)

Métodos:
- previewDocument()
- editDocument()
- closePreview()
- closeEdit()
- saveChanges()
- generatePDF()
```

### DocumentForm.vue
**Responsabilidad:** Renderizar formulario dinámico

```javascript
Props: {
  title: String,
  fields: Array,           // Array de configuraciones de campo
  initialData: Object      // Datos iniciales
}

Emite: @submit(newData)

Campos soportados:
- text, email, tel
- textarea (con rows)
- date
- select (con options)
- file (con accept)
```

### useDocument.js
**Responsabilidad:** Gestionar estado y lógica

```javascript
Parámetros: {
  defaultData: Object
  fileName: String
  canPreview, canEdit, canGeneratePDF: Boolean
}

Retorna:
- showPreview, showEdit, formData (refs)
- previewDocument()
- editDocument()
- closePreview()
- closeEdit()
- saveChanges()
- generatePDF()
```

---

## 📝 CREAR NUEVO DOCUMENTO

### 5 Pasos Mínimos

1. **Componente** (`app/components/MiDoc.vue`)
   - defineProps() con todos los campos
   - <div data-pdf-content>
   - CSS con @media print

2. **Configuración** (agregar a `documents.js`)
   - miDocConfig con id, defaultData, fields
   - Agregar a documentConfigs

3. **Página** (`app/pages/mi-doc.vue`)
   - Import DocumentPage, MiDoc, miDocConfig
   - <DocumentPage :config :documentComponent />

4. **Verificar**
   - Nombres coinciden
   - defaultData tiene todos los campos
   - fields son editables
   - documentConfigs actualizado

5. **Probar**
   - yarn dev
   - Probar preview, edición, PDF

---

## 🔒 VALIDACIONES Y RESTRICCIONES

**DEBE cumplir:**
- ✅ Cada campo en `fields` debe estar en `defaultData`
- ✅ Cada field.name debe ser prop en componente
- ✅ <div data-pdf-content> en componente
- ✅ @media print en CSS
- ✅ Documento registrado en documentConfigs

**NUNCA:**
- ❌ Modificar DocumentPage.vue (es genérico)
- ❌ Modificar DocumentForm.vue (es genérico)
- ❌ Agregar lógica al formulario (va en composable)
- ❌ Uso de CSS global sin @media print

---

## 📊 EJEMPLO COMPLETO SINCRONIZADO

### documents.js
```javascript
export const ejemploConfig = {
  id: 'ejemplo',
  title: 'Ejemplo',
  defaultData: {
    titulo: 'Título',
    contenido: 'Contenido'
  },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text' },
    { name: 'contenido', label: 'Contenido', type: 'textarea' }
  ]
}
```

### Ejemplo.vue (componente)
```vue
<script setup>
defineProps({
  titulo: String,        // ← Coincide con field.name
  contenido: String,     // ← Coincide con field.name
  generatedDate: String  // ← Siempre necesario
})
</script>

<template>
  <div data-pdf-content>
    <h1>{{ titulo }}</h1>
    <p>{{ contenido }}</p>
  </div>
</template>
```

### ejemplo.vue (página)
```vue
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import Ejemplo from '../components/Ejemplo.vue'
import { ejemploConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="ejemploConfig" :documentComponent="Ejemplo" />
</template>
```

✅ **Todos los campos sincronizados:**
- documents.js defaultData ✓
- documents.js fields ✓
- Ejemplo.vue props ✓
- ejemplo.vue importa config ✓

---

## 🚀 ESCALABILIDAD

El sistema soporta:
- ✅ Documentos ilimitados
- ✅ Campos ilimitados por documento
- ✅ Tipos de campo personalizables (agregando a DocumentForm)
- ✅ Validaciones (agregando lógica a fields)
- ✅ Generación en batch (agregando endpoint API)

---

## 🛠️ MANTENIMIENTO

### Agregar nuevo tipo de campo

1. Editar `DocumentForm.vue`
2. Agregar bloque `v-else-if="field.type === 'nuevoTipo'"`
3. Usar en fields como `type: 'nuevoTipo'`

### Cambiar estilos globales

1. Editar `app.vue` o CSS global
2. NO afecta documentos específicos (scoped)
3. O editar estilos en cada documento

### Actualizar colores corporativos

1. Cambiar valores en documents.js
2. O en cada componente documento
3. O crear variable CSS global

---

## 📞 REFERENCIA RÁPIDA

| Necesidad | Dónde | Qué hacer |
|-----------|-------|----------|
| Nuevo campo editable | documents.js | Agregar a fields |
| Campo solo lectura | documents.js | Agregar a defaultData, NO a fields |
| Nuevo tipo de input | DocumentForm.vue | Agregar v-else-if |
| Nuevo documento | 5 pasos | Ver "Crear nuevo documento" |
| Cambiar estilos PDF | Componente | Agregar @media print |
| Corregir nombre campo | Sincronizar 3 lugares | defaultData, fields, props |

---

## ✅ CHECKLIST DE RELEASE

- [ ] Todos los campos en defaultData
- [ ] Todos los fields tienen name único
- [ ] Nombres coinciden en 3 lugares (defaultData, fields, props)
- [ ] Componente tiene <div data-pdf-content>
- [ ] CSS tiene @media print con print-color-adjust
- [ ] Documento registrado en documentConfigs
- [ ] Página crea correctamente
- [ ] Preview funciona
- [ ] Edición funciona
- [ ] PDF descarga sin errores
- [ ] Colores aparecen en PDF
- [ ] Tablas/secciones no se cortan

---

**Documento actualizado:** 6 de febrero de 2026
**Sistema:** Vue.js 3 + Nuxt 4
**Estado:** Production-ready ✅
