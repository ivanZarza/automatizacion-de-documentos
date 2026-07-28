# Plan de Implementación: Refactorización de Automatización (Almudena)

## 🎯 Objetivo General
Modificar el script `test_almudena.js` para que sea capaz de lidiar dinámicamente con campos bloqueados por el certificado digital y ejecutar una batería de pruebas cruzadas (Cross-Testing Matrix) probando todas las combinaciones posibles de los campos excluyentes.

---

## 🛠️ Fase 1: Solución Dinámica para Campos de Certificado
**Problema:** Al acceder con certificado digital, la Junta autorrellena campos (como NIF, Nombre, Razón Social) y los bloquea (`readonly` o `disabled`). Intentar que Playwright los rellene provoca fallos o sobrescribe datos erróneamente.

**Solución:** Modificar las funciones auxiliares en `test_almudena.js`.
- Se utilizará la función nativa `isEditable()` de Playwright.
- Antes de aplicar `.fill()`, `.selectOption()` o `.check()`, el robot verificará el estado del input.
- Si no es editable, mostrará un log informando que el campo está bloqueado/autorrellenado y lo saltará de forma segura.

---

## 🔄 Fase 2: Matriz de Pruebas (Cross-Testing)
**Problema:** Necesitamos validar cómo responde la página ante múltiples combinaciones de opciones excluyentes (ej. "CTE" vs "NBE", "RITE 98" vs "RITE 07").

**Solución:** Estructurar el script en un bucle inteligente.
1. Definir un array `matrizPruebas` con las distintas combinaciones a probar.
2. Envolver el flujo principal de Playwright en un bucle `for...of`.
3. Por cada iteración:
   - Limpiar contexto o abrir nueva pestaña.
   - Acceder, inyectar los datos de esa combinación específica.
   - Completar el formulario pulsando los checks correspondientes a esa iteración.

---

## 📝 Pasos a Seguir
1. **Actualizar Helpers:** Modificar `fillF`, `selF` y `chkF` en `test_almudena.js` para añadir comprobaciones `isEditable()`. ✅ *(Completado)*
2. **Definir Matriz:** Crear el array de combinaciones. ✅ *(Completado)*
3. **Refactorizar Flujo:** Convertir el script actual en una función o bucle inteligente. ✅ *(Completado)*

---

## 🗺️ Fase 3: Mapeo de Datos al `masterFormFields.js`
**Objetivo:** Traducir las claves utilizadas en el objeto temporal `datosPrueba` del script `test_almudena.js` a campos reales y reactivos dentro de nuestra arquitectura Frontend.

**Acciones a realizar:**
1. Crear una nueva subsección en `app/config/masterFormFields.js` (e.g., `subsection: 'REGISTRO'`).
2. Agrupar los campos en bloques lógicos utilizando la propiedad `group`:
   - **Datos Generales e Inmueble (T1, T3):** Uso, Tipo Vía, Referencia Catastral, Superficie, etc.
   - **Promotor y Técnico (T5, T6, T17):** Datos de contacto, Identificación, Titulación y Colegio.
   - **Parámetros del CEE (T8, T9, T10, T11):** Normativa de edificación/instalación (CTE, RITE), Procedimientos, y Tipos de Instalación Térmica.
   - **Gestión (T16, T19, T20):** Liquidación de tasas, Lugar de firma.
3. Utilizar propiedades como `mapFrom` para heredar datos ya existentes en la Sección A o Presentación (ej. `nifCif`, `apellidosNombre`, `telefono`) y evitar que el usuario duplique trabajo.
4. Crear campos de tipo `file` para la subida de Anexos específicos (XML, Informe Mejoras, Justificante de Pago, Autorización).

---

## 🚀 Fase 4: Resolución de Bloqueos y Auditoría de Validación Final
**Objetivo:** Conseguir que el flujo E2E (End-to-End) automatizado complete el 100% del trámite (incluyendo la inyección de anexos documentales y el cruce con el AutoFirma) sin errores de validación de la Junta.

**Hitos Completados:**
1. **Extracción y resolución del "Select fantasma" (T17 - Calidad del Firmante):**
   - *Problema:* La plataforma lanzaba un error al final del formulario por un campo obligatorio sin rellenar en el apartado T17 ("La persona abajo firmante en calidad de"), el cual carecía de un atributo `id` o `name` consistente.
