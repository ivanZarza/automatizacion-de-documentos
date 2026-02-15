# Plan: Autorización Comunicación Puesta en Funcionamiento (3 páginas)

## 📋 Descripción General

Documento único de **3 páginas** que se renderiza en una sola página Vue y exporta a **PDF de 3 páginas**.

**Nombre:** `AutorizacionComunicacion`  
**Ruta:** `/autorizacion-comunicacion`  
**Identificador Config:** `autorizacionComunicacionConfig`  
**Componente Renderer:** `AutorizacionComunicacion.vue`  
**Página:** `autorizacion-comunicacion.vue`

---

## 🏗️ Arquitectura Multi-Página

### Estructura CSS para Impresión

```scss
// Cada página A4 en su propio contenedor
.pagina-documento {
  width: 210mm;           // A4 ancho
  height: 297mm;          // A4 alto
  position: relative;
  page-break-after: always;  // CLAVE: saltos de página en impresión
  
  @media print {
    page-break-after: always;
    page-break-inside: avoid;
    margin: 0;
    padding: 0;
  }
}
```

### Flujo de Renderizado

```html
<div class="print-wrapper">
  <!-- PÁGINA 1 -->
  <article class="pagina-documento pagina-1">
    <img background-image: url('/documentos-oficiales/autorizacion-pag1.jpg') />
    <span v-for="et in etiquetasPag1">{{ et.displayValue }}</span>
  </article>
  
  <!-- PÁGINA 2 -->
  <article class="pagina-documento pagina-2">
    <img background-image: url('/documentos-oficiales/autorizacion-pag2.jpg') />
    <span v-for="et in etiquetasPag2">{{ et.displayValue }}</span>
  </article>
  
  <!-- PÁGINA 3 (instrucciones - solo background, sin campos) -->
  <article class="pagina-documento pagina-3">
    <img background-image: url('/documentos-oficiales/autorizacion-pag3.jpg') />
    <!-- Sin etiquetas, es solo referencia -->
  </article>
</div>
```

---

## 📸 Imágenes de Fondo

Se necesitan 3 imágenes PNGs de alta calidad (300 DPI recomendado para impresión):

| Página | Archivo | Dimensiones | Contenido |
|--------|---------|-------------|----------|
| 1 | `autorizacion-pag1.jpg` | 2100×2970px | Secciones 1, 2, 3 |
| 2 | `autorizacion-pag2.jpg` | 2100×2970px | Secciones 4, 5 + Protección datos |
| 3 | `autorizacion-pag3.jpg` | 2100×2970px | Instrucciones (referencia) |

**Ubicación:** `/public/documentos-oficiales/`

---

## 🎯 Campos por Página

### PÁGINA 1: Datos iniciales y lugar de notificación

```
SECCIÓN 1: DATOS IDENTIFICATIVOS
├─ apellidosNombre
├─ nifCif
├─ razonSocial (si aplica)
└─ calidad (select: propietario / instalador / responsable técnico)

SECCIÓN 2: LUGAR Y MEDIO DE NOTIFICACIÓN
├─ tipoVia (select: calle, avenida, plaza, etc.)
├─ nombreVia
├─ numero
├─ bloque
├─ portal
├─ escalera
├─ planta
├─ puerta
├─ codigoPostal
├─ municipio
├─ provincia
├─ pais
├─ telefonoFijo
├─ telefonoMovil
├─ correoElectronico
└─ optoElectronico (checkbox)

SECCIÓN 3: DATOS DEL ESTABLECIMIENTO E INSTALACIONES
├─ denominacionEstablecimiento
├─ domicilioEstablecimiento
├─ localidadEstablecimiento
├─ provinciaEstablecimiento
├─ codigoPostalEstablecimiento
├─ instalacion1
├─ instalacion2
├─ instalacion3
├─ instalacion4
├─ instalacion5
└─ instalacion6
```

### PÁGINA 2: Persona autorizada y declaración

