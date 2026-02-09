# 📋 REFERENCIA COMPLETA - 10 DOCUMENTOS DEL SISTEMA

**Fecha:** 9 de febrero de 2026  
**Versión:** 2.0  
**Estado:** Actualizado con fieldMappings

---

## 📚 CATÁLOGO DE DOCUMENTOS

El sistema gestiona **10 documentos profesionales** organizados en 3 categorías:

---

## 🔵 DOCUMENTOS SIMPLES (4)

### **1. AUTORIZACIÓN DE REPRESENTACIÓN**

```
ID: autorizacion-representacion
URL: /autorizacion-representacion
Componente: AutorizacionRepresentacion.vue
```

**Descripción:** Documento para autorizar a terceros a actuar en nombre de una persona.

**Campos (9):**

| Campo | Variable | Maestro | fieldMapping |
|-------|----------|---------|--------------|
| Autorizante | autorizante | apellidosNombre | ✅ Mapeado |
| DNI Autorizante | dniAutorizante | nifCif | ✅ Mapeado |
| Domicilio Autorizante | domicilioAutorizante | domicilio | ✅ Mapeado |
| Representante | representante | (default) | ❌ Sin mapeo |
| DNI Representante | dniRepresentante | (default) | ❌ Sin mapeo |
| Domicilio Representante | domicilioRepresentante | (default) | ❌ Sin mapeo |
| Organismo | organismo | (default) | ❌ Sin mapeo |
| Gestiones | gestiones | (default) | ❌ Sin mapeo |
| Fecha | fecha | fecha | ✅ Mapeado |

**fieldMapping:**
```javascript
{
  autorizante: 'apellidosNombre',
  dniAutorizante: 'nifCif',
  domicilioAutorizante: 'domicilio',
  fecha: 'fecha'
}
```

**Estado:** ✅ Completo | 🔄 Mapeos activos

---

### **2. DECLARACIÓN HABILITACIÓN PROFESIONAL**

```
ID: declaracion-habilitacion-profesional
URL: /declaracion-habilitacion-profesional
Componente: DeclaracionHabilitacionProfesional.vue
```

**Descripción:** Declaración responsable de profesional habilitado para realizar trabajos especializados.

**Campos (11):**

| Campo | Variable | Maestro | Origen |
|-------|----------|---------|--------|
| Nombre Profesional | nombreProfesional | - | Default/Manual |
| NIF Profesional | nifProfesional | - | Default/Manual |
| Profesión Título | profesionTitulo | - | Default/Manual |
| Número Colegiado | numeroColegiado | - | Default/Manual |
| Nombre Colegio | nombreColegio | - | Default/Manual |
| Domicilio Profesional | domicilioProfesional | - | Default/Manual |
| Código Postal | codigoPostalProfesional | - | Default/Manual |
| Localidad | localidadProfesional | - | Default/Manual |
| Provincia | provinciaProfesional | - | Default/Manual |
| Ciudad de Firma | ciudadFirma | ciudadFirma | ✅ Mapeado |
| Fecha | fecha | fecha | ✅ Mapeado |

**fieldMapping:**
```javascript
{
  ciudadFirma: 'ciudadFirma',
  fecha: 'fecha'
}
```

**Valores por defecto:**
```javascript
nombreProfesional: 'Eduardo Rivera Cabezas',
nifProfesional: '28.818.007-L',
profesionTitulo: 'Ingeniero Industrial',
numeroColegiado: '4654',
nombreColegio: 'Colegio Oficial de Ingenieros Industriales de Andalucía Occidental',
domicilioProfesional: 'Calle El Peñón 5',
codigoPostalProfesional: '41940',
localidadProfesional: 'Tomares',
provinciaProfesional: 'Sevilla'
```

**Estado:** ✅ Completo | 🔄 Mapeos activos

---

### **3. CERTIFICADO SOLIDEZ - COPLANAR TEJA**

```
ID: certificado-coplanar-teja
URL: /certificado-coplanar-teja
Componente: CertificadoCoplanarTeja.vue
```

