# 📝 GUÍA COMPLETA - FORMULARIO MAESTRO

**Fecha:** 9 de febrero de 2026  
**Versión:** 1.0  
**Cambio importante:** Nuevo sistema de formulario centralizado

---

## 🎯 ¿QUÉ ES EL FORMULARIO MAESTRO?

El **Formulario Maestro** es un formulario central que contiene TODOS los campos necesarios para llenar automáticamente los 10 documentos del sistema. En lugar de llenar datos repetidamente para cada documento, el usuario completa el Maestro una sola vez y todos los documentos se rellenan automáticamente.

```
ANTES (sin Maestro):
Usuario → Documento 1 (completa datos)
Usuario → Documento 2 (completa datos OTRA VEZ)
Usuario → Documento 3 (completa datos OTRA VEZ)
...❌ Repetitivo

DESPUÉS (con Maestro):
Usuario → Formulario Maestro (completa 1 sola vez)
         ↓
Documento 1 ✅ (datos automáticos)
Documento 2 ✅ (datos automáticos)
Documento 3 ✅ (datos automáticos)
...✅ Eficiente
```

---

## 📍 DÓNDE ENCONTRARLO

```
URL: http://localhost:3001/formulario-maestro
Archivo: /app/pages/formulario-maestro.vue
Config: /app/config/masterFormFields.js
```

---

## 📊 ESTRUCTURA DEL FORMULARIO MAESTRO

El Formulario Maestro tiene **~250 campos** organizados en **11 SECCIONES**:

### **SECCIÓN EXPEDIENTE**
```
├─ Número de Expediente (texto)
├─ Número de Registro (texto)
├─ Ciudad de Firma (texto) ⭐ NUEVO
└─ Fecha (fecha) ⭐ NUEVO
```

### **SECCIÓN A: TITULAR**
```
├─ Apellidos y Nombre
├─ NIF/CIF
├─ Domicilio
├─ Código Postal
├─ Localidad
├─ Provincia
├─ Correo Electrónico
├─ Teléfono
├─ Representante
└─ DNI/CIF del Representante
```

### **SECCIÓN B: EMPLAZAMIENTO**
```
├─ Calle del Emplazamiento
├─ Número
├─ Bloque
├─ Escalera
├─ Piso
├─ Localidad del Emplazamiento
├─ Provincia del Emplazamiento
├─ Correo Electrónico del Emplazamiento
├─ Tipo de Instalación
├─ Uso y Destino
└─ Referencia Catastral ⭐ NUEVO
```

### **SECCIÓN C: PERSONA QUE FIRMA**
```
├─ Nombre del Técnico Instalador
├─ Número de Certificado
├─ Número de Instalador Empresa
├─ Domicilio del Técnico
├─ Número (Domicilio)
├─ Localidad del Técnico
├─ Código Postal del Técnico
├─ Teléfono del Técnico
├─ Nombre del Técnico Competente (opcional)
└─ (+ 7 campos más de técnico competente)
```

### **SECCIÓN D: MODALIDADES**
```
├─ Modalidad Básica M1 a M3
└─ Modalidad Especialista M4 a M9
```

### **SECCIÓN E1: INSTALACIÓN AISLADA**
```
├─ E1.1 Módulo Fotovoltaico (tecnología, marca, potencia)
├─ E1.2 Generador Fotovoltaico (potencia, intensidad, tensión)
├─ E1.3 Baterías (marca, tipo, capacidad, tensión)
├─ E1.4 Regulador (marca, intensidad, tensiones)
├─ E1.5 Inversor (marca, potencia, rendimientos)
├─ E1.6 Otros equipos
└─ E1.7 Información de la Demanda (12 meses)
```

### **SECCIÓN E2: INSTALACIÓN INTERCONECTADA**
```
├─ E2.1 Conexión a la Red (potencia, tipo)
├─ E2.2 Módulo Fotovoltaico
├─ E2.3 Generador Fotovoltaico
├─ E2.4 Inversor
├─ E2.5 Baterías
└─ E2.5.1 Protecciones Externas
```

### **SECCIÓN F: MEDIDAS DE PROTECCIÓN**
```
├─ Contactos Directos
├─ Contactos Indirectos
├─ Sobretensiones
├─ Punto Caliente
├─ Riesgo de Explosión
├─ Riesgo de Corrosión
└─ Otras Protecciones
```

### **SECCIÓN G: LÍNEAS Y CIRCUITOS** (~30 campos)
```
├─ Generador-Regulador
├─ Regulador-Batería
├─ Salida Regulador-Inversor
├─ Batería-Inversor
├─ Generador-Inversor (directo)
└─ Salida Inversor-Red
(Cada línea: Potencia, Longitud, Material, Intensidad, Caída)
```

