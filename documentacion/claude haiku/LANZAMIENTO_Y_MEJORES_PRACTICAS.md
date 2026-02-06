# ✅ GUÍA DE LANZAMIENTO Y MEJORES PRÁCTICAS

## 📋 Indice
1. [Pre-Lanzamiento](#pre-lanzamiento)
2. [Checklist de Calidad](#checklist-de-calidad)
3. [Mejores Prácticas](#mejores-prácticas)
4. [Seguridad](#seguridad)
5. [Performance](#performance)
6. [Escalabilidad](#escalabilidad)
7. [Mantenimiento](#mantenimiento)
8. [Deployment](#deployment)

---

## 🚀 Pre-Lanzamiento

### Verificación de Código

**1. Linting y Formato**
```bash
# Verificar errores de linting
npm run lint

# Formatear código
npm run format

# Verificar tipos TypeScript
npm run typecheck
```

**2. Tests**
```bash
# Ejecutar tests
npm run test

# Cobertura
npm run test:coverage
```

**3. Build**
```bash
# Build para producción
npm run build

# Previsualizar build
npm run preview
```

### Verificación Manual

**Cada documento debe:**

- [ ] Renderizar sin errores en consola
- [ ] Preview muestra todos los datos
- [ ] Edición carga datos correctamente
- [ ] PDF se descarga sin errores
- [ ] PDF tiene colores correctos
- [ ] PDF no tiene elementos cortados
- [ ] Validaciones funcionan
- [ ] Responsive en móvil
- [ ] Funciona en Chrome, Firefox, Safari

---

## ✅ Checklist de Calidad

### Componente Vue

- [ ] ✅ Nombre descriptivo (PascalCase)
- [ ] ✅ Exportado con `<script setup>`
- [ ] ✅ Tiene `<div data-pdf-content>`
- [ ] ✅ Todos los props en `defineProps`
- [ ] ✅ CSS con `scoped`
- [ ] ✅ `@media print` con `print-color-adjust`
- [ ] ✅ Sin errores en console
- [ ] ✅ Sin warnings Vue
- [ ] ✅ Elementos `<table>` con atributos `page-break-inside`
- [ ] ✅ Largo máximo 1500 líneas

### Configuración

- [ ] ✅ ID único (kebab-case)
- [ ] ✅ Title legible
- [ ] ✅ Description clara
- [ ] ✅ Route válida
- [ ] ✅ fileName con extensión .pdf
- [ ] ✅ defaultData completo
- [ ] ✅ fields con nombres únicos
- [ ] ✅ Todos los fields están en defaultData
- [ ] ✅ capabilities correctas

### Página

- [ ] ✅ Imports correctos
- [ ] ✅ DocumentPage y componente importados
- [ ] ✅ Config importada correctamente
- [ ] ✅ Props pasadas sin errores

### Integración

- [ ] ✅ Agregado a `documentConfigs`
- [ ] ✅ Agregado a `getAllDocuments()`
- [ ] ✅ Aparece en página principal
- [ ] ✅ Accesible en URL correcta
- [ ] ✅ Sin conflictos de rutas

### Funcionalidad

- [ ] ✅ Preview funciona
- [ ] ✅ Edición carga correctamente
- [ ] ✅ Cambios se guardan
- [ ] ✅ PDF genera sin errores
- [ ] ✅ Descarga con nombre correcto

---

## 🎯 Mejores Prácticas

### 1. Estructura de Componentes

**✅ CORRECTO:**
```vue
<template>
  <div data-pdf-content class="documento">
    <!-- Contenido organizado en secciones -->
    <section class="encabezado">...</section>
    <section class="cuerpo">...</section>
    <section class="firma">...</section>
  </div>
</template>

<script setup>
// Props organizadas por grupo
defineProps({
  // Encabezado
  titulo: String,
  fecha: String,
  // Cuerpo
  contenido: String,
  // Sistema
  generatedDate: String
})
</script>

<style scoped>
/* Estilos por sección */
.encabezado { }
.cuerpo { }
.firma { }

@media print { }
</style>
```

**❌ INCORRECTO:**
```vue
<!-- Mezclar todo sin estructura -->
<template>
  <div>
    <p>{{ titulo }}</p>
    <p>{{ contenido }}</p>
  </div>
</template>
```

### 2. Nomenclatura Consistente

```javascript
// ✅ CONVENCIONES
- Archivos componentes: PascalCase (ContratoServicios.vue)
- Archivos páginas: kebab-case (contrato-servicios.vue)
- Rutas: kebab-case (/contrato-servicios)
- IDs de config: kebab-case (contrato-servicios)
- Props: camelCase (nombreCliente, nifPrestador)
- CSS classes: kebab-case (titulo-seccion, area-firmas)
```

### 3. Documentación Inline

```vue
<script setup>
/**
 * ContratoServicios
 * Documento legal para contratos de servicios
 * 
 * @prop {String} nombreCliente - Nombre del cliente
 * @prop {String} montoTotal - Importe total en €
 * @prop {String} generatedDate - Fecha de generación (sistema)
 */
defineProps({
  nombreCliente: String,
  montoTotal: String,
  generatedDate: String
})
</script>
```

### 4. Manejo de Errores

```javascript
// ✅ CORRECTO - Validar en formulario
const errors = reactive({})

const validateField = (field) => {
  const value = formData[field.name]
  if (field.required && !value) {
    errors[field.name] = 'Campo requerido'
    return false
  }
  return true
}

// ✅ CORRECTO - Mostrar error al usuario
<div v-if="errors.nombreCliente" class="error">
  {{ errors.nombreCliente }}
</div>
```

### 5. Accesibilidad

```vue
<!-- ✅ CORRECTO - Labels con for -->
<label for="nombre-cliente">Nombre del Cliente:</label>
<input id="nombre-cliente" v-model="formData.nombreCliente">

<!-- ✅ CORRECTO - Alt text en imágenes -->
<img src="logo.png" alt="Logo de la empresa">

<!-- ✅ CORRECTO - Contrast de colores -->
<!-- Usar colores corporativos en contraste >4.5:1 -->
```

---

## 🔒 Seguridad

### 1. Entrada del Usuario

```javascript
// ✅ CORRECTO - Sanitizar entrada
const sanitizeInput = (input) => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .trim()
}

// ❌ INCORRECTO - Directamente en v-html
<div v-html="userInput"></div>

// ✅ CORRECTO - Usar {{ }} para text interpolation
<div>{{ userInput }}</div>
```

### 2. Datos Sensibles

```javascript
// ❌ INCORRECTO - Guardar en localStorage
localStorage.setItem('usuario', JSON.stringify(userData))

// ✅ CORRECTO - Usar sessionStorage si es necesario
sessionStorage.setItem('token', authToken)

// ✅ MEJOR - Usar cookies con HttpOnly
// (Manejo en backend)
```

### 3. API Requests

```javascript
// ✅ CORRECTO - HTTPS obligatorio
const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`https://api.domain.com${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }
    
    return await response.json()
  } catch (error) {
    console.error('Error:', error)
    // Notificar usuario sin exponer detalles técnicos
  }
}
```

---

## ⚡ Performance

### 1. Optimización de Componentes

```javascript
// ✅ CORRECTO - Lazy loading de componentes
const ContratoServicios = defineAsyncComponent(
  () => import('@/components/ContratoServicios.vue')
)

// ✅ CORRECTO - Usar computed para cálculos
const total = computed(() => {
  return items.reduce((sum, item) => sum + item.precio, 0)
})

// ❌ INCORRECTO - Lógica en template
{{ items.reduce((sum, item) => sum + item.precio, 0) }}
```

### 2. Optimización de PDF

```javascript
// ✅ CORRECTO - Comprimir PDF
const options = {
  jsPDF: {
    compress: true,
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  },
  html2canvas: {
    scale: 1.5,  // No usar scale muy alto
    useCORS: true
  }
}

// ✅ CORRECTO - Medir tiempo
console.time('PDF Generation')
// ... generar PDF ...
console.timeEnd('PDF Generation')
```

### 3. Lazy Loading

```vue
<!-- ✅ CORRECTO - Cargar imágenes bajo demanda -->
<img v-lazy="imageUrl" alt="Descripción">

<!-- ✅ CORRECTO - Listas infinitas -->
<InfiniteScroll @load-more="loadMoreItems">
  <Item v-for="item in displayedItems" :key="item.id" :data="item" />
</InfiniteScroll>
```

---

## 📈 Escalabilidad

### 1. Agregar Nuevos Documentos

**Patrón a seguir (siempre igual):**
1. Crear componente en `app/components/`
2. Agregar config en `app/config/documents.js`
3. Crear página en `app/pages/`
4. Verificar sincronización
5. Probar completamente

### 2. Reutilizar Lógica

```javascript
// ✅ CORRECTO - Crear composables reutilizables
export const useDocumentFormat = () => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(value)
  }
  
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES')
  }
  
  return { formatCurrency, formatDate }
}

// Usar en múltiples componentes
const { formatCurrency, formatDate } = useDocumentFormat()
```

### 3. Gestión de Estado

```javascript
// ✅ CORRECTO - Usar Pinia para estado compartido (si necesario)
import { defineStore } from 'pinia'

export const useDocumentStore = defineStore('documents', {
  state: () => ({
    currentDocument: null,
    allDocuments: []
  }),
  
  actions: {
    setCurrentDocument(doc) {
      this.currentDocument = doc
    }
  }
})
```

---

## 🔧 Mantenimiento

### 1. Logs y Monitoring

```javascript
// ✅ CORRECTO - Logs útiles
console.log('[DocumentPage] Mounting with config:', config.id)
console.log('[DocumentForm] Submitting form:', formData.value)
console.warn('[PDF] Generation took X ms')

// ❌ INCORRECTO - Logs innecesarios
console.log('test')
console.log('xyz')
console.log(obj) // Sin contexto
```

### 2. Versionado de Código

```bash
# Usar commits descriptivos
git commit -m "feat(docs): agregar documento Contrato de Servicios"
git commit -m "fix(pdf): corregir colores en PDF"
git commit -m "chore(deps): actualizar html2pdf a v1.5"
```

### 3. Testing

```javascript
// ✅ CORRECTO - Test unitario de validación
describe('ContratoServicios', () => {
  it('valida NIF correctamente', () => {
    const valid = validateNIF('12345678A')
    expect(valid).toBe(true)
    
    const invalid = validateNIF('invalid')
    expect(invalid).toBe(false)
  })
})
```

### 4. Documentación

```markdown
# Documento XXX

**Propósito:** Descripción clara
**Campos editables:** Número y lista
**Validaciones:** Qué se valida
**Cambios recientes:** Qué cambió
**Conocidos issues:** Problemas conocidos
```

---

## 🚀 Deployment

### 1. Preparación

```bash
# Verificar build funciona
npm run build

# Verificar no hay errores
npm run lint
npm run typecheck

# Verificar tests pasan
npm run test
```

### 2. Environment Variables

```bash
# .env.production
VITE_API_URL=https://api.production.com
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=true

# .env.development
VITE_API_URL=http://localhost:3000
VITE_ENABLE_ANALYTICS=false
```

### 3. Deployment Checklist

- [ ] ✅ Código testeado
- [ ] ✅ Build exitoso
- [ ] ✅ Componentes sin warnings
- [ ] ✅ PDFs descargados correctamente
- [ ] ✅ Formularios validan
- [ ] ✅ Responsive en móvil
- [ ] ✅ Performance OK (Lighthouse >90)
- [ ] ✅ Security OK (sin vulnerabilidades)
- [ ] ✅ Documentación actualizada
- [ ] ✅ Versión incrementada

### 4. After Deployment

```bash
# Monitorear logs
tail -f logs/app.log

# Verificar uptime
curl https://app.production.com

# Monitor performance
# ... usar herramientas de APM ...
```

---

## 📊 Métricas de Calidad

**Objetivos:**
- Cobertura de tests: ≥80%
- Lighthouse score: ≥90
- Performance (First Contentful Paint): <2s
- PDF generation time: <5s
- Error rate: <0.1%

---

## 🎓 Recursos Adicionales

- [Vue 3 Composition API](https://vuejs.org)
- [Nuxt Documentation](https://nuxt.com)
- [html2pdf.js](https://github.com/parallax/html2pdf.js)
- [jsPDF](https://github.com/parallax/jsPDF)
- [WebPageTest](https://www.webpagetest.org)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

## 📞 Soporte y Escalación

### Problemas Comunes

| Problema | Solución | Escalación |
|----------|----------|-----------|
| PDF vacío | Verificar data-pdf-content | Al team frontend |
| Documento no carga | Verificar imports | Al team backend (APIs) |
| Lento | Optimizar componentes | Al team DevOps |
| Crash en producción | Verificar logs | Critical: Team lead |

### Proceso de Reporte de Bugs

1. Reproducir el problema
2. Revisar TROUBLESHOOTING.md
3. Crear issue con:
   - Pasos para reproducir
   - Comportamiento esperado vs actual
   - Capturas/videos
   - Browser/SO
4. Asignar prioridad
5. Revisar ARQUITECTURA_TECNICA.md
6. Implementar fix
7. Test completo
8. Deploy

---

## 🏁 Checklist Final Antes de Producción

- [ ] ✅ Todos los documentos en documentConfigs
- [ ] ✅ Sin errores en console
- [ ] ✅ Sin warnings Vue
- [ ] ✅ Build limpio (npm run build)
- [ ] ✅ Tests pasan (npm run test)
- [ ] ✅ Documentación completa
- [ ] ✅ Equipo entrenado
- [ ] ✅ Backups hechos
- [ ] ✅ Monitoreo configurado
- [ ] ✅ Plan de rollback listo

---

## 🎉 Próximos Pasos

1. **Fase 1 - Consolidación:**
   - Revisar proyecto completo
   - Documentar decisiones de diseño
   - Crear runbooks de operación

2. **Fase 2 - Mejoras:**
   - Agregar más documentos
   - Implementar signatures digitales
   - Agregar base de datos

3. **Fase 3 - Escala:**
   - Multi-tenant support
   - APIs REST completas
   - Analytics y reporting

---

**Documento actualizado:** 6 de febrero de 2026
**Versión:** 1.0.0
**Estado:** Production-ready ✅
**Próxima revisión:** Cada trimestre

---

## 📝 Notas Finales

> "Este es un sistema diseñado para escalar. Cada documento nuevo sigue el mismo patrón de 5 pasos. La documentación está completa para que cualquier desarrollador (humano o IA) pueda agregar nuevos documentos rápidamente."

> "La seguridad, performance y mantenibilidad están al core del diseño. No se hacen atajos, todos los componentes siguen las mejores prácticas."

> "Cuando algo no funciona, hay 3 recursos: TROUBLESHOOTING.md, ARQUITECTURA_TECNICA.md, y PATRONES_AVANZADOS.md"

---

**Sistema creado por:** Solay Team
**Equipo de desarrollo:** Vue.js + Nuxt + PDF Generation
**Contacto:** Para consultas sobre arquitectura contactar al tech lead