2. **Definición de Campos Obligatorios y Preestablecidos:**
   - Mapeamos exactamente los nombres visuales frente a los internos (ej. `resi` = "Edificios destinados a uso residencial", `edif` = "Edificio de viviendas").
   - Fijamos opciones estándar para agilizar (Documento Reconocido: `CE3X`).
   - Ocultamos temporalmente de la UI campos opcionales sin uso (ej. "Nº Inscripción Anterior").
3. **Blindaje del Formulario Frontend (UI):**
   - Se añadió la propiedad `required: true` a todos los campos críticos descubiertos durante las fases de automatización (dirección, plantas, datos del técnico, NIFs, lugar de firma y número de autoliquidación 046). Esto impide que el usuario genere la orden sin haber rellenado los mínimos exigidos por la Junta.
4. **Escáner Dinámico de Alertas:**
   - Para el mantenimiento a futuro, se construyó un "Cazador de Obligatorios" que analiza el CSS, los atributos `required` y las etiquetas de texto de la Junta buscando campos nuevos que el gobierno pueda marcar como obligatorios (pintados en rojo) de forma oculta.

---

## 🎯 Fase 5: Segmentador de Audiencias (Dashboard de Leads)
**Objetivo:** Integrar un panel interactivo en `App.vue` que permita filtrar en tiempo real las Secciones Censales en base a condiciones clave (Renta y Densidad de Chalets) para exportar audiencias segmentadas a plataformas de publicidad (Google/Meta Ads).

**Acciones a realizar:**
1. Crear variables de estado reactivas (`minRenta`, `minChalets`, `maxCompetencia`).
2. Diseñar e implementar el componente visual "Constructor de Audiencias" con Sliders (inputs de tipo range).
3. Modificar la función `filteredResults` para que aplique estas condiciones algebraicas al vuelo.
4. Desarrollar la función `exportToCSV()` para descargar la vista filtrada en un formato amigable para Ads (CSV limpio con Provincia, Municipio, Distrito, Sección, Renta, % Chalets).

---

## 🛡️ Fase 6: Robustecimiento de `registroService.js` para Entornos Limpios

**Objetivo:** Garantizar que el robot de automatización de la Junta de Andalucía complete con 100% de éxito la inyección de datos y la subida de los 6 documentos anexos en cualquier ordenador o instalación limpia, independientemente del estado previo de la caché de Chrome o la velocidad del procesador/red.

### **Acciones Técnicas:**

1. **Forzar Sobreescritura de Campos (`forceOverwrite = true`):**
   * Modificar los helpers `fillF` y `selF` en `registroService.js` para que **siempre** limpien (`await el.fill('')`) e inyecten el valor recibido en `formData`, desactivando el respeto a los valores previos o borradores del portal que bloqueaban campos como las fechas del BOJA.

2. **Estabilizar Subida de los 6 Anexos (`subirAnexo`):**
   * Sustituir el tiempo estático `await page.waitForTimeout(1000)` tras el cierre del popup por una espera doble:
     * `await page.waitForLoadState('networkidle').catch(() => {})`
     * `await page.waitForTimeout(3500)`
   * Esto garantiza que el DOM de la página principal de la Junta termine de refrescarse tras procesar cada archivo AJAX antes de intentar pulsar el selector del siguiente anexo (`doc_1834601`, `doc_1834598`, etc.).

3. **Saneamiento y Normalización de Cadenas de Texto:**
   * Aplicar `.trim()` al nombre del técnico y NIFs para eliminar espacios finales (ej. `'Miguel Ángel Rivas Zapata  '`), evitando fallos en la coincidencia por texto de los selectores de la firma.
   * Normalizar la selección de municipios y meses para tolerar variaciones de mayúsculas/minúsculas y acentos.

## 📊 Fase 6: Integración de Población Exacta (Padrón)
**Objetivo:** Aumentar la precisión de las audiencias cruzando datos de renta con el volumen real de habitantes por sección censal.

**Acciones a realizar:**
1. **Modificación de fuente:** Actualizar `autoconsumo_ponderado_secciones.csv` incluyendo la columna `Poblacion`.
2. **Dashboard (`App.vue`):**
   - Integrar columna "Población" en la tabla principal con agregación automática (Suma).
   - Implementar nuevo filtro de rango (Slider) "Población Mínima" para excluir zonas despobladas.
3. **Mapa (`MapAuditor.vue`):**
   - Refactorizar el componente de Tooltip para mostrar el dato de "Población" al interactuar con cada sección en el mapa.

---

