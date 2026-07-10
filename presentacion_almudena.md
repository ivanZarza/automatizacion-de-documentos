# 🚀 Guía de Proyecto: Presentación Almudena

Este documento sirve como hoja de ruta y guía de referencia para desarrollar la automatización de la nueva página (Proyecto Almudena). Se mantendrá vivo y se actualizará a lo largo de los días de trabajo.

## 🎯 1. Objetivo General
Crear un script de Playwright altamente robusto para automatizar el trámite/presentación en una nueva página web, extrayendo previamente toda la lógica oculta del formulario, seguridad y validaciones del servidor.

---

## 🕵️ 2. Estrategia de "Ingeniería Inversa" (Fase 1)
Antes de programar el robot final, utilizaremos un **Script Analizador (Scout)** que trabaje en paralelo con el usuario.

### 👤 Rol del Usuario (Navegación Humana)
- El script abrirá un navegador persistente y pausará la ejecución (`await page.pause()`).
- El usuario navegará manualmente por la página.
- **Táctica Clave:** En lugar de poner datos reales, el usuario escribirá el *nombre conceptual* del dato dentro de los inputs de la web (ej. escribir "nombreInteresado" en el campo de Nombre).
- Esto permitirá relacionar de forma visual el campo de la página con nuestra estructura de datos interna.

### 🤖 Rol del Script (Espionaje en Background)
Mientras el usuario interactúa, el script estará corriendo por debajo interceptando:
1. **Eventos de Inputs (Teclado/Clics):**
   - Capturará en tiempo real cuando un campo cambie, guardando su `id`, `name`, `type` y el valor introducido.
2. **Monitorización de Red (Network Interceptor):**
   - Capturará todas las peticiones (POST, GET, AJAX).
   - Registrará la URL de destino y los parámetros (Payload) enviados al servidor, descubriendo qué llamadas se hacen al cambiar campos (ej. carga dinámica de municipios).
3. **Tokens y Campos Ocultos (Hidden Fields):**
   - Buscará y registrará cualquier `<input type="hidden">` (CSRF, sesión, identificadores de estado) que el servidor genera para validar la sesión.
4. **Captura de Errores y Validaciones:**
   - Interceptará los mensajes de consola nativos y excepciones de JavaScript de la página (`pageerror`) para anticipar bloqueos.

---

## 🛠️ 3. Fases del Proyecto

- [ ] **Fase 1: Creación del Script Analizador.** Escribir el script con los interceptores de red y DOM.
- [ ] **Fase 2: Sesión de Captura.** Ejecutar el script. El usuario rellena los campos estratégicamente mientras recogemos los logs.
- [ ] **Fase 3: Mapeo de Datos.** Traducir los logs capturados a una nueva configuración en `masterFormFields.js`.
- [ ] **Fase 4: Desarrollo del Robot.** Programar el servicio de Playwright final (ej. `almudenaService.js`) utilizando los selectores y la lógica descubierta.
- [ ] **Fase 5: Pruebas y Pulido.** Pruebas de extremo a extremo, manejo de popups (certificados) y gestión de errores.

---

## 📝 4. Notas y Descubrimientos (Diario de Desarrollo)
*(Este bloque se irá rellenando a medida que capturemos datos de la web con el analizador)*

- **Fecha:** [Por definir]
- **Observaciones:** ...
