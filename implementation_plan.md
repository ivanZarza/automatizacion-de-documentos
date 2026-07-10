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