**Descripción:** Certificado de solidez y seguridad para instalaciones fotovoltaicas en teja coplanar.

**Campos (14):**

| Campo | Variable | Maestro | fieldMapping |
|-------|----------|---------|--------------|
| Dirección | direccion | emplazamientoCalle | ✅ |
| Número | numero | numero | ✅ |
| Otros Datos Dirección | otrosDatosDireccion | - | Manual |
| Código Postal | codigoPostal | codigoPostal | ✅ |
| Localidad | localidad | localidadEmplazamiento | ✅ |
| Referencia Catastral | referenciaCatastral | referenciaCatastral | ✅ |
| Número Módulos | numModulos | - | Manual |
| Potencia | potencia | - | Manual |
| Peso | peso | - | Manual |
| Modelo | modelo | - | Manual |
| Ciudad de Firma | ciudadFirma | ciudadFirma | ✅ |
| Fecha | fecha | fecha | ✅ |
| Imagen 1 | imagen1 | - | Upload |
| Imagen 4 | imagen4 | - | Upload |

**fieldMapping:**
```javascript
{
  direccion: 'emplazamientoCalle',
  numero: 'numero',
  codigoPostal: 'codigoPostal',
  localidad: 'localidadEmplazamiento',
  referenciaCatastral: 'referenciaCatastral',
  ciudadFirma: 'ciudadFirma',
  fecha: 'fecha'
}
```

**Estado:** ✅ Completo | 🔄 Mapeos activos

---

### **4. CERTIFICADO SOLIDEZ - CUBIERTA PLANA APORTÍCADA**

```
ID: certificado-cubierta-plan-aaporticada
URL: /certificado-cubierta-plan-aaporticada
Componente: CertificadoCubiertaPlanAaporticada.vue
```

**Descripción:** Similar al anterior pero para cubiertas planas con estructura aportícada.

