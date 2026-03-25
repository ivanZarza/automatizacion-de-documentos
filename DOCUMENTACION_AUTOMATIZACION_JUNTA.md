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

---

## 🔐 5. Gestión de Certificados Digitales y Firma (Fase 0)

Hemos implementado una arquitectura de **Automatización Híbrida**:

1.  **Perfil Persistente:** Playwright utiliza una carpeta de usuario persistente (`playwright_junta_profile`) para que el navegador Chrome "recuerde" los certificados instalados en el sistema operativo.
2.  **Login Asistido:** El script navega automáticamente hasta el portal de la Junta, pero se detiene (`page.pause()`) para que el usuario seleccione su certificado digital en el diálogo de AutoFirma. Una vez hecho el login, el robot recupera el control.
3.  **Firma de Ficha Técnica:** Tras rellenar los datos técnicos en el iframe, el robot pulsa "Guardar" y espera dinámicamente (`#capa_fondo`) a que la web procese la firma. Ya no requiere pausa manual aquí, permitiendo un flujo más fluido.

---

## 🚀 6. Próximos Pasos (Para Testeo en el Nuevo PC)

1.  **Instalación Local:** Seguir la `GUIA_PRUEBAS_LOCAL.md` para instalar dependencias y el binario de Chrome para Playwright.
2.  **Prueba de Fuego:** Lanzar una tramitación real desde el Dashboard para verificar que el diálogo de certificado aparece correctamente en la nueva máquina.
3.  **Verificación de PDFs:** Confirmar que el sistema de prefijos (`1.-`, `2.-`, `7.-`) mapea correctamente los archivos de la carpeta del cliente en el nuevo entorno.

---

## 🧪 7. Guía y Métodos de Testing

El entorno arquitectónico permite probar el bot de dos maneras complementarias para aislar fallos:

### Método A: Prueba de Aislamiento Backend (`test_junta_local.js`)
*   **Comando:** `node test_junta_local.js` (en la terminal).
*   **Qué hace:** Ignora por completo tu código Frontend (Vue, inputs, base de datos). Emula que se ha pulsado el botón pasándole un `mockData` duro incrustado dentro de su propio código y lanzando Playwright directamente.
*   **Ventaja:** Ideal para cuando la página de la Junta cambie algo en su código HTML y tengas que arreglar el `juntaService.js` rápidamente sin tener que rellenar el formulario web cada vez.

### Método B: Prueba End-to-End en Interfaz Gráfica (Tu Dashboard web)
*   **Comando:** Ir al navegador mientras corres `yarn dev`, rellenar campos y pulsar "Lanzar Automatización".
*   **Qué hace:** Ejecuta el ciclo completo (Coge los datos reales de la UI -> los traduce y agrupa -> pide el POST a Nuxt -> Lanza Playwright).
*   **Ventaja:** Valida que la UI y el traductor de objeto `robotPayload` envían a Playwright lo que realmente espera.
