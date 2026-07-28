# 📋 Análisis Técnico Integral, Diagnóstico y Guía para Ordenadores Secundarios (`registroService.js`)

Este documento consolida **todo el análisis, diagnóstico de datos en tiempo real, arquitectura de perfiles de Chrome y guía de comprobaciones** para operar la automatización de Registro de CEE en la Junta de Andalucía desde cualquier ordenador.

---

## 📊 1. Diagnóstico de Datos Recibidos en Tiempo Real (Prueba Real)

Al ejecutar el robot desde la aplicación conectada a la base de datos PostgreSQL, se capturó el siguiente estado de datos:

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

## 💡 2. Explicación de Diferencias entre tu Ordenador Principal y el Ordenador Secundario

### ¿Por qué en tu ordenador habitual funcionaba siempre?
1. **Perfil de Chrome Persistente (`playwright_almudena_profile`):**
   * El robot utiliza un directorio de perfil persistente en `/tmp/playwright_almudena_profile`.
   * En tu ordenador habitual, Chrome ya había acumulado **memoria, caché, borradores y cookies del portal de la Junta** de ejecuciones anteriores. La web de la Junta abría cargando parte de esa memoria previa.
2. **Procesamiento y Velocidad del DOM:**
   * En tu equipo principal, tras cerrar el popup de cada anexo, el DOM se recargaba en menos de 1 segundo. La pausa de `1000ms` era suficiente para subir los 6 anexos seguidos.

### ¿Por qué en el ordenador nuevo fallaba la subida y las fechas?
1. **Perfil Limpio (Sin Memoria):**
   * En el ordenador nuevo, la carpeta `/tmp/playwright_almudena_profile` arrancó completamente vacía. No había datos en caché ni borradores del portal de la Junta.
2. **Recarga del DOM más lenta en los Anexos:**
   * Al subir el 2º anexo, el portal de la Junta tardaba ~2.5 segundos en actualizar la tabla. Como la pausa en el código era de solo 1 segundo, el robot intentaba buscar el 3er, 4º, 5º y 6º anexo cuando el botón aún no estaba disponible en la página, omitiendo los 4 últimos archivos.
3. **Regla de No Sobreescritura (`forceOverwrite = false`):**
   * Si las casillas del portal traían espacios o valores iniciales por defecto, los helpers `fillF` y `selF` interpretaban que la casilla ya estaba rellena y se negaban a sobreescribir con los datos del usuario.

### 🪟 Comportamiento de Ventanas Emergentes y Alertas entre Equipos

1. **La pequeña ventana emergente con la "A" (Logo de la Junta / AutoFirma):**
   * Es el componente de cliente del conector de firma digital de la Junta (`afirma://` / AutoFirma).
   * **En el ordenador secundario:** Salta la mini ventana flotante del lanzador porque la aplicación AutoFirma está activa y la asociación de protocolos del navegador salta de forma visible para invocar la firma.
   * **En tu ordenador principal:** No salta de forma flotante porque en tu navegador habitual marcaste la opción *"Recordar mi elección y no volver a preguntar"*, o porque AutoFirma se ejecuta en segundo plano silencioso.

2. **El `alert` al hacer clic en "Nueva Solicitud" / "Nuevo Registro":**
   * Es un diálogo nativo de aviso de JavaScript que lanza la web de la Junta (*"Atención: se generará una nueva solicitud..."*).
   * **En tu ordenador habitual:** Salta el `alert` si la sesión del portal detecta que tenías un borrador activo pendiente de cerrar.
   * **En el ordenador secundario:** Al ser una sesión de Playwright limpia sin borradores colgados, o porque Playwright auto-maneja los diálogos JavaScript nativos (`dialog.accept()`), el aviso no detiene la navegación del robot y continúa automáticamente.

---


## 🛠️ 3. Mejoras Técnicas Aplicadas en el Código

1. **Escritura Forzada en Fechas e Inputs (`fillF` y `selF`):**
   * Configurado `forceOverwrite = true` por defecto. El robot ejecuta `await loc.fill('')` para vaciar cualquier espacio o borrador previo del portal e inyectar el dato exacto de la base de datos.
2. **Subida Secuencial Estable de los 6 Anexos (`subirAnexo`):**
   * Añadido `await targetElement.waitFor({ state: 'attached', timeout: 7000 })`.
   * Añadido `await page.waitForLoadState('networkidle')`.
   * Pausa de asentamiento aumentada a **3500ms** tras cerrar cada popup de adjunto.
3. **Saneamiento `.trim()` de Cadenas:**
   * Aplicado `.trim()` al nombre del técnico (eliminando los espacios finales `'Miguel Ángel Rivas Zapata  '`), NIFs y municipios para garantizar coincidencia exacta en los selectores.
4. **Solución a los Despliegues en Vercel:**
   * Se movió `playwright` a `"dependencies"` en `package.json`.
   * Se añadió la variable de entorno `VERCEL_SUPPORT_LARGE_FUNCTIONS = 1` en el panel de Vercel para permitir el tamaño del paquete de Playwright.

---

## 🗺️ 4. Mapeo Completo de Campos y Origen de Datos

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

## 🖥️ 5. Checklist Completo para Configurar y Trabajar desde el Ordenador Secundario

Sigue estos **5 pasos de verificación** en el nuevo ordenador para empezar a trabajar inmediatamente:

### 1. 🔏 Certificado Digital y AutoFirma
- [ ] **Instalar AutoFirma:** Descargar e instalar la versión oficial de AutoFirma en el sistema operativo.
- [ ] **Asociación de Protocolo:** Al hacer la primera prueba de firma, marcar la casilla *"Abrir siempre enlaces de este tipo en la aplicación asociada"*.
- [ ] **Certificado Digital:** Importar el certificado digital del técnico/solicitante (`.p12` o `.pfx`) en la tienda personal de certificados del equipo.

### 2. 💻 Entorno Local de Node.js
- [ ] **Sincronizar Código:** Ejecutar `git pull origin main`.
- [ ] **Dependencias:** Ejecutar `npm install`.
- [ ] **Navegadores Playwright:** Descargar Chromium ejecutando:
  ```bash
  npx playwright install chromium
  ```

### 3. 🔑 Variables de Entorno (`.env`)
- [ ] Asegurar que el archivo `.env` local contiene la cadena `DATABASE_URL` conectada a PostgreSQL para la lectura de formularios.

### 4. 🤖 Verificación Visual durante la Ejecución
Al enviar una solicitud de registro desde la aplicación web en la máquina secundaria:
- [ ] **Consola:** Confirma que el log muestra los 6 adjuntos Base64 como `PRESENTE`.
- [ ] **Fechas y Firma:** El robot limpia las casillas y rellena las fechas de BOJA y lugar de firma sin dejárselas vacías.
- [ ] **Los 6 Adjuntos:** En la pantalla del navegador de la Junta, los 6 documentos quedan subidos y marcados con el icono verde de documento adjuntado.
- [ ] **Pausa Final:** El robot se detiene en `🚀 ¡BINGO! TODAS LAS PESTAÑAS COMPLETADAS`, listo para el clic manual en Iniciar Firma.
