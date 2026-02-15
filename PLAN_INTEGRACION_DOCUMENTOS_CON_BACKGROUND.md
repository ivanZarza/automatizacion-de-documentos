# Plan de Integración de Documentos con Imágenes de Fondo

## 📋 Contexto General

Este proyecto implementa un **sistema de generación dinámica de documentos PDF** donde los datos del usuario (almacenados en un **formulario maestro**) se distribuyen a múltiples documentos específicos. El sistema ya cuenta con un documento de ejemplo completamente funcional: **ZCertificadoBR**.

**Objetivo Actual:** Replicar el patrón exitoso de ZCertificadoBR a tres nuevos documentos que utilizarán **imágenes de fondo como plantillas**.

---

## 🔄 Flujo General de Datos (Data Pipeline)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                        FLUJO DE DATOS CENTRAL                            │
└─────────────────────────────────────────────────────────────────────────┘

1. USUARIO LLENA FORMULARIO MAESTRO
   ↓
2. DATOS GUARDADOS EN localStorage (JSON formDataMaestro)
   ↓
3. USUARIO ABRE DOCUMENTO ESPECÍFICO (ej: /nuevo-documento)
   ↓
4. DocumentPage.vue CARGA DATOS
   ├─ loadFromStorage() → obtiene datos del maestro
   ├─ getMergedDocumentData(config) → aplica fieldMapping
   └─ v-bind="formData" → pasa props al componente
   ↓
5. COMPONENTE RENDERER (ej: NuevoDocumento.vue) RECIBE PROPS
   ├─ Sincroniza props a etiquetas array con watcher
   ├─ Renderiza elementos superpuestos sobre imagen de fondo
   └─ Calcula displayValue (oculta valores específicos si es necesario)
   ↓
6. USUARIO VE DOCUMENTO RENDERIZADO EN PDF PREVIEW
   ↓
7. USUARIO PUEDE EDITAR EN LA PÁGINA (DocumentForm)
   ├─ Auto-save a localStorage cada 500ms (debounce)
   ├─ updateStoragePartially() → merge inteligente
   └─ Props se actualizan → componente re-renderiza
   ↓
8. USUARIO GENERA PDF CON generatePDF()
```

---

## 📊 Arquitectura de Archivos

### Estructura por Documento

Para cada documento nuevo se modifican/crean estos archivos:

```
app/
├── config/
│   ├── masterFormFields.js          ← Agregar campos específicos del documento
│   └── documents.js                 ← Agregar config (fields, defaults, fieldMapping)
│
├── components/
│   └── [NuevoDocumento].vue         ← CREAR: Renderizador con etiquetas y props
│
├── pages/
│   └── [nuevo-documento].vue        ← CREAR: Página contenedora (usa DocumentPage)
│
└── public/
    └── documentos-oficiales/
        └── [documento-fondo].jpg    ← Imagen de fondo (ya existe)
```

---

## 🎯 Pasos Detallados para Incluir un Nuevo Documento

### PASO 1: Identificar el Documento
**Objetivo:** Documentar qué documentos vamos a integrar

**Acciones:**
- [ ] Listar los 3 documentos (nombres exactos)
- [ ] Ubicar las imágenes de fondo (verificar ruta en `/public/documentos-oficiales/`)
- [ ] Crear archivo checklist con propiedades de cada documento

**Entregables:**
- Nombre del documento
- Ruta de imagen fondo
- Identificador único (ej: `certificado-teja-coplanar`)

---

### PASO 2: Diseñar el Mapa de Campos
**Objetivo:** Identificar qué campos se localizarán en cada documento

**Acciones:**
- [ ] Abrir imagen de fondo del documento
- [ ] Identificar visualmente dónde irá cada variable
- [ ] Anotar coordenadas aproximadas (x, y en mm respecto a la imagen A4)
- [ ] Identificar si hay campos con markers (checkbox, X, o similar)

**Entregables:**
- Tabla con campos y coordenadas:
  ```
  | Campo        | x (mm) | y (mm) | w (mm) | h (mm) | Tiene markers? |
  |--------------|--------|--------|--------|--------|--------|
  | campo1       | 50     | 100    | 20     | 6      | No     |
  | campo2       | 100    | 150    | 30     | 2.3    | Sí     |
  ```

---

### PASO 3: Actualizar masterFormFields.js
**Objetivo:** Agregar los campos específicos del nuevo documento al formulario maestro

**Acciones:**
```javascript
// En app/config/masterFormFields.js

