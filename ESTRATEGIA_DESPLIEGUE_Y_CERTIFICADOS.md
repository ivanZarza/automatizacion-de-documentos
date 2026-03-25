# Estrategia de Despliegue, Certificados y Automatización (Fase Producción)

Este documento detalla las opciones arquitectónicas para ejecutar el robot de la Junta de Andalucía una vez que la aplicación esté desplegada en la nube (Coolify/VPS), considerando la restricción crítica del **Certificado Digital** y la necesidad de **Auto-clics**.

## El Desafío Técnico
La web de la Junta de Andalucía requiere autenticación mediante certificado digital. Si el robot corre en un servidor remoto (VPS):
1. **Aislamiento**: No puede acceder a los certificados instalados en tu ordenador personal.
2. **Interfaz**: No puede abrir ventanas de diálogo del sistema local (como la selección de certificados de Windows o la aplicación AutoFirma).
3. **Bloqueos**: Muchos pasos requieren interacción de UI que Playwright puede manejar, pero que a veces requieren herramientas de nivel de sistema operativo (como OpenClaw).

---

## Opciones de Arquitectura

### 1. Modelo Híbrido: Dashboard Cloud + Ejecutor Local (Recomendado)
Mantener el Dashboard y la Base de Datos en la nube (Coolify), pero ejecutar el robot físicamente en tu ordenador.
- **Cómo funciona**: Entras a la web pública, seleccionas al cliente y pulsas un botón que envía la orden a un pequeño script que tienes corriendo en tu PC (vía WebSockets o una cola de tareas).
- **Ventajas**: 
    - Acceso directo a tus certificados locales.
    - Acceso a tus carpetas de archivos locales.
    - Puedes ver el navegador trabajar en tu pantalla.
- **Desventajas**: Requiere tener el PC encendido y un script "escuchando" órdenes.

### 2. Automatización Cloud 100% (Certificado en Servidor)
Subir el certificado digital (.p12) directamente al servidor VPS.
- **Cómo funciona**: Configuramos Playwright en el servidor para que "inyecte" el certificado automáticamente en la sesión del navegador invisible.
- **Ventajas**: 
    - Totalmente autónomo. No dependes de tu PC.
    - Puedes lanzar trámites desde el móvil o tablet.
- **Desventajas**: 
    - Riesgo de seguridad si el servidor se ve comprometido (aunque se puede cifrar).
    - **Falla si la Junta requiere abrir "AutoFirma"** (programa externo), ya que AutoFirma no se puede instalar fácilmente en un servidor Linux sin interfaz gráfica.

### 3. Aplicación de Escritorio (Electron / Tauri)
Convertir todo el proyecto en un programa instalable de Windows (.exe) o Mac.
- **Cómo funciona**: La interfaz y el robot viven en un mismo paquete instalado en tu PC.
- **Ventajas**: 
    - Máxima potencia: control total del sistema operativo.
    - Integración perfecta con certificados locales.
- **Desventajas**: No es accesible desde una URL pública por otros miembros del equipo si no están en ese PC.

---

## El Concepto de "Estación de Firma" (Dedicated Signing Station)

Esta es una evolución de la **Opción 3** ideal para oficinas. Consiste en tener un ordenador (PC o Mac) encendido permanentemente en la oficina dedicado exclusivamente a tramitar con la Junta.

### VENTAJAS:
1. **Certificados Seguros**: Los certificados digitales están instalados solo en ese ordenador. No se mueven a la nube ni se reparten por los PCs de todos los empleados.
2. **Entorno Controlado**: Ese PC puede tener instalada la versión exacta de Chrome y **AutoFirma** necesaria.
3. **OpenClaw / Autoclicks**: Al ser un PC real con pantalla, puedes dejar herramientas de auto-click configuradas para que "vigilen" la pantalla y salten los diálogos de seguridad automáticamente.
4. **Acceso Remoto**: El resto del equipo puede usar el Dashboard en la nube (Coolify) para preparar los datos, y luego el "PC de Firma" se encarga de "succionar" esos datos y hacer el trámite físico.

### IMPLEMENTACIÓN:
- Se instala una versión ligera de este proyecto en ese PC.
- El PC consulta periódicamente la Base de Datos (PostgreSQL) buscando trámites "Pendientes".
- Cuando encuentra uno, arranca el robot de Playwright localmente, firma, y actualiza el estado a "Finalizado".

---

## Empaquetado como Aplicación de Escritorio (.EXE)

Es perfectamente posible convertir todo este proyecto Nuxt en un archivo `.exe` instalable mediante herramientas como **Electron** o **Tauri**.

### ¿Cómo funcionaría el .EXE?
1. **Interfaz Local**: Al abrir el programa, verás el Dashboard tal cual lo ves ahora en el navegador, pero en una ventana propia (como Spotify o Discord).
2. **Robot Integrado**: El "backend" Nitro y el robot de Playwright irían metidos dentro del mismo paquete. Podría abrir tu Chrome local sin problemas.
3. **Portabilidad**: Podrías llevarte el `.exe` en un pendrive a otro ordenador, instalarlo y funcionaría.

### El reto de la Base de Datos en un .EXE:
Tienes dos opciones para los datos:
- **Base de Datos Centralizada (Nube)**: El `.exe` se conecta por internet a tu base de datos actual. Así, si guardas un cliente en el PC del despacho, lo verás también al abrir el `.exe` en tu casa.
- **Base de Datos Local (SQLite)**: Cada ordenador donde instales el `.exe` guarda sus propios clientes de forma independiente en su disco duro. No se comparten datos entre ordenadores.

### Herramientas recomendadas:
- **Tauri**: Más ligero y rápido, pero requiere más configuración para integrarlo con Node.js/Nitro.

---

## ¿Y por qué no una Extensión de Chrome?

Es una pregunta común, pero para este proyecto **no es recomendable** por las siguientes razones:

1. **Acceso a Archivos Locales**: Por seguridad, Google prohíbe que las extensiones lean archivos de tu disco duro (`/documentos/Ivan...`) de forma automática. Te obligaría a seleccionar los archivos a mano cada vez.
2. **Control del Navegador**: Una extensión vive "dentro" de la pestaña. No puede controlar las ventanas de certificados, no puede abrir otras pestañas de forma tan potente como Playwright, y no puede manejar AutoFirma.
3. **Backend**: Tu proyecto tiene una base de datos PostgreSQL. Una extensión de Chrome no puede conectar directamente a una base de datos; necesitaría un servidor intermedio sí o sí.

**Conclusión**: Un `.exe` (Electron) es básicamente un navegador Chrome con "superpoderes" y sin las restricciones de seguridad que tienen las extensiones.


---

## Notas sobre OpenClaw y Auto-clics
Si en el futuro decides integrar **OpenClaw** o herramientas de automatización de ratón/teclado a nivel de Sistema Operativo:
- **Solo funcionará en las Opciones 1 y 3**. 
- Estas herramientas requieren una sesión de usuario activa y una interfaz gráfica real (un escritorio de Windows o Linux con monitor).
- Son ideales para saltar ventanas de confirmación que Playwright no puede ver (como diálogos de seguridad de Windows o avisos de Java/AutoFirma).

> [!IMPORTANT]
> Si la Junta de Andalucía acaba obligando al uso de **AutoFirma Desktop** para la firma final, la **Opción 1 (Ejecutor Local)** se convierte en la única solución viable técnicamente.
