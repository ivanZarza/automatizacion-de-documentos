# Documentación - AutorizacionRepresentacion.vue

## Descripción General
`AutorizacionRepresentacion.vue` es un componente Vue 3 que renderiza una autorización de representación formateada profesionalmente para PDF. Contiene los campos típicos de un documento legal de autorización con estilos optimizados para impresión y exportación.

## Ubicación
`app/components/AutorizacionRepresentacion.vue`

## Características
- ✅ Diseño profesional y conforme a estándares legales
- ✅ Optimizado para PDF con html2pdf.js
- ✅ Responsive pero con formato fijo para impresión
- ✅ Estilos Tailwind CSS adaptados a documento
- ✅ Fácilmente personalizable para otros documentos
- ✅ Incluye espacios para firmas
- ✅ Soporta fecha automática en formato español

## Props

### `autorizante` (String)
Nombre completo de la persona que autoriza.

**Tipo:** `String`  
**Requerido:** Sí  
**Ejemplo:**
```vue
<AutorizacionRepresentacion autorizante="Guillermo Cruz Beltrán" />
```

### `dniAutorizante` (String)
Número de identificación del autorizante (DNI/NIF/CIF).

**Tipo:** `String`  
**Requerido:** Sí  
**Ejemplo:**
```vue
<AutorizacionRepresentacion dniAutorizante="31.335.276-F" />
```

### `domicilioAutorizante` (String)
Domicilio completo del autorizante (calle, número, código postal, ciudad, provincia).

**Tipo:** `String`  
**Requerido:** Sí  
**Formato Recomendado:** "Calle número, código postal, ciudad, provincia"  
**Ejemplo:**
```vue
<AutorizacionRepresentacion 
  domicilioAutorizante="DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz" 
/>
```

### `representante` (String)
Nombre o razón social de la entidad o persona que representa.

**Tipo:** `String`  
**Requerido:** Sí  
**Ejemplo:**
```vue
<AutorizacionRepresentacion representante="Solay Ingenieros, S.L." />
```

### `dniRepresentante` (String)
Número de identificación del representante (DNI/NIF/CIF).

**Tipo:** `String`  
**Requerido:** Sí  
**Ejemplo:**
```vue
<AutorizacionRepresentacion dniRepresentante="B09848912" />
```

### `domicilioRepresentante` (String)
Domicilio completo del representante.

**Tipo:** `String`  
**Requerido:** Sí  
**Formato Recomendado:** "Calle número, código postal, ciudad, provincia"  
**Ejemplo:**
```vue
<AutorizacionRepresentacion 
  domicilioRepresentante="Calle Ebro, 35 – 41012, Sevilla, Sevilla" 
/>
```

### `organismo` (String)
Nombre de la administración, ayuntamiento u organismo ante el que se realiza la autorización.

**Tipo:** `String`  
**Requerido:** Sí  
**Ejemplo:**
```vue
<AutorizacionRepresentacion organismo="Ayuntamiento de Puerto Real (Cádiz)" />
```

### `gestiones` (String)
Descripción detallada de las gestiones que autoriza (puede ser multilínea).

**Tipo:** `String`  
**Requerido:** Sí  
**Nota:** Soporta saltos de línea; usa `\n` o `<br>` según corresponda  
**Ejemplo:**
```vue
<AutorizacionRepresentacion 
  gestiones="SOLICITUD DE LICENCIA DE OBRA MENOR..." 
/>
```

### `fecha` (String)
Fecha del documento en formato que prefieras (generalmente DD/MM/YYYY).

**Tipo:** `String`  
**Requerido:** No (por defecto usa la fecha actual)  
**Valor por Defecto:** Fecha actual formateada en español  
**Ejemplo:**
```vue
<AutorizacionRepresentacion fecha="18/11/2025" />
```

## Estructura HTML Interna

El componente genera una estructura HTML optimizada para PDF:

```html
<div data-pdf-content class="max-w-4xl mx-auto p-12">
  <!-- Header con línea decorativa -->
  <div class="border-t-4 border-blue-600 pt-4 pb-8">
    <h1 class="text-2xl font-bold text-center">AUTORIZACIÓN DE REPRESENTACIÓN</h1>
  </div>

  <!-- Contenido principal -->
  <div class="space-y-6">
    <section class="text-base leading-relaxed">
      <!-- Párrafo introductorio -->
    </section>
    
    <section>
      <h2 class="font-bold mb-3">DATOS DEL AUTORIZANTE:</h2>
      <!-- Campos de autorizante -->
    </section>
    
    <section>
      <h2 class="font-bold mb-3">DATOS DEL REPRESENTANTE:</h2>
      <!-- Campos de representante -->
    </section>
    
    <section>
      <h2 class="font-bold mb-3">GESTIONES AUTORIZADAS:</h2>
      <!-- Descripción de gestiones -->
    </section>
    
    <section>
      <!-- Párrafo de cierre con mención de organismo -->
    </section>
  </div>

  <!-- Firmas -->
  <div class="mt-12 pt-8 border-t grid grid-cols-2 gap-8">
    <div class="text-center">
      <div class="h-20 border-b border-gray-400 mb-2"></div>
      <p class="font-bold">{{ autorizante }}</p>
    </div>
    <div class="text-center">
      <div class="h-20 border-b border-gray-400 mb-2"></div>
      <p class="font-bold">En representación de {{ representante }}</p>
    </div>
  </div>
</div>
```

