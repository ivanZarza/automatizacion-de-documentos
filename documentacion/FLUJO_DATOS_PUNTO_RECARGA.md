# 📊 Flujo de Datos: MemoriaTecnicaPuntoRecarga

## Arquitectura de Componentes y Datos

```
┌─────────────────────────────────────────────────────────────────┐
│                     app/config/documents.js                      │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ memoriaTecnicaPuntoRecargaConfig                          │  │
│  │  ├─ defaultData: {...}    (valores iniciales)            │  │
│  │  ├─ fields: [...]         (definición de formulario)     │  │
│  │  └─ capabilities: {...}   (permisos)                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│           app/pages/mtd-instalacion-puntos-recarga.vue           │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ • Importa: memoriaTecnicaPuntoRecargaConfig              │  │
│  │ • Importa: DocumentPage (componente wrapper)             │  │
│  │ • Importa: MemoriaTecnicaPuntoRecarga (visual)           │  │
│  │                                                           │  │
│  │ <DocumentPage :config="config"                           │  │
│  │               :documentComponent="MemoriaTecnicaPuntoRecarga"│
│  │ />                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                               ↓
┌─────────────────────────────────────────────────────────────────┐
│              app/components/DocumentPage.vue                     │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ useDocument(documentConfig)                              │  │
│  │  └─ formData: ref({...defaultData})                     │  │
│  │                                                           │  │
│  │ ┌─ Vista Preview ────────────────────────────────────┐  │  │
│  │ │ <component :is="documentComponent"                 │  │  │
│  │ │            v-bind="formData"                       │  │  │
│  │ │            :generatedDate="generatedDate" />       │  │  │
│  │ └─────────────────────────────────────────────────────┘  │  │
│  │                                                           │  │
│  │ ┌─ Vista Editar ────────────────────────────────────┐  │  │
│  │ │ <DocumentForm :fields="config.fields"             │  │  │
│  │ │               :initialData="formData"             │  │  │
│  │ │               @submit="handleFormSubmit" />        │  │  │
│  │ └─────────────────────────────────────────────────────┘  │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                          ↙            ↖
                    PREVIEW          EDITAR
                         ↙            ↖
      ┌──────────────────────────┐  ┌──────────────────────────┐
      │ MemoriaTecnicaPuntoRecarga│  │  DocumentForm            │
      │ ┌────────────────────────┤  ├─ formData binding        │
      │ │defineProps({           │  │  v-model                 │
      │ │  numeroExpediente,     │  │                          │
      │ │  numeroRegistro,       │  │ @submit emite nuevos     │
      │ │  apellidosNombre,      │  │ datos a DocumentPage     │
      │ │  ...todos los campos   │  └──────────────────────────┘
      │ │})                      │
      │ │                        │
      │ │{{ numeroExpediente }}  │
      │ │{{ numeroRegistro }}    │
      │ │{{ apellidosNombre }}   │
      │ │... visualización       │
      │ └────────────────────────┤
      └──────────────────────────┘
```

## Flujo de Actualización de Datos

```
USUARIO EDITA UN CAMPO
        ↓
DocumentForm recibe input en v-model
        ↓
v-model actualiza formData local
        ↓
Usuario hace click en "Guardar Cambios"
        ↓
@submit emite los nuevos datos
        ↓
DocumentPage.handleFormSubmit(newData)
        ↓
formData.value = newData (reactiva)
        ↓
saveChanges() cierra edición y muestra preview
        ↓
v-bind="formData" actualiza los props
        ↓
MemoriaTecnicaPuntoRecarga recibe nuevos props
        ↓
{{ variables }} en template se actualizan
        ↓
VISTA PREVIA ACTUALIZADA ✓
```

## Cambios Realizados

### 1. **MemoriaTecnicaPuntoRecarga.vue** (Componente de Visualización)

**ANTES:**
```javascript
import { ref } from 'vue'
import { memoriaTecnicaPuntoRecargaConfig } from '../app/config/documents.js'

const numeroExpediente = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroExpediente)
const numeroRegistro = ref(memoriaTecnicaPuntoRecargaConfig.defaultData.numeroRegistro)
// ... 60+ variables con ref()
```

**DESPUÉS:**
```javascript
defineProps({
  numeroExpediente: String,
  numeroRegistro: String,
  // ... todos los campos como props
  generatedDate: String
})
```

**VENTAJAS:**
- ✅ Los datos vienen de props (desde DocumentPage)
- ✅ Sincronización automática con el formulario
- ✅ No hay refs locales que no se actualizan
- ✅ Patrón consistente con MemoriaTecnica.vue

### 2. **Template**
Cambio menor: `{{ numeroExpedienteLocal }}` → `{{ numeroExpediente }}`

### 3. **Configuración en documents.js**
- ✅ `memoriaTecnicaPuntoRecargaConfig.defaultData` tiene todos los campos
- ✅ `memoriaTecnicaPuntoRecargaConfig.fields` define el formulario
- ✅ `capabilities` permite preview, edición y PDF

### 4. **Página: mtd-instalacion-puntos-recarga.vue**
- ✅ Pasa correctamente la config a DocumentPage
- ✅ Pasa correctamente el componente MemoriaTecnicaPuntoRecarga

## Resultado Final

✅ **Flujo de datos completamente funcional:**
1. Usuario abre la página de puntos de recarga
2. Ve la previsualización con datos por defecto
3. Hace click en "Editar"
4. Se abre el formulario con todos los campos
5. Modifica los campos (v-model vinculación)
6. Hace click en "Guardar Cambios"
7. Los datos se actualizan en la previsualización automáticamente
8. Puede descargar el PDF con los datos modificados

## Archivos Modificados
- `/app/components/MemoriaTecnicaPuntoRecarga.vue` - Script setup refactorizado
- `/app/pages/mtd-instalacion-puntos-recarga.vue` - Ya estaba correctamente configurado
- `/app/config/documents.js` - Ya estaba completamente configurado

## Estado de Errores
- ✅ No hay errores de compilación
- ✅ No hay advertencias de linting
- ✅ Patrón consistente con otros documentos (MemoriaTecnica)