// Agregar NUEVA SECCIÓN (si es necesario) o SUBSECCIÓN
// Ejemplo:
{
  name: '[nombreCampo]',
  label: '[Etiqueta Visible]',
  placeholder: 'Ej: ...',
  type: 'text', // o 'select', 'textarea', 'date', 'file'
  options: [...], // si es select
  subsection: '[DOCUMENTO]', // ej: 'CERTIFICADO_TEJA'
  fullWidth?: true
}
```

**Convenciones de Nombres:**
- Campos específicos del documento: usar prefijo o subsection
- Campos compartidos: reutilizar los de LEGALIZACION

**Entregables:**
- Todos los campos agregados a masterFormFields
- Cada campo tiene `subsection` para agrupar en formulario

---

### PASO 4: Actualizar documents.js
**Objetivo:** Configurar el documento en el sistema (config centralizada)

**Acciones:**
Crear un nuevo objeto de configuración:`[nombreDocumento]Config` con la estructura:

```javascript
export const [nombreDocumento]Config = {
  id: '[identificador-unico]',
  title: '[Nombre Visible del Documento]',
  description: '...',
  fileName: '[nombre-archivo].pdf',
  route: '/[ruta-pagina]',
  
  fields: [
    { name: 'campo1', label: 'Etiqueta', type: 'text' },
    { name: 'campo2', label: 'Etiqueta', type: 'select', options: [...] },
    // ... todos los campos
  ],
  
  defaultData: {
    campo1: '',
    campo2: '',
    // ... inicializar todos en ''
  },
  
  fieldMapping: {
    campo1: 'campo1',  // 1:1 si tienen el mismo nombre
    campo2: 'campoMaestro',  // mapeo diferente si es necesario
    // ... mapear a campos en masterFormFields
  },
  
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  },
  
  category: '[categoria]'
}
```

**Nombres Consistentes:**
- documentConfig, defaultData, fieldMapping siempre con esos nombres
- fields siempre es un array de objetos
- defaultData y fieldMapping tienen TODAS las claves de fields

**Entregables:**
- Config completa agregada a documents.js
- Exportada correctamente

---

### PASO 5: Crear Componente Renderer
**Objetivo:** Crear el componente Vue que renderiza el documento

**Archivo:** `app/components/[NombreDocumento].vue`

**Estructura Base:**
```vue
<template>
  <div class="print-wrapper">
    <article class="pagina-documento">
      <!-- Imagen de fondo -->
      <!-- Overlays de texto posicionados -->
      <span
        v-for="et in etiquetasVisibles"
        :key="et.name"
        class="overlay-field"
        :style="estiloEtiqueta(et)"
      >
        {{ et.displayValue }}
      </span>
      <!-- Marcadores de checkboxes (si existen) -->
    </article>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  campo1: { type: String, default: '' },
  campo2: { type: String, default: '' },
  // ... un prop por cada campo del config
})

const etiquetas = ref([
  {
    name: 'campo1',
    x: 50,      // coordenada x en mm
    y: 100,     // coordenada y en mm
    w: 20,      // ancho mínimo
    h: 6,       // altura
    fontSize: 7.5,
    align: 'right',
    value: '',
    // markers: { 'valor1': {x: ..., y: ...}, ... } si tiene checkboxes
  },
  // ... más etiquetas
])

// Watcher para sincronizar props → etiquetas
watch(
  () => Object.fromEntries(Object.keys(props).map((k) => [k, props[k]])),
  (newVals) => {
    etiquetas.value = etiquetas.value.map((e) => {
      const propVal = newVals[e.name]
      const finalValue = propVal !== undefined && propVal !== null && String(propVal) !== '' ? propVal : ''
      return { ...e, value: finalValue }
    })
  },
  { deep: true, immediate: true }
)

