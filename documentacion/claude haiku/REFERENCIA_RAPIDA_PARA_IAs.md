# ⚡ REFERENCIA RÁPIDA PARA IAs - CREAR DOCUMENTOS PDF

> Este archivo está diseñado para que cualquier IA pueda crear un nuevo documento PDF rápidamente sin leer toda la documentación.

---

## 🚀 LOS 5 PASOS (en 2 minutos)

### 1. Crear Componente Vue
**Archivo:** `app/components/MiDocumento.vue`

```vue
<template>
  <div data-pdf-content class="contenedor">
    <!-- Tu HTML aquí -->
    <h1>{{ titulo }}</h1>
    <p>{{ contenido }}</p>
  </div>
</template>

<script setup>
defineProps({
  titulo: String,
  contenido: String,
  generatedDate: String
})
</script>

<style scoped>
.contenedor { padding: 20px; }
@media print {
  * { print-color-adjust: exact; }
}
</style>
```

### 2. Agregar a documents.js

```javascript
export const miDocumentoConfig = {
  id: 'mi-documento',
  title: 'Mi Documento',
  description: 'Descripción corta',
  route: '/mi-documento',
  fileName: 'mi-documento.pdf',
  
  defaultData: {
    titulo: 'Valor por defecto',
    contenido: 'Contenido por defecto'
  },
  
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', fullWidth: true },
    { name: 'contenido', label: 'Contenido', type: 'textarea', rows: 4, fullWidth: true }
  ],
  
  capabilities: { canPreview: true, canEdit: true, canGeneratePDF: true }
}

// Al final del archivo, agregar a documentConfigs:
export const documentConfigs = {
  // ... otros documentos ...
  miDocumento: miDocumentoConfig
}
```

### 3. Crear página
**Archivo:** `app/pages/mi-documento.vue`

```vue
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MiDocumento from '../components/MiDocumento.vue'
import { miDocumentoConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="miDocumentoConfig" :documentComponent="MiDocumento" />
</template>
```

### 4. ¡Listo!
El documento aparecerá en `http://localhost:3000`

---

## 🎨 COLORES CORPORATIVOS SOLAY

```css
#FFA02A   /* Naranja principal - encabezados */
#FFCC99   /* Naranja medio - subsecciones */
#FFD9B3   /* Naranja claro - acentos */
```

---

## 📋 TIPOS DE CAMPOS

| Tipo | Código |
|------|--------|
| Texto | `{ name: 'x', type: 'text' }` |
| Email | `{ name: 'x', type: 'email' }` |
| Teléfono | `{ name: 'x', type: 'tel' }` |
| Multilinea | `{ name: 'x', type: 'textarea', rows: 4 }` |
| Fecha | `{ name: 'x', type: 'date' }` |
| Desplegable | `{ name: 'x', type: 'select', options: ['A', 'B'] }` |
| Archivo | `{ name: 'x', type: 'file', accept: 'image/*' }` |

---

## ⚙️ ESTRUCTURA CRÍTICA

```
DEBE COINCIDIR EXACTAMENTE:
- documents.js: { name: 'miCampo', ... }
- MiDocumento.vue: defineProps({ miCampo: String })
- MiDocumento.vue: {{ miCampo }}
- documents.js defaultData: { miCampo: 'valor' }
```

---

## 🔍 VERIFICAR QUE FUNCIONA

```bash
cd GeneracionDocumentacion
yarn dev
# Abre http://localhost:3000
# Haz clic en "Mi Documento"
# Preview ✓
# Editar y cambiar valores ✓
# Descargar PDF ✓
```

---

## ❌ ERRORES COMUNES

| Error | Causa | Solución |
|-------|-------|----------|
| Documento no aparece | No está en `documentConfigs` | Agregar a final de documents.js |
| Campos vacíos en PDF | `name` no coincide con prop | Verificar que sean exactamente iguales |
| Sin colores en PDF | CSS no tiene `@media print` | Agregar `print-color-adjust: exact` |
| Tabla cortada en PDF | Sin `page-break-inside: avoid` | Agregar en CSS |

---

## 📌 DEBE TENER SIEMPRE

✅ `data-pdf-content` en el div principal (MiDocumento.vue)
✅ `generatedDate: String` en los props
✅ Todos los campos en `defaultData` (documents.js)
✅ `@media print` con `print-color-adjust: exact` (CSS)
✅ El documento registrado en `documentConfigs` (documents.js)

---

## 🎯 TEMPLATE RÁPIDO PARA COPIAR

### MiDocumento.vue
```vue
<template>
  <div data-pdf-content class="contenedor">
    <div class="encabezado">
      <h1>{{ titulo }}</h1>
    </div>
    <div class="seccion">
      <h2>Información</h2>
      <p>{{ contenido }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  titulo: String,
  contenido: String,
  generatedDate: String
})
</script>

<style scoped>
.contenedor { padding: 30px; font-family: Arial; }
.encabezado h1 { color: #FFA02A; }
.seccion h2 { background-color: #FFCC99; color: white; padding: 8px; }
@media print { * { print-color-adjust: exact; } }
</style>
```

### documents.js
```javascript
export const miDocConfig = {
  id: 'mi-doc',
  title: 'Mi Documento',
  description: 'Desc',
  route: '/mi-doc',
  fileName: 'mi-doc.pdf',
  defaultData: { titulo: 'Título', contenido: 'Contenido' },
  fields: [
    { name: 'titulo', label: 'Título', type: 'text', fullWidth: true },
    { name: 'contenido', label: 'Contenido', type: 'textarea', rows: 3, fullWidth: true }
  ],
  capabilities: { canPreview: true, canEdit: true, canGeneratePDF: true }
}
```

### mi-doc.vue
```vue
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MiDoc from '../components/MiDoc.vue'
import { miDocConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="miDocConfig" :documentComponent="MiDoc" />
</template>
```

---

## 📞 SOPORTE RÁPIDO PARA IAs

**Cuando le digas a otra IA "crea un nuevo documento":**

1. Proporciona un nombre único (ej: "Contrato de Servicios")
2. Pasa la estructura de datos que necesita (campos)
3. Describe el diseño visual (encabezados, secciones)
4. Haz que siga los 5 pasos exactamente
5. Verifica que coincidan nombre/prop/defaultData

**Pregunta clave de verificación:**
"¿El `name` en `fields` de documents.js coincide exactamente con el nombre del prop en defineProps()?"

Si la respuesta es SÍ → Funcionará.
Si la respuesta es NO → No funcionará.

---

## 🎉 ¡LISTO PARA ESCALAR!

Este sistema está diseñado para agregar documentos infinitos sin tocar la lógica central.

**Próximos documentos sugeridos:**
- Contrato de Servicios
- Acta de Reunión
- Presupuesto
- Certificado
- Factura
- Reporte de Inspección

Usa esta guía como referencia para IAs futuras. 🚀