```
SECCIÓN 4: DATOS DE LA PERSONA AUTORIZADA
├─ figura (select: técnico competente / instalador habilitado / responsable técnico)
├─ apellidosNombrePersona
└─ dniNiePersona

SECCIÓN 5: DECLARACIÓN, AUTORIZACIÓN, LUGAR, FECHA Y FIRMA
├─ lugarFirma
├─ diaFirma
├─ mesFirma
├─ anioFirma
└─ representante (texto)

INFORMACIÓN BÁSICA (Protección de datos)
└─ (Solo información, sin campos a rellenar)

DIRECCIÓN CENTRAL
├─ codigoDirectorio
```

### PÁGINA 3: Instrucciones (no se rellena)

- Solo imagen de fondo
- Texto informativo
- No requiere campos dinámicos

---

## 📝 Estructura de Config en documents.js

```javascript
export const autorizacionComunicacionConfig = {
  id: 'autorizacion-comunicacion',
  title: 'Autorización para Comunicación de Puesta en Funcionamiento',
  description: 'Formulario ANEXO III - Junta de Andalucía',
  fileName: 'autorización-comunicación.pdf',
  route: '/autorizacion-comunicacion',
  
  pages: 3,  // NUEVO: indicar multipage
  
  fields: [
    // PÁGINA 1
    { name: 'apellidosNombre', label: 'Apellidos y Nombre', type: 'text', page: 1 },
    { name: 'nifCif', label: 'NIF/CIF', type: 'text', page: 1 },
    { name: 'razonSocial', label: 'Razón Social', type: 'text', page: 1, optional: true },
    { name: 'calidad', label: 'Actúa en Calidad de', type: 'select', 
      options: ['Propietario', 'Instalador', 'Responsable técnico'], page: 1 },
    
    // Lugar y medio de notificación
    { name: 'tipoVia', label: 'Tipo de Vía', type: 'select', 
      options: ['Calle', 'Avenida', 'Plaza', 'Paseo', 'Camino'], page: 1 },
    { name: 'nombreVia', label: 'Nombre de la Vía', type: 'text', page: 1 },
    { name: 'numero', label: 'Número', type: 'text', page: 1 },
    { name: 'bloque', label: 'Bloque', type: 'text', page: 1, optional: true },
    { name: 'portal', label: 'Portal', type: 'text', page: 1, optional: true },
    { name: 'escalera', label: 'Escalera', type: 'text', page: 1, optional: true },
    { name: 'planta', label: 'Planta', type: 'text', page: 1, optional: true },
    { name: 'puerta', label: 'Puerta', type: 'text', page: 1, optional: true },
    { name: 'codigoPostal', label: 'Código Postal', type: 'text', page: 1 },
    { name: 'municipio', label: 'Municipio', type: 'text', page: 1 },
    { name: 'provincia', label: 'Provincia', type: 'text', page: 1 },
    { name: 'pais', label: 'País', type: 'text', page: 1 },
    { name: 'telefonoFijo', label: 'Teléfono Fijo', type: 'tel', page: 1, optional: true },
    { name: 'telefonoMovil', label: 'Teléfono Móvil', type: 'tel', page: 1, optional: true },
    { name: 'correoElectronico', label: 'Correo Electrónico', type: 'email', page: 1 },
    
    // Datos del establecimiento e instalaciones
    { name: 'denominacionEstablecimiento', label: 'Denominación', type: 'text', page: 1 },
    { name: 'domicilioEstablecimiento', label: 'Domicilio', type: 'text', page: 1 },
    { name: 'localidadEstablecimiento', label: 'Localidad', type: 'text', page: 1 },
    { name: 'provinciaEstablecimiento', label: 'Provincia', type: 'text', page: 1 },
    { name: 'codigoPostalEstablecimiento', label: 'Código Postal', type: 'text', page: 1 },
    { name: 'instalacion1', label: 'Instalación 1', type: 'text', page: 1, optional: true },
    { name: 'instalacion2', label: 'Instalación 2', type: 'text', page: 1, optional: true },
    { name: 'instalacion3', label: 'Instalación 3', type: 'text', page: 1, optional: true },
    { name: 'instalacion4', label: 'Instalación 4', type: 'text', page: 1, optional: true },
    { name: 'instalacion5', label: 'Instalación 5', type: 'text', page: 1, optional: true },
    { name: 'instalacion6', label: 'Instalación 6', type: 'text', page: 1, optional: true },
    
    // PÁGINA 2
    { name: 'figura', label: 'Figura', type: 'select',
      options: ['Técnico competente', 'Instalador habilitado', 'Responsable técnico'], page: 2 },
    { name: 'apellidosNombrePersona', label: 'Apellidos y Nombre', type: 'text', page: 2 },
    { name: 'dniNiePersona', label: 'DNI/NIE', type: 'text', page: 2 },
    
    // Declaración y firma
    { name: 'lugarFirma', label: 'Lugar de Firma', type: 'text', page: 2 },
    { name: 'diaFirma', label: 'Día', type: 'text', page: 2 },
    { name: 'mesFirma', label: 'Mes', type: 'text', page: 2 },
    { name: 'anioFirma', label: 'Año', type: 'text', page: 2 },
    { name: 'representante', label: 'Representante/Autorizado', type: 'text', page: 2 },
    { name: 'codigoDirectorio', label: 'Código Directorio', type: 'text', page: 2, optional: true },
  ],
  
  defaultData: {
    // ... todos los fields inicializados a ''
  },
  
  fieldMapping: {
    // Mapeo 1:1 si tienen el mismo nombre en masterFormFields
    apellidosNombre: 'apellidosNombre',
    nifCif: 'nifCif',
    // ... etc
  },
  
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true,
    multiPage: true  // NUEVO: indicar que es multipage
  },
  
  category: 'autorizaciones'
}
```

