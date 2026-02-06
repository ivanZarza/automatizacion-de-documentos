# 📚 GUÍA COMPLETA: CREAR NUEVOS DOCUMENTOS PDF

## Introducción

Esta guía está diseñada para que cualquier IA o desarrollador pueda crear nuevos documentos PDF en el sistema de manera rápida y consistente. El sistema está completamente modularizado siguiendo el patrón **componentes Vue.js + configuración centralizada**.

---

## 🏗️ ARQUITECTURA DEL SISTEMA

### Estructura de Carpetas

```
GeneracionDocumentacion/
├── app/
│   ├── components/                    # Componentes reutilizables
│   │   ├── MemoriaTecnica.vue        # Ejemplo: documento técnico
│   │   ├── AutorizacionRepresentacion.vue  # Ejemplo: documento simple
│   │   ├── DocumentPage.vue           # ⭐ GENÉRICO - Maneja preview/edit/PDF
│   │   ├── DocumentForm.vue           # ⭐ GENÉRICO - Formulario inteligente
│   │   └── Boton.vue                  # Componente UI reutilizable
│   ├── pages/
│   │   ├── index.vue                  # Página principal (listado de documentos)
│   │   ├── memoria-tecnica.vue        # Página específica del documento
│   │   └── autorizacion-representacion.vue
│   ├── config/
│   │   ├── documents.js               # ⭐ CENTRAL - Configuración de todos los documentos
│   │   └── ... (otras configuraciones)
│   └── composables/
│       └── useDocument.js             # Lógica reutilizable de gestión
├── public/                            # Assets estáticos (imágenes, logos)
└── package.json                       # Dependencias (html2pdf, jspdf, etc.)
```

### Componentes GENÉRICOS (NO modificar)

1. **DocumentPage.vue**: Renderiza preview, formulario y descarga PDF
2. **DocumentForm.vue**: Genera formularios dinámicos basados en configuración
3. **Boton.vue**: Componente UI consistente

⚠️ **Estas son tuberías inteligentes. Tu solo defines datos y estructura.**

---

## 📋 FLUJO DE CREACIÓN DE DOCUMENTO (5 PASOS)

### Paso 1️⃣: Crear el Componente de Documento

**Archivo:** `app/components/MiDocumento.vue`

```vue
<template>
  <div data-pdf-content class="contenedor-principal">
    <!-- Tu contenido HTML aquí -->
    <!-- Este div es CRÍTICO para la generación de PDF -->
    
    <div class="encabezado">
      <h1 class="titulo">{{ titulo }}</h1>
    </div>

    <div class="cuerpo">
      <section class="seccion">
        <h2>Sección 1</h2>
        <p>{{ campo1 }}</p>
      </section>
      
      <section class="seccion">
        <h2>Sección 2</h2>
        <p>{{ campo2 }}</p>
      </section>
    </div>
  </div>
</template>

<script setup>
// IMPORTANTE: Todos los props son automáticos basados en documents.js
defineProps({
  // Props que vienen del formulario
  titulo: String,
  campo1: String,
  campo2: String,
  // ... agregar TODOS tus campos aquí
  
  // Prop automática que siempre llega
  generatedDate: String
})
</script>

<style scoped>
.contenedor-principal {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.seccion {
  margin-bottom: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
}

/* IMPORTANTE: Estos estilos deben funcionar en PDF también */
/* Usar Tailwind o inline styles, NO CSS personalizado complejo */
@media print {
  .contenedor-principal {
    padding: 0;
  }
}
</style>
```

### Paso 2️⃣: Configurar el Documento en documents.js

**Archivo:** `app/config/documents.js`

Busca la sección donde están las configuraciones y agrega:

