# 🛡️ Guía de Seguridad: Estado de Ramas y Registro de Sincronización

Este documento registra el proceso técnico realizado para sincronizar el entorno local ("entorno burbuja de la presentación") con el repositorio remoto de GitHub, detallando el mapa de ramas, las decisiones de fusión y cómo volver a cualquier estado seguro.

---

## 📌 1. Mapa y Estado de las Ramas

Para garantizar **riesgo cero** de pérdida de datos o configuraciones tanto en este equipo como en GitHub, se ha estructurado el trabajo en tres ramas:

| Rama | Dónde existe | Función y Propósito | Estado |
| :--- | :--- | :--- | :--- |
| **`presentacion-funcional`** | **Local y GitHub** | **Copia de seguridad blindada.** Congela exactamente el código local que funcionó en la presentación antes de tocar nada. | 🔒 Intacta y respaldada en la nube. |
| **`test-merge`** | **Local y GitHub** | **Rama de integración probada.** Contiene la unión limpia de tu configuración de presentación con los 47 commits que había en GitHub. | ✅ Conflictos resueltos, compilada y desplegada en Vercel. |
| **`main`** | **Local y GitHub** | **Rama principal de producción.** El estándar de trabajo del proyecto para todos los ordenadores. | ⏳ Pendiente de recibir el merge final de `test-merge`. |

---

## 🔍 2. ¿Qué contiene la rama `presentacion-funcional`? (Tu Respaldo)

Esta rama garantiza que **nunca se perderá nada** de lo que tenías preparado para la presentación:
1. **Pausa inicial en Playwright (`juntaService.js`):** Abre el inspector de Playwright con herramientas de control manual (`await page.pause()`).
2. **Normalización de nombres de adjuntos:** Asignación automática de prefijos oficiales (`1.- MTD.pdf`, `2.- CIE.pdf`, `7.- Certificado de Adecuacion.pdf`).
3. **Validaciones obligatorias previas:** Control estricto de CAU, Actividad CNAE/RITE y Empresa Distribuidora oficial antes de iniciar la automatización.
4. **Desplegables dependientes de municipios:** Filtrado dinámico de localidades de Andalucía según la delegación/provincia seleccionada.
5. **Detección de baterías:** Cálculo reactivo de `tiene_acumulacion` según potencia y energía almacenada.

---

## 🔄 3. ¿Qué se resolvió en la rama `test-merge`?

Se integraron los 47 commits de GitHub sin sobrescribir tus funcionalidades:

### A. `app/config/masterFormFields.js`
* **Tu versión:** Tenía el selector dependiente de municipios y el campo de certificado de solidez.
* **Versión remota:** Añadía todos los campos del nuevo servicio de Registro CEE (trámites, promotor, técnico T6, instalaciones T10-T11, etc.).
* **Resolución:** Se mantuvieron **ambas cosas**. Tu selector dependiente sigue activo y todos los nuevos campos del Registro CEE quedaron incorporados.

### B. `app/components/DocumentForm.vue`
* **Lógica de sincronización (*Two-way binding*):** Se adoptó la sincronización bidireccional avanzada del remoto, pero integrando el `mapTransform` y el auto-ajuste de baterías de tu versión.
* **Subida de archivos:** Se conservó tu normalización de prefijos (`1.-`, `2.-`, `7.-`) y la doble persistencia de claves (`_filename` y `_name`) en `localStorage`.
* **Botones de acción:** Se separaron limpiamente las dos automatizaciones:
  * `handleLaunchAutomation`: Automatización de legalización solar en la Junta (con tus validaciones y confirmación).
  * `handleLaunchRegistro`: Registro de Certificado Energético CEE (Almudena).
* **Plantilla e inputs:** Se mantuvieron los estilos de campos obligatorios en rojo (`border-color: #ef4444`), el autotrim en `@blur` y el soporte para selector Combobox.

---

## ☁️ 4. Configuración en Vercel

Para permitir la compilación en la nube sin superar el límite de 250 MB:
1. **Variable de entorno:** Se activó `VERCEL_SUPPORT_LARGE_FUNCTIONS = 1` en Vercel para todos los entornos (`Production`, `Preview`, `Development`).
2. **Exclusiones (.vercelignore):** Se excluyen del bundle de Vercel las carpetas pesadas que solo se usan en local (scripts pesados, capturas, logs).

---

## 🛠️ 5. Cómo trabajar desde otro ordenador

Si necesitas abrir el proyecto en cualquier otro ordenador:

### Opción 1: Usar la rama con todo integrado (`test-merge`)
```bash
git fetch origin
git checkout test-merge
npm install
npm run dev
```

### Opción 2: Usar la copia de respaldo pura de la presentación (`presentacion-funcional`)
```bash
git fetch origin
git checkout presentacion-funcional
npm install
npm run dev
```

---

## 🚀 6. Paso pendiente para unificar en `main`

Cuando decidas que `main` sea la rama única definitiva, los comandos a ejecutar en este ordenador son:

```bash
git checkout main
git merge test-merge
git push origin main
```
Con eso, la versión de Producción de Vercel y la rama `main` en todos los ordenadores quedarán 100% sincronizadas.