## 🔮 Fase 7: Optimización del Guardarraíl Térmico (Prophet)
**Objetivo:** Refinar la arquitectura predictiva para mitigar el impacto de olas de calor extremas (>37ºC) sin ahogar el aprendizaje orgánico del modelo Prophet.

**Diagnóstico post-auditoría (Días clave: 1 al 9 de Julio 2026):**
Se han enfrentado tres versiones de arquitectura predictiva cruzadas contra el Consumo Real (18.091 kWh evaluados):
- **v1 (Antigua):** Modelo Prophet antiguo, sin reentrenar con los datos de verano (Mape: 7.26%).
- **v2 (Térmico Flexible):** Prophet actualizado + Guardarraíl relajado (±40%) en diario y agresivo (+15% suelo) en fines de semana (Mape: 7.42%).
- **v3 (Térmico Estricto):** Prophet actualizado + Guardarraíl estricto (±20%) en diario y agresivo en fines de semana (Mape: 8.84%).

**Conclusión y Propuesta Oficial (Híbrido Limpio):**
Se ha llevado a cabo un análisis exhaustivo ("forward testing") para la quincena de ola de calor (24 Jun - 09 Jul). Los datos reales demostraron una gran debilidad en nuestra asunción sobre los fines de semana:
- Creíamos que en fin de semana con >37ºC el consumo se disparaba por el uso residencial de AC (regla de +15% de elevación obligatoria).
- La realidad (4 y 5 de Julio a >41ºC) demostró que el consumo global cae drásticamente los fines de semana porque el efecto del cierre de oficinas e industrias (y el éxodo a la costa) pesa mucho más que el AC residencial.

**Arquitectura Definitiva (Guardarraíl Híbrido Limpio sin Pánico Dominguero):**
Se ha purgado el código (`prophet_predictor.py`) para eliminar la regla del +15% en fin de semana. El modelo queda así:
- **Días Laborables con >= 38ºC:** Se aplica la **v3** (Estricta al ±20%). Las oficinas están abiertas y el comportamiento es clavado a la media, por lo que bloqueamos a Prophet de sobredimensionar la compra.
- **Resto del tiempo (Laborables <38ºC y TODOS los Fines de Semana):** Se aplica la **v2** (Flexible al ±40%). Esto permite que Prophet pueda *bajar* libremente sus estimaciones los sábados y domingos para acoplarse a la realidad del "éxodo" andaluz.

**Acción Inmediata (Aprobada por el usuario):**
1. Recalcular las predicciones del 24 Jun al 9 Jul usando esta nueva arquitectura limpia.
2. Hacer una copia de seguridad de los datos actuales (v4 sucia) para comparar.
3. Ejecutar el recálculo con 3 workers para acelerar el proceso.
---

## 🏗️ Fase 8: Migración del Dashboard a PostgreSQL (DB_LOCAL_TRAMIDOCS)
**Objetivo:** Eliminar la dependencia de la API en vivo del INE y el cálculo asíncrono en frontend, migrando los datos demográficos y geoespaciales a una base de datos local sólida.

**Diagnóstico actual:**
El dashboard de Leads (`MapAuditor.vue` y `App.vue`) carga grandes volúmenes de datos mediante archivos estáticos (`.csv`) y consultas HTTP en tiempo real a las tablas `31205`, `30932`, etc. de la API del INE. Esto provoca:
1. Fallos de carga masiva por lentitud/caídas del INE.
2. Pérdida de datos enriquecidos en los Tooltips (Renta, % Chalets) cuando el cruce asíncrono falla.
3. Bloqueos de rendimiento y asimetría de IDs por provincias en el frontend.

**Solución Arquitectónica:**
1. **Modelado BD:** Crear una tabla en `DB_LOCAL_TRAMIDOCS` (ej. `ine_geodata_andalucia`) que consolide:
   - Municipio, Distrito, Sección.
   - Población (Pad.).
   - Instalaciones estimadas y Potencia_kW.
   - Área (ha) y Ratio de Chalets pre-calculado.
   - Renta Neta Media (cruzar una única vez con la tabla del INE y fijarlo).
2. **Ingesta de Datos:** Escribir un script en Python (ej. `ingestar_geo_db.py`) que procese `autoconsumo_andalucia_master.csv` y `autoconsumo_ponderado_secciones.csv`, lo fusione con los datos extraídos del INE y haga un `INSERT` masivo.
3. **Refactorización Frontend:** Eliminar la lógica de fetch del INE en `App.vue` y sustituirla por una llamada limpia (o carga de JSON consolidado derivado de la base de datos).

