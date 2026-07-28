# 📋 Análisis Técnico de Campos y Automatización en `registroService.js`

Este documento recopila el análisis detallado del servicio de automatización `server/utils/automation/registroService.js` (Playwright), responsable del registro automatizado de Certificados de Eficiencia Energética (CEE) en el portal de la Junta de Andalucía, enriquecido con la prueba de diagnóstico de payload en tiempo real.

---

## 📊 Resultados de la Prueba de Diagnóstico en Tiempo Real

Al ejecutar el robot de Registro CEE desde la aplicación web con los datos reales de la base de datos PostgreSQL, se obtuvo el siguiente log de diagnóstico en el servidor:

```text
[RegistroService] 📦 DIAGNÓSTICO DE DATOS RECIBIDOS:
- Total campos en payload: 362
- Fechas BOJA recibidas: { dia: undefined, mes: undefined, anio: undefined, fechaBoja: undefined, numBoja: undefined }
- Adjuntos Base64 recibidos: {
    xml: 'PRESENTE (124757 chars)',
    pdf: 'PRESENTE (405992 chars)',
    zip: 'PRESENTE (456097 chars)',
    mejoras: 'PRESENTE (186380 chars)',
    tasa: 'PRESENTE (29508 chars)',
    autorizacion: 'PRESENTE (3157704 chars)'
  }
- Firma / Técnico recibidos: {
    nombre: 'Miguel Ángel Rivas Zapata  ',
    nif: '28888418G',
    calidadFirmante: 'REPLEGAL'
  }
```

---

## 🎯 Hallazgos y Causa Raíz Definitiva

### 1. Estado Real de los 6 Archivos Adjuntos
* **Resultado:** **LOS 6 ARCHIVOS SI ESTÁN PRESENTES Y COMPLETOS EN BASE64** en el payload (`xml`, `pdf`, `zip`, `mejoras`, `tasa`, `autorizacion`).
* **Causa de fallo en la subida:** En `registroService.js`, la función `subirAnexo` cierra la ventana emergente tras subir el anexo y solo espera **1 segundo** (`await page.waitForTimeout(1000)`). En la máquina de pruebas, el portal de la Junta tarda más de 1 segundo en completar la recarga del DOM tras el 2º anexo. Cuando Playwright intenta buscar los selectores del 3er, 4º, 5º y 6º anexo (`doc_1834601`, `doc_1834598`, etc.), la página principal aún está recargándose y los botones no están listos, por lo que el script los omite.

### 2. Estado de las Fechas del BOJA
* **Resultado:** Llegan como `undefined` en el payload.
* **Causa de fallo en el portal:** `datosRegistro` asigna los valores por defecto (`09/12/2014`, `16/12/2014`). Sin embargo, en la función `fillF`, la condición `if (!forceOverwrite) { if (currentVal) return; }` detecta que la casilla del portal viene con espacios o caracteres borradores previos y **se niega a escribir sobre el input**.

### 3. Nombre del Técnico y Firmante
* **Resultado:** El campo `nombre` llega con espacios adicionales al final (`'Miguel Ángel Rivas Zapata  '`).
* **Causa de fallo:** Los espacios al final impiden la coincidencia exacta de cadenas en los selectores por texto de la Pestaña 4 para la firma.

---

## 🔍 Mapeo Completo de Campos y Origen de Datos

