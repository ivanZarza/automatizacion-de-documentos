#!/usr/bin/env node

/**
 * CLI for testing Coolify MCP Server
 * Usage: npm run cli -- [command] [options]
 */

import { CoolifyClient } from './client.js';

const COOLIFY_API_URL = process.env.COOLIFY_API_URL || 'http://localhost:8000';
const COOLIFY_API_TOKEN = process.env.COOLIFY_API_TOKEN || '';

const command = process.argv[2] || 'help';

// No require token for help command
if (command === 'help') {
  showHelp();
  process.exit(0);
}

if (!COOLIFY_API_TOKEN) {
  console.error('Error: COOLIFY_API_TOKEN environment variable is required');
  process.exit(1);
}

const client = new CoolifyClient({
  baseUrl: COOLIFY_API_URL,
  apiToken: COOLIFY_API_TOKEN,
});

function showHelp() {
  console.log(`
Coolify MCP Server CLI

Usage: npm run cli -- [command] [options]

Commands:
  list-apps           List all applications
  get-app <id>        Get specific application by ID
  list-dbs            List all databases
  list-servers        List all servers
  list-services       List all services
  create-project      Create a new project
  health              Check API health status
  version             Get Coolify version
  help                Show this help message

Examples:
  npm run cli -- list-apps
  npm run cli -- get-app app-123
  npm run cli -- create-project "My Project" "Optional description"
  npm run cli -- health

Environment Variables:
  COOLIFY_API_URL     Coolify base URL (default: http://localhost:8000)
  COOLIFY_API_TOKEN   Your Coolify API token (required)
  `);
}

async function main() {
  const arg = process.argv[3];

  try {
    switch (command) {
      case 'list-apps':
        console.log('📦 Fetching applications...\n');
        const apps = await client.getApplications();
        console.log(JSON.stringify(apps, null, 2));
        break;

      case 'get-app':
        if (!arg) {
          console.error('Error: app ID required');
          process.exit(1);
        }
        console.log(`📦 Fetching application: ${arg}\n`);
        const app = await client.getApplication(arg);
        console.log(JSON.stringify(app, null, 2));
        break;

      case 'list-dbs':
        console.log('🗄️  Fetching databases...\n');
        const dbs = await client.getDatabases();
        console.log(JSON.stringify(dbs, null, 2));
        break;

      case 'list-servers':
        console.log('🖥️  Fetching servers...\n');
        const servers = await client.getServers();
        console.log(JSON.stringify(servers, null, 2));
        break;

      case 'list-services':
        console.log('⚙️  Fetching services...\n');
        const services = await client.getServices();
        console.log(JSON.stringify(services, null, 2));
        break;

      case 'create-project':
        if (!arg) {
          console.error('Error: project name required');
          process.exit(1);
        }
        const description = process.argv[4] || '';
        console.log(`📁 Creating project: "${arg}"\n`);
        const newProject = await client.createProject(arg, description);
        console.log(JSON.stringify(newProject, null, 2));
        console.log('\n✅ Project created successfully!');
        break;

      case 'health':
        console.log('🏥 Checking API health...\n');
        const health = await client.getHealth();
        console.log(JSON.stringify(health, null, 2));
        break;

      case 'version':
        console.log('📌 Checking Coolify version...\n');
        const version = await client.getVersion();
        console.log(JSON.stringify(version, null, 2));
        break;

      default:
        console.error(`Unknown command: ${command}`);
        showHelp();
        process.exit(1);
    }
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
