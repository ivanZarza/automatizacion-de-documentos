# 📚 Guía: ¿Cómo Funciona el Archivo `documents.js`?

## 🎯 ¿Qué es este archivo?

`documents.js` es un archivo de **configuración centralizada** que define todo lo que necesitas saber sobre cada documento que genera tu aplicación. Es como un "manual de instrucciones" para cada tipo de documento.

**Ubicación:** `/app/config/documents.js`

---

## 🧠 Concepto Principal: Configuración vs Código

### Sin configuración centralizada (❌ Forma antigua):
```javascript
// Cada componente tenía que saber TODO:
// - Qué campos mostrar
// - Qué valores por defecto usar
// - Cómo se llama el documento
// - Dónde guardarlo
// = CÓDIGO REPETIDO Y DESORDENADO
```

### Con configuración centralizada (✅ Forma nueva):
```javascript
// Un lugar con TODO lo que el documento necesita
// Los componentes solo consultan: "Oye, ¿qué necesito saber?"
// = CÓDIGO LIMPIO Y REUTILIZABLE
```

---

## 📋 Estructura Básica de una Configuración

Cada documento tiene esta estructura:

```javascript
export const miDocumentoConfig = {
  id: 'identificador-unico',           // 🏷️  Nombre único del documento
  title: 'Nombre Legible',              // 📖 Título que ve el usuario
  description: 'Breve descripción',     // 📝 Qué es este documento
  fileName: 'archivo.pdf',              // 💾 Nombre al descargar
  route: '/ruta-del-documento',         // 🛣️  URL en la aplicación
  
  defaultData: {                        // 📦 DATOS POR DEFECTO
    // Aquí van todos los valores iniciales
    campo1: 'valor1',
    campo2: 'valor2'
  },
  
  fields: [                             // 🎨 DEFINICIÓN DE CAMPOS
    // Aquí defines cómo se ve cada campo en el formulario
    { name: 'campo1', label: 'Etiqueta', type: 'text' }
  ],
  
  capabilities: {                       // ⚙️  QUÉ PUEDE HACER
    canPreview: true,      // ¿Mostrar vista previa?
    canEdit: true,         // ¿Permitir editar?
    canGeneratePDF: true   // ¿Generar PDF?
  }
}
```

---

## 🔍 Desglose Detallado de Cada Sección

### 1️⃣ Identificadores del Documento

```javascript
export const memoriaTecnicaConfig = {
  id: 'mtd-instalacion-autoconsumo-monofasica-con-bateria',
  title: '6.-  MTD (INSTALACION AUTOCONSUMO MONOFASICA CON BATERIA)',
  description: 'Documento técnico para instalaciones fotovoltaicas en baja tensión',
  fileName: '6-MTD-INSTALACION-AUTOCONSUMO-MONOFASICA-CON-BATERIA.pdf',
  route: '/mtd-instalacion-autoconsumo-monofasica-con-bateria',
  // ...
}
```

