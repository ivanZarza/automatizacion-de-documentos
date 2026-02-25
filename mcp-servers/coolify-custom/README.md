# Coolify Custom MCP Server

Un servidor Model Context Protocol personalizado para interactuar con la API de Coolify desde Claude, VS Code y otras herramientas compatibles.

## Características

- ✅ Listar y obtener detalles de aplicaciones
- ✅ Gestionar bases de datos
- ✅ Listar servidores
- ✅ Acceder a servicios
- ✅ Gestionar proyectos
- ✅ Ver historial de deployments
- ✅ Verificar estado de la API

## Instalación

### 1. Requisitos previos
- Node.js 16+ 
- npm o yarn
- Acceso a una instancia de Coolify

### 2. Instalación de dependencias

```bash
npm install
```

### 3. Configuración

Copia el archivo `.env.example` a `.env` y actualiza los valores:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales de Coolify:
```
COOLIFY_API_URL=http://tu-coolify-instance:8000
COOLIFY_API_TOKEN=tu_token_aqui
```

### 4. Compilar

```bash
npm run build
```

### 5. Iniciar el servidor

```bash
npm start
```

O en modo desarrollo con auto-compilación:

```bash
npm run dev
```

## Integración con VS Code

### Opción 1: Configurar en settings.json

Actualiza tu `~/.config/Code/User/settings.json` o `.vscode/settings.json`:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "node",
      "args": ["/ruta/a/coolify-custom-mcp/dist/index.js"],
      "env": {
        "COOLIFY_API_URL": "http://51.91.159.188:8000",
        "COOLIFY_API_TOKEN": "tu_token_aqui"
      }
    }
  }
}
```

### Opción 2: Usar npm package global

```bash
npm link
```

Luego en `settings.json`:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "coolify-mcp",
      "env": {
        "COOLIFY_API_URL": "http://51.91.159.188:8000",
        "COOLIFY_API_TOKEN": "tu_token_aqui"
      }
    }
  }
}
```

## Herramientas disponibles

### Aplicaciones

- **list_applications** - Lista todas las aplicaciones deployadas
- **get_application** - Obtiene detalles de una aplicación específica
  - Entrada: `id` (string)
- **get_deployments** - Obtiene el historial de deployments de una aplicación
  - Entrada: `appId` (string)

### Bases de datos

- **list_databases** - Lista todas las bases de datos
- **get_database** - Obtiene detalles de una base de datos
  - Entrada: `id` (string)

### Servidores

- **list_servers** - Lista todos los servidores
- **get_server** - Obtiene detalles de un servidor
  - Entrada: `id` (string)

### Servicios

- **list_services** - Lista todos los servicios
- **get_service** - Obtiene detalles de un servicio
  - Entrada: `id` (string)

### Proyectos

- **list_projects** - Lista todos los proyectos
- **get_project** - Obtiene detalles de un proyecto
  - Entrada: `id` (string)

### Estado

- **get_health** - Verifica el estado de la API de Coolify

## Ejemplo de uso

```typescript
// Listar todas las aplicaciones
const apps = await client.getApplications();

// Obtener detalles de una aplicación
const app = await client.getApplication('app-123');

// Ver deployments
const deployments = await client.getDeployments('app-123');
```

## Troubleshooting

### Error: "COOLIFY_API_TOKEN environment variable is required"

Asegúrate de que has establecido la variable de entorno `COOLIFY_API_TOKEN` antes de iniciar el servidor.

### Error: "Failed to fetch from API"

- Verifica que `COOLIFY_API_URL` sea correcta
- Asegúrate de tener conectividad de red a tu instancia de Coolify
- Verifica que el token sea válido

## Desarrollo

### Estructura del proyecto

```
src/
├── index.ts      # Punto de entrada del MCP server
├── client.ts     # Cliente de la API de Coolify
```

### Agregar nuevas herramientas

1. Agrega el método al cliente en `src/client.ts`
2. Define la herramienta en el array `tools` en `src/index.ts`
3. Añade el caso en el handler `CallToolRequestSchema`

## Licencia

MIT
