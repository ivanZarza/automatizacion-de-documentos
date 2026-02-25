# Coolify MCP Server Implementation Guide

## Overview

This guide provides comprehensive instructions for creating a Model Context Protocol (MCP) server for Coolify API integration. The MCP server will enable Claude and other AI tools to interact with Coolify's deployment platform programmatically.

---

## Architecture Overview

### MCP Server Components

```
┌─────────────────────────────────────┐
│     Coolify MCP Server              │
├─────────────────────────────────────┤
│  1. Resource Handlers               │
│     - Applications                  │
│     - Databases                     │
│     - Services                      │
│     - Deployments                   │
│     - Servers                       │
├─────────────────────────────────────┤
│  2. Tool Definitions                │
│     - Deploy Application            │
│     - Create Database               │
│     - Manage Environment Vars        │
│     - Monitor Deployments            │
├─────────────────────────────────────┤
│  3. API Client Layer                │
│     - HTTP Client                   │
│     - Authentication Manager        │
│     - Error Handling                │
├─────────────────────────────────────┤
│  4. Transport Layer                 │
│     - stdio                         │
│     - HTTP SSE                      │
└─────────────────────────────────────┘
```

---

## Project Structure

```
coolify-mcp-server/
├── src/
│   ├── index.ts                    # MCP server entry point
│   ├── client/
│   │   ├── coolifyClient.ts        # Coolify API client
│   │   └── types.ts                # Type definitions
│   ├── handlers/
│   │   ├── applications.ts         # Application operations
│   │   ├── databases.ts            # Database operations
│   │   ├── services.ts             # Service operations
│   │   ├── deployments.ts          # Deployment operations
│   │   ├── servers.ts              # Server operations
│   │   └── resources.ts            # Resource utilities
│   ├── tools/
│   │   ├── applicationTools.ts     # Application MCP tools
│   │   ├── databaseTools.ts        # Database MCP tools
│   │   ├── deploymentTools.ts      # Deployment MCP tools
│   │   └── serverTools.ts          # Server MCP tools
│   └── utils/
│       ├── logger.ts               # Logging utilities
│       └── errorHandler.ts         # Error handling
├── package.json
├── tsconfig.json
└── .env.example
```

---

## Implementation Details

### 1. Coolify API Client

