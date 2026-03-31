# Sistema de Almacenamiento de Datos con Pinia

## 📋 Descripción General

Se ha implementado un sistema de almacenamiento global de datos de formularios usando **Pinia**. Esto permite que:

1. **Cuando se completa un formulario**, los datos se guardan automáticamente en un store centralizado
2. **Los documentos HTML** pueden leer esos datos directamente sin necesidad de props
3. **No hay conflictos** con la configuración actual - todo funciona mediante un `if` que verifica si hay datos en Pinia

## 🏗️ Arquitectura

### Store de Pinia: `app/stores/formStore.js`

```javascript
const formStore = useFormStore()

// Métodos disponibles:
formStore.setFormData(data)      // Guardar datos del formulario
formStore.getFormData()          // Obtener todos los datos
formStore.getField(fieldName)    // Obtener un campo específico
formStore.clearFormData()        // Limpiar el store
formStore.hasData                // Propiedad computed que indica si hay datos
```

### Composable Helper: `app/composables/useFormDataInDocument.js`

Facilita el acceso a los datos en los componentes de documento:

```javascript
import { useFormDataInDocument } from '@/app/composables/useFormDataInDocument'

const { getFieldValue, hasFormData, getDataWithFallback } = useFormDataInDocument()

// Obtener un campo específico con fallback
const nombre = computed(() => getFieldValue('apellidosNombre', 'N/A'))

// Verificar si hay datos
if (hasFormData.value) {
  // Usar datos del formulario
} else {
  // Usar datos por defecto/props
}
```

## ✅ Flujo Completo

### 1. Completar Formulario
```
Usuario rellena formulario → Presiona "Generar PDF" → DocumentForm.submit()
```

### 2. Guardar en Pinia
```vue
<script setup>
const submit = () => {
  formStore.setFormData(formData.value)  // ← Aquí se guardan los datos
  emit('submit', formData.value)          // ← Compatibilidad con sistemas antiguos
}
</script>
```

### 3. Usar en Documentos (SIN CONFLICTOS)

En cualquier componente de documento como `MemoriaTecnica.vue`:

```vue
<script setup>
import { useFormDataInDocument } from '@/app/composables/useFormDataInDocument'

const { getFieldValue, hasFormData } = useFormDataInDocument()

// Con if condicionado - NO HAY CONFLICTOS
const apellidosNombre = computed(() => {
  if (hasFormData.value) {
    return getFieldValue('apellidosNombre')  // Datos del formulario
  } else {
    return props.apellidosNombre || 'N/A'    // Datos por defecto
  }
})
</script>

<template>
  <div>{{ apellidosNombre }}</div>
</template>
```

## 🎯 Ventajas de Esta Solución

| Ventaja | Descripción |
|---------|-------------|
| ✅ **Sin Conflictos** | Usa `if` para elegir qué datos mostrar |
| ✅ **No Toca Config** | Los archivos `documents.js` no se modifican |
| ✅ **Compatible** | Mantiene sistemas antiguos funcionando |
| ✅ **Escalable** | Funciona para cualquier documento |
| ✅ **Limpio** | Separación clara de responsabilidades |
| ✅ **Rápido** | Acceso O(1) a los datos |

## 📝 Ejemplo Práctico: Integración en MemoriaTecnica.vue

### Antes (Sin Pinia)
```vue
<template>
  <div>{{ numeroExpediente }}</div>
  <div>{{ apellidosNombre }}</div>
</template>

<script setup>
const props = defineProps({
  numeroExpediente: String,
  apellidosNombre: String,
  // ... todos los campos como props
})
</script>
```

### Después (Con Pinia)
```vue
<template>
  <div>{{ numeroExpediente }}</div>
  <div>{{ apellidosNombre }}</div>
</template>

<script setup>
import { useFormDataInDocument } from '@/app/composables/useFormDataInDocument'

const props = defineProps({
  numeroExpediente: String,
  apellidosNombre: String,
})

const { getFieldValue, hasFormData } = useFormDataInDocument()

// Computed que usa Pinia si hay datos, sino usa props
const numeroExpediente = computed(() => {
  return hasFormData.value 
    ? getFieldValue('numeroExpediente', props.numeroExpediente)
    : props.numeroExpediente
})

const apellidosNombre = computed(() => {
  return hasFormData.value
    ? getFieldValue('apellidosNombre', props.apellidosNombre)
    : props.apellidosNombre
})
</script>
```

## 🔄 Ciclo de Vida

```
1. Usuario abre página → formStore vacío → Muestra valores por defecto de props
2. Usuario rellena formulario y presiona "Generar PDF"
3. DocumentForm.submit() → formStore.setFormData(datos)
4. Store se actualiza reactivamente
5. Componentes de documento leen del store
6. HTML se genera con los datos del formulario
```

## 🚀 Instalación (Ya Hecha)

```bash
npm install pinia @pinia/nuxt
```

### En `nuxt.config.ts` (Ya Configurado)

```typescript
export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
  ],
  // ... resto de configuración
})
```

## ❓ Preguntas Frecuentes

### ¿Hay conflictos con `documents.js`?
**No.** El archivo `documents.js` no se modifica. Solo los componentes que usan esos datos acceden al store con un `if`.

### ¿Qué pasa si no hay datos en Pinia?
**Usa los props.** El composable tiene un fallback automático a los valores por defecto.

### ¿Es rápido?
**Sí.** Pinia es extremadamente eficiente. Acceso a propiedades reactivas en O(1).

### ¿Funciona offline?
**Sí.** Todo está en memoria del navegador. Los datos persisten mientras el usuario esté en la app.

### ¿Puedo guardar en localStorage?
**Sí.** Puedes agregar persistencia con `@pinia/plugin-persistedstate`:

```bash
npm install @pinia/plugin-persistedstate
```

## 📚 Archivos Afectados

✅ **Creados:**
- `app/stores/formStore.js` - Store de Pinia
- `app/composables/useFormDataInDocument.js` - Helper para componentes

✅ **Modificados:**
- `app/components/DocumentForm.vue` - Ahora guarda en Pinia al hacer submit
- `nuxt.config.ts` - Agregado módulo Pinia

✅ **No tocados:**
- `app/config/documents.js` - Sin cambios
- Componentes de documentos - Se actualizan opcionalmente

## 🎓 Siguiente Paso

Para usar esto en un documento, simplemente:

1. Importa el composable: `useFormDataInDocument`
2. Crea computed properties con el patrón del if
3. Listo - los datos del formulario se mostrarán automáticamente

¡Sin conflictos, sin complications! 🚀
