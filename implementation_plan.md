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
Actualmente, la "tarjeta" o modal de baterías recoge:
- **Datos Básicos:** Fabricante, Modelo/Referencia, Precio, Proveedor.
- **Datos Técnicos:** Capacidad (kWh), Tensión (V), Tipo (Tecnología), Potencia Máx Carga/Descarga (kW), Tipo Componente (Celda/BMS).
- **Archivos/Multimedia:** Imagen del Producto, Fichas Técnicas (PDF), Documentación Comercial.
- **Estado:** Activo/Inactivo.

Se ha detectado que:
- Existe una columna de **Unidad de Medida** en la vista de tabla, pero no hay un campo para asignarla desde el formulario.
- Podrían estar ausentes variables críticas para cálculos de dimensionamiento o garantías, como: *Profundidad de Descarga (DoD)*, *Ciclos de Vida* o *Años de Garantía*.

**Acciones pendientes de definición por el usuario:**
1. ✅ Auditoría de la estructura del componente actual en `HardwareCatalogsManager.js` (Completado).
2. Definición exacta de los nuevos campos técnicos, opciones de UI y cambios estructurales requeridos por el negocio.
3. Modificación del formulario en frontend y, de ser necesario, ajuste del esquema en la base de datos y la ruta de API correspondiente.