```typescript
// src/client/coolifyClient.ts

interface CoolifyConfig {
  baseUrl: string;
  apiToken: string;
  timeout?: number;
}

interface ApiResponse<T> {
  status: number;
  data: T;
  error?: string;
}

class CoolifyClient {
  private baseUrl: string;
  private apiToken: string;
  private timeout: number;

  constructor(config: CoolifyConfig) {
    this.baseUrl = config.baseUrl;
    this.apiToken = config.apiToken;
    this.timeout = config.timeout || 30000;
  }

  private getHeaders(): Record<string, string> {
    return {
      'Authorization': `Bearer ${this.apiToken}`,
      'Content-Type': 'application/json',
    };
  }

  async request<T>(
    method: string,
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: this.getHeaders(),
        body: data ? JSON.stringify(data) : undefined,
        signal: AbortSignal.timeout(this.timeout),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: responseData.message || 'API Error',
          errors: responseData.errors,
        };
      }

      return {
        status: response.status,
        data: responseData,
      };
    } catch (error) {
      return {
        status: 500,
        data: {} as T,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }

  // Application Methods
  async listApplications() {
    return this.request('GET', '/applications');
  }

  async getApplication(uuid: string) {
    return this.request('GET', `/applications/${uuid}`);
  }

  async createApplication(data: unknown) {
    return this.request('POST', '/applications/public', data);
  }

  async deleteApplication(uuid: string, options?: unknown) {
    return this.request('DELETE', `/applications/${uuid}`, options);
  }

  async startApplication(uuid: string) {
    return this.request('POST', `/applications/${uuid}/start`);
  }

  async stopApplication(uuid: string) {
    return this.request('POST', `/applications/${uuid}/stop`);
  }

  async restartApplication(uuid: string) {
    return this.request('POST', `/applications/${uuid}/restart`);
  }

  async getApplicationLogs(uuid: string, lines: number = 100) {
    return this.request('GET', `/applications/${uuid}/logs?lines=${lines}`);
  }

  // Database Methods
  async listDatabases() {
    return this.request('GET', '/databases');
  }

  async getDatabase(uuid: string) {
    return this.request('GET', `/databases/${uuid}`);
  }

  async createPostgresDatabase(data: unknown) {
    return this.request('POST', '/databases/postgresql', data);
  }

  async deleteDatabase(uuid: string) {
    return this.request('DELETE', `/databases/${uuid}`);
  }

  async startDatabase(uuid: string) {
    return this.request('POST', `/databases/${uuid}/start`);
  }

  // Deployment Methods
  async listDeployments() {
    return this.request('GET', '/deployments');
  }

  async getDeployment(uuid: string) {
    return this.request('GET', `/deployments/${uuid}`);
  }

  async deploy(uuid: string, force: boolean = false) {
    return this.request('GET', `/deploy?uuid=${uuid}&force=${force}`);
  }

  // Server Methods
  async listServers() {
    return this.request('GET', '/servers');
  }

  async getServer(uuid: string) {
    return this.request('GET', `/servers/${uuid}`);
  }

  async createServer(data: unknown) {
    return this.request('POST', '/servers', data);
  }

  // Team Methods
  async getCurrentTeam() {
    return this.request('GET', '/teams/current');
  }

  async listTeams() {
    return this.request('GET', '/teams');
  }

  // Project Methods
  async listProjects() {
    return this.request('GET', '/projects');
  }

  async createProject(data: unknown) {
    return this.request('POST', '/projects', data);
  }

  // Cloud Token Methods
  async listCloudTokens() {
    return this.request('GET', '/cloud-tokens');
  }

  async validateCloudToken(uuid: string) {
    return this.request('POST', `/cloud-tokens/${uuid}/validate`);
  }
}

export default CoolifyClient;
```

### 2. MCP Tools Definition

```typescript
// src/tools/applicationTools.ts

import { Tool } from '@modelcontextprotocol/sdk/types.js';

export const applicationTools: Tool[] = [
  {
    name: 'list_applications',
    description: 'List all deployed applications',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'get_application',
    description: 'Get details of a specific application',
    inputSchema: {
      type: 'object',
      properties: {
        uuid: {
          type: 'string',
          description: 'Application UUID',
        },
      },
      required: ['uuid'],
    },
  },
  {
    name: 'create_application',
    description: 'Deploy a new application from public repository',
    inputSchema: {
      type: 'object',
      properties: {
        project_uuid: { type: 'string', description: 'Project UUID' },
        server_uuid: { type: 'string', description: 'Server UUID' },
        environment_uuid: { type: 'string', description: 'Environment UUID' },
        git_repository: { type: 'string', description: 'Git repository URL' },
        git_branch: { type: 'string', description: 'Git branch to deploy' },
        build_pack: { 
          type: 'string', 
          enum: ['nixpacks', 'static', 'dockerfile', 'dockercompose'],
          description: 'Build pack type'
        },
        name: { type: 'string', description: 'Application name' },
        ports_exposes: { type: 'string', description: 'Exposed ports' },
        domains: { type: 'string', description: 'Domain URLs (comma-separated)' },
      },
      required: [
        'project_uuid',
        'server_uuid',
        'environment_uuid',
        'git_repository',
        'git_branch',
        'build_pack',
        'name',
        'ports_exposes',
      ],
    },
  },
  {
    name: 'deploy_application',
    description: 'Start deployment of an application',
    inputSchema: {
      type: 'object',
      properties: {
        uuid: { type: 'string', description: 'Application UUID' },
        force: { type: 'boolean', description: 'Force rebuild without cache', default: false },
      },
      required: ['uuid'],
    },
  },
  {
    name: 'stop_application',
    description: 'Stop a running application',
    inputSchema: {
      type: 'object',
      properties: {
        uuid: { type: 'string', description: 'Application UUID' },
      },
      required: ['uuid'],
    },
  },
  {
    name: 'restart_application',
    description: 'Restart an application',
    inputSchema: {
      type: 'object',
      properties: {
        uuid: { type: 'string', description: 'Application UUID' },
      },
      required: ['uuid'],
    },
  },
  {
    name: 'get_application_logs',
    description: 'Get logs from an application',
    inputSchema: {
      type: 'object',
      properties: {
        uuid: { type: 'string', description: 'Application UUID' },
        lines: { type: 'integer', description: 'Number of log lines', default: 100 },
      },
      required: ['uuid'],
    },
  },
  {
    name: 'delete_application',
    description: 'Delete an application',
    inputSchema: {
      type: 'object',
      properties: {
        uuid: { type: 'string', description: 'Application UUID' },
        delete_configurations: { type: 'boolean', default: true },
        delete_volumes: { type: 'boolean', default: true },
      },
      required: ['uuid'],
    },
  },
];
```

