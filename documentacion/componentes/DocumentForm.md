# Documentación - DocumentForm.vue

## Descripción General
`DocumentForm.vue` es un componente de formulario dinámico y reutilizable que permite crear formularios con múltiples tipos de campos (texto, email, fecha, textarea, select, etc.). Perfecto para editar documentos con validación y placeholder descriptivos.

## Ubicación
`app/components/DocumentForm.vue`

## Características
- ✅ Soporte para múltiples tipos de campos
- ✅ Validación de campos
- ✅ Placeholders descriptivos
- ✅ Layout responsivo con columnas configurables
- ✅ Etiquetas para cada campo
- ✅ Emisión de datos al enviar el formulario
- ✅ Estilos modernos con Tailwind CSS

## Props

### `title` (String, opcional)
Título que se muestra en la parte superior del formulario.

**Tipo:** `String`  
**Valor por defecto:** `'Editar Documento'`  
**Ejemplo:**
```vue
<DocumentForm title="Editar Autorización" />
```

### `fields` (Array, requerido)
Array de objetos que definen los campos del formulario. Cada campo debe tener la siguiente estructura:

**Tipo:** `Array`  
**Estructura de cada campo:**
```javascript
{
  name: 'nombreCampo',      // Identificador único del campo (requerido)
  label: 'Etiqueta',        // Texto a mostrar como etiqueta (requerido)
  placeholder: 'Ej: ...',   // Texto de ayuda dentro del campo (requerido)
  type: 'text',             // Tipo de campo (text, email, tel, date, textarea, select)
  fullWidth: false,         // Si true, ocupa todo el ancho (opcional)
  rows: 3,                  // Solo para textarea (opcional)
  options: []               // Solo para select, array de opciones (opcional)
}
```

**Tipos de campos soportados:**
- `text` - Campo de texto simple
- `email` - Campo de correo electrónico
- `tel` - Campo de teléfono
- `date` - Selector de fecha
- `textarea` - Área de texto multilínea
- `select` - Selector desplegable

**Ejemplo:**
```vue
const formFields = [
  { 
    name: 'autorizante', 
    label: 'Nombre del Autorizante', 
    placeholder: 'Ej: Guillermo Cruz Beltrán', 
    type: 'text' 
  },
  { 
    name: 'fecha', 
    label: 'Fecha del Documento', 
    placeholder: 'DD/MM/YYYY', 
    type: 'date' 
  },
  { 
    name: 'gestiones', 
    label: 'Gestiones a Realizar', 
    placeholder: 'Descripción detallada', 
    type: 'textarea',
    rows: 4,
    fullWidth: true
  },
  {
    name: 'tipoGestion',
    label: 'Tipo de Gestión',
    placeholder: 'Selecciona una opción',
    type: 'select',
    options: ['Licencia', 'Autorización', 'Registro']
  }
]

<DocumentForm :fields="formFields" />
```

### `initialData` (Object, requerido)
Objeto con los datos iniciales del formulario. Las claves deben coincidir con los nombres de los campos.

**Tipo:** `Object`  
**Ejemplo:**
```vue
const initialData = {
  autorizante: 'Guillermo Cruz Beltrán',
  fecha: '18/11/2025',
  gestiones: 'Solicitud de licencia...',
  tipoGestion: 'Licencia'
}

<DocumentForm :initialData="initialData" />
```

### `columns` (Number, opcional)
Número de columnas para el layout del formulario (1 o 2).

**Tipo:** `Number`  
**Valor por defecto:** `2`  
**Ejemplo:**
```vue
<DocumentForm :columns="2" />  <!-- Layout de 2 columnas -->
<DocumentForm :columns="1" />  <!-- Layout de 1 columna (ancho completo) -->
```

### `submitButtonText` (String, opcional)
Texto del botón de envío.

**Tipo:** `String`  
**Valor por defecto:** `'Guardar Cambios'`  
**Ejemplo:**
```vue
<DocumentForm submitButtonText="Enviar Formulario" />
```

## Eventos

### `submit`
Se emite cuando el usuario envía el formulario. Pasa los datos actualizados como parámetro.

**Parámetros:** `Object` - Los datos del formulario

**Uso:**
```vue
<DocumentForm @submit="handleSubmit" />

// En el script setup:
const handleSubmit = (newData) => {
  console.log('Datos actualizados:', newData)
  // Realizar acciones con los nuevos datos
}
```

## Ejemplo de Uso Completo