## Atributos Especiales

### `data-pdf-content`
Atributo usado por html2pdf.js para identificar el elemento a exportar.

**Ubicación:** En el div contenedor principal  
**Uso:** Permite generar PDF capturando solo este elemento  
**Importante:** No debe removerse si usas la funcionalidad de PDF

```javascript
const element = document.querySelector('[data-pdf-content]')
```

## Estilos y Clases Tailwind

### Diseño General
- `max-w-4xl` - Ancho máximo del documento
- `mx-auto` - Centrado horizontalmente
- `p-12` - Padding interno generoso

### Header
- `border-t-4 border-blue-600` - Línea superior azul (identidad visual)
- `pt-4 pb-8` - Espaciado vertical

### Título
- `text-2xl font-bold text-center` - Texto centrado y grande

### Contenido
- `space-y-6` - Espaciado entre secciones
- `text-base leading-relaxed` - Texto legible en impresión
- `font-bold` - Encabezados de sección

### Firma
- `grid grid-cols-2 gap-8` - Dos columnas para firmas
- `border-b border-gray-400` - Línea para firma
- `h-20` - Altura espaciosa para firmar

## Estilos para Impresión

El componente incluye estilos media query para optimizar la visualización en PDF:

```css
@media print {
  /* Remueve sombras y decoraciones innecesarias */
  box-shadow: none;
  background: white;
}
```

## Ejemplo de Implementación Completa

```vue
<template>
  <div class="min-h-screen bg-gray-50 p-4">
    <AutorizacionRepresentacion
      autorizante="Guillermo Cruz Beltrán"
      dniAutorizante="31.335.276-F"
      domicilioAutorizante="DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz"
      representante="Solay Ingenieros, S.L."
      dniRepresentante="B09848912"
      domicilioRepresentante="Calle Ebro, 35 – 41012, Sevilla, Sevilla"
      organismo="Ayuntamiento de Puerto Real (Cádiz)"
      gestiones="SOLICITUD DE LICENCIA DE OBRA MENOR para Instalación de Panel Fotovoltaico"
      fecha="18/11/2025"
    />
  </div>
</template>

<script setup>
import AutorizacionRepresentacion from '@/components/AutorizacionRepresentacion.vue'
</script>
```

## Uso con Composable `useDocument`

El componente está diseñado para trabajar con `useDocument`:

```vue
<template>
  <div v-if="showPreview">
    <AutorizacionRepresentacion v-bind="formData" />
    <button @click="generatePDF">Descargar PDF</button>
  </div>
</template>

<script setup>
import { useDocument } from '@/composables/useDocument'
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
    gestiones: 'SOLICITUD DE LICENCIA DE OBRA MENOR...',
    fecha: new Date().toLocaleDateString('es-ES')
  },
  fileName: 'autorizacion-representacion.pdf'
}

const { formData, showPreview, generatePDF } = useDocument(documentConfig)
</script>
```

## Personalización para Otros Documentos

Este componente sirve como base para crear otros documentos. Aquí hay una guía:

### Paso 1: Copiar el componente
```bash
cp app/components/AutorizacionRepresentacion.vue app/components/MiDocumento.vue
```

### Paso 2: Modificar los props
```vue
<script setup>
defineProps({
  campo1: String,
  campo2: String,
  campo3: String
  // ... tus campos
})
</script>
```

### Paso 3: Modificar el template
```vue
<template>
  <div data-pdf-content class="max-w-4xl mx-auto p-12">
    <!-- Tu contenido -->
  </div>
</template>
```

### Paso 4: Usar en tu página
```vue
<MiDocumento v-bind="formData" />
```

## Recomendaciones de Estilos

### Para Documentos Profesionales
- Mantén `max-w-4xl` y `p-12` para márgenes adecuados
- Usa `border-t-4` con colores corporativos
- Incluye `text-base leading-relaxed` para legibilidad

### Para Documentos Legales
- Secciones claramente delimitadas
- Espacios generosos para firmas (`h-20` o mayor)
- Numeración de artículos si es necesario
- Fechas y referencias claras