// Ocultar ciertos valores (ej: "monofásica", "nueva")
const etiquetasVisibles = computed(() => {
  const ocultar = new Set(['valor_ocultar_1', 'valor_ocultar_2'])
  return etiquetas.value.map((e) => {
    const val = e.value && String(e.value).trim().toLowerCase()
    return {
      ...e,
      displayValue: ocultar.has(val) ? '' : e.value
    }
  })
})

// Calcular marcadores (X en checkboxes)
const marcadores = computed(() =>
  etiquetas.value
    .map((e) => {
      if (!e.markers) return null
      const val = e.value && String(e.value).trim()
      const coord = e.markers?.[val]
      return coord ? { name: e.name, x: coord.x, y: coord.y } : null
    })
    .filter(Boolean)
)

const estiloEtiqueta = (e) => ({
  position: 'absolute',
  left: `${e.x}mm`,
  top: `${e.y}mm`,
  minWidth: `${e.w}mm`,
  width: 'auto',
  height: `${e.h}mm`,
  fontSize: `${e.fontSize}pt`,
  display: 'inline-block',
  direction: 'ltr',
  textAlign: 'left',
  padding: '0 1mm',
  boxSizing: 'border-box',
  whiteSpace: 'nowrap',
  overflow: 'visible'
})

const estiloMarcador = (m) => ({
  position: 'absolute',
  left: `${m.x}mm`,
  top: `${m.y}mm`,
  fontSize: '10pt',
  fontWeight: 700,
  transform: 'translate(-50%,-50%)',
  pointerEvents: 'none'
})
</script>

<style scoped>
.print-wrapper {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 8mm 0;
  background: #f0f0f0;
}