| Sección en Portal | Campo / ID en Portal | De dónde lee en `formData` | Valor por defecto (Fallback) |
|---|---|---|---|
| **Intro BOJA** | `intro_selec_dia` | `formData.intro_dia` | `'09'` |
| **Intro BOJA** | `intro_selec_mes` | `formData.intro_mes` | `'12'` |
| **Intro BOJA** | `intro_anio` | `formData.intro_anio` | `'2014'` |
| **Intro BOJA** | `intro_numBoja` | `formData.intro_numBoja` | `'244'` |
| **Intro BOJA** | `intro_fechaBoja` | `formData.intro_fechaBoja` | `'16/12/2014'` |
| **Pestaña 1 (T1)** | `t1_selec_subgrupo` | `formData.registro_t1_subgrupo` \| `formData.subgrupo` | `'resi'` |
| **Pestaña 1 (T1)** | `t1_selec_uso` | `formData.registro_t1_uso` \| `formData.uso` | `'edif'` |
| **Pestaña 1 (T3)** | `t3_selec_tipoVia` | `formData.registro_t3_tipoVia` \| `formData.tipo_via_presentador` | `'CL'` |
| **Pestaña 1 (T3)** | `t3_nombreVia` | `formData.registro_t3_nombreVia` \| `formData.nombre_via_presentador` | `''` (Vacío) |
| **Pestaña 1 (T3)** | `t3_numKmVia` | `formData.registro_t3_numero` \| `formData.numero_presentador` | `''` (Vacío) |
| **Pestaña 1 (T3)** | `t3_cPostal` | `formData.registro_t3_cPostal` \| `formData.cp_presentador` | `''` (Vacío) |
| **Pestaña 1 (T3)** | `t3_selec_provincia`| `formData.registro_t3_provincia` \| `formData.provincia_presentador`| `'CÁDIZ'` |
| **Pestaña 1 (T3)** | `t3_selec_localidad`| `formData.registro_t3_localidad` \| `formData.municipio_presentador`| `'CONIL'` |
| **Pestaña 1 (T3)** | `t3_superficie` | `formData.registro_t3_superficie` | `''` (Vacío) |
| **Pestaña 1 (T3)** | `t3_refCatastral` | `formData.registro_t3_refCatastral` \| `formData.referenciaCatastral` | `''` (Vacío) |
| **Pestaña 1 (T5)** | `t5_apellidosNombre`| `formData.registro_t5_nombre` \| `formData.nombre_presentador` | `''` (Vacío) |
| **Pestaña 1 (T5)** | `t5_nif` | `formData.registro_t5_nif` \| `formData.nif_presentador` | `''` (Vacío) |
| **Pestaña 1 (T17)**| `t17_correo` | `formData.registro_t17_correo` \| `formData.email_presentador` | `''` (Vacío) |
| **Pestaña 2 (T6)** | `t6_apellidosNombre`| `formData.registro_t6_nombre` \| `formData.nombre_tecnico` | `'Miguel Ángel Rivas Zapata'` |
| **Pestaña 2 (T6)** | `t6_nif` | `formData.registro_t6_nif` \| `formData.nif_tecnico` | `'28888418G'` |
| **Pestaña 2 (T6)** | `t6_titulacion` | `formData.registro_t6_titulacion` \| `formData.titulacion` | `'Ingeniero Industrial'` |
| **Pestaña 2 (T6)** | `t6_colegio` | `formData.registro_t6_colegio` \| `formData.colegio` | `'COIIOC'` |
| **Pestaña 2 (T6)** | `t6_numColegiado` | `formData.registro_t6_numColegiado` \| `formData.numColegiado` | `'4671'` |
| **Pestaña 2 (T8)** | `t8_fecha` | `formData.registro_t8_fecha` \| `formData.fecha_emision_cee` | Fecha actual (Hoy) |
| **Pestaña 2 (T8)** | `t8_fechaValidez` | `formData.registro_t8_validez` \| `formData.fecha_validez_cee` | Fecha CEE + 10 años |
| **Pestaña 2 (T10)**| `t10_select_doc_reconocido` | `formData.registro_t10_docReconocido` | `'HULC'` |
| **Pestaña 2 (T10)**| `t10_version` | `formData.registro_t10_version` | `'V2.3'` |
| **Pestaña 4 (T20)**| `t20_num2` (Tasa) | `formData.registro_t20_numLiquidacion` | `''` (Vacío) |
| **Pestaña 4 (T19)**| `t19_tipo_firmante`| `formData.registro_t17_calidad_firmante` | `'REPLEGAL'` |
| **Pestaña 4 (T19)**| `t19_en` (Lugar) | `formData.registro_t19_lugar` \| `formData.lugar_firma` | `'Sevilla'` |
| **Pestaña 4 (T19)**| `t19_fdo1` (Firmante)| `formData.registro_t6_nombre` \| `formData.nombre_tecnico` | `'Miguel Ángel Rivas Zapata'` |
| **Pestaña 4 (T19)**| `t19_nif_firmante` | `formData.registro_t6_nif` \| `formData.nif_tecnico` | `'28888418G'` |
| **Adjunto XML** | `#ficheroXML` / `doc_1834591` | `formData.registro_doc_xml` (Base64) | `null` (Omite subida) |
| **Adjunto PDF** | `doc_1906404` | `formData.registro_doc_cee_pdf` (Base64) | `null` (Omite subida) |
| **Adjunto ZIP** | `doc_1834601` | `formData.registro_doc_cee_zip` (Base64) | `null` (Omite subida) |
| **Adjunto Mej.**| `doc_1834598` | `formData.registro_doc_mejoras` (Base64) | `null` (Omite subida) |
| **Adjunto Aut.**| `doc_1834618` | `formData.registro_doc_autorizacion` (Base64) | `null` (Omite subida) |
| **Adjunto Tasa**| `tr:nth-child(16)`| `formData.registro_doc_tasa` (Base64) | `null` (Omite subida) |

---

## 🛠️ Plan de Corrección Definitivo en `registroService.js`

1. **Subida Secuencial Estable de Anexos (`subirAnexo`):**
   * Añadir `await page.waitForLoadState('networkidle').catch(() => {})`.
   * Aumentar el tiempo de asentamiento post-popup de `1000ms` a `3500ms` entre cada archivo para garantizar que el DOM esté completamente cargado antes de abrir el siguiente anexo.

2. **Escritura Forzada en Fechas e Inputs (`fillF` y `selF`):**
   * Activar `forceOverwrite = true` en las fechas del BOJA y campos de la firma para sobreescribir cualquier borrador o espacio previo del portal.

3. **Saneamiento de Cadenas de Texto (`trim`):**
   * Aplicar `.trim()` al nombre del técnico y NIF para evitar fallos de coincidencia de selectores.