```vue
<template>
  <DocumentForm 
    title="Editar Autorización de Representación"
    :fields="formFields"
    :initialData="formData"
    :columns="2"
    submitButtonText="Guardar y Continuar"
    @submit="handleFormSubmit"
  />
</template>

<script setup>
import DocumentForm from '@/components/DocumentForm.vue'
import { ref } from 'vue'

const formData = ref({
  autorizante: 'Guillermo Cruz Beltrán',
  dniAutorizante: '31.335.276-F',
  domicilioAutorizante: 'DS Almendral, Polígono 30 Parcela 162 – 11510, Puerto Real, Cádiz',
  representante: 'Solay Ingenieros, S.L.',
  dniRepresentante: 'B09848912',
  domicilioRepresentante: 'Calle Ebro, 35 – 41012, Sevilla, Sevilla',
  organismo: 'Ayuntamiento de Puerto Real (Cádiz)',
  gestiones: 'SOLICITUD DE LICENCIA DE OBRA MENOR...',
  fecha: '18/11/2025'
})

const formFields = [
  { 
    name: 'autorizante', 
    label: 'Nombre del Autorizante', 
    placeholder: 'Ej: Guillermo Cruz Beltrán', 
    type: 'text' 
  },
  { 
    name: 'dniAutorizante', 
    label: 'DNI/NIF del Autorizante', 
    placeholder: 'Ej: 31.335.276-F', 
    type: 'text' 
  },
  { 
    name: 'domicilioAutorizante', 
    label: 'Domicilio del Autorizante', 
    placeholder: 'Calle, número, código postal, localidad, provincia', 
    type: 'text', 
    fullWidth: true 
  },
  { 
    name: 'representante', 
    label: 'Nombre del Representante', 
    placeholder: 'Ej: Solay Ingenieros, S.L.', 
    type: 'text' 
  },
  { 
    name: 'dniRepresentante', 
    label: 'DNI/NIF del Representante', 
    placeholder: 'Ej: B09848912', 
    type: 'text' 
  },
  { 
    name: 'domicilioRepresentante', 
    label: 'Domicilio del Representante', 
    placeholder: 'Calle, número, código postal, localidad, provincia', 
    type: 'text', 
    fullWidth: true 
  },
  { 
    name: 'organismo', 
    label: 'Organismo Administrativo', 
    placeholder: 'Ej: Ayuntamiento de Puerto Real (Cádiz)', 
    type: 'text', 
    fullWidth: true 
  },
  { 
    name: 'gestiones', 
    label: 'Gestiones a Realizar', 
    placeholder: 'Descripción detallada de las gestiones autorizadas', 
    type: 'textarea', 
    rows: 4, 
    fullWidth: true 
  },
  { 
    name: 'fecha', 
    label: 'Fecha del Documento', 
    placeholder: 'DD/MM/YYYY', 
    type: 'date' 
  }
]

const handleFormSubmit = (newData) => {
  formData.value = newData
  console.log('Formulario guardado:', newData)
}
</script>
```

## Estilos y Apariencia

### Layout
- **Columnas:** Configurable mediante la prop `columns`
- **Espaciado:** Gap de 4 (16px) entre campos
- **Campos full-width:** Se extienden a todo el ancho disponible

### Campos
- **Bordes:** Gris claro con transición de enfoque
- **Enfoque:** Anillo azul (ring) cuando el usuario interactúa
- **Padding:** 8px (px-3 py-2)
- **Border-radius:** Redondeado (rounded)

### Botón de Envío
- **Color:** Verde (`bg-green-600 hover:bg-green-700`)
- **Ancho:** 100%
- **Padding:** 12px vertical (py-3)
- **Transición:** Suave

## Validación y Manejo de Datos

- El formulario **no valida** por defecto; esto se puede añadir fácilmente
- Los datos se sincronizan automáticamente con el estado interno
- Los cambios en `initialData` se reflejan automáticamente en el formulario
- El evento `submit` se emite solo cuando el usuario hace clic en el botón de envío

## Casos de Uso Recomendados

1. **Edición de documentos administrativos** - Mantener consistencia en formularios
2. **Registro de usuarios** - Formularios con múltiples tipos de campos
3. **Configuración de aplicación** - Paneles de administración
4. **Creación de contenido** - Editores dinámicos

## Ventajas

- Altamente reutilizable y configurable
- Soporte para múltiples tipos de campos
- Fácil de mantener y extender
- Placeholders descriptivos mejoran la experiencia de usuario
- Validación customizable según necesidad

## Notas Importantes

- El componente **no valida campos vacíos** por defecto
- Para añadir validación, utiliza un schema validator (Zod, Vee-Validate, etc.)
- Los placeholders son obligatorios para una mejor UX
- Usar `fullWidth: true` para campos que requieren todo el ancho
