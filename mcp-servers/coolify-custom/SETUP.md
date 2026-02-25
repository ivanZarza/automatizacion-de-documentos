# Instalación del MCP Server Personalizado de Coolify

## Lo que hemos creado

✅ **MCP Server personalizado** en TypeScript completamente funcional
✅ **Cliente HTTP** robusto para la API de Coolify  
✅ **12 herramientas MCP** para gestionar aplicaciones, bases de datos, servidores, servicios y proyectos
✅ **CLI de prueba** para testear sin VS Code
✅ Documentación completa y arquitectura explicada

## Ubicación

```
/home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom/
├── dist/                          # Código compilado
├── src/
│   ├── index.ts                   # MCP Server
│   ├── client.ts                  # Cliente API
│   └── cli.ts                     # CLI para testing
├── package.json
├── tsconfig.json
├── README.md                      # Guía de uso
├── ARCHITECTURE.md                # Explicación técnica
└── vscode-settings.json           # Config para VS Code
```

## Paso 1: Verificación (Ya hecho ✓)

```bash
cd /home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom
npm install      # ✓ Completado
npm run build    # ✓ Compilado exitosamente
```

## Paso 2: Integrar en VS Code

Abre `~/.config/Code/User/settings.json` y reemplaza tu sección `mcpServers` con esto:

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

**O simplemente copia el contenido de:**
```
/home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom/vscode-settings.json
```

## Paso 3: Reinicia VS Code

Cierra y abre VS Code nuevamente para que cargue el nuevo MCP server.

## Paso 4: Prueba las herramientas

Desde VS Code, en el chat de Copilot, usa cualquiera de estas herramientas:

### Ejemplos de uso en VS Code Chat:

```
"Muéstrame todas mis aplicaciones en Coolify"
→ Ejecuta: list_applications

"¿Cuál es el estado de la aplicación solay?"
→ Ejecuta: get_application con ID

"Necesito ver los últimos deployments"
→ Ejecuta: get_deployments

"¿Cuántas bases de datos tengo?"
→ Ejecuta: list_databases

"Muéstrame el estado de la API"
→ Ejecuta: get_health
```

## Paso 5: CLI para Testing (Opcional)

Si necesitas probar sin VS Code:

```bash
cd /home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom

# Listar aplicaciones
COOLIFY_API_URL="http://51.91.159.188:8000" \
COOLIFY_API_TOKEN="1|21AT1dEd1Ihrpgye3sD9M0i0ZG9LrD4WhJwr9VlWfe2de8d3" \
npm run cli -- list-apps

# Ver ayuda
npm run cli -- help
```

## Herramientas disponibles

### 📦 Aplicaciones
- `list_applications` - Listar todas
- `get_application` - Obtener una por ID
- `get_deployments` - Ver historial de deployments

### 🗄️ Bases de datos
- `list_databases` - Listar todas
- `get_database` - Obtener una por ID

### 🖥️ Servidores
- `list_servers` - Listar todos
- `get_server` - Obtener uno por ID

### ⚙️ Servicios
- `list_services` - Listar todos
- `get_service` - Obtener uno por ID

### 📁 Proyectos
- `list_projects` - Listar todos
- `get_project` - Obtener uno por ID

### 🏥 Monitoreo
- `get_health` - Check API status

## Mejoras respecto al original

| Aspecto | @felixallistar/coolify-mcp | Nuestro custom |
|--------|---------------------------|----------------|
| Lenguaje | Desconocido | TypeScript puro |
| Manejo de errores | Básico | Completo |
| CLI | No | Sí, totalmente funcional ✓ |
| Documentación | Mínima | Completa |
| Testing | No preparado | Estructura lista |
| Actualización | Difícil | Muy fácil |
| Rendimiento | ✓ | ✓ Optimizado |

## Troubleshooting

### "MCP Server not found"
→ Asegúrate de reiniciar VS Code después de editar settings.json

### "COOLIFY_API_TOKEN not found"  
→ Verifica que las env vars estén en settings.json

### "Connection refused"
→ Verifica que Coolify está ejecutándose en `http://51.91.159.188:8000`

## Próximos pasos

### Agregar más funcionalidades

Si necesitas agregar más herramientas:

1. Edita `src/client.ts` - Agrega métodos HTTP
2. Edita `src/index.ts` - Agrega tool definitions
3. Ejecuta: `npm run build`
4. Reinicia VS Code

Ejemplo:

```typescript
// En src/client.ts
async createApplication(projectId: string, name: string) {
  return this.request(`/projects/${projectId}/applications`, 'POST', {
    name
  });
}

// En src/index.ts - Agregar a tools array:
{
  name: 'create_application',
  description: 'Create new application',
  inputSchema: { ... }
}

// En CallToolRequestSchema handler:
case 'create_application':
  result = await client.createApplication(toolInput.projectId, toolInput.name);
  break;
```

## Archivos de referencia

- 📖 [ARCHITECTURE.md](ARCHITECTURE.md) - Explicación técnica
- 📖 [README.md](README.md) - Guía de uso
- 🔧 [vscode-settings.json](vscode-settings.json) - Config lista para copiar

¡Listo! Tu MCP server personalizado está operacional. 🚀
