# ✅ CHECKLIST - CREAR UN NUEVO DOCUMENTO

**Guía paso a paso para agregar un nuevo documento al sistema**  
**Última actualización:** 9 de febrero de 2026

---

## 📋 CHECKLIST COMPLETO

### **FASE 1: PLANIFICACIÓN** ⏱️ 5-10 minutos

- [ ] **1.1** Define el tipo de documento
  ```
  ¿Es simple (pocos campos)?
    → Sigue camino "Simple"
  ¿Es técnico (~200 campos)?
    → Sigue camino "Técnico"
  ¿Es mixto?
    → Mezcla de ambos
  ```

- [ ] **1.2** Identifica los campos necesarios
  ```
  Haz una lista:
  - campo1: "descripción", tipo: text
  - campo2: "descripción", tipo: date
  - ... (cuantos sean necesarios)
  ```

- [ ] **1.3** Define fieldMapping
  ```
  ¿Qué campos vienen del Formulario Maestro?
  
  Maestro → Tu documento
  apellidosNombre → nombrePersona? ✓ Mapear
  nifCif → nif? ✓ Mapear
  ...
  ```

- [ ] **1.4** Reúne especificaciones del documento
  ```
  - ¿Qué contenido tiene?
  - ¿Dónde van los campos?
  - ¿Hay firmas/logos?
  - ¿Es multi-página?
  ```

---

### **FASE 2: CREAR ARCHIVOS** ⏱️ 15-30 minutos

- [ ] **2.1** Crear componente Vue

  **Archivo:** `/app/components/MiNuevoDocumento.vue`
  
  **Template mínimo:**
  ```vue
  <template>
    <div data-pdf-content class="contenedor-pdf">
      <div class="contenedor-principal">
        <!-- Contenido aquí -->
        <h1>{{ titulo }}</h1>
        <p>{{ campo1 }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps({
    titulo: String,
    campo1: String,
    // ... resto de props
  })
  </script>
  
  <style scoped>
  .contenedor-pdf {
    width: 210mm;
    margin: 0 auto;
    background: white;
  }
  </style>
  ```

- [ ] **2.2** Crear página (si no existe)

  **Archivo:** `/app/pages/mi-nuevo-documento.vue`
  
  **Código mínimo:**
  ```vue
  <template>
    <DocumentPage
      :documentConfig="miNuevoDocumentoConfig"
      :component="MiNuevoDocumento"
    />
  </template>
  
  <script setup>
  import DocumentPage from '@/components/DocumentPage.vue'
  import MiNuevoDocumento from '@/components/MiNuevoDocumento.vue'
  import { miNuevoDocumentoConfig } from '@/config/documents'
  </script>
  ```

- [ ] **2.3** Agregar configuración en documents.js

  **Archivo:** `/app/config/documents.js`
  
  **Estructura:**
  ```javascript
  export const miNuevoDocumentoConfig = {
    id: 'mi-nuevo-documento',
    title: 'Título del Documento',
    description: 'Descripción breve',
    fileName: 'mi-nuevo-documento.pdf',
    route: '/mi-nuevo-documento',
    fields: [
      { name: 'campo1', label: 'Etiqueta 1', type: 'text' },
      { name: 'campo2', label: 'Etiqueta 2', type: 'date' },
      // ... más campos
    ],
    defaultData: {
      campo1: '',
      campo2: '',
      // ... valores por defecto
    },
    fieldMapping: {
      // campo_documento: 'campo_maestro'
    },
    capabilities: {
      canPreview: true,
      canEdit: true,
      canGeneratePDF: true
    }
  }
  ```

- [ ] **2.4** Registrar documento en el índice

  **En el final de documents.js, en el objeto `allDocuments`:**
  ```javascript
  export const allDocuments = {
    'autorizacion-representacion': autorizacionRepresentacionConfig,
    // ... otros ...
    'mi-nuevo-documento': miNuevoDocumentoConfig,  // ← Agregar aquí
  }
  ```

---

### **FASE 3: INTEGRACIÓN CON MAESTRO** ⏱️ 10-20 minutos

- [ ] **3.1** Determina si necesitas campos nuevos en maestro

  ```
  ¿Todos tus campos ya existen en Maestro? 
    → Sí: Salta a 3.2
    → No: Ve a 3.1a
  ```

- [ ] **3.1a** (SI) Agregar nuevos campos a masterFormFields.js

  **Archivo:** `/app/config/masterFormFields.js`
  
  ```javascript
  export const masterFormFields = [
    // ... campos existentes ...
    {
      name: 'nuevosCampo',
      label: 'Etiqueta visible',
      placeholder: 'Ej: texto',
      type: 'text'
    }
  ]
  ```

  Luego actualizar `getMasterFormDefaultData()`:
  ```javascript
  export const getMasterFormDefaultData = () => {
    return {
      // ... existentes ...
      nuevosCampo: ''
    }
  }
  ```

