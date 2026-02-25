#!/usr/bin/env node

import {
  Server,
} from '@modelcontextprotocol/sdk/server/index.js';
import {
  StdioServerTransport,
} from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  TextContent,
} from '@modelcontextprotocol/sdk/types.js';
import { CoolifyClient } from './client.js';

// Configuration
const COOLIFY_API_URL = process.env.COOLIFY_API_URL || 'http://localhost:8000';
const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN || '';

if (!COOLIFY_API_TOKEN) {
  console.error('Error: COOLIFY_API_TOKEN is required');
  process.exit(1);
}

const client = new CoolifyClient({
  baseUrl: COOLIFY_API_URL,
  apiToken: COOLIFY_API_TOKEN,
});

// Define tools
const tools: any[] = [
  {
    name: 'list_applications',
    description: 'List all applications deployed in Coolify',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_application',
    description: 'Get details of a specific application',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Application ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'get_deployments',
    description: 'Get deployment history of an application',
    inputSchema: {
      type: 'object',
      properties: {
        appId: { type: 'string', description: 'Application ID' },
      },
      required: ['appId'],
    },
  },
  {
    name: 'list_databases',
    description: 'List all databases in Coolify',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_database',
    description: 'Get details of a specific database',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Database ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_servers',
    description: 'List all servers in Coolify',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_server',
    description: 'Get details of a specific server',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Server ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_services',
    description: 'List all services in Coolify',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_service',
    description: 'Get details of a specific service',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Service ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'list_projects',
    description: 'List all projects in Coolify',
    inputSchema: { type: 'object', properties: {} },
  },
  {
    name: 'get_project',
    description: 'Get details of a specific project',
    inputSchema: {
      type: 'object',
      properties: {
        id: { type: 'string', description: 'Project ID' },
      },
      required: ['id'],
    },
  },
  {
    name: 'create_project',
    description: 'Create a new project in Coolify',
    inputSchema: {
      type: 'object',
      properties: {
        name: { type: 'string', description: 'Project name' },
        description: { type: 'string', description: 'Project description (optional)' },
      },
      required: ['name'],
    },
  },
  {
    name: 'get_health',
    description: 'Check Coolify API health status',
    inputSchema: { type: 'object', properties: {} },
  },
];

// Execute tool handler
async function executeTool(
  toolName: string,
  toolInput: Record<string, string>
): Promise<string> {
  try {
    let result;

    switch (toolName) {
      case 'list_applications':
        result = await client.getApplications();
        break;
      case 'get_application':
        result = await client.getApplication(toolInput.id);
        break;
      case 'get_deployments':
        result = await client.getDeployments(toolInput.appId);
        break;
      case 'list_databases':
        result = await client.getDatabases();
        break;
      case 'get_database':
        result = await client.getDatabase(toolInput.id);
        break;
      case 'list_servers':
        result = await client.getServers();
        break;
      case 'get_server':
        result = await client.getServer(toolInput.id);
        break;
      case 'list_services':
        result = await client.getServices();
        break;
      case 'get_service':
        result = await client.getService(toolInput.id);
        break;
      case 'list_projects':
        result = await client.getProjects();
        break;
      case 'get_project':
        result = await client.getProject(toolInput.id);
        break;
      case 'create_project':
        result = await client.createProject(toolInput.name, toolInput.description);
        break;
      case 'get_health':
        result = await client.getHealth();
        break;
      default:
        throw new Error(`Unknown tool: ${toolName}`);
    }

    return JSON.stringify(result, null, 2);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : String(error);
    throw new Error(`Tool error: ${errorMsg}`);
  }
}

// Main server setup
async function main() {
  const server = new Server(
    {
      name: 'coolify-custom-mcp',
      version: '1.0.0',
    },
    {
      capabilities: {
        tools: {},
      },
    }
  );

  server.setRequestHandler(ListToolsRequestSchema, async (_request: any) => {
    return { tools };
  });

  server.setRequestHandler(CallToolRequestSchema, async (request: any) => {
    try {
      const toolName = request.params.name;
      const toolInput = (request.params.arguments || {}) as Record<string, string>;

      const result = await executeTool(toolName, toolInput);

      return {
        contents: [
          {
            type: 'text',
            text: result,
          } as TextContent,
        ],
      };
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : String(error);
      return {
        contents: [
          {
            type: 'text',
            text: errorMsg,
            isError: true,
          } as TextContent,
        ],
      };
    }
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error: any) => {
  console.error('Fatal error:', error);
  process.exit(1);
});

