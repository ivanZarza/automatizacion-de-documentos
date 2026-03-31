# 🛠️ TROUBLESHOOTING - SOLUCIÓN DE PROBLEMAS

**Última actualización:** 9 de febrero de 2026  
**Versión:** 2.0  

---

## 🎯 ÍNDICE RÁPIDO

- [Problemas del Formulario Maestro](#problemas-del-formulario-maestro)
- [Problemas de Carga de Datos](#problemas-de-carga-de-datos)
- [Problemas de Visualización](#problemas-de-visualización)
- [Problemas de Edición](#problemas-de-edición)
- [Problemas de PDF](#problemas-de-pdf)
- [Problemas de localStorage](#problemas-de-localstorage)
- [Errores en Consola](#errores-en-consola)

---

## 📋 PROBLEMAS DEL FORMULARIO MAESTRO

### **❌ PROBLEMA: El formulario maestro no se ve**

**Síntomas:**
- Página en blanco
- Error 404
- Redirección automática

**Soluciones:**

1. **Verifica la URL**
   ```
   ✅ Correcto: http://localhost:3001/formulario-maestro
   ❌ Incorrecto: http://localhost:3001/form-maestro
   ❌ Incorrecto: http://localhost:3001/master-form
   ```

2. **Verifica que la página existe**
   ```bash
   # Debe existir este archivo:
   /app/pages/formulario-maestro.vue
   ```

3. **Recarga el servidor**
   ```bash
   # Detén con Ctrl+C
   npm run dev
   # Espera a que reconstruya
   ```

4. **Limpia caché del navegador**
   ```
   Ctrl+Shift+Delete (o Cmd+Shift+Delete en Mac)
   Limpia todo
   ```

---

### **❌ PROBLEMA: Los campos no se validan**

**Síntomas:**
- Puedo escribir cualquier cosa
- No hay mensajes de error
- Se guarda con datos inválidos

**Soluciones:**

1. **Verificar que DocumentForm tiene validación**
   ```javascript
   // En /app/components/DocumentForm.vue
   // Debe tener validación para campos type="email", type="tel", etc
   ```

2. **Agregar validación si falta**
   ```vue
   <input
     :type="field.type"
     @blur="validateField(field.name, $event.target.value)"
   />
   ```

---

### **❌ PROBLEMA: Mensaje "Guardar Datos y Continuar" no funciona**

**Síntomas:**
- Click no hace nada
- Sigue en la misma página

**Soluciones:**

1. **Verifica consola (F12)**
   ```javascript
   // Abre DevTools → Console
   // Debería haber un error que te indique qué pasó
   ```

2. **Verifica que el store está inicializado**
   ```javascript
   // En formulario-maestro.vue
   const formStore = useFormStore()
   console.log(formStore)  // Debería mostrar objeto con métodos
   ```

3. **Reinicia la aplicación**
   ```bash
   npm run dev
   ```

---

## 💾 PROBLEMAS DE CARGA DE DATOS

### **❌ PROBLEMA: Los datos del maestro no cargan en el documento**

**Síntomas:**
- Veo campos vacíos en el documento
- Los valores por defecto no aparecen
- Campos editables no tienen valores

**Soluciones:**

**PASO 1: Verifica que los datos fueron guardados**
```javascript
// Abre DevTools (F12) → Console
// Escribe:
localStorage.getItem('formDataMaestro')

// Debería mostrar algo como:
{"apellidosNombre":"Juan Pérez","nifCif":"12345678-A",...}

// Si DEVUELVE "null" → Los datos NO se guardaron
// Si DEVUELVE objeto → Los datos SÍ se guardaron
```

**PASO 2: Si devuelve null - Guarda los datos primero**
```
1. Vuelve a /formulario-maestro
2. Llena los campos
3. Click en "Guardar Datos y Continuar"
4. Espera a que redirige a /seleccionar-documento
5. Ahora intenta acceder al documento
```

**PASO 3: Verifica que el documento tiene fieldMapping correcto**
```javascript
// En /app/config/documents.js
// Busca el documento en cuestión
// Debe tener fieldMapping definido (aunque sea vacío)

autorizacionRepresentacionConfig = {
  defaultData: { ... },
  fieldMapping: {
    autorizante: 'apellidosNombre',  // ← Debe estar
    dniAutorizante: 'nifCif',
    ...
  }
}
```

**PASO 4: Verifica que el componente tiene defineProps correcto**
```vue
<!-- En el componente del documento -->
<template>
  <div>{{ autorizante }}</div>  <!-- ← Usa nombre del documento -->
</template>

<script setup>
defineProps({
  autorizante: String  // ← Debe coincidir con defaultData
})
</script>
```

**PASO 5: Si aún no funciona, limpia localStorage**
```javascript
// En consola:
localStorage.clear()

// Luego vuelve a /formulario-maestro
// Llena y guarda de nuevo
```

---

### **❌ PROBLEMA: Datos del maestro cargan a medias**

**Síntomas:**
- Algunos campos tienen valores
- Otros campos están vacíos
- Comportamiento inconsistente

**Soluciones:**

1. **Verifica que NO hay errores de tipeo en fieldMapping**
   ```javascript
   // ❌ INCORRECTO
   fieldMapping: {
     autorizante: 'apellidosNmbre'  // Typo: "Nmbre" vs "Nombre"
   }
   
   // ✅ CORRECTO
   fieldMapping: {
     autorizante: 'apellidosNombre'  // Correcto
   }
   ```

2. **Verifica que los nombres del maestro existen en masterFormFields.js**
   ```javascript
   // En /app/config/masterFormFields.js
   // Busca el campo:
   { name: 'apellidosNombre', ... }
   
   // Si NO está → Agregalo
   ```

3. **Verifica que el maestro tiene valores**
   ```javascript
   // En consola:
   const data = JSON.parse(localStorage.getItem('formDataMaestro'))
   console.log(data.apellidosNombre)
   
   // Si DEVUELVE "" (vacío) → Llena el maestro correctamente
   // Si DEVUELVE undefined → El campo NO existe en masterFormFields.js
   ```

---

## 👁️ PROBLEMAS DE VISUALIZACIÓN

### **❌ PROBLEMA: El documento se ve cortado o deformado**

**Síntomas:**
- Texto fuera del área visible
- Formato roto
- Estilos no se aplican

**Soluciones:**

1. **Verifica que el componente tiene clase contenedor-pdf**
   ```vue
   <template>
     <div data-pdf-content class="contenedor-pdf">
       <!-- Contenido -->
     </div>
   </template>
   ```

2. **Verifica estilos de variables.css**
   ```
   Archivo: /app/styles/variables.css
   Debe existir y tener colores definidos
   ```

3. **Prueba en otro navegador**
   ```
   Chrome → OK?
   Firefox → OK?
   Si no → Problema de CSS
   ```

---

### **❌ PROBLEMA: Los campos editables no se ven en rojo**

**Síntomas:**
- Campos normales (deberían ser rojo)
- Estilos no se aplican
- Color incorrecto

**Soluciones:**

1. **Verifica que el campo tiene clase correcta**
   ```vue
   ✅ CORRECTO
   <span class="texto-editable">{{ valor }}</span>
   
   ❌ INCORRECTO
   <span class="editable">{{ valor }}</span>
   <span class="campo-rojo">{{ valor }}</span>
   ```

2. **Verifica el CSS tiene la clase definida**
   ```css
   /* Debe estar en el <style scoped> del componente */
   .texto-editable {
     color: #c41e3a;  /* Rojo */
     font-weight: bold;
   }
   ```

3. **Si usa Boton component, verifica estilos**
   ```
   Archivo: /app/components/Boton.vue
   Debe tener class="texto-editable" internamente
   ```

---

## ✏️ PROBLEMAS DE EDICIÓN

### **❌ PROBLEMA: No puedo editar los campos**

**Síntomas:**
- Botón "Editar" no aparece
- Botón no funciona
- Modal de edición no abre

**Soluciones:**

1. **Verifica que estás en modo preview**
   ```
   Si ves botones de edición → Estás en preview ✅
   Si NO ves botones → Algo está mal
   ```

2. **Verifica que DocumentModal está en el componente**
   ```vue
   <template>
     <div>
       <DocumentModal ... />  <!-- ← Debe estar -->
       <div data-pdf-content class="contenedor-pdf">
         <!-- Contenido -->
       </div>
     </div>
   </template>
   ```

3. **Verifica que composable useDocument está correctamente**
   ```javascript
   import { useDocument } from '@/composables/useDocument'
   const doc = useDocument(config)
   ```

---

### **❌ PROBLEMA: Guardo cambios pero no se ven reflejados**

**Síntomas:**
- Edito valores en formulario
- Click "Guardar"
- Vuelve al preview pero valores no cambian

**Soluciones:**

1. **Verifica que estás guardando en el documento correcto**
   ```javascript
   // En DocumentPage.vue
   const handleFormSubmit = (newData) => {
     formData.value = newData  // ← Debe actualizar
     // Cierra modal
   }
   ```

2. **Verifica que el estado local se actualiza**
   ```vue
   <template>
     <div>{{ formData.apellidosNombre }}</div>  <!-- ← Ver cambios aquí -->
   </template>
   ```

3. **Si cambios NO persisten entre navegaciones**
   ```javascript
   // Necesitas guardar en el store TAMBIÉN
   formStore.setFormData(newData)  // ← Agregar esto
   ```

---

## 📄 PROBLEMAS DE PDF

### **❌ PROBLEMA: No puedo generar PDF**

**Síntomas:**
- Botón "PDF" no funciona
- No descarga nada
- Error en consola

**Soluciones:**

1. **Verifica que html2pdf está instalado**
   ```bash
   npm list html2pdf
   # Debería mostrar: html2pdf@0.10.1 (o similar)
   
   # Si NO está:
   npm install html2pdf
   ```

2. **Verifica que useDocument tiene generatePDF**
   ```javascript
   // En /app/composables/useDocument.js
   // Debe tener función:
   const generatePDF = () => { ... }
   ```

3. **Verifica que data-pdf-content existe**
   ```vue
   <div data-pdf-content class="contenedor-pdf">
     <!-- Sin esto, PDF no encuentra contenido -->
   </div>
   ```

4. **Prueba PDF en otra página**
   ```
   ¿Funciona en Autorización? Sí/No
   ¿Funciona en Declaración? Sí/No
   
   Si funciona en una pero no en otra → Problema de markup HTML
   ```

---

### **❌ PROBLEMA: PDF tiene formato incorrecto**

**Síntomas:**
- PDF cortado
- Páginas en blanco
- Contenido fuera de lugar

**Soluciones:**

1. **Verifica que ancho está a 210mm (A4)**
   ```css
   .contenedor-pdf {
     width: 210mm;  /* ← MUST BE THIS */
     height: 297mm;
   }
   ```

2. **Verifica que NO hay scroll horizontal**
   ```
   Si aparece scroll en página → Contenido muy ancho
   Reduce ancho o ajusta estilos
   ```

3. **Usa media print CSS**
   ```css
   @media print {
     * {
       -webkit-print-color-adjust: exact !important;
       print-color-adjust: exact !important;
     }
   }
   ```

---

## 🗄️ PROBLEMAS DE localStorage

### **❌ PROBLEMA: Los datos no se guardan entre sesiones**

**Síntomas:**
- Lleno el formulario
- Cierro el navegador
- Vuelvo mañana y está vacío

**Soluciones:**

1. **Verifica que localStorage no está bloqueado**
   ```
   DevTools → Application → Storage → Local Storage
   ¿Aparece "formDataMaestro"? Sí/No
   ```

2. **Verifica que el navegador NO tiene caché deshabilitado**
   ```
   DevTools → Settings → Network → Disable cache
   Si está checked → Desmarcar
   ```

3. **Verifica navegador incógnito**
   ```
   LocalStorage NO funciona en modo incógnito
   Prueba en ventana normal
   ```

4. **Verifica permisos del navegador**
   ```
   Algunos navegadores/configuraciones bloquean localStorage
   Prueba con otra app que use localStorage
   ```

---

### **❌ PROBLEMA: localStorage lleno (cuota excedida)**

**Síntomas:**
- Error: "QuotaExceededError"
- "localStorage full"
- No puedo guardar más datos

**Soluciones:**

1. **Limpia localStorage**
   ```javascript
   // En consola:
   localStorage.clear()
   ```

2. **Limpia solo tu clave**
   ```javascript
   // En consola:
   localStorage.removeItem('formDataMaestro')
   ```

3. **Verifica qué está guardado**
   ```javascript
   // En consola:
   for (let i = 0; i < localStorage.length; i++) {
     const key = localStorage.key(i)
     console.log(key, localStorage.getItem(key).length)
   }
   ```

---

## 🐛 ERRORES EN CONSOLA

### **Cómo abrir la consola**

```
Windows/Linux: F12 → Console
Mac: Cmd+Option+J → Console
```

### **❌ ERROR: "Cannot read property 'getFormData' of undefined"**

**Causa:** Store Pinia no está inicializado  
**Solución:**
```javascript
// Verifica que store está importado:
import { useFormStore } from '@/stores/formStore'

// Y que está siendo usado:
const formStore = useFormStore()
```

---

### **❌ ERROR: "formDataMaestro is not defined"**

**Causa:** Variable mal declarada  
**Solución:**
```javascript
// ✅ CORRECTO
const formData = ref({})

// ❌ INCORRECTO
formData = ref({})  // Falta "const"
```

---

### **❌ ERROR: "Cannot find module '@/composables/useDocument'"**

**Causa:** Path incorrecto o archivo no existe  
**Solución:**
```bash
# Verifica que existe:
ls /app/composables/useDocument.js

# Si no existe, créalo o importa desde ruta correcta
```

---

### **❌ ERROR: "fieldMapping[key] is undefined"**

**Causa:** fieldMapping mal configurado  
**Solución:**
```javascript
// Verifica documento config en /app/config/documents.js
// Busca el documento y su fieldMapping:

memoriaTecnicaConfig = {
  fieldMapping: {
    // Debe tener la forma correcta
    nombreDelDocumento: 'nombreDelMaestro'
  }
}
```

---

## 🆘 PREGUNTAS FRECUENTES (FAQ)

### **P: ¿Dónde están mis datos si cierro el navegador?**
R: En `localStorage` del navegador. Persisten indefinidamente hasta que:
- Hagas `localStorage.clear()`
- Borres datos del navegador (DevTools → Application → Storage)
- Cambies de navegador/dispositivo

### **P: ¿Puedo guardar datos en un servidor?**
R: Actualmente NO. El sistema es local. Para servidor:
- Necesitas agregar API backend
- Modificar formStore para enviar datos a servidor
- Ver `ARQUITECTURA_PINIA.md` para detalles

### **P: ¿Por qué algunos campos no cargan?**
R: Usualmente por:
- Typo en fieldMapping
- Campo no existe en maestro
- localStorage vacío

### **P: ¿Cómo hago debug?**
R: Mejores prácticas:
```javascript
// En consola:
console.log(localStorage.getItem('formDataMaestro'))
console.log(useFormStore().getFormData())

// En código:
console.log('Datos cargados:', mergedData)
```

### **P: ¿Es seguro localStorage?**
R: ⚠️ NO para datos sensibles (contraseñas, etc)
- Cualquier script en la página puede acceder
- Se sincroniza con DevTools
- Recomendación: Usa solo para datos de prueba

---

## 📞 RECURSOS ADICIONALES

- **Documentación:** `GUIA_FORMULARIO_MAESTRO.md`
- **Referencia:** `REFERENCIA_DOCUMENTOS.md`
- **Audit:** `AUDIT_COMPLETO_CAMPOS_Y_MAPPINGS.md`
- **Consola:** F12 (DevTools)
- **Network:** DevTools → Network tab

---

## ✅ CHECKLIST DE DEBUGGING

Antes de reportar un problema:

- [ ] ¿Probé en otro navegador?
- [ ] ¿Limpié localStorage?
- [ ] ¿Revisé la consola (F12)?
- [ ] ¿Recargué el servidor (`npm run dev`)?
- [ ] ¿Ingresé a `/formulario-maestro` primero?
- [ ] ¿Hice click en "Guardar Datos y Continuar"?
- [ ] ¿Navegué a un documento DESPUÉS?

Si respondiste "no" a alguna → Prueba eso primero 😊

---

**Estado:** ✅ Guía actualizada  
**Última revisión:** 9 de febrero de 2026