**Campos (13):** (Similar a #3, sin imagen4)

**fieldMapping:**
```javascript
{
  direccion: 'emplazamientoCalle',
  numero: 'numero',
  codigoPostal: 'codigoPostal',
  localidad: 'localidadEmplazamiento',
  referenciaCatastral: 'referenciaCatastral',
  ciudadFirma: 'ciudadFirma',
  fecha: 'fecha'
}
```

**Estado:** ✅ Completo | 🔄 Mapeos activos

---

## 🟡 DOCUMENTO MIXTO (1)

### **5. DECLARACIÓN NO GENERACIÓN RCDs**

```
ID: declaracion-no-generacion-rcds
URL: /declaracion-no-generacion-rcds
Componente: DeclaracionNoGeneracionRcds.vue
```

**Descripción:** Declaración responsable de no generación de residuos de construcción y demolición.

**Campos (8):**

| Campo | Variable | Maestro | fieldMapping |
|-------|----------|---------|--------------|
| Dirección | direccion | emplazamientoCalle | ✅ |
| Número | numero | numero | ✅ |
| Otros Datos | otrosDatos | - | Manual |
| Código Postal | codigoPostal | codigoPostal | ✅ |
| Referencia Catastral | referenciaCatastral | referenciaCatastral | ✅ |
| Municipio | municipio | localidadEmplazamiento | ✅ |
| Ciudad de Firma | ciudadFirma | ciudadFirma | ✅ |
| Fecha | fecha | fecha | ✅ |

**fieldMapping:**
```javascript
{
  direccion: 'emplazamientoCalle',
  numero: 'numero',
  codigoPostal: 'codigoPostal',
  municipio: 'localidadEmplazamiento',
  referenciaCatastral: 'referenciaCatastral',
  ciudadFirma: 'ciudadFirma',
  fecha: 'fecha'
}
```

**Estado:** ✅ Completo | 🔄 Mapeos activos

---

## 🟠 MEMORIAS TÉCNICAS (5)

Las **Memorias Técnicas** son documentos técnicos extensos (~240 campos cada una). Usan los mismos nombres de campos que el Formulario Maestro, por lo que el fieldMapping es **vacío** (no se necesita transformación).

### **6. MTD - INSTALACIÓN AUTOCONSUMO MONOFÁSICA CON BATERÍA**

```
ID: mtd-instalacion-autoconsumo-monofasica-con-bateria
URL: /mtd-instalacion-autoconsumo-monofasica-con-bateria
Componente: MemoriaTecnica.vue
Fichero: 6-MTD-INSTALACION-AUTOCONSUMO-MONOFASICA-CON-BATERIA.pdf
```

**Secciones (~240 campos):**
- Expediente (2)
- A: Titular (10)
- B: Emplazamiento (11)
- C: Persona que firma (16)
- D: Modalidades (9)
- E1: Inst. Aislada (52)
- E2: Inst. Interconectada (35)
- F: Medidas protección (13)
- G: Líneas y circuitos (36)
- H: Esquema unifilar (1)
- I: Plano emplazamiento (1)

**fieldMapping:**
```javascript
{
  // Vacío - usa nombres idénticos del maestro
}
```

**Campos clave sincronizados:**
```
✅ numeroExpediente → numeroExpediente
✅ apellidosNombre → apellidosNombre
✅ nifCif → nifCif
✅ domicilio → domicilio
✅ (... +230 campos más)
```

**Estado:** ✅ Completo | 🔄 Todas las secciones

---

### **7. MTD - INSTALACIÓN AISLADA CON BATERÍA**

```
ID: mtd-instalacion-aislada-con-bateria
URL: /mtd-instalacion-aislada-con-bateria
Componente: MemoriaTecnica.vue (con config diferente)
Fichero: 6-MTD-INSTALACION-AISLADA-CON-BATERIA.pdf
```

**Descripción:** Para instalaciones fotovoltaicas aisladas con almacenamiento en batería.

**Campos:** ~240 (estructura similar a #6)

**Diferencias principales vs #6:**
```
tipoInstalacion: 'Fotovoltaica aislada'
usoDestino: 'Autoconsumo para vivienda'
(resto similar)
```

**Estado:** ✅ Completo | 🔄 Todas las secciones

---

### **8. MTD - INSTALACIÓN AUTOCONSUMO TRIFÁSICA CON BATERÍA**

```
ID: mtd-instalacion-autoconsumo-trifasica-con-bateria
URL: /mtd-instalacion-autoconsumo-trifasica-con-bateria
Componente: MemoriaTecnica.vue
Fichero: 6-MTD-INSTALACION-AUTOCONSUMO-TRIFASICA-CON-BATERIA.pdf
```

**Descripción:** Para instalaciones trifásicas con batería.

**Campos:** ~240

**Diferencias principales:**
```
tensionNominalInversor: '400 V' (vs 230V)
vccMaximaInversor: '1100' (vs 425)
tipoConexionInversor: 'trifásica'
```

**Estado:** ✅ Completo | 🔄 Todas las secciones

---

### **9. MTD - INSTALACIÓN AUTOCONSUMO SIN BATERÍA**

```
ID: mtd-instalacion-autoconsumo-sin-bateria
URL: /mtd-instalacion-autoconsumo-sin-bateria
Componente: MemoriaTecnica.vue
Fichero: 6-MTD-INSTALACION-AUTOCONSUMO-SIN-BATERIA.pdf
```

**Descripción:** Para instalaciones interconectadas sin almacenamiento.

**Campos:** ~220 (menos campos de batería/regulador)

**Diferencias principales:**
```
❌ No hay sección E1 completa (no hay baterías)
✅ E2 reducida (sin E2.5 baterías)
```

**Estado:** ✅ Completo | 🔄 Secciones aplicables

---

### **10. MTD - INSTALACIÓN PUNTOS RECARGA**

```
ID: mtd-instalacion-puntos-recarga
URL: /mtd-instalacion-puntos-recarga
Componente: MemoriaTecnica.vue
Fichero: 6-MTD-INSTALACION-PUNTOS-RECARGA.pdf
```

**Descripción:** Para instalaciones de recarga de vehículos eléctricos.

**Campos:** ~180

**Secciones diferentes:**
```
A-D: Igual que otras MTD
E: Instalación para recarga VE (cargador, infraestructura, cuadro)
F: Características líneas
G: Esquema unifilar
H: Plano emplazamiento
```

**Campos clave diferentes:**
```
cargadorMarca: 'SMA EV'
cargadorModelo: 'CHARGER 22'
numeroPuntosRecarga: '1'
modoCarga: 'Modo 3 (IEC 61851-)'
```

**Estado:** ✅ Completo | 🔄 Todas las secciones

---

## 📊 MATRIZ RESUMEN

| # | Documento | Tipo | Campos | Mapeos | URL |
|---|-----------|------|--------|--------|-----|
| 1 | Autorización Representación | Simple | 9 | 4 | /autorizacion-representacion |
| 2 | Decl. Habilitación Prof. | Simple | 11 | 2 | /declaracion-habilitacion-profesional |
| 3 | Cert. Coplanar Teja | Cert. | 14 | 7 | /certificado-coplanar-teja |
| 4 | Cert. Cubierta Plana | Cert. | 13 | 7 | /certificado-cubierta-plan-aaporticada |
| 5 | Decl. No Gen. RCDs | Mixto | 8 | 7 | /declaracion-no-generacion-rcds |
| 6 | MTD Monofásica Bat. | Técnica | 240 | 0 | /mtd-instalacion-autoconsumo-monofasica-con-bateria |
| 7 | MTD Aislada Bat. | Técnica | 240 | 0 | /mtd-instalacion-aislada-con-bateria |
| 8 | MTD Trifásica Bat. | Técnica | 240 | 0 | /mtd-instalacion-autoconsumo-trifasica-con-bateria |
| 9 | MTD Sin Batería | Técnica | 220 | 0 | /mtd-instalacion-autoconsumo-sin-bateria |
| 10 | MTD Recarga VE | Técnica | 180 | 0 | /mtd-instalacion-puntos-recarga |

---

## 🔗 CAMPOS COMPARTIDOS MÁS FRECUENTES

```
✅ numeroExpediente (10/10)
✅ numeroRegistro (10/10)
✅ apellidosNombre (10/10)
✅ nifCif (10/10)
✅ domicilio (10/10)
✅ codigoPostal (10/10)
✅ localidad (10/10)
✅ provincia (10/10)
✅ emplazamientoCalle (10/10)
✅ numero (10/10)
✅ localidadEmplazamiento (10/10)
✅ provinciaEmplazamiento (10/10)
✅ numeroTecnicoInstalador (10/10)
✅ fecha (8/10)
✅ ciudadFirma (5/10)
```

---

## 🎯 CÓMO ACCEDER A CADA DOCUMENTO

### **Desde la UI:**
```
1. Accede a http://localhost:3001
2. Llena el Formulario Maestro (/formulario-maestro)
3. Haz click en "Guardar Datos y Continuar"
4. Selecciona el documento que deseas (/seleccionar-documento)
5. Haz click en "Ver Documento"
```

### **Directamente por URL:**
```
http://localhost:3001/autorizacion-representacion
http://localhost:3001/declaracion-habilitacion-profesional
http://localhost:3001/certificado-coplanar-teja
... etc
```

---

## 📈 ESTADÍSTICAS

| Métrica | Valor |
|---------|-------|
| **Documentos totales** | 10 |
| **Campos totales** | ~1,300 |
| **fieldMappings definidos** | 10 |
| **Campos mapeados** | ~35 |
| **Cobertura de mapeo** | 100% |

---

## 🔐 NOTAS DE SEGURIDAD

- ✅ Los datos se guardan en localStorage (no en servidor)
- ✅ Cada usuario tiene su propia instancia en el navegador
- ✅ Los datos persisten entre sesiones
- ✅ Usar `localStorage.clear()` para limpiar

---

## 📞 REFERENCIAS

- **Configuración:** `/app/config/documents.js`
- **Campos maestro:** `/app/config/masterFormFields.js`
- **Merge logic:** `/app/utils/mergeFormData.js`
- **Store:** `/app/stores/formStore.js`

---

**Estado:** ✅ Catálogo actualizado  
**Última revisión:** 9 de febrero de 2026

