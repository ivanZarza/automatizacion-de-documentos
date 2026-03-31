# 🗺️ Índice de Documentación: Proyecto Automatización

Este directorio contiene toda la información técnica y operativa necesaria para gestionar el sistema de generación de documentos y automatización de la Junta de Andalucía.

---

### 🚀 1. Guías Maestras (Robot y Automatización)
- **[01_MANUAL_TECNICO_ROBOT.md](./01_MANUAL_TECNICO_ROBOT.md)**: **LEER PRIMERO.** Arquitectura, lógica de multisistema (Windows/Linux) y flujo de datos.
- **[guias_tecnicas/04_DESPLIEGUE_WINDOWS.md](./guias_tecnicas/04_DESPLIEGUE_WINDOWS.md)**: Cómo generar el ejecutable para uso en PCs de oficina.
- **[guias_tecnicas/PRUEBAS_Y_TESTING.md](./guias_tecnicas/PRUEBAS_Y_TESTING.md)**: Cómo verificar que el robot sigue funcionando tras cambios en la web de la Junta.

---

### 🎨 2. Componentes de Interfaz (Vue/Nuxt)
Accede a la subcarpeta `componentes/` para ver la documentación técnica de los formularios y justificantes:
- **[DocumentForm.vue](./componentes/DocumentForm.md)**: El corazón de la UI y el traductor de datos al robot.
- **[Manual de Nuevos Documentos](./componentes/RESUMEN_NUEVO_DOCUMENTO_HABILITACION.md)**: Cómo añadir un nuevo PDF al sistema.

---

### 🛠️ 3. Guías de Desarrollo
- **[Muestreo de Datos Independientes](./ARQUITECTURA_DATOS_INDEPENDIENTES.md)**: Cómo se guardan los datos sin depender de identidades externas.
- **[Uso de Pinia](./guias_tecnicas/GUIA_PINIA_FORMULARIOS.md)**: Gestión del estado global de los formularios.

---

### 📜 4. Historial de Sesiones
Si necesitas saber qué se hizo en fechas específicas o ver el estado de traspaso:
- **[Último Traspaso (Handover)](./historial/ESTADO_ACTUAL_Y_HANDOVER.md)**: Estado del proyecto a finales de Marzo 2026.

---
*Para empezar a trabajar: Lee el [01_MANUAL_TECNICO_ROBOT.md](./01_MANUAL_TECNICO_ROBOT.md).*
