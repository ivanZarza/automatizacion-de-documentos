# 📊 COMPARATIVA: Autorización vs Habilitación

## Estructura Comparativa

### **Autorización de Representación**

```
┌─────────────────────────────────────────────────┐
│ ENCABEZADO                  [LOGO]              │
│ "AUTORIZACIÓN DE                                │
│  REPRESENTACIÓN"                                │
└─────────────────────────────────────────────────┘

PÁRRAFO INTRODUCTORIO
├─ "Por la presente, [AUTORIZANTE]..."
├─ "...a favor de [REPRESENTANTE]..."
└─ "...para gestionar [GESTIONES]..."

PÁRRAFO DE AUTORIZACIÓN
├─ "Por lo anterior, AUTORIZO a..."
└─ "...para que pueda actuar..."

FIRMA
Espacio para firma del autorizante

FECHA
"[LUGAR], [FECHA]"

PIE DE PÁGINA
```

---

### **Declaración de Habilitación Profesional**

```
┌─────────────────────────────────────────────────┐
│ ENCABEZADO                  [LOGO]              │
│ "DECLARACIÓN RESPONSABLE                        │
│  DE HABILITACIÓN PROFESIONAL"                   │
└─────────────────────────────────────────────────┘

PÁRRAFO INTRODUCTORIO
├─ "Por la presente, [PROFESIONAL]..."
├─ "...colegiado número [Nº]..."
└─ "...en el [COLEGIO]..."

SECCIÓN "DECLARA"
├─ "Poseer la titulación de [PROFESIÓN]..."
└─ "...y estar habilitado para..."

FIRMA
Espacio para firma del profesional

FECHA
"En [LUGAR], a [FECHA]"

PIE DE PÁGINA
```

---

## Diferencias Clave

| Aspecto | Autorización | Habilitación |
|---------|--------------|--------------|
| **Propósito** | Autorizar a alguien para actuar en mi nombre | Declarar que poseo titulación y estoy habilitado |
| **Partes principales** | Autorizante + Representante | Solo Profesional |
| **Sección central** | "AUTORIZO A..." | "DECLARA" |
| **Campos dinámicos** | 9 campos | 11 campos |
| **Contenido legal** | Autorización de poderes | Declaración de competencia |

---

## Similitudes

✅ **Ambos tienen:**
- Mismo estilo visual (logo SOLAY, título, firma)
- Campos editables en **rojo**
- Párrafos justificados
- Pie de página con contacto
- Firma fija (firma-solay.png)
- Generación de PDF
- Formulario editable

✅ **Mismo patrón técnico:**
- Componente Vue con `defineProps`
- Configuración en documents.js
- Página de ruta
- Flujo de datos DocumentPage → Props → Visualización
- Estilos print optimizados para PDF

---

## Campos por Documento

### **Autorización (9 campos)**
1. Autorizante
2. DNI Autorizante
3. Domicilio Autorizante
4. Representante
5. DNI Representante
6. Domicilio Representante
7. Organismo
8. Gestiones
9. Fecha

### **Habilitación (11 campos)**
1. Nombre Profesional
2. NIF Profesional
3. Profesión/Título
4. Número Colegiado
5. Nombre Colegio
6. Domicilio Profesional
7. Código Postal Profesional
8. Localidad Profesional
9. Provincia Profesional
10. Ciudad Firma
11. Fecha

---

## Rutas de Acceso

| Documento | Ruta |
|-----------|------|
| Autorización | `/autorizacion-representacion` |
| Habilitación | `/declaracion-habilitacion-profesional` |

---

## Cómo Crear Más Documentos del Mismo Estilo

### **Pasos:**

1. **Crear componente Vue** (igual estructura)
   ```vue
   <template>
     <div class="contenedor-principal">
       <!-- ENCABEZADO -->
       <!-- CONTENIDO CON CAMPOS EN ROJO -->
       <!-- FIRMA -->
       <!-- FECHA -->
       <!-- PIE -->
     </div>
   </template>
   
   <script setup>
   defineProps({ /* campos */ })
   </script>
   ```

2. **Agregar config en documents.js**
   ```javascript
   export const nuevoDocumentoConfig = {
     id: 'nuevo-documento',
     title: 'Nuevo Documento',
     description: '...',
     fileName: 'nuevo-documento.pdf',
     route: '/nuevo-documento',
     defaultData: { /* valores iniciales */ },
     fields: [ /* campos del formulario */ ],
     capabilities: { /* permisos */ }
   }
   ```

3. **Crear página de ruta**
   ```vue
   <template>
     <DocumentPage :config="config" :documentComponent="NuevoComponente" />
   </template>
   ```

4. **Registrar en documentConfigs**
   ```javascript
   const documentConfigs = {
     'nuevo-documento': nuevoDocumentoConfig,
     // ... otros
   }
   ```

---

## Color de Texto Editable

Ambos documentos usan:
- **Color:** `#c41e3a` (Rojo corporativo)
- **Peso:** `bold` (Negrita)
- **Clase CSS:** `.texto-editable`

---

**Patrón Establecido:** ✅ Consistente
**Mantenibilidad:** ✅ Alta (fácil crear nuevos documentos)
**Escalabilidad:** ✅ Excelente (agregar más documentos sin cambiar estructura)
