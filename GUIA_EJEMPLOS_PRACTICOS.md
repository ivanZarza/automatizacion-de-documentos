# 🔧 Guía Práctica: Ejemplos de Uso de `documents.js`

## Ejemplo 1: Agregar un Campo Simple

Imagina que quieres agregar un campo "Teléfono de Emergencia" a la Memoria Técnica.

### ¿Qué tienes que cambiar?

**1. En `defaultData` (línea ~89):**
```javascript
defaultData: {
  // ... datos existentes ...
  telefonoAlternativo: '622930583',  // ← AGREGAR ESTA LÍNEA
  // ...
}
```

**2. En `fields` (línea ~130):**
```javascript
fields: [
  // ... campos existentes ...
  { 
    name: 'telefonoAlternativo',           // Debe ser EXACTAMENTE el mismo nombre
    label: 'Teléfono Alternativo',         // Lo que ve el usuario
    placeholder: 'Ej: 622930583',          // Texto de ayuda
    type: 'tel'                            // Campo de teléfono
  },
  // ...
]
```

**3. En `MemoriaTecnica.vue` (agregar un prop):**
```vue
<script setup>
defineProps({
  // ... props existentes ...
  telefonoAlternativo: String,  // ← AGREGAR ESTA LÍNEA
})
</script>
```

**4. En el template de `MemoriaTecnica.vue`:**
```vue
<div>
  <p>Teléfono Alternativo: {{ telefonoAlternativo }}</p>
</div>
```

**¡Listo!** Ahora el campo aparecerá en el formulario y en el documento.

---

## Ejemplo 2: Cambiar el Tipo de Campo

¿Necesitas cambiar un campo de `text` a `textarea`?

**Antes:**
```javascript
{ name: 'observaciones', label: 'Observaciones', type: 'text' }
```

**Después:**
```javascript
{ 
  name: 'observaciones', 
  label: 'Observaciones', 
  type: 'textarea',  // ← CAMBIAR TIPO
  rows: 5,           // ← AGREGAR ALTURA
  fullWidth: true    // ← OCUPAR TODO EL ANCHO
}
```

---

## Ejemplo 3: Agregar un Campo Requerido (Validación Futura)

Aunque aún no hay validación, así es cómo se haría:

```javascript
{
  name: 'apellidosNombre',
  label: 'Apellidos y Nombre',
  type: 'text',
  required: true,        // ← Campo obligatorio
  minLength: 5,          // ← Mínimo 5 caracteres
  maxLength: 100         // ← Máximo 100 caracteres
}
```

---

## Ejemplo 4: Campo Select (Desplegable)

Cuando necesitas que el usuario elija entre opciones predefinidas.

```javascript
{
  name: 'tipoInstalacion',
  label: 'Tipo de Instalación',
  type: 'select',
  options: [
    'Fotovoltaica',
    'Térmica',
    'Híbrida'
  ]
}
```

**En `defaultData`:**
```javascript
tipoInstalacion: 'Fotovoltaica'
```

---

## Ejemplo 5: Campo de Archivo/Imagen

Para permitir que suban imágenes o documentos.

```javascript
{
  name: 'certificadoTecnico',
  label: 'Certificado Técnico (PDF)',
  type: 'file',
  accept: '.pdf',          // Solo PDFs
  fullWidth: true
}
```

**Variantes:**

```javascript
// Solo imágenes JPG y PNG
{
  name: 'foto',
  label: 'Foto de la Instalación',
  type: 'file',
  accept: '.jpg,.png'
}

// Cualquier imagen
{
  name: 'plano',
  label: 'Plano',
  type: 'file',
  accept: 'image/*'
}

// Cualquier archivo
{
  name: 'documento',
  label: 'Documento',
  type: 'file',
  accept: '*'
}
```

---

## Ejemplo 6: Agrupar Campos Visualmente

Aunque no hay agrupación oficial, puedes crear secciones en el componente.

**En el componente Vue (`MemoriaTecnica.vue`):**

```vue
<template>
  <!-- SECCIÓN A: DATOS PERSONALES -->
  <div style="border: 2px solid #000; padding: 20px; margin-bottom: 20px;">
    <h2>SECCIÓN A: DATOS PERSONALES</h2>
    <p>Nombre: {{ apellidosNombre }}</p>
    <p>NIF: {{ nifCif }}</p>
  </div>

  <!-- SECCIÓN B: UBICACIÓN -->
  <div style="border: 2px solid #000; padding: 20px; margin-bottom: 20px;">
    <h2>SECCIÓN B: UBICACIÓN</h2>
    <p>Localidad: {{ localidadEmplazamiento }}</p>
  </div>
</template>
```

