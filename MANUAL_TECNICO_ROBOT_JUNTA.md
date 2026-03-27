# 📘 Manual Técnico: Automatización de Trámites (Junta de Andalucía)

Este manual consolida de forma exhaustiva toda la información necesaria para instalar, operar y mantener el robot de automatización basado en Playwright.

---

## 🏗️ 1. Arquitectura del Sistema

El sistema se divide en tres capas principales que trabajan de forma sincronizada:

1.  **Frontend (UI)**: Interfaz de usuario en Nuxt/Vue que gestiona el formulario de datos.
2.  **Traductor (Adapter)**: Lógica en el frontend que convierte el objeto plano del formulario en la estructura jerárquica que espera el robot. Ubicado en `DocumentForm.vue`.
3.  **Backend (Robot)**: Servicio Node.js que ejecuta Playwright para navegar por la web de la Junta. Ubicado en `server/utils/automation/juntaService.js`.

---

## ⚙️ 2. Requisitos de Instalación y Entorno

Para que el robot funcione en un nuevo ordenador, se deben cumplir estos pasos:

### A. Dependencias de Software
- **Node.js**: Versión 18 o superior.
- **Playwright**: Instalado en el proyecto (`npm install`).
- **Navegador Chrome**: Instalado por Playwright (`npx playwright install chrome`).
- **AutoFirma**: Imprescindible para la gestión de certificados y firmas electrónicas.

### B. Certificados Digitales
El robot usa un **Perfil Persistente** ubicado en la carpeta temporal del sistema (`playwright_junta_profile`). 
- La primera vez que se use en un nuevo PC, el navegador pedirá elegir el certificado.
- Chrome recordará esta elección en sesiones posteriores si el perfil se mantiene.

---

## 📂 3. Gestión de Archivos y Carpetas

El robot automatiza la subida de documentos basándose en una estructura de carpetas física:

### Estructura Recomendada
- El robot busca por defecto en la raíz del proyecto una carpeta con el nombre del cliente (ej. `Ivan Zarza Estevez`).
- Si no la encuentra, busca en la carpeta genérica `/subir_archivos/`.

### Regla de Prefijos (Crítico)
Los archivos **deben** empezar por los siguientes prefijos para que el robot los identifique:
- `1.-` : Autorización de Representación.
- `2.-` : Declaración Responsable de Habilitación.
- `7.-` : Certificado de Solidez y Seguridad.

*Ejemplo válido: `1.- DNI Ivan.pdf`*

---

## 🔄 4. Flujo de Ejecución (Paso a Paso)

1.  **Inicio y Login**: El robot abre Chrome, acepta cookies y entra en "Habilitaciones".
2.  **Parada de Certificado**: El script se detiene para que el usuario elija el certificado en el aviso de xdg-open/AutoFirma. **Acción humana requerida: Elegir y pulsar "Resume" en Playwright Inspector.**
3.  **Datos del Titular**: Rellena datos personales, dirección y busca el municipio mediante el popup oficial.
4.  **Otros Datos y CCAA**: Ejecuta un orden crítico (CCAA -> Delegación -> RITE -> Nº Empresa -> Radios) para asegurar que los campos dinámicos de la Junta no desaparezcan.
5.  **Ficha Técnica**: Rellena los datos técnicos en el iframe y realiza el primer "Guardar" (Firma).
6.  **Adjuntos y Nuevo Usuario**: Sube los PDFs por prefijo y rellena los datos del punto de suministro en el popup final.
7.  **Revisión y Presentación**: El robot para antes del envío final para revisión manual.

---

## 📊 5. Mapa de Datos (UI -> Robot)

El mapeo de campos se gestiona dinámicamente. Algunos campos clave inyectados por defecto para ahorrar tiempo son:
- **Persona Autorizada**: Eduardo Rivera Cabezas (configurable en `masterFormFields.js`).
- **Empresa Instaladora**: Solay Ingenieros s.l. (configurable en `masterFormFields.js`).
- **Mapeos de Selects**: Los códigos CCAA (01), Provincias (41) y RITE (T9820) están estandarizados.

---

### 🛠️ 6. Mantenimiento y Resolución de Errores

#### Depuración: Pausa Automática en Error
El robot está configurado con una **Pausa Automática en Error**. Si un selector falla o hay un timeout, el navegador **no se cerrará**.
1. Se activará el Inspector de Playwright y el robot esperará (`await page.pause()`).
2. Podrás ver en pantalla el estado exacto del formulario antes del fallo.
3. Pulsa "Resume" para continuar o cierra manualmente el navegador tras inspeccionar.

#### Robustez de Datos
Se han implementado capas de limpieza automática en `juntaService.js`:
- **Limpieza de Espacios (`.trim()`)**: Todos los campos de dirección (Vía, Municipio, Margen) se limpian de espacios accidentales al inicio/final.
- **Normalización de Provincia**: Los nombres de provincia se normalizan (quitar tildes, minúsculas, capitalización) antes de buscar su código INE.
- **Fallback de Margen**: Si la selección por código ('D'/'I') falla, el robot intenta seleccionar por texto físico ("Derecha" / "Izquierda").

#### ¿Qué hacer si la web de la Junta cambia?
Si un campo deja de rellenarse porque la Junta ha cambiado su selector:
1. Ejecuta el robot desde terminal con el Inspector activo.
2. Identifica el nuevo selector (ID o Name).
3. Actualiza el selector correspondiente en `juntaService.js`.

### Errores Comunes
- **Timeout en Popups**: Verifica que no haya bloqueadores de popups en el Chrome de Playwright.
- **Archivo no encontrado**: Asegúrate de que el nombre de la carpeta del cliente coincide exactamente con el campo "Apellidos y Nombre" y que los prefijos son correctos.
- **Fallo en MutationObserver**: Es un error interno de la web de la Junta, no afecta al robot. Púlsalo y continúa.

---
*Manual generado para Ivan Zarza - Automatización de Documentos.*