**Acciones pendientes de aprobación por el usuario:**
1. ✅ Definición del Plan (fase actual).
2. Creación del script de Ingesta y generación del esquema SQL.
3. Ejecución controlada con el *OK* del usuario.

---

## 🤖 Fase 9: Automatización del Catálogo con Extracción de Datos por IA (Fichas Técnicas)
**Objetivo:** Permitir la subida de un archivo PDF/Imagen (Ficha Técnica de paneles, inversores, etc.) y utilizar un modelo de Visión/LLM (como Gemini Pro Vision o Claude) para auto-completar el formulario de creación en la base de datos de materiales.

**Diagnóstico actual:**
Actualmente, el alta de nuevos Paneles Solares (`/api/catalogs/panels`) o Inversores (`/api/catalogs/inverters`) requiere que el equipo introduzca a mano más de 20 variables técnicas muy específicas (ej. *Tensión Vmp*, *Corriente Imp*, *Coeficiente de temperatura*, *MPPT*, *Tensión Máxima de Entrada*, etc.). Este proceso es lento y propenso a errores tipográficos.

**Solución Arquitectónica:**
1. **Frontend (UI Premium):** 
   - Añadir un componente de `Drag&Drop` en el modal de creación de `HardwareCatalogsManager` ("Sube tu Ficha Técnica y la IA rellenará los datos por ti").
   - Mostrar un estado de carga "Analizando documento técnico...".
2. **Backend (Ruta API con LLM):** 
   - Crear una ruta `/api/catalogs/ai-extractor` que reciba el archivo.
   - Usar un LLM para extraer todas las variables exigidas por nuestro esquema SQL (dimensiones, potencias, eficiencias).
3. **Flujo de Aprobación (Seguridad):** 
   - La IA **no** guarda el producto automáticamente en la base de datos.
   - La IA devuelve un JSON y el Frontend rellena los *inputs* del formulario. El usuario humano revisa visualmente que la IA haya acertado, y luego hace clic en "Guardar".

**Acciones pendientes de aprobación por el usuario:**
1. ✅ Análisis de viabilidad y estructura de la base de datos (Completado).
2. Aprobación del flujo de revisión humana antes del guardado.
3. Selección de la tecnología LLM a utilizar para el OCR/Visión.

---

## 🔋 Fase 10: Auditoría y Mejora del Catálogo de Baterías
**Objetivo:** Adaptar y enriquecer el modal de registro y edición de baterías en el `HardwareCatalogsManager.js` para asegurar la recolección de los datos técnicos relevantes y mejorar la interfaz.

**Diagnóstico Actual:**
Actualmente, la tabla `batteries` y su modal recogen:
- **Datos Básicos:** Fabricante, Modelo/Referencia, Precio, Proveedor.
- **Datos Técnicos Existentes:** Capacidad (`capacidad_kwh`), Tensión Nominal (`voltaje_nominal`), Tipo (`tecnologia`), Potencia Máx (`potencia_maxima_kw`).

**Nuevos Requerimientos (Expansión Eléctrica):**
El negocio requiere incluir parámetros clave de corriente (A) para los documentos técnicos, los cuales deben ser leídos desde la ficha técnica (AI Extractor) y viajar hacia el CRM:
1. **Intensidad Máxima de Carga (A)** (Nuevo)
2. **Intensidad Máxima de Descarga (A)** (Nuevo)
3. **Intensidad Pico de Carga (A)** (Nuevo)
4. **Intensidad Pico de Descarga (A)** (Nuevo)
5. **Intensidad Nominal (A)** (Nuevo)

**Acciones pendientes de aprobación por el usuario:**
1. ✅ Auditoría de la estructura del componente actual en `HardwareCatalogsManager.js` y de la tabla PostgreSQL (Completado).
2. Modificación de la base de datos (PostgreSQL) para añadir las 5 nuevas columnas `NUMERIC`.
3. Actualización de `/api/catalogs/batteries` (GET, POST, PUT) para soportar los nuevos campos.
4. Ampliación de la UI en `HardwareCatalogsManager.js` para añadir los inputs en la "tarjeta" de batería.
5. Inclusión de las variables en el esquema del `/api/catalogs/ai-extractor` para que la IA extraiga estas corrientes automáticamente de los PDFs.
6. Sincronización del "Master Form" para que estos datos viajen al PDF de Cálculos y Memoria.

---

## 🐛 Fase 11: Resolución de Error de Red en Registro (Playwright)
**Objetivo:** Solucionar el "Error de red" al ejecutar la automatización del Registro CEE.