---

## Ejemplo 7: Crear un Documento Completamente Nuevo

Digamos que quieres crear un "Certificado de Conformidad".

### Paso 1: Crear la configuración en `documents.js`

```javascript
export const certificadoConformidadConfig = {
  id: 'certificado-conformidad',
  title: 'Certificado de Conformidad',
  description: 'Documento que certifica la conformidad de la instalación',
  fileName: 'certificado-conformidad.pdf',
  route: '/certificado-conformidad',
  
  defaultData: {
    numeroSerie: 'CERT-2026-001',
    fechaEmision: '06/02/2026',
    tecnicoFirmante: 'Eduardo Rivera Cabezas',
    empresaInstaladora: 'Solay Fotovoltaica',
    estadoConformidad: 'Conforme',
    observaciones: 'Instalación realizada según normativa vigente'
  },
  
  fields: [
    { name: 'numeroSerie', label: 'Número de Serie', type: 'text', fullWidth: true },
    { name: 'fechaEmision', label: 'Fecha de Emisión', type: 'date' },
    { name: 'tecnicoFirmante', label: 'Técnico Firmante', type: 'text', fullWidth: true },
    { name: 'empresaInstaladora', label: 'Empresa Instaladora', type: 'text', fullWidth: true },
    { 
      name: 'estadoConformidad', 
      label: 'Estado', 
      type: 'select',
      options: ['Conforme', 'No Conforme', 'Conforme con Deficiencias']
    },
    { name: 'observaciones', label: 'Observaciones', type: 'textarea', rows: 4, fullWidth: true }
  ],
  
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  }
}
```

### Paso 2: Agregar al objeto `documentConfigs`

```javascript
export const documentConfigs = {
  autorizacionRepresentacion: autorizacionRepresentacionConfig,
  memoriaTecnica: memoriaTecnicaConfig,
  certificadoConformidad: certificadoConformidadConfig  // ← NUEVO
}
```

### Paso 3: Crear el componente Vue `CertificadoConformidad.vue`

```vue
<template>
  <div data-pdf-content style="width: 210mm; padding: 30px; font-family: Arial;">
    <div style="text-align: center; margin-bottom: 30px;">
      <h1>CERTIFICADO DE CONFORMIDAD</h1>
      <p>Número: {{ numeroSerie }}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h2>Datos del Certificado</h2>
      <p><strong>Fecha:</strong> {{ fechaEmision }}</p>
      <p><strong>Técnico:</strong> {{ tecnicoFirmante }}</p>
      <p><strong>Empresa:</strong> {{ empresaInstaladora }}</p>
      <p><strong>Estado:</strong> {{ estadoConformidad }}</p>
    </div>

    <div style="margin-bottom: 20px;">
      <h2>Observaciones</h2>
      <p>{{ observaciones }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  numeroSerie: String,
  fechaEmision: String,
  tecnicoFirmante: String,
  empresaInstaladora: String,
  estadoConformidad: String,
  observaciones: String
})
</script>
```

### Paso 4: Crear la página `pages/certificado-conformidad.vue`

```vue
<template>
  <DocumentPage 
    :config="certificadoConformidadConfig"
    :document-component="CertificadoConformidad"
  />
</template>

<script setup>
import DocumentPage from '@/components/DocumentPage.vue'
import CertificadoConformidad from '@/components/CertificadoConformidad.vue'
import { certificadoConformidadConfig } from '@/config/documents'
</script>
```

**¡Listo!** Ahora tienes un nuevo documento completamente funcional.

---

## Ejemplo 8: Campos Dependientes (Lógica Condicional)

Digamos que si el usuario selecciona "Ampliación", debe aparecer un campo adicional.

**En el componente Vue (usando `v-if`):**

```vue
<template>
  <div>
    <p>Uso a que se destina: {{ usoDestino }}</p>
    
    <!-- Este campo solo aparece si es Ampliación -->
    <div v-if="usoDestino === 'Ampliación'">
      <p>Describir la ampliación:</p>
      <p>{{ descripcionAmpliacion }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  usoDestino: String,
  descripcionAmpliacion: String
})
</script>
```

