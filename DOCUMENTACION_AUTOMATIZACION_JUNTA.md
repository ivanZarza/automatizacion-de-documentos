# 🤖 Arquitectura Definitiva: Automatización Junta de Andalucía

Este documento recoge la versión **final e implementada** de la integración del robot de automatización basado en Playwright dentro de la aplicación Nuxt (Generador de Documentos).

Cualquier desarrollador o IA que empiece a trabajar en esta rama **debe leer primero este documento** para entender cómo están conectadas las piezas.

---

## 🏗️ 1. Flujo Arquitectónico Principal

La aplicación utiliza un Generador de Formularios dinámicos (`DocumentForm.vue`) alimentado por `app/config/masterFormFields.js`. Todos los datos del usuario se mantienen intactos en un gran objeto **plano** estandarizado (`formData.value`) que se guarda automáticamente en `localStorage` y en la Base de Datos.

Para enviar los datos al robot (`server/utils/automation/juntaService.js`), hemos creado un patrón "Traductor" (Adapter) directo en el frontend. En el propio evento *click* de "Lanzar Automatización", la web ensambla al vuelo la estructura jerárquica exacta (`robotPayload.datos`) que el script en Backend espera, permitiendo que el archivo original de Playwright no tenga que sufrir refactorizaciones cada vez que el esquema de base de datos cambie.

---

## 🗂️ 2. Mapeo de Datos y Lógica Frontend Implementada

En `DocumentForm.vue` se han aplicado automatizaciones críticas antes de enviar el Payload:

1.  **División Inteligente de Nombres**: Se ha implementado un `watch` que reacciona a los cambios entrantes en `apellidosNombre`. Éste algoritmo detecta el formato (Ej. "Apellido1 Apellido2, Nombre" vs "Nombre Apellido1 Apellido2") y descompone la cadena asignando a `nombre_presentador`, `apellido1_presentador` y `apellido2_presentador` para que el usuario siempre pueda ver y editar si hubo un error.
2.  **Construcción del Payload**: El botón genera un objeto híbrido:
    ```javascript
    const robotPayload = {
      datos: { ...estructaraAnidadaExactamenteIgualA-PruebaAutorrellenos... },
      flatFormData: { ...todosLosCamposOriginalesPorSiAcaso... }
    }
    ```

---

## 📌 3. Valores por Defecto Inyectados en Configuración

Para agilizar el trabajo diario, se han inyectado *hard-coded* en `masterFormFields.js` los siguientes atributos predefinidos (`value`), que ahora cargan de manera transparente en la interfaz web por defecto:

*   **Persona Autorizada (Activado):** Eduardo Rivera Cabezas, NIF: 28818007L, M.
*   **Empresa Instaladora:** Solay Ingenieros s.l., CIF: B09848912.
*   **Ficha Técnica / Uso:** El selector por defecto mapea correctamente a la opción exacta de la plataforma: `'produccion energia electrica'`.

---

## 📂 4. Gestión Estática de Archivos PDF (Rechazado el Web Upload)

Una de las decisiones arquitectónicas más importantes implementadas es **EVITAR un gestor de subida de archivos (Drag & Drop) dentro del FrontEnd.** 

*Razón Técnica*: El producto final correrá en un entorno remoto (*Coolify*) que **tendrá acceso montado como volumen nativo al disco duro en red de la empresa**. Resulta ineficiente transferir PDFs pesados por red (HTTP) cuando Playwright y el contenedor pueden leerlos directamente del NAS o del disco físico de red.

**Implementación Actual en `juntaService.js`:**
*   El backend ya no busca dentro de un estricto `/documentos/` general.
*   El `juntaService.js` recibe en su payload el nombre completo del cliente (ej. *Ivan Zarza Estevez*) y construye la ruta local en el sistema de archivos apuntando a la **carpeta concreta del cliente** (Ej. `/ruta-base/Ivan Zarza Estevez`).
*   **Búsqueda Resiliente por Prefijo**: Los archivos dentro de esa carpeta no tienen que llamarse perfecto (Ej. "1-DNI Firma OK.pdf"). El script busca en local el primer archivo que empiece por (`startsWith`) el **número de la fase correspondiente del trámite**: `1.-`, `2.-`, `7.-`, etc. Esto elimina todos los cuellos de botella por mal renombrado de PDFs de parte humana.

---

## 🚀 5. Próximos Pasos (Para Futuro Testeo / Producción)

1.  **Validación de Pantalla Intermedia Nueva**: El flujo base sin certificado está portado 1:1. Cuando se obtengan los accesos con Certificado Digital Real (`prueba_con_certificado.js`), simplemente hay que incrustar el logueo de "Fase 0" en el script `juntaService.js`.
2.  **Montaje en Producción (Coolify)**: Modificar el constante `const dir = path.join(process.cwd(), formData?.apellidosNombre)` en `juntaService.js` por la ruta absoluta de anclaje del volumen Docker. Por ahora, probar en local creando simplemente una carpeta con el nombre en el root del proyecto y correr `yarn dev` para probar el ciclo completo desde la UI.

---

## 🧪 6. Guía y Métodos de Testing

El entorno arquitectónico permite probar el bot de dos maneras complementarias para aislar fallos:

### Método A: Prueba de Aislamiento Backend (`test_junta_local.js`)
*   **Comando:** `node test_junta_local.js` (en la terminal).
*   **Qué hace:** Ignora por completo tu código Frontend (Vue, inputs, base de datos). Emula que se ha pulsado el botón pasándole un `mockData` duro incrustado dentro de su propio código y lanzando Playwright directamente.
*   **Ventaja:** Ideal para cuando la página de la Junta cambie algo en su código HTML y tengas que arreglar el `juntaService.js` rápidamente sin tener que rellenar el formulario web cada vez.

### Método B: Prueba End-to-End en Interfaz Gráfica (Tu Dashboard web)
*   **Comando:** Ir al navegador mientras corres `yarn dev`, rellenar campos y pulsar "Lanzar Automatización".
*   **Qué hace:** Ejecuta el ciclo completo (Coge los datos reales de la UI -> los traduce y agrupa -> pide el POST a Nuxt -> Lanza Playwright).
*   **Ventaja:** Valida que la UI y el traductor de objeto `robotPayload` envían a Playwright lo que realmente espera.