```javascript
// =====================================================
// NUEVO DOCUMENTO: Mi Documento
// =====================================================

export const miDocumentoConfig = {
  // METADATA
  id: 'mi-documento',                    // ID único (sin espacios, minúsculas)
  title: 'Mi Nuevo Documento',           // Título visible en UI
  description: 'Descripción para el usuario', // Pequeña descripción
  route: '/mi-documento',                // Ruta en navegador
  fileName: 'mi-documento.pdf',          // Nombre del PDF descargado
  
  // DATOS POR DEFECTO (aparecen en PDF automáticamente)
  defaultData: {
    titulo: 'VALOR POR DEFECTO',
    campo1: 'Contenido por defecto campo 1',
    campo2: 'Contenido por defecto campo 2',
    // ... agregar TODOS tus campos
  },
  
  // CAMPOS EDITABLES EN FORMULARIO
  fields: [
    // Formato: { name: 'nombreProp', label: 'Etiqueta visible', type: 'tipo', ... }
    
    { 
      name: 'titulo', 
      label: 'Título del Documento', 
      placeholder: 'Ej: Mi documento',
      type: 'text',
      fullWidth: true  // Ocupa todo el ancho
    },
    
    { 
      name: 'campo1', 
      label: 'Campo 1', 
      placeholder: 'Introduce contenido',
      type: 'text'
    },
    
    { 
      name: 'campo2', 
      label: 'Campo 2 (multilineaa)', 
      placeholder: 'Contenido largo...',
      type: 'textarea',
      rows: 4,
      fullWidth: true
    },
    
    // MÁS TIPOS DE CAMPOS DISPONIBLES:
    // type: 'email'      - Input de email
    // type: 'tel'        - Input de teléfono
    // type: 'date'       - Selector de fecha
    // type: 'select'     - Desplegable (requiere 'options')
    // type: 'file'       - Upload de archivo
  ],
  
  // CAPACIDADES DEL DOCUMENTO
  capabilities: {
    canPreview: true,        // Mostrar vista previa
    canEdit: true,           // Permitir edición
    canGeneratePDF: true     // Descargar PDF
  }
}

// Exportar en la lista principal al final del archivo
export const documentConfigs = {
  // ... documentos existentes ...
  miDocumento: miDocumentoConfig    // Agregar aquí
}
```

**REGLAS CRÍTICAS:**
- ✅ El `name` debe coincidir EXACTAMENTE con los props del componente Vue
- ✅ El `name` debe estar en `defaultData`
- ✅ Los campos en `fields` son EDITABLES en el formulario
- ✅ Los campos NO en `fields` pero SÍ en `defaultData` son NO EDITABLES (solo lectura en PDF)

### Paso 3️⃣: Crear la Página del Documento

**Archivo:** `app/pages/mi-documento.vue`

```vue
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import MiDocumento from '../components/MiDocumento.vue'
import { miDocumentoConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="miDocumentoConfig"
    :documentComponent="MiDocumento"
  />
</template>
```

**CRÍTICO:**
- Importa el componente que creaste en Paso 1
- Importa la configuración que creaste en Paso 2
- Pasa ambas al componente genérico `DocumentPage`

### Paso 4️⃣: Agregar a la Página Principal

**Archivo:** `app/config/documents.js` (línea final)

```javascript
// Al final del archivo, en la función getAllDocuments()
export const getAllDocuments = () => {
  return Object.entries(documentConfigs).map(([key, config]) => ({
    id: key,
    ...config
  }))
}
```

✅ El documento aparecerá automáticamente en `index.vue`

### Paso 5️⃣: Verificar que TODO Funciona

```bash
cd GeneracionDocumentacion
yarn dev
# Abre http://localhost:3000
# Haz clic en "Mi Nuevo Documento"
# Prueba preview, edición y descarga PDF
```

---

## 🎨 ESTILOS Y CSS

### Usar Estilos Corporativos (SOLAY)

```vue
<style scoped>
/* Colores corporativos SOLAY */
.encabezado-seccion {
  background-color: #FFA02A;  /* Naranja principal */
  color: white;
  padding: 10px;
  font-weight: bold;
}

.subseccion {
  background-color: #FFCC99;  /* Naranja medio */
  color: white;
}

.subseccion-claro {
  background-color: #FFD9B3;  /* Naranja claro */
  color: white;
}

/* Para tablas */
table {
  width: 100%;
  border-collapse: collapse;
  page-break-inside: avoid;  /* No cortar tabla en PDF */
}

th {
  background-color: #FFA02A;
  color: white;
  padding: 10px;
}

td {
  padding: 8px;
  border: 1px solid #ddd;
}

/* IMPORTANTE para PDF */
@media print {
  .no-imprimir {
    display: none;
  }
  
  .evitar-corte {
    page-break-inside: avoid;
  }
  
  /* Asegurar colores en PDF */
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
```

---

## 📝 TIPOS DE CAMPOS DISPONIBLES

### Text/Email/Tel