- [ ] **3.2** Configurar fieldMapping correctamente

  En `miNuevoDocumentoConfig`:
  ```javascript
  fieldMapping: {
    'campoDelDocumento': 'campoDelMaestro',
    'titulo': 'apellidosNombre',  // Ejemplo
    'dni': 'nifCif',  // Ejemplo
  }
  ```

- [ ] **3.3** Verificar que props coinciden

  Componente:
  ```vue
  <script setup>
  defineProps({
    campoDelDocumento: String,  // ← Debe coincidir con defaultData
    titulo: String,
    dni: String,
  })
  </script>
  ```

  Config (defaultData):
  ```javascript
  defaultData: {
    campoDelDocumento: '',
    titulo: '',
    dni: '',
  }
  ```

---

### **FASE 4: PRUEBAS BÁSICAS** ⏱️ 10-15 minutos

- [ ] **4.1** Verifica que no hay errores de compilación

  ```bash
  # En terminal (debe estar corriendo):
  npm run dev
  
  # Si hay errores → Revisa el output y corrígelos
  # Mensajes comunes:
  # - "Component not found" → Typo en import
  # - "Unexpected token" → Error de sintaxis
  ```

- [ ] **4.2** Accede directamente a la página

  ```
  URL: http://localhost:3001/mi-nuevo-documento
  
  ¿Se carga? Sí/No
  ¿Ves el documento? Sí/No
  ¿Hay errores en DevTools (F12 → Console)? Sí/No
  ```

- [ ] **4.3** Llena el Formulario Maestro

  ```
  1. Navega a /formulario-maestro
  2. Completa TODOS los campos (incluyendo nuevos si agregaste)
  3. Click "Guardar Datos y Continuar"
  ```

- [ ] **4.4** Verifica que los datos cargan

  ```
  1. Navega a tu nuevo documento
  2. ¿Los campos están rellenos?
  3. ¿Los valores son correctos?
  
  Si NO → Revisa fieldMapping
  Si SÍ → Perfecto! Continúa
  ```

- [ ] **4.5** Prueba modo edición

  ```
  1. Click en "✏️ Editar"
  2. ¿Se abre formulario?
  3. ¿Puedes modificar?
  4. Click "Guardar"
  5. ¿Vuelve al preview con valores nuevos?
  ```

- [ ] **4.6** Prueba generación PDF

  ```
  1. Click en "📄 PDF"
  2. ¿Se descarga archivo?
  3. ¿Se abre correctamente?
  4. ¿Tiene el contenido correcto?
  5. ¿Está formateado bien?
  ```

---

### **FASE 5: VALIDACIÓN AVANZADA** ⏱️ 10-15 minutos

- [ ] **5.1** Verifica localStorage

  ```javascript
  // En DevTools → Console:
  localStorage.getItem('formDataMaestro')
  
  // Debería mostrar JSON con tus datos
  // Busca específicamente:
  // - ¿Aparecen los campos que mapeaste?
  ```

- [ ] **5.2** Prueba navegación

  ```
  1. De Maestro → Tu documento → Debería cargar datos
  2. De Tu documento → Otro documento → Debería mantener datos
  3. De Otro documento → Tu documento → Datos deben estar
  ```

- [ ] **5.3** Prueba con datos vacíos

  ```javascript
  // En console:
  localStorage.clear()
  
  // Navega a tu documento
  // ¿Ves valores por defecto? Sí/No
  // Esto verifica que defaultData funciona
  ```

- [ ] **5.4** Verifica estilos en PDF

  ```
  1. Abre PDF generado
  2. ¿Colores correctos?
  3. ¿Fuentes correctas?
  4. ¿Formato A4?
  5. ¿Márgenes correctos?
  6. ¿Imágenes visibles?
  ```

- [ ] **5.5** Prueba en diferentes navegadores

  ```
  Navegadores a probar:
  ☐ Chrome
  ☐ Firefox
  ☐ Safari
  ☐ Edge
  
  ¿Funciona en todos?
  ```

---

### **FASE 6: DOCUMENTACIÓN** ⏱️ 5-10 minutos

