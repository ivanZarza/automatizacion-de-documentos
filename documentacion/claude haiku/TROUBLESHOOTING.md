# 🔧 GUÍA DE TROUBLESHOOTING Y DEBUGGING

## Tabla de Contenidos
1. [Problemas en Desarrollo](#problemas-en-desarrollo)
2. [Errores Comunes de Formulario](#errores-comunes-de-formulario)
3. [Problemas con PDF](#problemas-con-pdf)
4. [Errores de Props/Data](#errores-de-propsdata)
5. [Problemas de Renderizado](#problemas-de-renderizado)
6. [Debugging de Performance](#debugging-de-performance)
7. [Checklist de Diagnóstico](#checklist-de-diagnóstico)
8. [Herramientas de Debug](#herramientas-de-debug)

---

## 🚀 Problemas en Desarrollo

### El proyecto no inicia

**Síntoma:**
```
Error: Port 3000 is already in use
Error: Cannot find module './components/...'
Module parse failed
```

**Soluciones:**

1. **Puerto en uso:**
   ```bash
   # Encontrar proceso en puerto 3000
   lsof -i :3000
   
   # Matar proceso
   kill -9 <PID>
   
   # O cambiar puerto
   PORT=3001 yarn dev
   ```

2. **Módulo no encontrado:**
   ```bash
   # Verificar que existe el archivo
   ls -la app/components/MiComponente.vue
   
   # Verificar ruta relativa
   import MiComponente from '../components/MiComponente.vue'
   # Correcto: ../components
   # Incorrecto: ./components o /components
   ```

3. **Caché corrupta:**
   ```bash
   rm -rf .nuxt
   rm -rf node_modules
   npm install
   yarn dev
   ```

---

### Hot Module Replacement no funciona

**Síntoma:**
Cambio archivo pero no aparece en navegador, debo recargar manualmente.

**Causas y soluciones:**

```javascript
// ❌ INCORRECTO - No reactivo
export default {
  data: {
    titulo: 'Titulo'
  }
}

// ✅ CORRECTO - Reactivo
import { ref } from 'vue'
const titulo = ref('Titulo')
```

```javascript
// ❌ INCORRECTO - Props mutables
const handleChange = () => {
  props.data.campo = 'nuevo' // No funciona HMR
}

// ✅ CORRECTO - Emit
const emit = defineEmits(['update'])
const handleChange = () => {
  emit('update', 'nuevo')
}
```

---

## ❌ Errores Comunes de Formulario

### "v-model no funciona en campo"

**Síntoma:**
```vue
<input v-model="formData.campo"> 
<!-- Escribo pero no actualiza formData -->
```

**Causa:**
Campo no existe en formData initial state.

**Solución:**
```javascript
// ❌ INCORRECTO
const formData = ref({
  // campo falta aquí
})

// ✅ CORRECTO
const formData = ref({
  campo: '',  // Inicializar siempre
  otro: null
})
```

---

### "Form perdió datos al volver"

**Síntoma:**
Edito documento, guardo cambios, cierro editor, vuelvo a abrir → datos originales.

**Causa:**
formData se reinicia al montar componente.

**Solución:**
```javascript
// ❌ INCORRECTO
onMounted(() => {
  formData.value = initialData
})

// ✅ CORRECTO - Solo sincronizar cambios
const syncFormData = (newData) => {
  formData.value = { ...formData.value, ...newData }
}

// O guardar en localStorage
const persistFormData = () => {
  localStorage.setItem(
    `form-${documentId}`,
    JSON.stringify(formData.value)
  )
}

const restoreFormData = () => {
  const saved = localStorage.getItem(`form-${documentId}`)
  if (saved) {
    formData.value = JSON.parse(saved)
  }
}
```

---

### "Select no muestra opciones"

**Síntoma:**
```vue
<select v-model="formData.campo">
  <!-- Vacío, sin opciones -->
</select>
```

**Causa:**
Las opciones están en `fields` pero no en template.

**Solución:**
```vue
<!-- ❌ INCORRECTO -->
<select v-model="formData.campo"></select>

<!-- ✅ CORRECTO -->
<select v-model="formData.campo">
  <option value="">-- Seleccionar --</option>
  <option 
    v-for="opt in field.options" 
    :key="opt.value" 
    :value="opt.value"
  >
    {{ opt.label }}
  </option>
</select>

<!-- O si options vienen de otro lado -->
<select v-model="formData.tipo">
  <option v-for="tipo in tipos" :key="tipo" :value="tipo">
    {{ tipo }}
  </option>
</select>
```

---

### "Validación no funciona"

**Síntoma:**
Intento guardar campo vacío pero no muestra error.

**Solución:**
```javascript
// ✅ Implementar validación en DocumentForm.vue
const errors = reactive({})

const validateField = (field) => {
  const value = formData[field.name]
  
  if (field.required && !value?.toString().trim()) {
    errors[field.name] = 'Campo requerido'
    return false
  }
  
  if (field.minLength && value.length < field.minLength) {
    errors[field.name] = `Mínimo ${field.minLength} caracteres`
    return false
  }
  
  if (field.pattern) {
    const regex = new RegExp(field.pattern)
    if (!regex.test(value)) {
      errors[field.name] = field.errorMessage || 'Inválido'
      return false
    }
  }
  
  delete errors[field.name]
  return true
}

const handleSubmit = () => {
  let isValid = true
  for (const field of props.fields) {
    if (!validateField(field)) {
      isValid = false
    }
  }
  
  if (!isValid) {
    console.error('Formulario tiene errores', errors)
    return
  }
  
  emit('submit', formData)
}
```

---

## 📄 Problemas con PDF

### "PDF descarga vacío o en blanco"

**Síntoma:**
Hago clic en "Descargar PDF" y descarga archivo pero está en blanco.

**Causa:**
Elemento con `data-pdf-content` no existe o está vacío.

**Solución:**
```vue
<!-- ❌ INCORRECTO -->
<div>
  <h1>{{ titulo }}</h1>
</div>

<!-- ✅ CORRECTO -->
<div data-pdf-content>
  <h1>{{ titulo }}</h1>
</div>

<!-- Verificar en consola -->
<script setup>
onMounted(() => {
  const el = document.querySelector('[data-pdf-content]')
  console.log('PDF content element:', el)
  console.log('Content:', el?.innerHTML)
})
</script>
```

---

### "PDF no tiene colores"

**Síntoma:**
PDF descarga pero todo en blanco y negro, sin los colores corporativos.

**Causa:**
Falta `print-color-adjust: exact` en CSS.

**Solución:**
```css
/* ❌ INCORRECTO */
.encabezado {
  background-color: #FFA02A;
  color: white;
}

/* ✅ CORRECTO */
.encabezado {
  background-color: #FFA02A;
  color: white;
}

@media print {
  * {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  .encabezado {
    background-color: #FFA02A;
    color: white;
  }
}
```

---

### "Tablas se cortan en PDF"

**Síntoma:**
Tabla larga se corta en PDF, aparecen solo las primeras filas.

**Causa:**
No hay configuración de page-break para tablas.

**Solución:**
```css
@media print {
  table {
    page-break-inside: avoid;
    width: 100%;
  }
  
  tbody {
    page-break-inside: avoid;
  }
  
  tr {
    page-break-inside: avoid;
  }
  
  /* Si tabla muy larga, dividir en páginas -->
  tbody tr:nth-child(30n) {
    page-break-after: always;
  }
}
```

---

### "Imagen no aparece en PDF"

**Síntoma:**
El documento tiene imagen, aparece en preview pero no en PDF.

**Causa:**
Ruta relativa no válida en PDF o base64 no incluido.

**Solución:**
```vue
<!-- ❌ INCORRECTO -->
<img src="/logo.png" alt="Logo">

<!-- ✅ CORRECTO - Usar import -->
<script setup>
import logo from '@/assets/logo.png'
</script>

<template>
  <img :src="logo" alt="Logo">
</template>

<!-- O convertir a base64 -->
<script setup>
const logoBase64 = ref('')

onMounted(async () => {
  const response = await fetch('/logo.png')
  const blob = await response.blob()
  const reader = new FileReader()
  reader.onload = () => {
    logoBase64.value = reader.result
  }
  reader.readAsDataURL(blob)
})
</script>

<template>
  <img :src="logoBase64" alt="Logo">
</template>
```

---

## 🔌 Errores de Props/Data

### "Props undefined en componente"

**Síntoma:**
```javascript
console.log(props.titulo) // undefined
console.log(props) // {}
```

**Causa:**
Prop no pasada desde componente padre.

**Solución:**
```vue
<!-- Componente hijo (MemoriaTecnica.vue) -->
<script setup>
defineProps({
  titulo: String,      // Declarar prop
  contenido: String
})
</script>

<!-- Componente padre (mtd-instalacion-autoconsumo-monofasica-con-bateria.vue) -->
<script setup>
import MemoriaTecnica from '../components/MemoriaTecnica.vue'
import { memoriaTecnicaConfig } from '../config/documents'
</script>

<template>
  <!-- ❌ INCORRECTO - Props no pasadas -->
  <MemoriaTecnica />
  
  <!-- ✅ CORRECTO - Pasar con v-bind -->
  <MemoriaTecnica v-bind="formData" />
</template>
```

---

### "defaultData y props desincronizados"

**Síntoma:**
Campo en defaultData pero no en props, o viceversa.

**Causa:**
Mala sincronización entre 3 lugares.

**Checklist de sincronización:**
```javascript
// 1. DOCUMENTO COMPONENTE
// app/components/MemoriaTecnica.vue
defineProps({
  titulo: String,        // ✅ Aquí
  contenido: String,
  // ...
})

// 2. CONFIG
// app/config/documents.js
defaultData: {
  titulo: 'Valor por defecto',      // ✅ Aquí
  contenido: 'Contenido por defecto'
},
fields: [
  { name: 'titulo', ... },           // ✅ Aquí
  { name: 'contenido', ... }
]

// 3. VERIFICAR QUE COINCIDEN
const nomina = 'titulo'
// MemoriaTecnica.vue: ✅ defineProps { titulo }
// documents.js defaultData: ✅ titulo: '...'
// documents.js fields: ✅ { name: 'titulo' }
// Si falta en uno = ERROR
```

---

### "Datos no se actualizan después de emit"

**Síntoma:**
Formulario emite datos pero DocumentPage no actualiza preview.

**Causa:**
FormData no se actualiza correctamente.

**Solución:**
```javascript
// En DocumentPage.vue
const handleFormSubmit = (newData) => {
  // ❌ INCORRECTO
  formData = newData

  // ✅ CORRECTO - Usar ref
  formData.value = newData
  
  // ✅ O merge
  Object.assign(formData.value, newData)
  
  showPreview.value = true
  showEdit.value = false
}
```

---

## 🎨 Problemas de Renderizado

### "Componente no renderiza"

**Síntoma:**
Página en blanco, sin errores en consola.

**Causa:**
Componente no está importado o nombre tiene typo.

**Solución:**
```javascript
// ❌ INCORRECTO - No existe
import MiComponente from '../components/MiComponente.vue'

// ✅ VERIFICAR
// 1. ¿Existe el archivo?
ls -la app/components/MiComponente.vue

// 2. ¿Nombre exacto?
// Archivo: MiComponente.vue
// Import: MiComponente ✅
// Import: micomponente ❌
// Import: miComponente ❌

// 3. ¿Ruta correcta?
// Desde pages/: ../components ✅
// Desde app/: ./components ✅
// Desde test/: ../../components ✅
```

---

### "Estilos scoped no aplican"

**Síntoma:**
Estilos CSS no funcionan solo en este componente.

**Causa:**
Falta `scoped` en `<style>` o selector incorrecto.

**Solución:**
```vue
<!-- ✅ CORRECTO -->
<template>
  <div class="contenedor">
    <h1 class="titulo">Título</h1>
  </div>
</template>

<style scoped>
.contenedor {
  padding: 20px;
}

.titulo {
  color: #FFA02A;
}
</style>

<!-- ❌ INCORRECTO - Sin scoped -->
<style>
.contenedor { padding: 20px; }
/* Aplica GLOBALMENTE, puede afectar otros */
</style>
```

---

### "V-for en tabla produce errores"

**Síntoma:**
```
Warning: [Vue warn]: v-for key should not be index
```

**Solución:**
```vue
<!-- ❌ INCORRECTO -->
<tr v-for="(item, index) in items" :key="index">
  <!-- Si quitamos/agregamos filas = IDs se mueven mal -->
</tr>

<!-- ✅ CORRECTO -->
<tr v-for="item in items" :key="item.id">
  <!-- ID único no cambia -->
</tr>

<!-- Si no hay ID -->
<tr v-for="item in items" :key="`${item.nombre}-${item.cantidad}`">
  <!-- Combinación única -->
</tr>
```

---

## ⚡ Debugging de Performance

### "Página carga lenta"

**Diagnóstico:**
```javascript
// Medir tiempo de renderizado
const start = performance.now()
// ... código ...
const end = performance.now()
console.log(`Tiempo: ${end - start}ms`)
```

**Causa común:**
Renderizar listas grandes sin virtualización.

**Solución:**
```vue
<!-- ❌ INCORRECTO - 1000 elementos = lento -->
<div v-for="item in items" :key="item.id">
  {{ item.nombre }}
</div>

<!-- ✅ CORRECTO - Lazy load -->
<script setup>
import { onMounted } from 'vue'

const displayedItems = ref([])
const itemsPerPage = 50

onMounted(() => {
  displayedItems.value = items.slice(0, itemsPerPage)
})

const loadMore = () => {
  const current = displayedItems.value.length
  displayedItems.value.push(
    ...items.slice(current, current + itemsPerPage)
  )
}
</script>

<template>
  <div v-for="item in displayedItems" :key="item.id">
    {{ item.nombre }}
  </div>
  <button v-if="displayedItems.length < items.length" @click="loadMore">
    Cargar más
  </button>
</template>
```

---

### "PDF genera muy lento"

**Causa:**
html2pdf procesando documento muy grande.

**Solución:**
```javascript
// Medir tiempo de generación
const generatePDFOptimized = async (element, fileName) => {
  console.time('PDF Generation')
  
  const options = {
    margin: [10, 10, 10, 10],
    filename: fileName,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: {
      scale: 2,      // Reduce si está lento
      useCORS: true,
      logging: false
    },
    jsPDF: {
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true  // Comprimir para PDF más pequeño
    }
  }
  
  await html2pdf().set(options).from(element).save()
  
  console.timeEnd('PDF Generation')
}
```

---

## ✅ Checklist de Diagnóstico

Cuando algo no funciona, verificar en orden:

### 1. Estructura de Archivos
- [ ] ¿Existe `app/components/MiComponente.vue`?
- [ ] ¿Existe `app/pages/mi-componente.vue`?
- [ ] ¿Existe entrada en `app/config/documents.js`?
- [ ] ¿Rutas de import correctas (../ vs ./)?

### 2. Sincronización de Datos
- [ ] ¿Campos en `defaultData`?
- [ ] ¿Campos editable en `fields`?
- [ ] ¿Props en `defineProps`?
- [ ] ¿Nombres coinciden exactamente?

### 3. Componente
- [ ] ¿Tiene `<div data-pdf-content>`?
- [ ] ¿Todos los props usados en template?
- [ ] ¿CSS tiene `@media print`?
- [ ] ¿No hay typos en nombres?

### 4. Página
- [ ] ¿Importa DocumentPage?
- [ ] ¿Importa componente correcto?
- [ ] ¿Importa config correcta?
- [ ] ¿Pasa props correctamente?

### 5. Config (documents.js)
- [ ] ¿ID válido (sin espacios, kebab-case)?
- [ ] ¿Route válida?
- [ ] ¿fileName tiene extensión .pdf?
- [ ] ¿capabilities tiene propiedades correctas?

### 6. Navegador
- [ ] ¿Consola sin errores rojos?
- [ ] ¿Network sin 404s?
- [ ] ¿Vue DevTools funciona?
- [ ] ¿LocalStorage limpio?

---

## 🛠️ Herramientas de Debug

### Vue DevTools
```javascript
// En browser: Instalar extensión Vue DevTools

// Inspeccionar componentes
// Right-click en elemento → "Inspect" → Vue tab

// Ver props y data
// Components panel → seleccionar componente → Data tab

// Ver eventos
// Console → filter por events
```

### Network Debug
```javascript
// Ver solicitudes
// F12 → Network tab → filtrar por document

// Ver respuestas
// Click en request → Response tab

// Verificar headers
// Headers tab → Request headers y Response headers
```

### Console Debug
```javascript
// Logs útiles en DocumentPage.vue
console.log('formData:', formData.value)
console.log('config:', config)
console.log('componentProps:', {
  ...formData.value
})

// En DocumentForm.vue
console.log('fields:', props.fields)
console.log('initialData:', props.initialData)

// En componente documento
console.log('PDF content:', 
  document.querySelector('[data-pdf-content]')?.innerHTML
)
```

### Storage Debug
```javascript
// Ver localStorage
localStorage.setItem('debug-form', JSON.stringify(formData.value))

// Recuperar
const saved = JSON.parse(localStorage.getItem('debug-form'))
console.log('Saved:', saved)

// Limpiar
localStorage.removeItem('debug-form')
localStorage.clear()
```

---

## 🚨 Resumen Rápido de Errores Comunes

| Error | Síntoma | Solución Rápida |
|-------|---------|-----------------|
| Prop undefined | console.log(props.x) = undefined | Verificar paso en v-bind o :prop |
| v-model no funciona | Escribo pero no actualiza | Inicializar campo en formData |
| PDF vacío | Descarga blanco | Agregar data-pdf-content div |
| Sin colores | PDF en B/N | Agregar @media print + print-color-adjust |
| Tabla cortada | Solo primeras filas | Agregar page-break-inside: avoid |
| Componente no renderiza | Página blanca | Verificar import y export |
| Datos desincronizados | Prop no existe | Verificar coincidencia en 3 lugares |
| Lento | Mucho lag | Lazy load o virtualizar listas |
| Error "Port in use" | No inicia dev | Cambiar puerto o matar proceso |

---

**Documento actualizado:** 6 de febrero de 2026
**Para:** Desarrolladores, QA y sistemas IA
**Estado:** Production-ready ✅