**En `documents.js` (siempre incluir el campo):**

```javascript
fields: [
  {
    name: 'usoDestino',
    label: 'Uso a que se destina',
    type: 'select',
    options: ['Nueva', 'Ampliación', 'Modificación']
  },
  {
    name: 'descripcionAmpliacion',
    label: 'Descripción de la Ampliación',
    type: 'textarea',
    rows: 3
  }
]
```

---

## Ejemplo 9: Valores Calculados

A veces necesitas campos que se calculan automáticamente.

**En el componente Vue (usando `computed`):**

```vue
<template>
  <p>Potencia Total Instalada: {{ potenciaTotalCalculada }} kW</p>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  potenciaPicoModulo: String,
  totalModulos: String
})

// Calcular automáticamente
const potenciaTotalCalculada = computed(() => {
  const pico = parseFloat(props.potenciaPicoModulo) || 0
  const modulos = parseInt(props.totalModulos) || 0
  return ((pico * modulos) / 1000).toFixed(2)
})
</script>
```

Este campo NO va en `fields` (no es editable), pero sí va en `defaultData` con un valor inicial.

---

## Ejemplo 10: Campos Dinámicos (Arrays)

Para listas de elementos (por ejemplo, múltiples paneles solares).

**En `documents.js`:**

```javascript
defaultData: {
  paneles: [
    { modelo: 'SUN-5K', potencia: '390W' },
    { modelo: 'SUN-5K', potencia: '390W' }
  ]
}
```

**En el componente Vue:**

```vue
<template>
  <div>
    <h3>Paneles Instalados</h3>
    <div v-for="(panel, index) in paneles" :key="index">
      <p>{{ panel.modelo }} - {{ panel.potencia }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  paneles: Array
})
</script>
```

---

## 🎯 Checklist para Agregar un Nuevo Campo

- [ ] Agregar la clave en `defaultData` con un valor inicial
- [ ] Agregar el objeto del campo en `fields` con `name`, `label`, `type`
- [ ] Agregar el prop en el componente Vue
- [ ] Usar el prop en el template con `{{ nombreProp }}`
- [ ] Probar que aparezca en el formulario
- [ ] Probar que se vea en la vista previa
- [ ] Probar que el PDF se genere correctamente

---

## 🚀 Tips Avanzados

### Tip 1: Reutilizar Configuraciones

```javascript
// Crear una plantilla base
const baseConfig = {
  capabilities: { canPreview: true, canEdit: true, canGeneratePDF: true },
  // ...
}

// Usarla para varios documentos
export const documento1Config = { ...baseConfig, id: 'doc1', title: 'Doc 1' }
export const documento2Config = { ...baseConfig, id: 'doc2', title: 'Doc 2' }
```

### Tip 2: Campos Opcionales

```javascript
{
  name: 'telefonoOpcional',
  label: 'Teléfono (Opcional)',
  type: 'tel',
  required: false  // Aún no implementado, pero buena práctica documentarlo
}
```

### Tip 3: Valores Localizados

```javascript
defaultData: {
  pais: 'España',
  provincia: 'Sevilla',
  codigoPostal: '41012'
}
```

---

## ❌ Errores Comunes y Cómo Evitarlos

### Error 1: El nombre en `fields` no coincide con `defaultData`

```javascript
// ❌ MALO
defaultData: { apellidos: 'Smith' }
fields: [{ name: 'apellidosNombre', ... }]  // Nombres diferentes!

// ✅ BIEN
defaultData: { apellidosNombre: 'Smith' }
fields: [{ name: 'apellidosNombre', ... }]  // Nombres iguales
```

### Error 2: Olvidar agregar el prop en Vue

```javascript
// ❌ MALO
// En documents.js
{ name: 'email', ... }
// En Vue - NO HAY PROP
<p>{{ email }}</p>  // ERROR!

// ✅ BIEN
defineProps({ email: String })
<p>{{ email }}</p>  // Funciona
```

### Error 3: Usar tipos de campo que no existen

```javascript
// ❌ MALO
{ name: 'color', type: 'color' }  // No existe (aún)

// ✅ BIEN
{ name: 'color', type: 'text' }  // Usar text
```

---

**¡Ahora tienes ejemplos para casi cualquier situación!** 🎉