### 3. MCP Tool Handlers

```typescript
// src/handlers/applications.ts

import CoolifyClient from '../client/coolifyClient.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

export class ApplicationHandler {
  constructor(private client: CoolifyClient) {}

  async listApplications() {
    try {
      const response = await this.client.listApplications();
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to list applications: ${error}`
      );
    }
  }

  async getApplication(uuid: string) {
    try {
      const response = await this.client.getApplication(uuid);
      return {
        content: [
          {
            type: 'text',
            text: JSON.stringify(response.data, null, 2),
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get application: ${error}`
      );
    }
  }

  async createApplication(data: unknown) {
    try {
      const response = await this.client.createApplication(data);
      return {
        content: [
          {
            type: 'text',
            text: `Application created successfully. UUID: ${response.data.uuid}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to create application: ${error}`
      );
    }
  }

  async deployApplication(uuid: string, force: boolean = false) {
    try {
      const response = await this.client.startApplication(uuid);
      return {
        content: [
          {
            type: 'text',
            text: `Deployment started. ${response.data.message}`,
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to deploy application: ${error}`
      );
    }
  }

  async getApplicationLogs(uuid: string, lines: number = 100) {
    try {
      const response = await this.client.getApplicationLogs(uuid, lines);
      return {
        content: [
          {
            type: 'text',
            text: response.data.logs || 'No logs available',
          },
        ],
      };
    } catch (error) {
      throw new McpError(
        ErrorCode.InternalError,
        `Failed to get application logs: ${error}`
      );
    }
  }
}
```

### 4. MCP Server Initialization

```typescript
// src/index.ts

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from '@modelcontextprotocol/sdk/types.js';
import CoolifyClient from './client/coolifyClient.js';
import { ApplicationHandler } from './handlers/applications.js';
import { applicationTools } from './tools/applicationTools.js';

// Load environment variables
const COOLIFY_URL = process.env.COOLIFY_URL || '';
const COOLIFY_TOKEN = process.env.COOLIFY_TOKEN || '';

if (!COOLIFY_URL || !COOLIFY_TOKEN) {
  throw new Error('Missing COOLIFY_URL or COOLIFY_TOKEN environment variables');
}

// Initialize clients
const coolifyClient = new CoolifyClient({
  baseUrl: COOLIFY_URL,
  apiToken: COOLIFY_TOKEN,
});

const applicationHandler = new ApplicationHandler(coolifyClient);

// Initialize MCP server
const server = new Server(
  {
    name: 'coolify-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Register tool list endpoint
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      ...applicationTools,
      // Add other tool groups here
    ] as Tool[],
  };
});

// Register tool call handler
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request;

  switch (name) {
    // Application tools
    case 'list_applications':
      return applicationHandler.listApplications();
    case 'get_application':
      return applicationHandler.getApplication(args.uuid as string);
    case 'create_application':
      return applicationHandler.createApplication(args);
    case 'deploy_application':
      return applicationHandler.deployApplication(
        args.uuid as string,
        args.force as boolean
      );
    case 'get_application_logs':
      return applicationHandler.getApplicationLogs(
        args.uuid as string,
        args.lines as number
      );
    case 'stop_application':
      return applicationHandler.stopApplication(args.uuid as string);
    case 'restart_application':
      return applicationHandler.restartApplication(args.uuid as string);
    case 'delete_application':
      return applicationHandler.deleteApplication(
        args.uuid as string,
        args
      );

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Connect to stdio transport
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Coolify MCP server started');
}

