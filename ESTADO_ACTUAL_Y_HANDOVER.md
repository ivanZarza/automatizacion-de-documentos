# 🚀 DOCUMENTO DE TRASPASO (HANDOVER) - AUTOMATIZACIÓN JUNTA DE ANDALUCÍA

Este documento resume el estado exacto del proyecto a fecha **27 de Marzo de 2026**, para que cualquier otro desarrollador o IA pueda continuar el trabajo sin pérdida de contexto.

---

## 📍 1. ESTADO ACTUAL DEL SISTEMA

El sistema está **100% integrado** y en fase de **pruebas de producción**. La arquitectura es robusta y soporta la mayoría de las casuísticas de la Junta de Andalucía.

### ✅ Logros Completados (Sesión Actual)
- **Carga de Datos Inteligente**: El formulario (`DocumentForm.vue`) ahora inicializa correctamente los `value` por defecto de `masterFormFields.js` y aplica el `mapFrom` (mapeo automático desde la BD Solay) en el momento de la carga.
- **Normalización de Provincia**: Se corrigió el fallo de selección en desplegables. El robot ahora aplica `.trim()` y `toLowerCase()`/`capitalize` para que valores como `"Granada "` o `"SEVILLA"` se mapeen siempre a sus códigos correctos (`18`, `41`, etc.).
- **Robustez de Direcciones**: Todos los campos de texto del robot (`municipio`, `vía`, `margen`) pasan ahora por un proceso de limpieza de espacios (`.trim()`).
- **Sistema de Pausa en Error**: Si el robot falla en cualquier paso (timeout, selector no encontrado), **el navegador no se cierra**. Se activa `await page.pause()` permitiendo inspeccionar el error en el momento exacto antes de continuar o cerrar manualmente.

---

## 🏗️ 2. COMPONENTES CLAVE Y UBICACIÓN

| Componente | Archivo | Función |
|---|---|---|
| **Definición de Campos** | `app/config/masterFormFields.js` | Fuente de verdad de todos los inputs, labels, valores por defecto y mapeos (`mapFrom`). |
| **Formulario Maestro** | `app/components/DocumentForm.vue` | Lógica de la UI, pestañas y el **Translator** que construye el `robotPayload` para el robot. |
| **Servicio del Robot** | `server/utils/automation/juntaService.js` | El motor Playwright. Contiene la lógica de navegación, firma y subida de archivos. |
| **Endpoint API** | `server/api/automation/junta.post.js` | Puente entre el frontend y el robot. |
| **Prueba Local** | `test_junta_local.js` | Script para ejecutar el robot desde terminal sin necesidad de abrir la web. |

---

## 🛠️ 3. INSTRUCCIONES PARA EL SIGUIENTE DESARROLLADOR / IA

### Sobre el Robot (`juntaService.js`)
- **No tocar `main.js`**: Es el archivo de referencia original y debe mantenerse como copia de seguridad intocable.
- **Depuración**: El robot tiene el inspector de Playwright activado (`headless: false` y `page.pause()`). Si algo falla, el proceso se detendrá en el bloque `catch`.
- **Certificados**: El perfil se guarda en `os.tmpdir() + '/playwright_junta_profile'`. Si quieres usar otro certificado, borra esa carpeta o cámbialo manualmente en la ventana que abre el robot.

### Sobre el Formulario (`DocumentForm.vue`)
- La lógica de inicialización está en `buildInitialFormData`. Si añades campos nuevos a `masterFormFields.js`, esta función los recogerá automáticamente.
- Asegúrate de que el mapping en `robotPayload` (línea ~695) esté sincronizado con el objeto `datos` que espera el robot.

---

## 📝 4. PUNTOS PENDIENTES (BACKLOG)
- [ ] Ejecutar prueba de "Presentación Final" real con un certificado de producción.
- [ ] Verificar si el campo `margenEstablecimiento` requiere alguna acción previa (clic en otro radio) si `tipoNumeracion` no es `NUM`.
- [ ] Empaquetado final a `.exe` siguiendo `ESTRATEGIA_EJECUTABLE_WINDOWS.md`.

---
*Fin del documento de Traspaso.*
