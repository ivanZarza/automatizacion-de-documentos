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
1. **Actualizar Helpers:** Modificar `fillF`, `selF` y `chkF` en `test_almudena.js` para añadir comprobaciones `isEditable()`.
2. **Definir Matriz:** Crear el array de combinaciones.
3. **Refactorizar Flujo:** Convertir el script actual en una función `ejecutarPrueba(combinacion)` e iterar.