**¿Qué hace cada uno?**
- `id`: Identificador único interno. Úsalo para referenciar este documento en el código (ej: `getDocumentConfig('mtd-instalacion-autoconsumo-monofasica-con-bateria')`).
- `title`: El nombre que ve el usuario en pantalla
- `description`: Una breve descripción de qué es
- `fileName`: Cómo se llamará el archivo PDF cuando el usuario lo descargue
- `route`: La URL donde accedes a este documento (ej: http://localhost:3000/mtd-instalacion-autoconsumo-monofasica-con-bateria)

---

### 2️⃣ defaultData: Los Datos Iniciales

```javascript
defaultData: {
  // Datos de la Sección A
  apellidosNombre: 'Mateos Campos, Carmen',
  nifCif: '12345678-A',
  domicilio: 'Calle Prudencia, Nº 44',
  
  // Datos de la Sección B
  localidadEmplazamiento: 'Sevilla',
  provinciaEmplazamiento: 'Sevilla',
  
  // Y muchos más...
}
```

**¿Qué es esto?**
Es un objeto JavaScript con **pares clave-valor** que representan los datos iniciales del documento.

**¿Cuándo se usa?**
- Cuando abres el documento por primera vez
- Como "valores por defecto" si el usuario no ingresa nada
- Para mostrar un ejemplo de cómo debería verse

**¿Por qué es importante?**
Si cambias un valor aquí, **todos los documentos nuevos usarán este valor**. Así no tienes que escribirlo cada vez.

---

### 3️⃣ fields: La Definición de Campos

Este es el **corazón del formulario de edición**. Cada campo aquí genera un input en el formulario.

```javascript
fields: [
  // Campo de TEXTO simple
  {
    name: 'apellidosNombre',
    label: 'Apellidos y Nombre/Razón Social',
    placeholder: 'Ej: Mateos Campos, Carmen',
    type: 'text',
    fullWidth: true  // Ocupa todo el ancho
  },
  
  // Campo de EMAIL
  {
    name: 'correoElectronico',
    label: 'Correo Electrónico',
    placeholder: 'Ej: camaca59@gmail.com',
    type: 'email',
    fullWidth: true
  },
  
  // Campo de SELECT (desplegable)
  {
    name: 'usoDestino',
    label: 'Uso a que se destina',
    type: 'select',
    options: ['Nueva', 'Ampliación', 'Modificación']
  },
  
  // Campo de ARCHIVO (imagen)
  {
    name: 'planoEmplazamiento',
    label: 'Plano de Emplazamiento (Imagen)',
    type: 'file',
    accept: 'image/*',
    fullWidth: true
  },
  
  // Campo de TEXTAREA (texto largo)
  {
    name: 'gestiones',
    label: 'Gestiones a Realizar',
    type: 'textarea',
    rows: 4,  // Número de líneas
    fullWidth: true
  }
]
```

**Propiedades de cada campo:**

| Propiedad | ¿Qué es? | Ejemplo |
|-----------|----------|---------|
| `name` | Identificador único del campo. Debe coincidir con la clave en `defaultData` | `'apellidosNombre'` |
| `label` | Texto que ve el usuario arriba del input | `'Apellidos y Nombre'` |
| `placeholder` | Texto de ayuda gris dentro del input | `'Ej: Juan Pérez'` |
| `type` | Tipo de campo a mostrar | `'text'`, `'email'`, `'file'`, etc. |
| `fullWidth` | ¿Ocupa todo el ancho? (si no, va a 50%) | `true` o `false` |
| `options` | Solo para `select`: Lista de opciones | `['Opción1', 'Opción2']` |
| `accept` | Solo para `file`: Qué archivos aceptar | `'image/*'`, `'.pdf'` |
| `rows` | Solo para `textarea`: Altura del campo | `4`, `5`, `10` |

**Tipos de campos disponibles:**
- `'text'` - Texto simple
- `'email'` - Campo de correo (valida @)
- `'tel'` - Campo de teléfono
- `'date'` - Selector de fecha
- `'textarea'` - Texto largo multilínea
- `'select'` - Desplegable de opciones
- `'file'` - Carga de archivos/imágenes

---

### 4️⃣ capabilities: Qué Puede Hacer

```javascript
capabilities: {
  canPreview: true,      // ¿Mostrar vista previa del documento?
  canEdit: true,         // ¿Permitir que el usuario edite los campos?
  canGeneratePDF: true   // ¿Generar archivo PDF para descargar?
}
```

Si pones `false`, desactivas esa funcionalidad.

---

## 🔄 Flujo de Datos: Cómo Todo Funciona Junto

```
1. Usuario abre /mtd-instalacion-autoconsumo-monofasica-con-bateria
   ↓
2. La página carga `memoriaTecnicaConfig`
   ↓
3. DocumentForm.vue recibe `fields` y `defaultData`
   ↓
4. Genera HTML con inputs para CADA campo
   ↓
5. MemoriaTecnica.vue recibe los datos
   ↓
6. Muestra el documento formateado
   ↓
7. Usuario hace clic en "Generar PDF"
   ↓
8. Se descarga un archivo con `fileName: '6-MTD-INSTALACION-AUTOCONSUMO-MONOFASICA-CON-BATERIA.pdf'`
```

---

## 📝 Ejemplo Paso a Paso: Agregar un Campo Nuevo

Digamos que quieres agregar un campo "Número de Teléfono Alternativo".

### Paso 1: Agregar el dato por defecto

```javascript
defaultData: {
  // ... otros datos ...
  telefonoAlternativo: '+34-666-555-444',  // ← NUEVO
}
```

### Paso 2: Agregar la definición del campo

```javascript
fields: [
  // ... otros campos ...
  {
    name: 'telefonoAlternativo',
    label: 'Teléfono Alternativo',
    placeholder: 'Ej: +34-666-555-444',
    type: 'tel'
  },
  // ...
]
```

### Paso 3: Agregar el prop en el componente Vue

```vue
<script setup>
defineProps({
  // ... otros props ...
  telefonoAlternativo: String,  // ← NUEVO
})
</script>
```

### Paso 4: Usar el dato en el template

```vue
<template>
  <div>
    <p>Teléfono: {{ telefonoAlternativo }}</p>
  </div>
</template>
```

**¡Listo!** El formulario ahora tiene el campo nuevo, y los datos se guardan automáticamente.

---

## 🎯 Ventajas de Esta Forma de Trabajar

### ✅ **Centralización**
Todos los documentos en un solo lugar. Fácil de encontrar y modificar.

### ✅ **Reutilización**
Los componentes (DocumentForm, DocumentPage, etc.) funcionan con CUALQUIER documento, sin cambios.

### ✅ **Mantenimiento**
Cambiar un campo es tan fácil como editar un objeto JavaScript.

### ✅ **Consistencia**
Todos los documentos siguen la misma estructura y comportamiento.

### ✅ **Escalabilidad**
Agregar un nuevo documento es copiar una configuración y hacer cambios mínimos.

---

## 📚 Cómo se Usa en el Código

### Desde un Componente Vue:

```vue
<script setup>
import { memoriaTecnicaConfig } from '@/config/documents'

// Acceder a la configuración
console.log(memoriaTecnicaConfig.title)        // "Memoria Técnica..."
console.log(memoriaTecnicaConfig.defaultData)  // { apellidosNombre: '...', ... }
console.log(memoriaTecnicaConfig.fields)       // [{ name: '...', ... }, ...]
console.log(memoriaTecnicaConfig.capabilities) // { canPreview: true, ... }
</script>
```

### Función para obtener un documento por ID:

```javascript
import { getDocumentConfig } from '@/config/documents'

const config = getDocumentConfig('mtd-instalacion-autoconsumo-monofasica-con-bateria')
// Devuelve: memoriaTecnicaConfig
```

### Función para obtener TODOS los documentos:

```javascript
import { getAllDocuments } from '@/config/documents'

const docs = getAllDocuments()
// Devuelve: [
//   { id: 'autorizacionRepresentacion', title: '...', ... },
//   { id: 'memoriaTecnica', title: '...', ... }
// ]
```

---

## 🚀 Casos de Uso Comunes

### Caso 1: Cambiar un Valor Por Defecto
```javascript
// Los nuevos documentos usarán este valor
apellidosNombre: 'Carmen Mateos'  // Cambiar este valor
```

### Caso 2: Agregar un Nuevo Tipo de Campo
```javascript
fields: [
  {
    name: 'colorPrimario',
    label: 'Color Primario',
    type: 'color'  // Campo de selector de color
  }
]
```

### Caso 3: Hacer un Campo Solo para Vista Previa
```javascript
capabilities: {
  canPreview: true,
  canEdit: false,   // No se puede editar, solo ver
  canGeneratePDF: true
}
```

### Caso 4: Crear un Documento Nuevo
```javascript
export const miNuevoDocumentoConfig = {
  id: 'mi-nuevo-documento',
  title: 'Mi Nuevo Documento',
  description: 'Descripción breve',
  fileName: 'mi-nuevo-documento.pdf',
  route: '/mi-nuevo-documento',
  defaultData: { /* ... */ },
  fields: [ /* ... */ ],
  capabilities: { /* ... */ }
}

// Y agregarla al objeto documentConfigs:
export const documentConfigs = {
  autorizacionRepresentacion: autorizacionRepresentacionConfig,
  memoriaTecnica: memoriaTecnicaConfig,
  miNuevoDocumento: miNuevoDocumentoConfig  // ← NUEVO
}
```

---

## 🎓 Resumen: Lo Más Importante

| Concepto | Explicación |
|----------|-------------|
| **documents.js** | Archivo con la configuración de TODOS los documentos |
| **defaultData** | Los valores iniciales de cada campo |
| **fields** | Define cómo se ve y funciona cada campo en el formulario |
| **capabilities** | Qué acciones el usuario puede hacer (editar, ver, descargar) |
| **name (field)** | Debe coincidir con la clave en `defaultData` |
| **type (field)** | Define qué tipo de input HTML se genera |
| **Reutilización** | Los componentes Vue funcionan igual para todos los documentos |

---

## ❓ Preguntas Frecuentes

**P: ¿Tengo que cambiar el código de Vue si agrego un campo?**
A: No, solo agrega en `defaultData` y `fields`. El componente DocumentForm se encarga de generar el input automáticamente.

**P: ¿Dónde guardo mis imágenes?**
A: Las imágenes se guardan como datos en base64 en el campo de la configuración.

**P: ¿Puedo tener documentos diferentes sin usar esta estructura?**
A: Sí, pero perderías todas las ventajas (reutilización, mantenimiento, consistencia).

**P: ¿Qué pasa si cambio `defaultData` después de que el usuario guardó datos?**
A: Los datos guardados no cambian. Solo los documentos NUEVOS usarán los nuevos valores por defecto.

---

## 🔗 Referencias Rápidas

- **Ver todos los campos:** `memoriaTecnicaConfig.fields.map(f => f.name)`
- **Ver un campo específico:** `memoriaTecnicaConfig.fields.find(f => f.name === 'apellidosNombre')`
- **Cambiar un valor por defecto:** Editar `defaultData`
- **Agregar validación:** (Próxima feature a implementar)

---

**¡Ya lo entiendes!** Ahora puedes agregar campos, crear nuevos documentos y mantener todo organizado sin tocar el código de los componentes. 🎉