**Diagnóstico Actual:**
Al importar directamente `playwright` (`import { chromium } from 'playwright'`) en los servicios de backend (`registroService.js`), el motor Nitro (usado por Nuxt 3) intenta empaquetarlo. Playwright incluye binarios y dependencias nativas de Node.js que fallan al ser empaquetadas por Rollup/Nitro, provocando que el servidor devuelva errores 500 o rompa el endpoint silenciosamente (Error de red).

**Solución Arquitectónica:**
1. Deshacer el mock temporal en `server/api/automation/registro.post.js` para volver a llamar a la función original.
2. Modificar `server/utils/automation/registroService.js` para usar una **importación dinámica** (`const { chromium } = await import('playwright')`) justo en el momento de la ejecución, evitando así que Nitro lo incluya en el bundle estático.
3. (Opcional) Declarar `playwright` como dependencia externa en la configuración `nitro` de `nuxt.config.ts`.

**Acciones pendientes de aprobación por el usuario:**
1. ✅ Definición de la causa del fallo y propuesta de solución (Fase actual).
2. Ejecución del código (Modificar el endpoint y el servicio) con el *OK* del usuario.

---

## 📎 Fase 12: Estabilización de Subida de Anexos Documentales (Almudena)
**Objetivo:** Asegurar que los documentos adjuntos (XML, PDF, ZIP, Mejoras, Autorización y Tasa) se mapeen estrictamente a los 6 inputs fijos determinados durante la Fase de Análisis (Scout) de `test_almudena.js`, evitando adivinanzas o heurísticas por nombre.

**Diagnóstico Actual:**
En `registroService.js` se intentaba subir los archivos buscando textos (`tr` filter by text "XML", "PDF"). La Junta puede cambiar los textos o fallar, por lo que debemos aplicar los selectores absolutos probados en `test_almudena`.

**Mapeo Oficial de Selectores:**
1. **XML (CEE Previo XML):** `input[name="doc_1834591"]`
2. **PDF Firmado (CEE Previo PDF):** `input[name="doc_1906404"]`
3. **ZIP (Fichero Comprimido):** `input[name="doc_1834601"]`
4. **Mejoras (Documento Recomendaciones):** `input[name="doc_1834598"]`
5. **Autorización (Otros):** `input[name="doc_1834618"]`
6. **Tasa 046 (Justificante Pago):** `tr:nth-child(16) > td`

**Solución a Implementar:**
1. Eliminar la función heurística `subirAnexoPorTexto` de `registroService.js`.
2. Replicar la función estricta `subirAnexo(locatorStr, filename)` de `test_almudena.js`.
3. Mapear cada ruta temporal generada (`archivosPaths`) con su selector correspondiente en el orden estricto.

**Estado:** Planificado, pendiente del OK del usuario para ejecución.

---

## 🚀 Fase 13: Despliegue en Servidor Dedicado OVH (Coolify) con Soporte Playwright
**Objetivo:** Desplegar la aplicación `GeneracionDocumentacion` en el servidor OVH dedicado (`57.129.107.84`) gestionado con Coolify, garantizando que el contenedor Docker disponga de todas las dependencias del sistema de Chromium para la ejecución de Playwright sin límites de tiempo.

**Acciones a realizar:**
1. **Actualizar `Dockerfile` para soporte de Playwright**:
   - Sustituir la imagen base `node:20-alpine` por una imagen basada en Debian/Ubuntu (`mcr.microsoft.com/playwright:v1.49.0-noble` o `node:20-bookworm` e instalar `npx playwright install-deps chromium`), asegurando que las librerías nativas del sistema (`libnss3`, `libatk`, `fontconfig`, etc.) estén presentes para que Chromium arranque en segundo plano (`headless: true`).
2. **Commit y Push a GitHub**:
   - Subir la configuración actualizada al repositorio `ivanZarza/automatizacion-de-documentos` en la rama `main`.
3. **Despliegue y Configuración en Coolify (OVH 57.129.107.84)**:
   - Configurar el servicio en el panel de Coolify apuntando al puerto `3000`.
   - Inyectar las variables de entorno necesarias (`DATABASE_URL`, `NODE_ENV=production`).
   - Lanzar el build y verificar el healthcheck del servicio.

**Estado:** Planificado, pendiente de aprobación explícita por el usuario.

---

## 🛠️ Fase 14: Estudio y Solución Detallada del Paso 1 (Sección 2 - Ubicación/Localidad del Edificio T3)