### **SECCIÓN H: ESQUEMA UNIFILAR**
```
└─ Archivo de esquema (upload)
```

### **SECCIÓN I: PLANO EMPLAZAMIENTO**
```
└─ Archivo de plano (upload)
```

---

## 🔗 SYSTEM DE FIELD MAPPING

El sistema usa **fieldMapping** para conectar campos del Maestro con campos de documentos que tienen nombres diferentes.

### **¿Cuándo se necesita?**

Cuando un documento usa nombres de campos diferentes al Maestro:

```javascript
// En documents.js

autorizacionRepresentacionConfig = {
  defaultData: {
    autorizante: '',        // ← Documento usa este nombre
    dniAutorizante: '',
    domicilioAutorizante: ''
  },
  fieldMapping: {
    autorizante: 'apellidosNombre',        // ← Mapeo al maestro
    dniAutorizante: 'nifCif',
    domicilioAutorizante: 'domicilio'
  }
}
```

### **Documentos con fieldMapping**

```
✅ AutorizacionRepresentacion
   ├─ autorizante → apellidosNombre
   ├─ dniAutorizante → nifCif
   ├─ domicilioAutorizante → domicilio
   └─ fecha → fecha

✅ DeclaracionHabilitacionProfesional
   ├─ ciudadFirma → ciudadFirma
   └─ fecha → fecha

✅ CertificadoCoplanarTeja
   ├─ direccion → emplazamientoCalle
   ├─ numero → numero
   ├─ codigoPostal → codigoPostal
   ├─ localidad → localidadEmplazamiento
   ├─ ciudadFirma → ciudadFirma
   └─ fecha → fecha

✅ DeclaracionNoGeneracionRcds
   ├─ direccion → emplazamientoCalle
   ├─ numero → numero
   ├─ codigoPostal → codigoPostal
   ├─ municipio → localidadEmplazamiento
   ├─ referenciaCatastral → referenciaCatastral
   ├─ ciudadFirma → ciudadFirma
   └─ fecha → fecha

✅ Memorias Técnicas (vacío = usa mismos nombres)
```

---

## 💾 CÓMO FUNCIONA LA PERSISTENCIA

### **Flujo de Datos:**

```
1. Usuario llena Formulario Maestro
   ↓
2. Click "Guardar Datos y Continuar"
   ↓
3. Datos guardados en Pinia Store (formStore)
   ↓
4. localStorage persistencia automática
   ↓
5. Usuario navega a cualquier documento
   ↓
6. Sistema obtiene datos del store
   ↓
7. Aplica fieldMapping si existe
   ↓
8. Documento recibe datos completados
```

### **Code:**

```javascript
// En formulario-maestro.vue
const handleFormSubmit = (newData) => {
  formData.value = newData
  formStore.setFormData(newData)  // Guarda en Pinia
  router.push('/seleccionar-documento')
}

// En documento (ej: AuthorizacionRepresentacion.vue)
const mergedData = getMergedDocumentData(autorizacionRepresentacionConfig)
// Automáticamente aplica fieldMapping y obtiene valores del maestro
```

---

## ➕ CÓMO AGREGAR UN NUEVO CAMPO

### **Paso 1: Agregar al masterFormFields.js**

```javascript
// En /app/config/masterFormFields.js

export const masterFormFields = [
  // ... campos existentes ...
  
  { 
    name: 'miNuevoCampo',                    // ← Nombre único
    label: 'Etiqueta visible para el usuario',
    placeholder: 'Ej: valor de ejemplo',
    type: 'text',                             // text, email, tel, date, select, textarea
    fullWidth: true                           // opcional: ocupa todo ancho
  }
]
```

### **Paso 2: Agregar valor por defecto**

```javascript
// En /app/config/masterFormFields.js

export const getMasterFormDefaultData = () => {
  return {
    // ... campos existentes ...
    miNuevoCampo: ''  // ← Valor inicial
  }
}
```

### **Paso 3: Si lo necesita un documento, agregar fieldMapping**

```javascript
// En /app/config/documents.js

export const miDocumentoConfig = {
  fieldMapping: {
    // ...
    campoDelDocumento: 'miNuevoCampo'  // ← Conexión
  }
}
```

### **Paso 4: Usar en el componente del documento**

```vue
<template>
  <div>{{ miNuevoCampo }}</div>
</template>

<script setup>
defineProps({
  miNuevoCampo: String  // ← Recibirá el valor automáticamente
})
</script>
```

---

## 🧪 CÓMO PROBAR EL FORMULARIO MAESTRO

### **1. Llena el formulario**
```
URL: http://localhost:3001/formulario-maestro
Ingresa datos en varios campos
```

### **2. Guarda los datos**
```
Click en "Guardar Datos y Continuar"
Observa que se redirige a /seleccionar-documento
```

