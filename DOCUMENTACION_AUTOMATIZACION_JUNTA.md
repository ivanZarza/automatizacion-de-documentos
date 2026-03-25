# 🤖 Arquitectura y Roadmap: Automatización Junta de Andalucía

Este documento sirve como "Brain Dump" para preservar todo el contexto, decisiones arquitectónicas y el roadmap de desarrollo respecto a la integración del robot de Playwright en la aplicación Nuxt de Generación de Documentación.

Cualquier desarrollador o IA que empiece a trabajar en esta rama **debe leer primero este documento**.

---

## 🏗️ 1. Arquitectura Central

La aplicación ya cuenta con un Generador de Formularios dinámicos (`DocumentForm.vue`) alimentado por `app/config/masterFormFields.js`. Todos los datos introducidos se guardan como variables de un objeto **plano** gigante (`formData.value`) que se autoguarda en `localStorage` y en la tabla Base de Datos SQL (Supabase).

El objetivo es no alterar este flujo para no corromper la consistencia de los guardados.

Por otro lado, existe el script de automatización (`server/utils/automation/juntaService.js`) que es un **clon hiper-exacto (1:1)** del script `prueba-autorrelleno.js`. Este script espera recibir un objeto JSON **profundamente anidado** (Titular > Ficha Técnica > Persona Autorizada).

La solución consiste en usar `DocumentForm.vue` como intermediario o traductor (*Adapter Pattern*): coge el objeto plano autogestionable y extrae solo las key-values del robot para componer ese objeto anidado *just-in-time* al pulsar el botón "Lanzar Automatización".

---

## 📥 2. Estructura de Datos ("El Traductor")

Este es el objetivo arquitectónico que se debe programar en `DocumentForm.vue` en la función `handleLaunchAutomation`:

```javascript
/* EJEMPLO GUÍA PARA LA IA/DEV: Así se debe estructurar el payload a enviar por fetch 
   utilizando los campos de formulario plano ('_presentador') del formData.value */

const robotPayload = {
  // 1.1 Persona Titular (Directo en la raíz del objeto, *NO* bajo un nodo 'presentador')
  tipoDocumento: formData.value.tipo_documento_presentador,
  nif: formData.value.nif_presentador,
  
  // IMPORTANTE: Hay que programar una lógica que recoja el string "apellidosNombre",
  // lo trocee inteligentemente y lo acabe asignando aquí (o que el usuario lo cambie a mano si falla)
  nombre: formData.value.nombre_presentador,       
  apellido1: formData.value.apellido1_presentador, 
  apellido2: formData.value.apellido2_presentador, 
  
  sexo: formData.value.sexo_presentador,
  delegacion: formData.value.cod_delegacion,

  // Domicilio Titular (Directo en la raíz del objeto)
  tipoVia: formData.value.tipo_via_presentador,
  nombreVia: formData.value.nombre_via_presentador,
  tipoNumeracion: formData.value.tipo_numeracion_presentador,
  numero: formData.value.numero_presentador,
  calificador: formData.value.calificador_numero_presentador,
  bloque: formData.value.bloque_presentador,
  escalera: formData.value.escalera_presentador,
  piso: formData.value.piso_presentador,
  puerta: formData.value.puerta_presentador,
  margen: formData.value.margen_presentador,
  codigoPostal: formData.value.cp_presentador,
  provincia: formData.value.provincia_presentador,
  municipioNombre: formData.value.municipio_presentador,
  poblacion: formData.value.poblacion_presentador,
  telefono: formData.value.telefono_presentador,
  movil: formData.value.movil_presentador,
  email: formData.value.email_presentador,

  // 1.2 Representante Legal (Opcional)
  conRepresentante: formData.value.con_representante_legal,
  representante: {
    tipoDocumento: formData.value.rep_leg_tipo_documento,
    nif: formData.value.rep_leg_nif,
    // ...resto de campos rep_leg_
  },

  // 1.3 Persona Autorizada (Opcional pero fijo para el Comercial/Técnico)
  conPersonaAutorizada: formData.value.con_persona_autorizada,
  personaAutorizada: {
    tipoDocumento: formData.value.per_aut_tipo_documento,
    nif: formData.value.per_aut_nif,
    sexo: formData.value.per_aut_sexo,
    nombre: formData.value.per_aut_nombre,
    apellido1: formData.value.per_aut_apellido1,
    apellido2: formData.value.per_aut_apellido2,
  },

  // FASE 3: Otros Datos
  otrosDatos75codigo: formData.value.cnae_rite,
  otrosDatosNumero: formData.value.numero_empresa_instaladora,
  codigoComunidadAutonoma: formData.value.codigo_ccaa,

  // FASE 3: Ficha Técnica
  fichaTecnica: {
    potencia: formData.value.potencia_instalacion,
    uso: formData.value.uso_instalacion,
    tipoSuministro: formData.value.tipo_suministro,
    tension: formData.value.tension_red,
    esAutoconsumo: formData.value.es_autoconsumo,
    cau: formData.value.cau_presentador,
    // ... y el resto de info de la instalación (empresaInstaladora, empresaDistribuidora...)
  }
}
```

