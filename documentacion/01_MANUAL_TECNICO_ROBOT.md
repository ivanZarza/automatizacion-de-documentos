# 📘 Manual Técnico: Robot de Automatización (Junta de Andalucía)

Este manual es la **fuente de verdad** para el funcionamiento, mantenimiento y evolución del robot de Playwright integrado en el Generador de Documentos.

---

## 🏗️ 1. Arquitectura y Flujo de Datos

El sistema sigue un patrón de **Desacoplamiento Front-Back**:

1.  **Frontend (Nuxt/Vue)**: El usuario rellena los datos en `DocumentForm.vue`. Los campos se definen en `app/config/masterFormFields.js`.
2.  **Traductor (Adapter)**: Antes de lanzar el robot, la UI transforma el objeto plano de la base de datos en la estructura jerárquica que espera el robot (`robotPayload.datos`). Esto permite cambiar la UI sin romper el robot.
3.  **Backend (Nitro/Playwright)**: El archivo `server/utils/automation/juntaService.js` recibe los datos y orquesta la navegación real por la web de la Junta.

---

## 💻 2. Compatibilidad Multisistema (Windows / Linux) 🐧🪟

El robot es **autodependiente** y detecta el sistema operativo para ajustar su comportamiento:

-   **Windows**: Activa el `WindowsAutoClicker (PowerShell)` para gestionar automáticamente los diálogos de certificados de seguridad y AutoFirma.
-   **Linux / macOS**: Desactiva el autoclicker y entra en modo **Pausa Inteligente**. El robot hará un `page.pause()` en los puntos críticos (Login y Firma) para que el usuario intervenga manualmente y pulse "Resume" en el inspector de Playwright.

---

## 🏢 3. Digitalización y Distribuidoras (v3.0)

Se ha implementado un sistema de **Mapeo Dual** para campos oficiales (como `ps_distribuidora`):
-   **En Popups**: El robot usa el **ID numérico** (ej: `160`) para seleccionar del desplegable.
-   **En Ficha Técnica**: El robot traduce el ID al **Nombre Textual** oficial (ej: `EDISTRIBUCIÓN...`) mediante el repositorio `app/config/distribuidoraOptions.js`.

---

## 📂 4. Gestión de Documentos por Prefijos

El robot no requiere que subas archivos por la web. Los lee directamente de la carpeta del cliente en el servidor:
-   **Ruta**: Busca una carpeta que coincida con el campo "Apellidos y Nombre".
-   **Identificación**: Busca archivos por prefijo:
    -   `1.-` : Representación.
    -   `2.-` : Habilitación.
    -   `7.-` : Solidez.

---

## ⚙️ 5. Instalación en un Nuevo PC

1.  `npm install` (Instala Playwright y dependencias).
2.  `npx playwright install chrome` (Instala el binario del navegador).
3.  **Certificados**: Asegúrate de que el certificado digital está instalado en el SO. La primera vez, el robot pedirá seleccionarlo.
4.  **AutoFirma**: Debe estar instalado para que la web de la Junta procese la firma de la ficha técnica.

---

## 🧪 6. Estrategias de Testing

-   **Prueba de Aislamiento**: `node test_junta_local.js` (Prueba el robot sin usar la web).
-   **Prueba End-to-End**: Lanzar desde el Dashboard en `localhost:3000`.

---
*Documentación actualizada: 31 de Marzo de 2026.*