```javascript
{ 
  name: 'campo', 
  label: 'Etiqueta',
  type: 'text',      // o 'email', 'tel'
  placeholder: 'Ej: ...'
}
```

### Textarea (multilinea)

```javascript
{ 
  name: 'descripcion', 
  label: 'Descripción',
  type: 'textarea',
  rows: 4,           // Altura en filas
  placeholder: '...'
}
```

### Date

```javascript
{ 
  name: 'fecha', 
  label: 'Fecha del Documento',
  type: 'date'
}
```

### Select (Desplegable)

```javascript
{ 
  name: 'tipo', 
  label: 'Tipo de Documento',
  type: 'select',
  options: ['Opción 1', 'Opción 2', 'Opción 3'],
  placeholder: 'Selecciona...'
}
```

### File (Upload)

```javascript
{ 
  name: 'imagen', 
  label: 'Cargar Imagen',
  type: 'file',
  accept: 'image/*'    // o 'application/pdf', etc
}
```

---

## 🔄 FLUJO DE DATOS

```
┌─────────────────────┐
│ documents.js        │  Define TODOS los campos
│ (defaultData)       │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ DocumentForm.vue    │  Formulario editable
│ (fields)            │  Solo campos en 'fields'
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ formData (ref)      │  Estado reactivo
│ actualizado         │
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ MiDocumento.vue     │  Props renderizados
│ (props)             │  Usa v-bind="formData"
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│ PDF Generado        │  html2pdf.js
│ (descarga)          │  Usa elemento con
│                     │  data-pdf-content
└─────────────────────┘
```

---

## 🚨 ERRORES COMUNES Y SOLUCIONES

### Error: "Documento no aparece en el listado"

**Causa:** Olvidaste agregar la configuración a `documentConfigs`

**Solución:**
```javascript
export const documentConfigs = {
  memoriaTecnica: memoriaTecnicaConfig,
  autorizacionRepresentacion: autorizacionRepresentacionConfig,
  miDocumento: miDocumentoConfig,  // ← AGREGAR AQUÍ
}
```

### Error: "Los datos no se muestran en el formulario"

**Causa:** El campo `name` en `fields` no coincide con el prop del componente

**Solución:** Verificar que coincidan exactamente:
- documents.js: `{ name: 'miCampo', ... }`
- MiDocumento.vue: `defineProps({ miCampo: String })`

### Error: "PDF descargado sin estilos/colores"

**Causa:** CSS complejo o estilos no inlineados

**Solución:**
```vue
<style scoped>
/* Agregar esto para PDF */
@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
```

### Error: "Tabla cortada en el PDF"

**Causa:** No evitas saltos de página

**Solución:**
```vue
<style scoped>
table {
  page-break-inside: avoid;
}

.seccion {
  page-break-inside: avoid;
}
</style>
```

---

## 📚 EJEMPLO PRÁCTICO COMPLETO

### Crear: "Acta de Reunión"

#### 1️⃣ Componente: `ActaReunion.vue`

```vue
<template>
  <div data-pdf-content class="contenedor">
    <div class="encabezado">
      <h1>📋 ACTA DE REUNIÓN</h1>
      <p class="fecha">Fecha: {{ fecha }}</p>
    </div>

    <section class="seccion">
      <h2>Participantes</h2>
      <p>{{ participantes }}</p>
    </section>

    <section class="seccion">
      <h2>Temas Tratados</h2>
      <p>{{ temasTratados }}</p>
    </section>

    <section class="seccion">
      <h2>Acuerdos</h2>
      <p>{{ acuerdos }}</p>
    </section>

    <section class="seccion">
      <h2>Próxima Reunión</h2>
      <p>{{ proximaReunion }}</p>
    </section>
  </div>
</template>

<script setup>
defineProps({
  fecha: String,
  participantes: String,
  temasTratados: String,
  acuerdos: String,
  proximaReunion: String,
  generatedDate: String
})
</script>

<style scoped>
.contenedor {
  padding: 30px;
  font-family: Arial, sans-serif;
}

.encabezado {
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #FFA02A;
  padding-bottom: 10px;
}

.encabezado h1 {
  color: #FFA02A;
  margin: 0;
}

.fecha {
  color: #666;
  font-size: 12px;
}

.seccion {
  margin-bottom: 20px;
  page-break-inside: avoid;
}

.seccion h2 {
  background-color: #FFCC99;
  color: white;
  padding: 8px;
  margin: 0 0 10px 0;
  font-size: 14px;
}

.seccion p {
  margin: 0;
  line-height: 1.6;
}

@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
```