---

## 🎨 Estructura del Componente Renderer

**Archivo:** `app/components/AutorizacionComunicacion.vue`

### Características Clave:

1. **Array de Etiquetas por Página**
   ```javascript
   const etiquetasPag1 = ref([
     { name: 'apellidosNombre', x: 65, y: 170, ... },
     // ...
   ])
   
   const etiquetasPag2 = ref([
     { name: 'figura', x: 95, y: 157, ... },
     // ...
   ])
   
   // Pág 3 sin etiquetas
   ```

2. **Watcher Global**
   - Sincroniza ALL props a etiquetas de ambas páginas
   - Usa same pattern que ZCertificadoBR

3. **Computed Visibles**
   - etiquetasVisiblesPag1, etiquetasVisiblesPag2
   - Oculta valores específicos si es necesario

4. **CSS Multi-Página**
   ```scss
   .print-wrapper {
     display: flex;
     flex-direction: column;
   }
   
   .pagina-documento {
     width: 210mm;
     height: 297mm;
     page-break-after: always;
     
     @media print {
       page-break-inside: avoid;
     }
   }
   ```

---

## 📄 Estructura de la Página

**Archivo:** `app/pages/autorizacion-comunicacion.vue`

```vue
<template>
  <DocumentPage 
    :config="autorizacionComunicacionConfig" 
    :documentComponent="AutorizacionComunicacion"
    multiPage
  />
</template>

<script setup>
import DocumentPage from '../components/DocumentPage.vue'
import AutorizacionComunicacion from '../components/AutorizacionComunicacion.vue'
import { autorizacionComunicacionConfig } from '../config/documents.js'
</script>
```

---

## 🔄 Diferencias vs ZCertificadoBR

| Aspecto | ZCertificadoBR | AutorizacionComunicacion |
|--------|---------|------|
| Páginas | 1 | 3 |
| Componente | Una página | 3 páginas en secuencia |
| CSS | Salto de página: NO | `page-break-after: always` |
| Etiquetas | Un array | Array por página |
| Props | Todos los campos | Todos los campos |
| Impresión | Normal | **CLAVE: preservar 3 páginas** |

