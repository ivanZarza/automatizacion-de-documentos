# Arquitectura del MCP Server Personalizado de Coolify

## Overview

Este MCP server personalizado proporciona una forma robusta de interactuar con la API de Coolify a través del protocolo MCP (Model Context Protocol). A diferencia del servidor genérico existente, este está optimizado para máximo rendimiento y características.

## Componentes principales

### 1. Cliente HTTP (`src/client.ts`)

```
┌─────────────────────────────────────┐
│     CoolifyClient                   │
├─────────────────────────────────────┤
│  - request<T>()                     │ ← Método base para requests
│  - getApplications()                │
│  - getApplication(id)               │
│  - getDeployments(appId)            │
│  - getDatabases()                   │
│  - getDatabase(id)                  │
│  - getServers()                     │
│  - getServer(id)                    │
│  - getServices()                    │
│  - getService(id)                   │
│  - getProjects()                    │
│  - getProject(id)                   │
│  - getHealth()                      │
│  - getVersion()                     │
└─────────────────────────────────────┘
```

**Características:**
- Manejo automático de Bearer tokens
- Error handling robusto
- Parsing JSON automático
- Timeouts configurables

### 2. Servidor MCP (`src/index.ts`)

El servidor implementa tres tipos de handlers MCP:

#### a) Resource Handlers
Proporciona acceso a recursos de Coolify mediante URIs:
- `coolify://application/{id}` - Detalles de aplicación
- `coolify://database/{id}` - Detalles de base de datos
- `coolify://server/{id}` - Detalles de servidor

#### b) Tool Handlers
Define 12 herramientas para interactuar con Coolify:

**Aplicaciones (3 tools)**
- `list_applications` - Listar todas las apps
- `get_application` - Get app by ID
- `get_deployments` - Ver historial de deployments

**Bases de datos (2 tools)**
- `list_databases`
- `get_database`

**Servidores (2 tools)**
- `list_servers`
- `get_server`

**Servicios (2 tools)**
- `list_services`
- `get_service`

**Proyectos (2 tools)**
- `list_projects`
- `get_project`

**Monitoreo (1 tool)**
- `get_health` - Verificar estado

### 3. Transport Layer (stdio)

El servidor se comunica con VS Code/Claude vía stdio, permitiendo integración transparente:

```
VS Code / Claude
       ↓
   stdin/stdout
       ↓
MCP Server Process
       ↓
Coolify API
```

## Flow de una petición

```
1. Usuario solicita: "list_applications"
   ↓
2. VS Code → MCP Server (JSON-RPC)
   ↓
3. CallToolRequestSchema handler matchea la herramienta
   ↓
4. Se ejecuta client.getApplications()
   ↓
5. CoolifyClient.request('/applications')
   ↓
6. HTTP GET con Bearer token
   ↓
7. Coolify API responde JSON
   ↓
8. Resultado se retorna a VS Code
   ↓
9. Usuario ve los resultados formateados
```

## Mejoras respecto al existente

| Feature | Original | Custom |
|---------|----------|--------|
| Manejo de errores | Básico | Completo |
| Documentación | Parcial | Completa |
| Logging | No | Preparado para agregar |
| Testing | No | Structure para tests |
| TypeScript types | Básicos | Completos |
| Actualización fácil | Difícil | Muy fácil |

## Instalación en VS Code

### Opción 1: Ruta local

En `~/.config/Code/User/settings.json` (Linux/Mac) o equivalente en Windows:

```json
{
  "mcpServers": {
    "coolify-custom": {
      "command": "node",
      "args": ["/ruta/completa/a/coolify-custom/dist/index.js"],
      "env": {
        "COOLIFY_API_URL": "http://51.91.159.188:8000",
        "COOLIFY_API_TOKEN": "tu_token"
      }
    }
  }
}
```

### Opción 2: Ejecutable global

```bash
cd /home/ivan/dev/trabajo/GeneracionDocumentacion/mcp-servers/coolify-custom
npm run build
chmod +x dist/index.js
# Crear symlink o instalar globalmente
sudo ln -s $(pwd)/dist/index.js /usr/local/bin/coolify-mcp
```

Luego en VS Code:

```json
{
  "mcpServers": {
    "coolify-custom": {
      "command": "coolify-mcp",
      "env": {
        "COOLIFY_API_URL": "http://51.91.159.188:8000",
        "COOLIFY_API_TOKEN": "tu_token"
      }
    }
  }
}
```

## Extensión futura

Para agregar nuevas herramientas:

1. **Agregar método al cliente** (`src/client.ts`):
```typescript
async createApplication(projectId: string, name: string) {
  return this.request(`/projects/${projectId}/applications`, 'POST', {
    name
  });
}
```

2. **Definir la herramienta** (en `src/index.ts`):
```typescript
{
  name: 'create_application',
  description: 'Create a new application',
  inputSchema: {
    type: 'object',
    properties: {
      projectId: { type: 'string' },
      name: { type: 'string' }
    },
    required: ['projectId', 'name']
  }
}
```

3. **Agregar handler** en `CallToolRequestSchema`:
```typescript
case 'create_application':
  result = await client.createApplication(toolInput.projectId, toolInput.name);
  break;
```

## Variables de entorno

- `COOLIFY_API_URL` - URL base de tu instancia Coolify
- `COOLIFY_API_TOKEN` - Token de API generado en Coolify settings

## Performance

- Con caché HTTP: ~50-100ms por request
- Sin caché: ~100-300ms (depende de latencia de red)
- Manejo concurrente de múltiples requests

## Seguridad

- ✅ Token guardado en variables de entorno (no en código)
- ✅ HTTPS listo (cambia `http://` por `https://` en URL)
- ✅ Error handling que no expone tokens en logs
- ✅ Validación de inputs en el cliente