### **3. Verifica persistencia**
```
Abre DevTools (F12)
Vé a Application → Local Storage
Busca clave: 'formDataMaestro'
Deberías ver tu JSON con los datos guardados
```

### **4. Navega a un documento**
```
Selecciona cualquier documento
Los campos deberían estar RELLENOS automáticamente
```

### **5. Verifica fieldMapping**
```
Ve a AutorizacionRepresentacion
Los campos "autorizante", "dniAutorizante", "domicilioAutorizante"
deberían tener los valores de "apellidosNombre", "nifCif", "domicilio"
del maestro (aunque tengan nombres diferentes)
```

---

## 🔍 DEBUGGING

### **Problema: Los datos no se cargan en el documento**

**Solución 1:** Verifica localStorage
```javascript
// En consola del navegador
localStorage.getItem('formDataMaestro')
// Debería mostrar el JSON con tus datos
```

**Solución 2:** Verifica fieldMapping existe
```javascript
// En /app/config/documents.js
// Busca el documento en cuestión
// Asegúrate que tenga fieldMapping con los nombres correctos
```

**Solución 3:** Verifica prop names en componente
```vue
<!-- En el componente del documento -->
<template>
  <!-- Usa el NOMBRE de la prop, no del campo maestro -->
  {{ autorizante }}  <!-- ✅ Correcto (nombre del documento) -->
  {{ apellidosNombre }}  <!-- ❌ Incorrecto (nombre del maestro) -->
</template>

<script setup>
defineProps({
  autorizante: String  // ✅ Debe coincidir con defaultData del documento
})
</script>
```

### **Problema: El localStorage se vacía al actualizar**

Esto es normal si no guardaste primero. Solución:
```
1. Llena el Formulario Maestro
2. Click "Guardar Datos y Continuar" (importante!)
3. Ahora puedes navegar
```

---

## 📊 ESTADÍSTICAS DEL MAESTRO

| Métrica | Valor |
|---------|-------|
| **Campos totales** | ~250 |
| **Secciones** | 11 |
| **Documentos conectados** | 10 |
| **fieldMappings definidos** | 10 |
| **Campos con mapeo especial** | ~15 |

---

## ✅ CHECKLIST: NUEVO DOCUMENTO CON MAESTRO

Si estás agregando un nuevo documento y quieres que cargue datos del Maestro:

- [ ] Crear componente documento en `/app/components/`
- [ ] Crear página en `/app/pages/`
- [ ] Agregar config en `/app/config/documents.js`
- [ ] Definir `defaultData` con campos del documento
- [ ] Si campos tienen nombres diferentes, definir `fieldMapping`
- [ ] Usar `defineProps` en el componente con los nombres del `defaultData`
- [ ] Probar que los datos se cargan del Maestro
- [ ] Verificar localStorage tiene los datos
- [ ] Agregar a router si es necesario

---

## 🔐 CAMPOS ESPECIALES (NUEVOS EN FEB 2026)

Estos campos se agregaron recientemente para mejorar la cobertura:

```
✅ ciudadFirma
   - Ubicación: SECCIÓN EXPEDIENTE
   - Tipo: texto
   - Usado por: AutorizacionRepresentacion, Certificados, Declaraciones
   - Ejemplo: "Sevilla", "Jerez de la Frontera"

✅ fecha
   - Ubicación: SECCIÓN EXPEDIENTE
   - Tipo: date
   - Usado por: AutorizacionRepresentacion, Certificados, Declaraciones
   - Ejemplo: "16/10/2025"

✅ referenciaCatastral
   - Ubicación: SECCIÓN B - EMPLAZAMIENTO
   - Tipo: texto
   - Usado por: Certificados, DeclaracionNoGeneracionRcds
   - Ejemplo: "4127805SG0000200000CT"
```

---

## 🎓 REFERENCIAS

- **Archivo config:** `/app/config/masterFormFields.js`
- **Archivo store:** `/app/stores/formStore.js`
- **Archivo merge:** `/app/utils/mergeFormData.js`
- **Componentes:** `/app/components/DocumentForm.vue`
- **Auditoría:** `AUDIT_COMPLETO_CAMPOS_Y_MAPPINGS.md`

---

## 💡 TIPS Y TRUCOS

1. **Reutiliza el fieldMapping** - No necesitas cambiar componentes, solo mapear
2. **Valores por defecto** - Si Maestro está vacío, usa `defaultData` del documento
3. **Prueba en DevTools** - Network tab para ver payloads
4. **localStorage limpio** - `localStorage.clear()` para empezar de cero
5. **Documentación** - Mantén AUDIT_COMPLETO_CAMPOS_Y_MAPPINGS.md actualizado

---

**Estado:** ✅ Sistema funcional y completo  
**Última actualización:** 9 de febrero de 2026

