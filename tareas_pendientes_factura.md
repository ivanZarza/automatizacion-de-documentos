# Tareas Pendientes - Sistema de Generación de Documentos por Factura

## 📋 OBJETIVO DEL PROYECTO
Implementar un sistema que permita generar múltiples documentos "DR de Corriente de Pago a Empresas Acreedoras" desde el mismo formulario maestro, utilizando datos comunes (expediente, empresa, cliente) y datos específicos por factura (numeroFactura1-5).

---

## ✅ TAREAS COMPLETADAS

### 1. Creación del Componente de Documento
**Archivo**: `/app/components/justificaciones/DeclaracionCorrientePagoAcreedores.vue`
- ✅ Estructura HTML/CSS completa basada en AutorizacionRepresentacion.vue
- ✅ Texto oficial del PDF implementado
- ✅ Interpolación de variables correcta:
  - `numeroExpediente`
  - `nombreEmpresa`
  - `cifEmpresa`
  - `apellidosNombre`
  - `nifCif`
  - `numeroFactura`
  - `localidad`
  - `dia`, `mes`, `anio`

### 2. Configuración del Documento
**Archivo**: `/app/config/justificaciones/declaracionCorrientePagoAcreedoresConfig.js`
- ✅ Campos definidos
- ✅ Valores por defecto configurados:
  - `nombreEmpresa: 'Solay Ingenieros S.L.'`
  - `cifEmpresa: 'B09848912'`
- ✅ Categoría asignada: `'justificaciones'`

### 3. Página del Documento
**Archivo**: `/app/pages/justificaciones/declaracion-corriente-pago-acreedores.vue`
- ✅ Página wrapper creada
- ✅ Integración con el componente

### 4. Registro en el Sistema
**Archivo**: `/app/config/documents.js`
- ✅ Import añadido
- ✅ Documento registrado en el array de documentos

### 5. Modificación del Formulario Maestro
**Archivo**: `/app/config/masterFormFields.js`
- ✅ Atributo `facturaGroup: 1/2/3/4/5` añadido a los campos `numeroFactura1-5` en la subsección JUSTIFICACION
- ✅ Sección FACTURAS incorrecta eliminada

### 6. Lógica de Generación de Documentos
**Archivo**: `/app/components/DocumentForm.vue`
- ✅ Función `generarDocumentoFactura(facturaIndex)` implementada:
  ```javascript
  const generarDocumentoFactura = (facturaIndex) => {
    const datosComunes = {
      numeroExpediente: formData.value.numeroExpediente,
      nombreEmpresa: 'Solay Ingenieros S.L.',
      cifEmpresa: 'B09848912',
      apellidosNombre: formData.value.apellidosNombre,
      nifCif: formData.value.nifCif,
      localidad: 'Málaga',
      dia: formData.value.dia,
      mes: formData.value.mes,
      anio: formData.value.anio
    }
    
    const datosFactura = {
      numeroFactura: formData.value[`numeroFactura${facturaIndex}`]
    }
    
    const datosFinales = { ...datosComunes, ...datosFactura }
    
    router.push({
      path: '/justificaciones/declaracion-corriente-pago-acreedores',
      query: datosFinales
    })
  }
  ```
- ✅ Botón inline añadido en el `group-header` junto al título "Factura 1/2/3/4/5"
- ✅ Handler `@click.stop` para evitar colapsar el grupo al hacer click
- ✅ Estilos CSS del botón inline implementados

---

## ⚠️ TAREAS PENDIENTES

### 1. 🔴 CRÍTICO: Mapeo de Campos Comunes
**Descripción**: Necesitamos definir el mapeo correcto de los campos comunes del formulario maestro a los campos del documento.

**Campos a mapear**:
- ❓ `numeroExpediente` → ¿De dónde se obtiene? (pendiente definir)
- ❓ `apellidosNombre` → ¿Campo del formulario maestro?
- ❓ `nifCif` → ¿Campo del formulario maestro?
- ❓ `dia`, `mes`, `anio` → ¿Campos del formulario maestro? ¿O fecha actual?

**Acción**: El usuario debe proporcionar el mapeo exacto de estos campos.

### 2. 🟡 Testing del Sistema
**Descripción**: Probar la funcionalidad completa del sistema de generación.

**Pasos de prueba**:
1. Abrir el formulario maestro
2. Ir a la pestaña JUSTIFICACION
3. Verificar que aparecen los grupos "Factura 1" a "Factura 5"
4. Verificar que cada grupo tiene el botón "📄 Generar DR Corriente Pago" en línea con el título
5. Rellenar datos de prueba:
   - Número de expediente
   - Datos del cliente (apellidos, nombre, NIF)
   - Números de factura (en Factura 1, Factura 3, etc.)
6. Hacer click en el botón de Factura 1
7. Verificar que se genera el documento con los datos correctos
8. Repetir con otras facturas

### 3. 🟡 Validaciones
**Descripción**: Añadir validaciones antes de generar el documento.