#### 2️⃣ Configuración: `documents.js`

```javascript
export const actaReunionConfig = {
  id: 'acta-reunion',
  title: 'Acta de Reunión',
  description: 'Documento para registrar reuniones y acuerdos',
  route: '/acta-reunion',
  fileName: 'acta-reunion.pdf',
  
  defaultData: {
    fecha: new Date().toLocaleDateString('es-ES'),
    participantes: 'Agregar participantes',
    temasTratados: 'Agregar temas',
    acuerdos: 'Agregar acuerdos',
    proximaReunion: 'Próxima fecha'
  },
  
  fields: [
    { name: 'fecha', label: 'Fecha de Reunión', type: 'date' },
    { name: 'participantes', label: 'Participantes', type: 'textarea', rows: 3, fullWidth: true },
    { name: 'temasTratados', label: 'Temas Tratados', type: 'textarea', rows: 4, fullWidth: true },
    { name: 'acuerdos', label: 'Acuerdos y Decisiones', type: 'textarea', rows: 4, fullWidth: true },
    { name: 'proximaReunion', label: 'Próxima Reunión', type: 'text', fullWidth: true }
  ],
  
  capabilities: { canPreview: true, canEdit: true, canGeneratePDF: true }
}
```

#### 3️⃣ Página: `acta-reunion.vue`

```vue
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import ActaReunion from '../components/ActaReunion.vue'
import { actaReunionConfig } from '../config/documents'
</script>

<template>
  <DocumentPage :config="actaReunionConfig" :documentComponent="ActaReunion" />
</template>
```

**¡LISTO!** Aparecerá en la página principal automáticamente.

---

## ✅ CHECKLIST PARA NUEVO DOCUMENTO

- [ ] Componente Vue creado en `app/components/MiDocumento.vue`
- [ ] Todos los props definidos en `defineProps()`
- [ ] Configuración creada en `app/config/documents.js`
- [ ] El `id` es único y en minúsculas
- [ ] Todos los campos están en `defaultData`
- [ ] Los campos editables están en `fields`
- [ ] El `name` de cada field coincide con un prop
- [ ] Página creada en `app/pages/mi-documento.vue`
- [ ] Configuración agregada a `documentConfigs`
- [ ] Estilos incluyen `@media print` con `print-color-adjust`
- [ ] Probado en navegador: preview, edición, PDF
- [ ] PDF descargado se ve correctamente

---

## 🎯 TIPS PROFESIONALES

1. **Reutiliza componentes**: Si necesitas el mismo elemento en varios documentos, crea un componente pequeño y reutilizable

2. **Documentación**: Comenta tus props complejos en el componente Vue

3. **Prueba el PDF**: Antes de considerar "terminado", descarga el PDF y verifica que se ve bien

4. **Colores corporativos**: Siempre usa `#FFA02A` para encabezados principales

5. **Responsive**: Los documentos se ven bien en navegador, pero el PDF es lo más importante

6. **Datos sensibles**: Si tienes datos que NO deben ir en el formulario, solo agrégalos a `defaultData`, no a `fields`

---

## 📞 SOPORTE RÁPIDO

**¿Qué falta?**
- Verifica `documents.js` → ¿Está registrado?
- Verifica componente → ¿Todos los props definidos?
- Verifica página → ¿Importas componente y config?

**¿El PDF no se ve bien?**
- Agrega `@media print` con `print-color-adjust: exact`
- Usa `page-break-inside: avoid` en secciones
- Prueba con inline styles si CSS scoped no funciona

**¿El formulario no guarda datos?**
- Verifica que el `name` en `fields` coincida exactamente con el prop en `defineProps()`
- El nombre debe estar también en `defaultData`

---

## 🎉 ¡FELICIDADES!

Ahora puedes crear nuevos documentos PDF sin tocar la lógica central. El sistema está diseñado para que TÚ solo defines datos y estructura. El resto funciona automáticamente.

**Recuerda:** Los 5 pasos siempre son:
1. Componente Vue
2. Configuración en documents.js
3. Página
4. Registrar en documentConfigs
5. Probar

¡A crear documentos! 📄✨