---

## 🖨️ Export a PDF (Modo Impresión)

### Configuración CSS Crítica:

```scss
@media print {
  // Remover márgenes y padding
  * {
    margin: 0 !important;
    padding: 0 !important;
  }
  
  // Forzar color exacto
  .pagina-documento {
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
  
  // Saltos de página
  .pagina-documento {
    page-break-after: always;
    page-break-inside: avoid;
  }
  
  // Última página sin salto
  .pagina-documento:last-child {
    page-break-after: auto;
  }
}
```

### Pasos para Exportar Correctamente:

1. User abre `/autorizacion-comunicacion`
2. Click botón "🖨️ Descargar PDF"
3. Sistema abre print dialog del navegador
4. Usuario selecciona:
   - ✅ Márgenes: Ninguno
   - ✅ Aumentar zoom si es necesario (110-120%)
   - ✅ Opciones más → "Imprimir fondos"
5. Exportar a PDF → archivo de 3 páginas

---

## ✅ Checklist de Implementación

### Fase 1: Preparación
- [ ] Exportar 3 imágenes PNG a 2100×2970px (300 DPI)
- [ ] Guardar en `/public/documentos-oficiales/autorizacion-pag1.jpg`, etc.
- [ ] Crear documento de mapeo de coordenadas (x, y, w, h para cada campo/página)

### Fase 2: Código
- [ ] Agregar todos los campos a `masterFormFields.js` con `subsection: 'AUTORIZACIÓN'`
- [ ] Crear config completo en `documents.js`
- [ ] Crear componente `AutorizacionComunicacion.vue` con 3 páginas
- [ ] Crear página `autorizacion-comunicacion.vue`
- [ ] Sin errores de sintaxis

### Fase 3: Testing
- [ ] Abrir `/formulario-maestro`, llenar campos de AUTORIZACIÓN
- [ ] Guardar y abrirr `/autorizacion-comunicacion`
- [ ] Verificar que todas las 3 páginas se cargan
- [ ] Click editar, cambiar un valor, verificar que se sincroniza
- [ ] Print → Exportar a PDF → Verificar que salgan 3 páginas
- [ ] Revisar posicionamiento de textos en cada página

---

## 🔗 Archivos a Crear/Modificar

| Archivo | Acción | Líneas Aprox |
|---------|--------|----------|
| `masterFormFields.js` | ADD | +40 campos nuevos |
| `documents.js` | ADD | +150 líneas (config completo) |
| `AutorizacionComunicacion.vue` | CREATE | ~500 líneas |
| `autorizacion-comunicacion.vue` | CREATE | ~20 líneas |

---

## 🎓 Notas Importantes

1. **Imágenes de Alta Calidad:** Las imágenes DEBEN ser 300 DPI para que el PDF sea legible
2. **Márgenes en CSS:** Usar `margin: 0 !important` en impresión
3. **Page Break:** CLAVE usar `page-break-after: always` para separar páginas
4. **Fondos en Print:** Usuario DEBE habilitar "Imprimir fondos" en navegador
5. **Reutilización de Campos:** Si un campo (ej: municipio) aparece en ambas páginas, usar MISMO nombre
6. **Orden de Proceses:** Primero mapear coordenadas exactas, luego código

---

## 📊 Próximos Pasos

1. **Preparar imágenes** (3 PNGs a correcta resolución)
2. **Mapear coordenadas** (tabla x, y para cada campo/página)
3. **Implementar código** siguiendo pasos 1-7 del PLAN_INTEGRACION_DOCUMENTOS_CON_BACKGROUND.md pero adaptado para multipage

**Versión:** 2.0 (Multi-Página)  
**Fecha:** 2026-02-15  
**Estado:** Listo para implementación