main();
```

---

## Configuration

### Environment Variables

```bash
# .env
COOLIFY_URL=https://coolify.example.com/api/v1
COOLIFY_TOKEN=your-api-token-here
NODE_ENV=production
LOG_LEVEL=info
```

### Package.json

```json
{
  "name": "coolify-mcp-server",
  "version": "1.0.0",
  "description": "Model Context Protocol server for Coolify",
  "type": "module",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsc && node dist/index.js",
    "watch": "tsc --watch"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^0.5.0"
  },
  "devDependencies": {
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0"
  }
}
```

---

## MCP Tool Categories

### 1. Application Management Tools

- `list_applications` - List all applications
- `get_application` - Get application details
- `create_application` - Deploy new application
- `deploy_application` - Start deployment
- `stop_application` - Stop application
- `restart_application` - Restart application
- `delete_application` - Delete application
- `get_application_logs` - View application logs
- `set_env_variables` - Update environment variables
- `get_env_variables` - List environment variables

### 2. Database Management Tools

- `list_databases` - List all databases
- `get_database` - Get database details
- `create_database` - Create new database
- `delete_database` - Delete database
- `start_database` - Start database
- `stop_database` - Stop database
- `restart_database` - Restart database
- `create_backup` - Create database backup
- `list_backups` - List backup configurations
- `restore_backup` - Restore from backup

### 3. Deployment Tools

- `list_deployments` - List deployments
- `get_deployment` - Get deployment details
- `cancel_deployment` - Cancel running deployment
- `deploy_by_uuid` - Deploy specific resource
- `list_app_deployments` - List application deployments

### 4. Server Management Tools

- `list_servers` - List all servers
- `get_server` - Get server details
- `create_server` - Add new server
- `delete_server` - Remove server
- `validate_server` - Validate server connection
- `get_server_resources` - Get server resources

### 5. Service Management Tools

- `list_services` - List all services
- `get_service` - Get service details
- `create_service` - Create one-click/custom service
- `delete_service` - Delete service
- `start_service` - Start service
- `stop_service` - Stop service
- `restart_service` - Restart service

### 6. Project Management Tools

- `list_projects` - List all projects
- `create_project` - Create new project
- `get_project` - Get project details
- `delete_project` - Delete project
- `list_environments` - List project environments
- `create_environment` - Create project environment

---

## Error Handling Strategy

```typescript
// Error codes mapping
const ErrorCodeMap = {
  INVALID_TOKEN: {
    code: 'INVALID_TOKEN',
    message: 'Invalid or expired API token',
    statusCode: 401,
  },
  NOT_FOUND: {
    code: 'NOT_FOUND',
    message: 'Resource not found',
    statusCode: 404,
  },
  VALIDATION_ERROR: {
    code: 'VALIDATION_ERROR',
    message: 'Validation error in request',
    statusCode: 422,
  },
  RATE_LIMIT: {
    code: 'RATE_LIMIT',
    message: 'Rate limit exceeded',
    statusCode: 429,
  },
  INTERNAL_ERROR: {
    code: 'INTERNAL_ERROR',
    message: 'Internal server error',
    statusCode: 500,
  },
};
```

---

## Common Workflow Examples

### Example 1: Deploy Application from GitHub

```
User: "Deploy the main branch of my-repo to production using nixpacks"

Steps:
1. create_application({
     project_uuid: "...",
     server_uuid: "...",
     environment_uuid: "...",
     git_repository: "https://github.com/user/my-repo",
     git_branch: "main",
     build_pack: "nixpacks",
     name: "my-repo",
     ports_exposes: "3000"
   })
2. deploy_application(returned_uuid)
3. get_application_logs(returned_uuid)
```

### Example 2: Create PostgreSQL Database with Backup

```
User: "Create a PostgreSQL database and set up daily backups"

Steps:
1. create_database({
     server_uuid: "...",
     project_uuid: "...",
     environment_uuid: "...",
     name: "mydb"
   })