**Validaciones necesarias**:
- ✗ Verificar que el campo `numeroFacturaX` tiene valor antes de generar
- ✗ Mostrar alerta si faltan campos obligatorios comunes
- ✗ Deshabilitar botón si no hay número de factura

**Implementación sugerida** en `DocumentForm.vue`:
```javascript
const generarDocumentoFactura = (facturaIndex) => {
  const numeroFactura = formData.value[`numeroFactura${facturaIndex}`]
  
  if (!numeroFactura) {
    alert(`Por favor, ingrese el número de factura ${facturaIndex}`)
    return
  }
  
  if (!formData.value.apellidosNombre || !formData.value.nifCif) {
    alert('Por favor, complete los datos del cliente')
    return
  }
  
  // ... resto del código
}
```

### 4. 🟢 Mejoras Visuales
**Descripción**: Pulir la experiencia de usuario.

**Mejoras propuestas**:
- ✗ Añadir tooltip al botón explicando su función
- ✗ Icono diferente o más descriptivo
- ✗ Feedback visual al generar (loading spinner)
- ✗ Confirmación de generación exitosa

---

## 📂 ARCHIVOS INVOLUCRADOS

### Archivos Modificados
1. `/app/config/masterFormFields.js`
   - Añadido `facturaGroup` a campos de factura
   - Eliminada sección FACTURAS duplicada

2. `/app/components/DocumentForm.vue`
   - Añadida función `generarDocumentoFactura`
   - Añadido botón inline en `group-header`
   - Añadidos estilos CSS para `.btn-generar-factura-inline`

3. `/app/config/documents.js`
   - Registrado nuevo documento

### Archivos Creados
1. `/app/components/justificaciones/DeclaracionCorrientePagoAcreedores.vue`
   - Componente del documento

2. `/app/config/justificaciones/declaracionCorrientePagoAcreedoresConfig.js`
   - Configuración del documento

3. `/app/pages/justificaciones/declaracion-corriente-pago-acreedores.vue`
   - Página del documento

### Archivos a Revisar/Modificar
- Ninguno adicional por ahora (pendiente del mapeo de campos)

---

## 🔧 CÓMO CONTINUAR

### Paso 1: Definir Mapeo de Campos
El usuario debe proporcionar la correspondencia exacta:
```javascript
// Ejemplo de lo que necesitamos saber:
const datosComunes = {
  numeroExpediente: formData.value.????,  // ¿Qué campo del formulario maestro?
  apellidosNombre: formData.value.????,   // ¿Qué campo del formulario maestro?
  nifCif: formData.value.????,            // ¿Qué campo del formulario maestro?
  dia: formData.value.???? || new Date().getDate(),
  mes: formData.value.???? || new Date().getMonth() + 1,
  anio: formData.value.???? || new Date().getFullYear(),
  // ... etc
}
```

### Paso 2: Actualizar la Función generarDocumentoFactura
Modificar `/app/components/DocumentForm.vue` con el mapeo correcto.

### Paso 3: Añadir al Config del Documento
Actualizar `/app/config/justificaciones/declaracionCorrientePagoAcreedoresConfig.js` con el `fieldMapping` completo:
```javascript
export default {
  id: 'declaracion-corriente-pago-acreedores',
  title: 'DR de Corriente de Pago a Empresas Acreedoras',
  category: 'justificaciones',
  fieldMapping: {
    numeroExpediente: 'numeroExpediente',
    nombreEmpresa: () => 'Solay Ingenieros S.L.',
    cifEmpresa: () => 'B09848912',
    apellidosNombre: 'apellidosNombre', // Campo del master form
    nifCif: 'nifCif',                   // Campo del master form
    localidad: () => 'Málaga',
    dia: 'dia',                         // O función para fecha actual
    mes: 'mes',
    anio: 'anio',
    // numeroFactura se pasa dinámicamente desde el query param
  },
  // ... resto de configuración
}
```

### Paso 4: Testing Completo
Probar todas las facturas (1-5) para asegurar que funciona correctamente.

---

## 📝 NOTAS IMPORTANTES

1. **Facturas Opcionales**: El sistema permite generar documentos solo para las facturas que tengan número ingresado. No es necesario rellenar las 5 facturas.

2. **Datos Estáticos**: `nombreEmpresa`, `cifEmpresa` y `localidad` están hardcodeados como constantes ya que son siempre los mismos.

3. **Navegación**: El sistema usa `router.push` con `query params` para pasar los datos al documento, evitando persistencia innecesaria.

4. **Botón Inline**: El botón se muestra SOLO en los grupos que tienen campos con `facturaGroup` definido (Factura 1-5), no aparece en otros grupos.

5. **Click Handler**: El `@click.stop` evita que el click en el botón también colapse/expanda el grupo de factura.

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **AHORA**: Usuario proporciona el mapeo de campos comunes
2. **DESPUÉS**: Actualizar función `generarDocumentoFactura` con mapeo correcto
3. **FINALMENTE**: Testing y validaciones

---

**Fecha de creación**: 19 de mayo de 2026
**Estado**: En desarrollo - Pendiente mapeo de campos
