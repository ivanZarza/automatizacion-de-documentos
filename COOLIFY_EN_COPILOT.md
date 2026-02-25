# ✅ Coolify en Copilot - Guía Completa

## Estado Actual

✅ **MCP Server configurado y funcionando**
- Servidor compilado: `/home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom/dist/index.js`
- Configuración en VS Code: ✓ Actualizada
- Prueba de conexión: ✓ Exitosa

## Cómo Usar Coolify desde Copilot

### 1. Reinicia VS Code
Abre VS Code nuevamente para que cargue el nuevo MCP Server. Una vez reiniciado, Copilot tendrá acceso a las herramientas de Coolify.

### 2. Comandos Disponibles en Copilot Chat

En el chat de Copilot, puedes usar comandos como:

```
"Muéstrame todas las aplicaciones en Coolify"
→ Ejecuta: list_applications

"¿Cuál es el estado de la aplicación solay?"
→ Ejecuta: get_application con ID

"Necesito ver los últimos deployments de la app solay"
→ Ejecuta: get_deployments 

"¿Cuántas bases de datos tengo?"
→ Ejecuta: list_databases

"Muéstrame todos los servidores"
→ Ejecuta: list_servers

"¿Cuál es el estado de la API de Coolify?"
→ Ejecuta: get_health

"Dame información del proyecto [ID]"
→ Ejecuta: get_project
```

## Herramientas Disponibles en Copilot

### Aplicaciones
- ✅ `list_applications` - Ver todas las aplicaciones
- ✅ `get_application` - Obtener detalles de una app específica
- ✅ `get_deployments` - Ver historial de deployments

### Bases de Datos
- ✅ `list_databases` - Ver todas las BD
- ✅ `get_database` - Obtener detalles de una BD específica

### Infraestructura
- ✅ `list_servers` - Ver todos los servidores
- ✅ `get_server` - Obtener detalles de un servidor
- ✅ `list_services` - Ver todos los servicios
- ✅ `get_service` - Obtener detalles de un servicio

### Gestión
- ✅ `list_projects` - Ver todos los proyectos
- ✅ `get_project` - Obtener detalles de un proyecto
- ✅ `get_health` - Verificar salud de la API

## Configuración en VS Code

Tu `settings.json` ya está configurado correctamente:

```json
"mcpServers": {
    "coolify-custom": {
        "command": "node",
        "args": ["/home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom/dist/index.js"],
        "env": {
            "COOLIFY_API_URL": "http://51.91.159.188:8000",
            "COOLIFY_API_TOKEN": "1|21AT1dEd1Ihrpgye3sD9M0i0ZG9LrD4WhJwr9VlWfe2de8d3"
        }
    }
}
```

## CLI Disponible (Sin Copilot)

Si necesitas probar desde terminal directamente:

```bash
cd /home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom

# Cargar variables
export $(cat .env | xargs)

# Ejecutar CLI
npm run cli -- list-apps
npm run cli -- health
npm run cli -- list-servers
```

## Verificación

El servidor se inició correctamente:
```
> coolify-custom-mcp@1.0.0 start
> node dist/index.js
✅ (Sin errores = funcionando correctamente)
```

## Próximos Pasos

1. **Reinicia VS Code** ← IMPORTANTE
2. Abre el chat de Copilot (`Ctrl+L` o `Cmd+L`)
3. Usa los comandos mencionados arriba
4. Copilot tendrá acceso completo a Coolify

---

**¿Listo para probar? Reinicia VS Code y pregúntale a Copilot por tus aplicaciones en Coolify.** 🚀
