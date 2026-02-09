# 📊 Arquitectura del Sistema con Pinia

## Diagrama del Flujo de Datos

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         PÁGINA CON FORMULARIO                           │
│  (ej: autorizacion-representacion.vue, memoria-tecnica.vue)             │
└─────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │   DocumentForm.vue        │
                    │  (Componente de Formulario)│
                    └───────────────────────────┘
                                    │
                   (Usuario rellena y presiona "Generar PDF")
                                    │
                                    ▼
        ┌──────────────────────────────────────────────────┐
        │           submit() en DocumentForm               │
        │                                                  │
        │  1. formStore.setFormData(formData.value)       │
        │  2. setFormData('formularioCliente', data)      │
        │  3. emit('submit', formData.value)              │
        └──────────────────────────────────────────────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
        ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
        │  Pinia Store │   │   Composable │   │   Evento     │
        │              │   │   Legacy     │   │   (props)    │
        │ formData={   │   │              │   │              │
        │   ...datos   │   │  Fallback    │   │              │
        │ }            │   │  Compatib.   │   │              │
        └──────────────┘   └──────────────┘   └──────────────┘
                │                   │                   │
                │         ┌─────────┴───────────┐       │
                │         │                     │       │
                ▼         ▼                     ▼       ▼
    ┌─────────────────────────────────────────────────────────┐
    │         Componentes de Documento (HTML)                 │
    │    (MemoriaTecnica, AutorizacionRepresentacion, etc)    │
    │                                                         │
    │  const { getFieldValue, hasFormData } =                │
    │    useFormDataInDocument()                             │
    │                                                         │
    │  const apellidosNombre = computed(() => {              │
    │    if (hasFormData.value) {                            │
    │      return getFieldValue('apellidosNombre')           │
    │    } else {                                            │
    │      return props.apellidosNombre || 'N/A'             │
    │    }                                                    │
    │  })                                                     │
    │                                                         │
    │  <div>{{ apellidosNombre }}</div>                       │
    └─────────────────────────────────────────────────────────┘
                                    │
                                    ▼
                    ┌───────────────────────────┐
                    │   HTML Renderizado con    │
                    │   datos del formulario    │
                    │                           │
                    │   (Listos para PDF)       │
                    └───────────────────────────┘
```

## Componentes Clave

### 1️⃣ **Store Pinia** (`app/stores/formStore.js`)
```javascript
import { useFormStore } from '@/app/stores/formStore'

const store = useFormStore()

// Métodos:
store.setFormData(data)      // Guardar datos
store.getFormData()          // Obtener todo
store.getField('nombre')     // Obtener un campo
store.clearFormData()        // Limpiar
store.hasData                // ¿Hay datos?
```

### 2️⃣ **Composable Helper** (`app/composables/useFormDataInDocument.js`)
```javascript
import { useFormDataInDocument } from '@/app/composables/useFormDataInDocument'

const { 
  getFieldValue,          // Obtener campo con fallback
  hasFormData,            // ¿Hay datos?
  getDataWithFallback     // Merge con otros datos
} = useFormDataInDocument()
```

### 3️⃣ **DocumentForm.vue** (actualizado)
```javascript
const submit = () => {
  formStore.setFormData(formData.value)         // ← Nuevo: Pinia
  setFormData('formularioCliente', formData.value)  // ← Antiguo: Composable
  emit('submit', formData.value)                 // ← Props (compatibilidad)
}
```

## Uso en Documentos

### ✅ Simple (Recomendado)

```vue
<script setup>
import { useFormDataInDocument } from '@/app/composables/useFormDataInDocument'
import { computed } from 'vue'

const props = defineProps({ apellidosNombre: String })
const { getFieldValue, hasFormData } = useFormDataInDocument()

const apellidosNombre = computed(() => 
  hasFormData.value 
    ? getFieldValue('apellidosNombre', props.apellidosNombre)
    : props.apellidosNombre
)
</script>

<template>
  <div>{{ apellidosNombre }}</div>
</template>
```

### 🏗️ Avanzado (Si necesitas todo en una línea)

```javascript
const { getDataWithFallback } = useFormDataInDocument()
const mergedData = getDataWithFallback(props)

// Ahora mergedData tiene:
// - Datos de Pinia si existen
// - Datos de props si no existen en Pinia
```

## 🔄 Ciclo de Vida Completo

```
1. Usuario accede a página
   └─ formStore vacío
   └─ Documentos muestran props por defecto

2. Usuario rellena formulario y presiona "Generar PDF"
   └─ DocumentForm.submit() ejecuta
   └─ formStore.setFormData(datos)
   └─ Store se actualiza (reactivamente)

3. Documentos detectan cambio en store
   └─ hasFormData.value = true
   └─ Campos se actualizan con datos de Pinia
   └─ HTML se re-renderiza

4. HTML generado = datos + estilos
   └─ Listo para exportar a PDF
```

## ✨ Ventajas Clave

| Característica | Ventaja |
|---|---|
| **Pinia** | Store centralizado, reactividad automática |
| **Sin conflictos** | `documents.js` no se modifica |
| **Fallback** | Si no hay datos, usa props |
| **Escalable** | Funciona para cualquier documento |
| **Compatible** | Mantiene sistema anterior activo |
| **Rápido** | Acceso O(1), caché de computed |
| **Debugging** | Vue DevTools integrado |

## 🚀 Próximos Pasos

Para integrar en un documento:

1. Importar el composable
2. Obtener `getFieldValue` y `hasFormData`
3. Crear computed properties con el patrón del if
4. ¡Listo!

No es necesario modificar:
- `documents.js`
- `nuxt.config.ts` (Pinia ya está configurado)
- Estructura de carpetas

Solo agregar 3-4 líneas de código por documento.

---

**Estado**: ✅ Sistema implementado y pusheado (commit `4c5e452`)