- [ ] **6.1** Crea archivo de documentación

  **Archivo:** `/documentacion/MiNuevoDocumento.md`
  
  **Contenido mínimo:**
  ```markdown
  # MI NUEVO DOCUMENTO
  
  ## Descripción
  [Descripción del documento]
  
  ## Campos
  - campo1: [descripción]
  - campo2: [descripción]
  
  ## Configuración
  - ID: `mi-nuevo-documento`
  - URL: `/mi-nuevo-documento`
  
  ## fieldMapping
  [Explicar el mapeo]
  
  ## Estado
  ✅ Completado
  ```

- [ ] **6.2** Actualiza INDICE_MAESTRO.md

  Agrega tu documento a la tabla correspondiente

- [ ] **6.3** Actualiza REFERENCIA_DOCUMENTOS.md

  Agrega entrada en el catálogo

---

### **FASE 7: INTEGRACIÓN FINAL** ⏱️ 5 minutos

- [ ] **7.1** Verifica que aparece en menú (si aplica)

  ```
  ¿El documento aparece en /seleccionar-documento?
  ¿Se puede acceder desde ahí?
  ```

- [ ] **7.2** Haz git commit

  ```bash
  git add .
  git commit -m "Feat: Agregar nuevo documento MiNuevoDocumento
  
  - Componente MiNuevoDocumento.vue
  - Página mi-nuevo-documento.vue
  - Config en documents.js
  - fieldMapping para conexión con Maestro
  - Documentación"
  ```

- [ ] **7.3** Prueba nuevamente después del commit

  ```
  npm run dev
  
  ¿Todo funciona igual que antes?
  ```

---

## 🎯 TIPOS DE DOCUMENTOS - CHECKLIST ESPECÍFICO

### **DOCUMENTO SIMPLE** (~20 campos)

Además del checklist general, verifica:

- [ ] Los campos están claramente identificados en red
- [ ] Hay valores por defecto sensatos
- [ ] El fieldMapping es mínimal (no todos los campos mapean)

**Ejemplos:** Autorización, Declaración Habilitación

---

### **DOCUMENTO CERTIFICADO** (~15 campos)

Además del checklist general:

- [ ] Tiene secciones claramente delimitadas
- [ ] Hay espacio para firmas/sellos
- [ ] Incluye logos/branding
- [ ] Los campos de dirección están mapeados

**Ejemplos:** Certificados Solidez, RCDs

---

### **DOCUMENTO TÉCNICO** (~200+ campos)

Además del checklist general:

- [ ] Todas las secciones están implementadas
- [ ] Tabla de circuitos/líneas está formateada
- [ ] Esquemas unifilar/planos tienen espacio
- [ ] Múltiples páginas si necesario
- [ ] fieldMapping es vacío (usa nombres del maestro)

**Ejemplos:** Memorias Técnicas

---

## 🐛 PROBLEMAS COMUNES Y SOLUCIONES RÁPIDAS

| Problema | Solución |
|----------|----------|
| "Component not defined" | Verifica `import` en página |
| Datos no cargan | Verifica fieldMapping y nombres props |
| PDF cortado | Verifica ancho: `width: 210mm` |
| Estilos no aplican | Verifica `scoped` en style |
| localStorage no funciona | Verifica que guardaste con "Guardar Datos" |
| Navegación rota | Verifica route en config existe |

---

## ✅ VALIDACIÓN FINAL

Antes de considerar "completado":

- [ ] ✅ Componente sin errores
- [ ] ✅ Página sin errores
- [ ] ✅ Config registrada
- [ ] ✅ fieldMapping correcto
- [ ] ✅ Datos cargan del Maestro
- [ ] ✅ Edición funciona
- [ ] ✅ PDF se genera
- [ ] ✅ Estilos correctos
- [ ] ✅ Documentación creada
- [ ] ✅ Commit realizado

**Si respondiste ✅ a todos → ¡DOCUMENTO COMPLETADO!**

---

## 📞 REFERENCIAS RÁPIDAS

- **Componente ejemplo:** `/app/components/AutorizacionRepresentacion.vue`
- **Config ejemplo:** Busca `autorizacionRepresentacionConfig` en documents.js
- **Maestro:** `/app/config/masterFormFields.js`
- **Store:** `/app/stores/formStore.js`

---

## 🎓 TIEMPO TOTAL ESTIMADO

| Fase | Tiempo |
|------|--------|
| 1. Planificación | 5-10 min |
| 2. Crear archivos | 15-30 min |
| 3. Integración Maestro | 10-20 min |
| 4. Pruebas básicas | 10-15 min |
| 5. Validación avanzada | 10-15 min |
| 6. Documentación | 5-10 min |
| 7. Integración final | 5 min |
| **TOTAL** | **60-105 min** |

**~1.5-2 horas** para un documento completo

---

**Estado:** ✅ Checklist completo  
**Última actualización:** 9 de febrero de 2026

