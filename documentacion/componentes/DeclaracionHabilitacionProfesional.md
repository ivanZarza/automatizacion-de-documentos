# 📄 DECLARACIÓN RESPONSABLE DE HABILITACIÓN PROFESIONAL

## Descripción

Documento oficial para declarar la habilitación profesional de un colegiado. Es similar en estructura a "Autorización de Representación" pero específicamente diseñado para profesionales que necesitan acreditar su titulación y colegiación.

---

## 📋 Campos Editables (en rojo)

Los siguientes campos están marcados en rojo en el documento y pueden ser editados a través del formulario:

1. **Nombre del Profesional** → `nombreProfesional`
   - Ej: Eduardo Rivera Cabezas

2. **NIF/CIF** → `nifProfesional`
   - Ej: 28.818.007-L

3. **Profesión/Título** → `profesionTitulo`
   - Ej: Ingeniero Industrial

4. **Número de Colegiado** → `numeroColegiado`
   - Ej: 4654

5. **Nombre del Colegio Oficial** → `nombreColegio`
   - Ej: Colegio Oficial de Ingenieros Industriales de Andalucía Occidental

6. **Domicilio (Calle y Número)** → `domicilioProfesional`
   - Ej: Calle El Peñón 5

7. **Código Postal** → `codigoPostalProfesional`
   - Ej: 41940

8. **Localidad** → `localidadProfesional`
   - Ej: Tomares

9. **Provincia** → `provinciaProfesional`
   - Ej: Sevilla

10. **Ciudad de Firma** → `ciudadFirma`
    - Ej: Jerez de la Frontera

11. **Fecha del Documento** → `fecha`
    - Formato: DD/MM/YYYY
    - Ej: 16/10/2025

---

## 🏗️ Estructura del Documento

```
┌─────────────────────────────────────────────────┐
│ DECLARACIÓN RESPONSABLE                         │
│ DE HABILITACIÓN PROFESIONAL        [LOGO SOLAY] │
└─────────────────────────────────────────────────┘

PÁRRAFO INTRODUCTORIO
├─ Por la presente, [NOMBRE], con NIF [NIF]
├─ [PROFESIÓN] colegiado número [Nº]
├─ en el [COLEGIO]
└─ y con domicilio en [DOMICILIO] - [CP]
   localidad de [LOCALIDAD], provincia de [PROVINCIA]

SECCIÓN "DECLARA"
├─ Poseer la titulación de [PROFESIÓN]
├─ colegiado en el [COLEGIO]
└─ con número de colegiado [Nº]

FIRMA
├─ Espacio para imagen de firma
└─ (Usa /firma-solay.png)

FECHA Y LUGAR
├─ En [CIUDAD], a [FECHA]

PIE DE PÁGINA
├─ www.solay.es
├─ Paseo de Bollullos de la Mitación 18...
└─ Página 1
```

---

## 📁 Archivos Relacionados

| Archivo | Ruta |
|---------|------|
| Componente | `/app/components/DeclaracionHabilitacionProfesional.vue` |
| Página de ruta | `/app/pages/declaracion-habilitacion-profesional.vue` |
| Config | `/app/config/documents.js` (línea 36) |
| Estilos | `/app/styles/variables.css` |

---

## 🔗 Configuración en documents.js

```javascript
export const declaracionHabilitacionProfesionalConfig = {
  id: 'declaracion-habilitacion-profesional',
  title: 'Declaración Responsable de Habilitación Profesional',
  description: 'Documento de declaración de habilitación profesional para colegiados',
  fileName: 'declaracion-habilitacion-profesional.pdf',
  route: '/declaracion-habilitacion-profesional',
  defaultData: {
    nombreProfesional: 'Eduardo Rivera Cabezas',
    nifProfesional: '28.818.007-L',
    profesionTitulo: 'Ingeniero Industrial',
    numeroColegiado: '4654',
    nombreColegio: 'Colegio Oficial de Ingenieros Industriales de Andalucía Occidental',
    domicilioProfesional: 'Calle El Peñón 5',
    codigoPostalProfesional: '41940',
    localidadProfesional: 'Tomares',
    provinciaProfesional: 'Sevilla',
    ciudadFirma: 'Jerez de la Frontera',
    fecha: '16/10/2025'
  },
  fields: [ /* campos del formulario */ ],
  capabilities: {
    canPreview: true,
    canEdit: true,
    canGeneratePDF: true
  }
}
```

---

## 🎨 Estilos

- **Texto editable (rojo):** Color `#c41e3a` y `font-weight: bold`
- **Encabezado:** Incluye logo Solay a la derecha
- **Formato:** A4 (21cm x 29.7cm)
- **Pie de página:** Información de contacto y número de página

---

## 🧪 Cómo Usar

### 1. **Navegar al documento**
```
http://localhost:3001/declaracion-habilitacion-profesional
```

### 2. **Ver previsualización**
El documento se muestra con datos por defecto de ejemplo

### 3. **Editar datos**
Haz click en "✏️ Editar" para abrir el formulario

### 4. **Modificar campos**
Completa todos los campos con la información correcta del profesional

### 5. **Guardar cambios**
Haz click en "Guardar Cambios" para actualizar la previsualización

### 6. **Descargar PDF**
Haz click en "📄 PDF" para generar y descargar el documento en PDF

---

## 📝 Notas Técnicas

- **Patrón:** Usa `defineProps` (no refs)
- **Flujo de datos:** DocumentPage → props → DeclaracionHabilitacionProfesional
- **Firma:** Se inserta imagen `/firma-solay.png` (fija)
- **Estilos de impresión:** Preserva colores exactos en PDF
- **Validación:** Los campos se validan en el formulario

---

## ✅ Estado

- ✅ Componente creado
- ✅ Configuración completada
- ✅ Página de ruta configurada
- ✅ Sin errores
- ✅ Listo para usar

---

**Fecha de creación:** 8 de febrero de 2026
**Versión:** 1.0
