# ✅ NUEVO DOCUMENTO CREADO: Declaración Responsable de Habilitación Profesional

## 📋 Resumen

Se ha creado un nuevo documento "Declaración Responsable de Habilitación Profesional" con el mismo estilo y estructura que "Autorización de Representación".

---

## 🎨 Características

### **Diseño**
- ✅ Encabezado con título en naranja y logo Solay
- ✅ Línea azul divisoria
- ✅ Estructura DECLARA (similar a AUTORIZO A)
- ✅ Firma digital del profesional
- ✅ Pie de página con información de contacto
- ✅ Estilos responsivos para impresión y pantalla

### **Campos Editables (en ROJO)**
Todos estos campos pueden editarse desde el formulario:

| Campo | Descripción | Tipo |
|-------|-------------|------|
| `nombreProfesional` | Nombre completo del profesional | Texto |
| `nifProfesional` | NIF/CIF | Texto |
| `profesionTitulo` | Profesión o título (Ej: Ingeniero Industrial) | Texto |
| `numeroColegiado` | Número de colegiado | Texto |
| `nombreColegio` | Nombre del Colegio Oficial | Texto |
| `domicilioProfesional` | Domicilio (calle y número) | Texto |
| `codigoPostalProfesional` | Código postal | Texto |
| `localidadProfesional` | Localidad/Municipio | Texto |
| `provinciaProfesional` | Provincia | Texto |
| `ciudadFirma` | Ciudad donde se firma el documento | Texto |
| `fecha` | Fecha del documento | Fecha |

---

## 📁 Archivos Creados

### 1. **Componente Vue**
```
/app/components/DeclaracionHabilitacionProfesional.vue
```
- Template con estructura del documento
- Props para todos los campos editables
- Estilos de impresión PDF

### 2. **Página de Ruta**
```
/app/pages/declaracion-habilitacion-profesional.vue
```
- Importa la configuración
- Importa DocumentPage wrapper
- Pasa el componente al wrapper

### 3. **Configuración**
```
/app/config/documents.js
```
- Agregado: `declaracionHabilitacionProfesionalConfig`
- `defaultData` con valores de ejemplo
- `fields` con definición de formulario
- `capabilities` con permisos

---

## 🔗 Flujo de Datos

```
Usuario accede a: /declaracion-habilitacion-profesional
        ↓
DocumentPage carga configuración
        ↓
Vista previa muestra documento con datos por defecto
        ↓
Usuario click "✏️ Editar"
        ↓
Formulario muestra 11 campos editables
        ↓
Usuario modifica campos (v-model)
        ↓
Usuario click "Guardar Cambios"
        ↓
Datos se actualizan en previsualización ✓
        ↓
Usuario puede descargar PDF con nuevos datos
```

---

## 🎯 Datos por Defecto

```javascript
{
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
}
```

---

## ✅ Verificaciones

| Verificación | Estado |
|---|---|
| Componente sin errores | ✅ |
| Página sin errores | ✅ |
| Config sin errores | ✅ |
| Props definidos | ✅ |
| Campos editables | ✅ 11 campos |
| Estilos PDF | ✅ |
| Ruta registrada | ✅ |

---

## 🧪 Cómo Usar

1. **Accede a:** `http://localhost:3001/declaracion-habilitacion-profesional`

2. **Verás:**
   - Documento con datos de ejemplo
   - Botones: ✏️ Editar, 📋 Previsualización, 📄 PDF

3. **Para editar:**
   - Click en "✏️ Editar"
   - Modifica los 11 campos del formulario
   - Click en "Guardar Cambios"
   - Los cambios se reflejan en la previsualización

4. **Para descargar:**
   - Click en "📄 PDF"
   - Se abre el diálogo de impresión
   - Selecciona "Guardar como PDF"

---

## 🎨 Campos Resaltados en Rojo

En el documento, los siguientes campos aparecen en **rojo (#d9534f)** para distinguir los datos editable:

✅ Nombre del profesional
✅ NIF
✅ Profesión/Título
✅ Número de colegiado
✅ Nombre del colegio
✅ Domicilio
✅ Código postal
✅ Localidad
✅ Provincia
✅ Ciudad de firma

---

## 📝 Notas

- El documento mantiene 100% coherencia de estilo con "Autorización de Representación"
- La firma es la misma firma digital de Solay
- Los estilos de impresión son idénticos para consistencia
- Todos los campos son editables y sincronizados

**Estado:** ✅ COMPLETADO Y FUNCIONAL
**Fecha:** 8 de febrero de 2026