2. create_backup({
     frequency: "daily",
     retention_days: 30
   })
3. start_database(uuid)
```

### Example 3: Monitor Deployments

```
User: "Show me the deployment status of app-uuid and last 50 logs"

Steps:
1. get_deployment(deployment_uuid)
2. get_application_logs(app_uuid, 50)
```

---

## Testing

### Unit Test Example

```typescript
// test/applications.test.ts

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ApplicationHandler } from '../src/handlers/applications';
import CoolifyClient from '../src/client/coolifyClient';

describe('ApplicationHandler', () => {
  let handler: ApplicationHandler;
  let mockClient: any;

  beforeEach(() => {
    mockClient = {
      listApplications: vi.fn(),
      getApplication: vi.fn(),
      createApplication: vi.fn(),
    };
    handler = new ApplicationHandler(mockClient);
  });

  it('should list applications', async () => {
    mockClient.listApplications.mockResolvedValue({
      data: [{ uuid: 'test-uuid', name: 'test-app' }],
    });

    const result = await handler.listApplications();
    expect(result.content[0].type).toBe('text');
  });

  it('should handle errors gracefully', async () => {
    mockClient.listApplications.mockRejectedValue(new Error('API Error'));
    
    expect(async () => {
      await handler.listApplications();
    }).rejects.toThrow();
  });
});
```

---

## Deployment

### Using Claude Desktop

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "coolify": {
      "command": "node",
      "args": ["/path/to/coolify-mcp-server/dist/index.js"],
      "env": {
        "COOLIFY_URL": "https://your-coolify-instance/api/v1",
        "COOLIFY_TOKEN": "your-api-token"
      }
    }
  }
}
```

### Docker Deployment

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

ENV NODE_ENV=production
CMD ["npm", "start"]
```

---

## Security Best Practices

1. **Token Management**
   - Never commit tokens to version control
   - Use environment variables
   - Rotate tokens regularly

2. **HTTPS Only**
   - Always use HTTPS for API connections
   - Validate SSL certificates

3. **Input Validation**
   - Validate all user inputs
   - Sanitize inputs before sending to API

4. **Rate Limiting**
   - Implement client-side rate limiting
   - Handle 429 responses gracefully
   - Implement exponential backoff

5. **Error Handling**
   - Don't expose sensitive information in errors
   - Log securely without token exposure
   - Implement proper error recovery

6. **Access Control**
   - Implement tool-level access control
   - Audit API usage
   - Monitor for suspicious activity

---

## Performance Optimization

1. **Caching**
   ```typescript
   class CachedCoolifyClient extends CoolifyClient {
     private cache = new Map();
     
     async getApplication(uuid: string) {
       const cached = this.cache.get(`app-${uuid}`);
       if (cached && !this.isExpired(cached)) {
         return cached.data;
       }
       // ... fetch and cache
     }
   }
   ```

2. **Batch Operations**
   ```typescript
   async deployMultiple(uuids: string[]) {
     return Promise.all(
       uuids.map(uuid => this.deployApplication(uuid))
     );
   }
   ```

3. **Connection Pooling**
   - Reuse HTTP connections
   - Configure keep-alive settings

---

## Troubleshooting

### Common Issues

**Issue: 401 Unauthorized**
- Solution: Verify API token is valid and not expired

**Issue: 404 Not Found**
- Solution: Check resource UUID exists and project/environment are correct

**Issue: 429 Rate Limited**
- Solution: Implement backoff strategy and reduce request frequency

**Issue: Timeout**
- Solution: Increase timeout, check network connectivity

---

## Future Enhancements

1. Resource subscriptions for real-time updates
2. Webhook support for deployment hooks
3. Advanced filtering and search capabilities
4. Batch operations optimization
5. GraphQL support if available
6. Database query results integration
7. Advanced log streaming
8. Performance metrics and analytics

---

## References

- [MCP SDK Documentation](https://modelcontextprotocol.io)
- [Coolify API Reference](https://coolify.io/docs)
- [OpenAPI Specification](https://github.com/coollabsio/coolify/blob/v4.x/openapi.json)