### Para PDF
- Avoid complex nested layouts
- Use `break-inside-avoid` para mantener secciones juntas
- Test print preview antes de exportar

## Casos de Uso

1. **Autorizaciones administrativas** - Representación, delegación
2. **Documentos legales** - Certificados, acuerdos
3. **Formularios oficiales** - Solicitudes, registros
4. **Reportes profesionales** - Evaluaciones, diagnósticos

## Integración con Imágenes

Para agregar logo o firma al documento puedes usar imágenes colocadas en la carpeta `public/`. Los archivos en `public/` se sirven desde la raíz del sitio, por ejemplo:

- `public/logo-solay.png` → `/logo-solay.png`
- `public/firma-solay.png` → `/firma-solay.png`

Ejemplo de uso (logo en el encabezado):

```vue
<template>
  <div data-pdf-content class="max-w-4xl mx-auto p-12">
    <!-- Logo desde public -->
    <img src="/logo-solay.png" alt="Logo Solay" class="w-28 h-auto mb-4" />

    <!-- Resto del documento -->
  </div>
</template>
```

Ejemplo de uso (firma en el área de firma):

```vue
<div class="text-center">
  <!-- Imagen de firma desde public -->
  <img src="/firma-solay.png" alt="Firma Solay" class="mx-auto h-20 object-contain mb-2" />
  <p class="font-bold text-sm">{{ autorizante }}</p>
</div>
```

Notas:
- Las imágenes alojadas en `public/` se incluyen fácilmente en la exportación a PDF — html2pdf.js capturará las imágenes siempre que las rutas sean accesibles en el navegador.
- Si la imagen no aparece en el PDF, refresca el servidor de desarrollo (`yarn dev`) y limpia la cache del navegador.

## Notas Importantes

- El componente NO maneja sus propios estados, es un "presentational component"
- Siempre proporciona todos los props requeridos
- La fecha automática usa `new Date().toLocaleDateString('es-ES')`
- Para generar PDF, necesita estar envuelto en un elemento con `data-pdf-content`
- Los espacios para firma son fijos; ajusta `h-20` según necesidad
- El componente es responsive pero optimizado para impresión A4 (max-w-4xl)

## Estructura Completa del Componente

```vue
<template>
  <div data-pdf-content class="max-w-4xl mx-auto p-12 bg-white text-gray-800">
    <!-- Encabezado -->
    <div class="border-t-4 border-blue-600 pt-4 pb-8">
      <h1 class="text-2xl font-bold text-center">AUTORIZACIÓN DE REPRESENTACIÓN</h1>
    </div>

    <!-- Introducción -->
    <section class="space-y-6">
      <p class="text-base leading-relaxed">
        Por medio de la presente, declaro que autorizo a la siguiente persona o entidad...
      </p>

      <!-- Datos Autorizante -->
      <div>
        <h2 class="font-bold mb-3">DATOS DEL AUTORIZANTE:</h2>
        <p><span class="font-semibold">Nombre:</span> {{ autorizante }}</p>
        <p><span class="font-semibold">DNI/NIF/CIF:</span> {{ dniAutorizante }}</p>
        <p><span class="font-semibold">Domicilio:</span> {{ domicilioAutorizante }}</p>
      </div>

      <!-- Datos Representante -->
      <div>
        <h2 class="font-bold mb-3">DATOS DEL REPRESENTANTE:</h2>
        <p><span class="font-semibold">Nombre/Razón Social:</span> {{ representante }}</p>
        <p><span class="font-semibold">DNI/NIF/CIF:</span> {{ dniRepresentante }}</p>
        <p><span class="font-semibold">Domicilio:</span> {{ domicilioRepresentante }}</p>
      </div>

      <!-- Gestiones -->
      <div>
        <h2 class="font-bold mb-3">GESTIONES AUTORIZADAS:</h2>
        <p class="text-base leading-relaxed">{{ gestiones }}</p>
      </div>

      <!-- Cierre -->
      <p class="text-base leading-relaxed">
        Todo ante {{ organismo }}, en la forma que considere oportuna.
      </p>

      <!-- Fecha -->
      <p class="text-right">
        <span class="font-semibold">Fecha:</span> {{ fecha || new Date().toLocaleDateString('es-ES') }}
      </p>
    </section>

    <!-- Firmas -->
    <div class="mt-12 pt-8 border-t grid grid-cols-2 gap-8">
      <div class="text-center">
        <div class="h-20 border-b border-gray-400 mb-2"></div>
        <p class="font-bold text-sm">{{ autorizante }}</p>
      </div>
      <div class="text-center">
        <div class="h-20 border-b border-gray-400 mb-2"></div>
        <p class="font-bold text-sm">En representación de {{ representante }}</p>
      </div>
    </div>
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

<style scoped>
@media print {
  * {
    box-shadow: none !important;
  }
}
</style>
```