---

## 🗂️ 3. Decisión Crítica: Archivos (No Web Uploading)

**⚠️ IMPORTANTE!** Se ha decidido enfáticamente **no** construir inputs de subir archivos ("Arrastrar y Soltar PDFs") en el FrontEnd para enviarlos temporalmente y correr el script.

*Razón:* La aplicación web se desplegará en un VPS (Ej. Coolify) y tendrá un **disco/volumen de red montado** apuntando a los recursos de la empresa de ingeniería.
El backend va a ser capaz de leer directamente desde el disco duro del servidor las carpetas estructuradas por los trabajadores.

*   **Identificador de Carpeta**: En las pruebas locales crearemos una carpeta tipo "Ivan Zarza Estevez" (en producción sería un path montado e.g. `/mnt/empresa/expedientes/[nombre_cliente]/`).
*   **Identificador de Archivos**: Por **Prefijo**. Dentro de la carpeta del cliente en el disco duro, los archivos deben nombrarse empezando por prefijos estancos e invariables (`1.-`, `2.-`, `7.-`, `9.-`), seguidos de cualquier texto humano.
*   El bot en `juntaService.js` entrará en esta carpeta (enviada dinámica desde la ruta base + el nombre del payload) y buscará `startsWith('1.-')` para subir el DNI o poder de autoría, garantizando un cero por ciento de fallos por nombres de archivo incorrectos.

---

## 🚀 4. TAREAS A EJECUTAR (Actionable TO-DO para la IA)

El próximo desarrollador/IA que coja este plan debe operar en el siguiente orden estricto (no antes):

### TAREA 1: Inyectar Datos Fijos en Configuración
En el fichero `app/config/masterFormFields.js` establecer valores por defecto (`value: '...'`) para:
1.  **Persona Autorizada**: `Eduardo Rivera Cabezas`, `NIF: 28818007L`, `M`. (`con_persona_autorizada` a `true`).
2.  **Empresa Instaladora**: `Solay Ingenieros s.l.`, `CIF`, `B09848912`.
3.  **Uso de Instalación**: Ajustar los metadatos de las *options* (o el value por defecto) para que el string pase a ser exactamente `'produccion energia electrica'`.

### TAREA 2: Implementar Traductor en DocumentForm.vue
Ir a `handleLaunchAutomation` y:
1.  Implementar el algoritmo "Separador Inteligente de Nombres" (`apellidosNombre` -> Nombre, Apellido 1, Apellido 2).
2.  Empaquetar todos los `_presentador` sueltos en un objeto con el modelo dictado más arriba.
3.  Modificar la petición `fetch('/api/automation/junta')` para enviar exclusivamente el payload traducido al robot.

### TAREA 3: Actualizar el Backend Bot (`juntaService.js`)
Configurar en primera instancia la ruta a una constante configurable de entorno (para Coolify futuro) con fallback a la raíz en local (`import { join } from 'path'`, `/Ivan Zarza Estevez/`). Garantizar que la `subirDoc` reaccione con éxito leyendo los prefijos en esa carpeta estática.

---
**Nota para el usuario Iván**: Todo este documento representa el roadmap definitivo aprobado. Todo lo anterior han sido considerables discusiones arquitectónicas que solidifican esta vía.
