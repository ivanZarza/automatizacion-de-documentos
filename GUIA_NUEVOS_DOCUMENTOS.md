# Guía para Agregar Nuevos Documentos

Esta aplicación está diseñada para ser escalable y modular. Puedes agregar nuevos documentos siguiendo estos pasos:

## Estructura del Proyecto

```
app/
├── components/
│   ├── AutorizacionRepresentacion.vue    # Componente de documento
│   ├── Boton.vue
│   ├── DocumentForm.vue
│   └── DocumentPage.vue                  # Componente genérico para páginas
├── pages/
│   ├── index.vue                         # Página principal
│   └── autorizacion-representacion.vue   # Página específica del documento
├── composables/
│   └── useDocument.js                    # Lógica reutilizable
└── config/
    └── documents.js                      # Configuración centralizada
```

## Paso 1: Crear la Configuración del Documento

Edita `app/config/documents.js` y añade tu nuevo documento:

```javascript
export const tuDocumentoConfig = {
  id: 'tu-documento',
  title: 'Título del Documento',
  description: 'Descripción del documento',
  fileName: 'tu-documento.pdf',
  route: '/tu-documento',
  defaultData: {
    campo1: 'valor por defecto',
    campo2: 'otro valor',
    // ... más campos
  },
  fields: [
    { name: 'campo1', label: 'Etiqueta del Campo 1', placeholder: 'Ej: valor', type: 'text' },
    { name: 'campo2', label: 'Etiqueta del Campo 2', placeholder: 'Ej: valor', type: 'textarea', fullWidth: true },
    // ... más campos
  ],
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  }
}

// Agregar a documentConfigs
export const documentConfigs = {
  autorizacionRepresentacion: autorizacionRepresentacionConfig,
  tuDocumento: tuDocumentoConfig  // ← Añadir aquí
}
```

## Paso 2: Crear el Componente de Documento

Crea un nuevo archivo en `app/components/`, por ejemplo `TuDocumento.vue`:

```vue
<template>
  <div data-pdf-content class="bg-white p-0" style="width: 210mm; margin: 0 auto; font-family: 'Segoe UI', Arial, sans-serif;">
    <div style="width: 90%; margin: 0 auto;">
      <!-- Tu contenido del documento aquí -->
      <h1>{{ campo1 }}</h1>
      <p>{{ campo2 }}</p>
      
      <!-- Pie de página -->
      <div style="padding: 30px; border-top: 1px solid #0066cc; margin-top: 40px; text-align: center;">
        <p style="margin: 3px 0;">Información de tu empresa</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  campo1: String,
  campo2: String,
  generatedDate: String
})
</script>
```

## Paso 3: Crear la Página del Documento

Crea un nuevo archivo en `app/pages/`, por ejemplo `tu-documento.vue`:

```vue
<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import TuDocumento from '../components/TuDocumento.vue'
import { tuDocumentoConfig } from '../config/documents'
</script>

<template>
  <DocumentPage 
    :config="tuDocumentoConfig"
    :documentComponent="TuDocumento"
  />
</template>
```

## Paso 4: Tipos de Campos Disponibles

En `fields`, puedes usar los siguientes tipos:

- `text` - Campo de texto simple
- `email` - Campo de email
- `tel` - Campo de teléfono
- `date` - Selector de fecha
- `textarea` - Área de texto multilínea
- `select` - Selector con opciones

Ejemplo:

```javascript
{ name: 'email', label: 'Email', placeholder: 'ejemplo@correo.com', type: 'email' },
{ name: 'tipo', label: 'Tipo', type: 'select', options: ['Opción 1', 'Opción 2'], fullWidth: true },
```

## Flujo de Uso

1. El usuario accede a la página principal
2. Ve una tarjeta con el documento disponible
3. Hace clic en "Ir al documento"
4. Se muestra automáticamente la vista previa
5. Puede editar los datos
6. Puede generar un PDF
7. Puede volver a la vista previa

## Componentes Reutilizables

- **DocumentPage.vue** - Gestiona todo el flujo (previsualización, edición, PDF)
- **DocumentForm.vue** - Formulario para editar datos
- **Boton.vue** - Botones reutilizables
- **useDocument.js** - Lógica de estados y acciones

## Notas Importantes

- Los documentos deben tener un ancho de `210mm` para que se impriman correctamente en A4
- El componente DocumentPage maneja automáticamente la fecha generada
- Los botones se ocultan automáticamente al imprimir
- La configuración centralizada permite mantener la consistencia