.pagina-documento {
  width: 200mm;
  height: 287mm;
  position: relative;
  background-image: url('/documentos-oficiales/[nombre-archivo].jpg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: 110% 100%;
  font-family: Arial, sans-serif;
  font-size: 7.1pt;
}

@media print {
  .print-wrapper { padding: 0; background: #fff; }
  .pagina-documento {
    border: 0;
    box-shadow: none;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
</style>
```

**Puntos Clave:**
- Props deben coincidir exactamente con config.fields
- Etiquetas array debe listar todos los puntos de overlay
- Watcher sincroniza props → etiquetas.value
- Compute etiquetasVisibles maneja ocultación de valores
- CSS usa `background-image` para imagen de fondo
- Estilos preparados para impresión

**Entregables:**
- Componente funcional sin errores de sintaxis
- Todos los campos como props
- Todas las etiquetas posicionadas correctamente

---

### PASO 6: Crear Página Contenedora
**Objetivo:** Crear la página que enruta al documento

**Archivo:** `app/pages/[nuevo-documento].vue`

**Contenido Mínimo:**
```vue
<template>
  <DocumentPage :config="config" :documentComponent="documentComponent" />
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import NuevoDocumento from '../components/NuevoDocumento.vue'
import { nuevoDocumentoConfig } from '../config/documents.js'

const config = nuevoDocumentoConfig
const documentComponent = NuevoDocumento
</script>
```

**Entregables:**
- Página creada en `app/pages/`
- Importa config e componente correctamente
- Ruta coincide con `config.route`

---

### PASO 7: Verificar Conexión Completa
**Objetivo:** Validar que todo esté conectado correctamente

**Checklist:**
- [ ] Campo en masterFormFields → guardado en localStorage
- [ ] Config en documents.js → fields, defaultData, fieldMapping completos
- [ ] Props en componente → coinciden con fields
- [ ] Etiquetas en componente → una por cada campo
- [ ] Página creada → importa componente y config
- [ ] No hay errores de sintaxis en archivos modificados

**Testing Manual:**
1. Ir a `/formulario-maestro`
2. Llenar campos de LEGALIZACION + nuevos campos del documento
3. Click "Guardar y Continuar"
4. Ir a `/nuevo-documento`
5. Verificar datos cargados en preview
6. Click ✏️ Editar
7. Editar un campo y guardar
8. Verificar en localStorage DevTools que se sincronizó

---

## 📁 Resumen de Archivos a Modificar

| Archivo | Acción | Descripción |
|---------|--------|-------------|
| `app/config/masterFormFields.js` | MODIFY | Agregar campos nuevos del documento |
| `app/config/documents.js` | MODIFY | Agregar config del documento |
| `app/components/[Documento].vue` | CREATE | Nuevo componente renderer |
| `app/pages/[documento].vue` | CREATE | Nueva página contenedora |

---

## 🔗 Relaciones y Dependencias

```
masterFormFields
  ↓ (proporciona campos y subsecciones)
  ↓
DocumentForm
  ↓ (agrupa por subsection, renderiza inputs)
  ↓
formulario-maestro.vue (página maestra)
  ↓ (guarda a localStorage)
  ↓
localStorage (formDataMaestro)
  ↓ (datos persistidos)
  ↓
DocumentPage.vue + config
  ├─ getMergedDocumentData() (aplica fieldMapping)
  ├─ documentComponent (receiver de props)
  └─ DocumentForm (para ediciones)
  ↓
[Documento].vue (renderer visual)
  ├─ etiquetas array (posiciones)
  ├─ watcher (syncs props)
  └─ generatePDF() (exportación)
```

---

## ⚠️ Puntos Críticos a Recordar

1. **Nombres Consistentes:**
   - masterFormFields: `name` es la clave única
   - documents.js config: `fields`, `defaultData`, `fieldMapping` siempre presentes
   - fieldMapping: TODAS las claves de `fields` deben estar mapeadas
   - Props en componente: UNO por cada campo en fields

2. **Flujo de Datos:**
   - Master → localStorage → merge (aplica fieldMapping) → props → watcher → etiquetas → rendered

3. **Edición y Persistencia:**
   - DocumentForm auto-guarda con debounce (500ms)
   - usa `updateStoragePartially()` (merge, no sobrescribe)
   - watcher en componente detecta cambios y re-renderiza

4. **Convenciones Visuales:**
   - Etiquetas con `displayValue` vacío si valor debe ocultarse
   - Markers para checkboxes/X (sólo si el campo lo define)
   - Coordenadas en mm, origen arriba-izquierda

---

## 📝 Template de Checklist para Nuevo Documento

Replicate este checklist para cada documento nuevo:

```markdown
### Documento: [NOMBRE]

**Fase 1: Planificación**
- [ ] Imagen de fondo obtenida
- [ ] Campos identificados y mapeados con coordenadas
- [ ] Decisión: campos nuevos o reutilizar del maestro

**Fase 2: Código**
- [ ] Campos agregados a masterFormFields.js
- [ ] Config creada en documents.js (fields, defaults, mapping)
- [ ] Componente [Documento].vue creado
- [ ] Página [documento].vue creada
- [ ] Sin errores de sintaxis

**Fase 3: Testing**
- [ ] Datos se guardan en master
- [ ] Datos se cargan en documento
- [ ] FormEdit funciona y sileia cambios
- [ ] PDF se genera correctamente
```

---

## 🚀 Próximos Pasos Desde Aquí

1. **Usuario identifica los 3 documentos** y proporciona:
   - Nombre exacto de cada uno
   - Ruta de imagen de fondo
   - Lista de campos por documento

2. **Para cada documento, ejecutar secuencialmente:**
   - Pasos 1-7 en orden
   - Testing después de cada paso
   - Commit a git después de completar documento

3. **Refactorización opcional:**
   - Si hay mucha duplicación, crear componente base reutilizable
   - Centralizar lógica de markers si es común

---

## 📚 Referencias

- **ZCertificadoBR:** Documento ejemplo completamente funcional
- **Patrón a seguir:** Todo nuevo documento sigue la misma estructura
- **Data Flow:** Ver sección "Flujo General de Datos" para entender completo camino

---

**Versión:** 1.0  
**Fecha:** 2026-02-15  
**Estado:** Listo para implementación
