# 📋 Análisis Técnico de Campos y Automatización en `registroService.js`

Este documento recopila el análisis detallado del servicio de automatización `server/utils/automation/registroService.js` (Playwright), responsable del registro automatizado de Certificados de Eficiencia Energética (CEE) en el portal de la Junta de Andalucía.

---

## 🔍 Mapeo Completo de Campos y Origen de Datos

A continuación se detalla la correspondencia entre los campos del formulario web (`formData`), los elementos HTML del portal oficial de la Junta y sus valores por defecto si `formData` llega incompleto:

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

## 🛠️ Causas de Fallo al Rellenar Campos en Instalaciones Nuevas

### 1. Protección `fillF` / `selF` (Respetar valores existentes)
* **Comportamiento:** La función helper `fillF` verifica si el input en el portal ya contiene texto (`currentVal && currentVal.trim() !== ''`). Si encuentra cualquier valor o espacio en blanco por defecto, no sobreescribe y muestra: `[INFO] ... ya tiene valor. Respetando XML...`.
* **Consecuencia:** En un ordenador o navegador nuevo donde el portal o la plantilla inyecta valores por defecto o espacios, el robot se niega a escribir los datos introducidos por el usuario en el formulario.

### 2. Subida Secuencial de Documentos Anexos (Tiempos de Red y DOM)
* **Comportamiento:** Tras subir un archivo mediante ventana popup, el portal de la Junta realiza un postback/recarga de la página principal.
* **Consecuencia:** El tiempo de espera actual entre anexos (`1000ms`) es insuficiente en máquinas o redes con latencia. Cuando Playwright busca el 3º, 4º, 5º o 6º anexo (`doc_1834601`, `doc_1834598`, etc.), el DOM aún se está actualizando y los botones no responden, provocando que solo se suban los 2 primeros anexos.

### 3. Campos del Edificio sin Valor (`if (!val) return`)
* **Comportamiento:** Campos obligatorios como `superficie`, `plantas`, `altura` y `refCatastral` de la Sección 2 (Pestaña 1) no tienen valor por defecto en `registroService.js`.
* **Consecuencia:** Si en la interfaz web no se han rellenado previamente, `datosRegistro.t3.superficie` llega como `''`, provocando que el robot lo omita y la Junta muestre el error: *"Existen campos obligatorios sin rellenar en la Sección 2"*.

### 4. Desajuste de Nombres y Desplegables Asíncronos
* **Provincia / Municipio:** Al seleccionar la provincia, el desplegable de municipios se recarga vía AJAX. Si el nombre enviado (`"Conil de la Frontera"`) no coincide exactamente con las opciones del portal (`"CONIL DE LA FRONTERA"` o `"CONIL"`), o si la recarga tarda más del timeout, la opción queda sin seleccionar.
* **Mes de la Firma:** El array en español (`['Enero', ...])` no selecciona la opción si el portal utiliza minúsculas (`'enero'`) o números (`'01'`).
* **IDs Hardcodeados de Anexos:** Si la Junta actualiza la versión de la plataforma, los IDs fijos (`doc_1834591`, `doc_1906404`, etc.) cambian en el HTML del portal y la subida de anexos falla por completo.

---

## 📌 Recomendaciones de Corrección

1. **Forzar Sobreescritura (`forceOverwrite = true`):** Asegurar que `fillF` y `selF` limpien y escriban **siempre** el valor del formulario web, ignorando lo que el portal o el borrador contengan.
2. **Sincronización Secuencial en Anexos:** Aumentar el tiempo de asentamiento post-popup e implementar un `waitFor` explícito al elemento antes de intentar pulsar el siguiente anexo.
3. **Valores por Defecto Mínimos:** Asignar valores por defecto coherentes (o validación previa) para los campos obligatorios del edificio (`superficie`, `plantas`, `refCatastral`).
4. **Normalización Bidireccional de Municipio y Mes:** Utilizar búsqueda normalizada (sin acentos, mayúsculas/minúsculas) al seleccionar opciones en desplegables.
