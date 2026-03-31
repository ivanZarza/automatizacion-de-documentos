# Documentación - DocumentModal.vue

## Descripción General
`DocumentModal.vue` es un componente modal reutilizable diseñado para mostrar opciones de acciones sobre documentos. Permite personalizar completamente el título y las opciones disponibles, haciendo que sea fácil de reutilizar en diferentes contextos.

## Ubicación
`app/components/DocumentModal.vue`

## Características
- ✅ Modal reutilizable con fondo oscuro semi-transparente
- ✅ Opciones de acciones dinámicas y personalizables
- ✅ Estilos de colores personalizables por opción
- ✅ Botón de cancelación incluido
- ✅ Cierre del modal mediante evento emit

## Props

### `isOpen` (Boolean, requerido)
Controla si el modal está visible o no.

**Tipo:** `Boolean`  
**Valor por defecto:** ninguno (requerido)  
**Ejemplo:**
```vue
<DocumentModal :isOpen="showModal" />
```

### `title` (String, opcional)
Título que se muestra en la parte superior del modal.

**Tipo:** `String`  
**Valor por defecto:** `'Opciones del Documento'`  
**Ejemplo:**
```vue
<DocumentModal title="Autorización de Representación" />
```

### `options` (Array, requerido)
Array de opciones que se mostrarán como botones. Cada opción debe tener la siguiente estructura:

**Tipo:** `Array`  
**Estructura de cada opción:**
```javascript
{
  id: 'unique-id',           // Identificador único
  label: 'Nombre del botón',  // Texto del botón
  icon: '👁️',                 // Emoji o ícono
  colorClass: 'bg-blue-500 hover:bg-blue-600', // Clases de Tailwind
  action: () => {}            // Función a ejecutar al clickear
}
```

**Ejemplo:**
```vue
<DocumentModal 
  :options="[
    {
      id: 'preview',
      label: 'Previsualizar',
      icon: '👁️',
      colorClass: 'bg-blue-500 hover:bg-blue-600',
      action: () => previewDocument()
    },
    {
      id: 'edit',
      label: 'Editar',
      icon: '✏️',
      colorClass: 'bg-green-500 hover:bg-green-600',
      action: () => editDocument()
    }
  ]"
/>
```

## Eventos

### `close`
Se emite cuando el usuario hace clic en el botón "Cancelar".

**Parámetros:** ninguno  
**Uso:**
```vue
<DocumentModal @close="handleClose" />
```

## Ejemplo de Uso Completo

```vue
<template>
  <div>
    <button @click="openModal">Abrir Modal</button>
    
    <DocumentModal 
      :isOpen="showModal"
      title="Mi Documento"
      :options="modalOptions"
      @close="showModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DocumentModal from '@/components/DocumentModal.vue'

const showModal = ref(false)

const modalOptions = [
  {
    id: 'preview',
    label: 'Previsualizar',
    icon: '👁️',
    colorClass: 'bg-blue-500 hover:bg-blue-600',
    action: () => {
      console.log('Previsualizando...')
      showModal.value = false
    }
  },
  {
    id: 'edit',
    label: 'Editar',
    icon: '✏️',
    colorClass: 'bg-green-500 hover:bg-green-600',
    action: () => {
      console.log('Editando...')
      showModal.value = false
    }
  },
  {
    id: 'pdf',
    label: 'Generar PDF',
    icon: '📄',
    colorClass: 'bg-red-500 hover:bg-red-600',
    action: () => {
      console.log('Generando PDF...')
      showModal.value = false
    }
  }
]

const openModal = () => {
  showModal.value = true
}
</script>
```

## Estilos y Apariencia

### Estructura del Modal
- Fondo: Overlay oscuro semi-transparente (z-index: 50)
- Contenedor: Fondo blanco con bordes redondeados y sombra
- Botones: Ancho completo (100%) con relleno y espaciado

### Colores Predefinidos para Botones
- **Previsualizar:** Azul (`bg-blue-500 hover:bg-blue-600`)
- **Editar:** Verde (`bg-green-500 hover:bg-green-600`)
- **Generar PDF:** Rojo (`bg-red-500 hover:bg-red-600`)
- **Cancelar:** Gris (`bg-gray-400 hover:bg-gray-500`)

## Casos de Uso Recomendados

1. **Documentos administrativos:** Mostrar opciones para previsualizar, editar o descargar
2. **Formularios:** Permitir acciones múltiples sobre un formulario
3. **Gestión de contenido:** Ofrecer opciones de edición, vista previa o eliminación

## Ventajas

- Reutilizable en múltiples partes de la aplicación
- Totalmente personalizable (título, opciones, colores)
- Fácil de integrar con otros componentes
- Mantiene la consistencia de diseño
- Comportamiento predecible y accesible

## Notas Importantes

- El componente **no cierra automáticamente** al hacer clic en una opción; cada acción debe manejar el cierre del modal
- El botón "Cancelar" emite el evento `close` automáticamente
- Las funciones de `action` deben ser funciones pasadas como referencia