### 🎯 Objetivo Exclusivo
Estudiar y corregir de forma quirúrgica la **Sección 2 de la Pestaña 1 (Ubicación del Edificio - T3)** en `registroService.js` para eliminar definitivamente el diálogo de error de la Junta:  
`🔔 [POPUP DETECTADO] Mensaje: "Existen campos obligatorios sin rellenar en la Sección 2."`

---

### 🔍 Análisis Detallado del Caso "Conil de la Frontera" (Paso 1 - Sección 2)

1. **Desajuste de Nombres en el Portal de la Junta de Andalucía:**
   - Al inspeccionar el archivo de municipios del portal (`app/config/municipiosAndalucia.json`), se ha descubierto que la Junta de Andalucía **abrevia drásticamente los nombres de los municipios**.
   - Ejemplos en la provincia de Cádiz:
     - *"Conil de la Frontera"* aparece etiquetado únicamente como **`"CONIL"`**.
     - *"Chiclana de la Frontera"* aparece como **`"CHICLANA FRO"`**.
     - *"Arcos de la Frontera"* aparece como **`"ARCOS FRONTE"`**.
     - *"El Puerto de Santa María"* aparece como **`"PUERTO ST MA"`**.

2. **Fallo en la comparación unidireccional de `selF`:**
   - La función `selF` en `registroService.js` evaluaba:
     `opt.text.trim().toLowerCase().includes(targetText)`
   - Sustituyendo los valores con Conil:
     `"conil".includes("conil de la frontera")` $\rightarrow$ **`false`** (porque la cadena corta `"conil"` NO contiene a la cadena larga `"conil de la frontera"`).
   - Como la comparación fallaba, el script ejecutaba un `selectOption('Conil de la Frontera')` directo, el cual no encontraba coincidencia en el `<select>` (ya que la opción es `<option value="CONIL">CONIL</option>`).
   - Resultado: El campo de municipio se quedaba con su valor por defecto `"-1"` (`[Seleccione...]`), y al pulsar "Guardar", la Junta rechazaba la Pestaña 1 con el diálogo de error de la Sección 2.

---

### 📋 Solución Propuesta para el Paso 1 (Sección 2)

#### 1. [MODIFY] [registroService.js](file:///home/ivan/dev/trabajo/GeneracionDocumentacion/server/utils/automation/registroService.js)

- **Normalización de Texto y Limpieza (`normalizeStr`):**
  - Eliminar acentos/tildes y convertir a minúsculas:
    ```javascript
    const normalizeStr = (str) => str ? str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim().toLowerCase() : "";
    ```

- **Coincidencia Bidireccional Inteligente:**
  - Modificar la búsqueda en `selF` para que la coincidencia sea bidireccional y compruebe palabras clave (ej. si la primera palabra del municipio `"conil"` coincide con el valor de la opción, o si `targetClean.includes(optClean)` o `optClean.includes(targetClean)`):
    ```javascript
    const targetClean = normalizeStr(targetText);
    const firstWord = targetClean.split(' ')[0]; // "conil"
    for (let opt of select.options) {
      const optClean = normalizeStr(opt.text);
      const optValClean = normalizeStr(opt.value);
      if (optClean === targetClean || optValClean === targetClean) return opt.value;
      if (optClean && targetClean && (targetClean.includes(optClean) || optClean.includes(targetClean))) return opt.value;
      if (firstWord && firstWord.length > 3 && (optClean.startsWith(firstWord) || optClean.includes(firstWord))) return opt.value;
    }
    ```

- **Espera Activa del Selector de Municipio (`t3_selec_localidad`):**
  - Tras seleccionar `t3_selec_provincia`, implementar la espera activa mediante `page.waitForFunction` hasta que `t3_selec_localidad` contenga más de 1 opción diferente de `"-1"`.

- **Forzado de Selección de Localidad:**
  - Aplicar `forceOverwrite = true` en `t3_selec_localidad` si su valor actual es `"-1"` o `""`.

---

## 🧪 Plan de Verificación

1. Ejecutar el servicio de automatización enviando datos con *"Conil de la Frontera"*.
2. Verificar en los logs de consola que `selF` encuentra y selecciona la opción `"CONIL"`.
3. Confirmar que `t3_selec_localidad` no queda con el valor `"-1"`.
4. Comprobar que la Pestaña 1 se guarda exitosamente sin mostrar el aviso *"Existen campos obligatorios sin rellenar en la Sección 2"*.




