# Coolify API Reference Guide

## Overview

Coolify is an open-source, self-hostable PaaS (Platform as a Service) alternative to Vercel, Heroku, and Netlify. The API allows you to programmatically manage servers, applications, databases, services, deployments, and more.

**API Version:** v0.1 (OpenAPI 3.1.0)

---

## Authentication

### Bearer Token Authentication

All API endpoints (except `/health`, `/version`, `/enable`, `/disable`) require authentication using Bearer tokens.

**Method:** HTTP Bearer Token (RFC 6750)

**How to Generate a Token:**
1. Navigate to `Keys & Tokens` → `API tokens` in Coolify settings
2. Create a new API token
3. Use the token as the Bearer token in all API requests

**Example Header:**
```
Authorization: Bearer YOUR_API_TOKEN_HERE
```

**Security Schemes:**
- `bearerAuth` - HTTP Bearer authentication using generated API tokens

---

## Base URL Format

```
https://<your-coolify-instance>/api/v1
```

**Example:**
```
https://app.coolify.io/api/v1
```

---

## API Endpoints

### Core Resource Categories

1. **Applications** - Deploy and manage applications
2. **Databases** - Create and manage databases
3. **Services** - One-click or custom services
4. **Deployments** - Manage application deployments
5. **Servers** - Server management and provisioning
6. **Projects** - Organize resources into projects
7. **Teams** - Team management and collaboration
8. **Cloud Tokens** - Cloud provider authentication (Hetzner, DigitalOcean)
9. **Private Keys** - SSH key management
10. **GitHub Apps** - GitHub integration
11. **Hetzner** - Hetzner Cloud resources
12. **Resources** - General resource listing

---

## Detailed API Endpoints

### Health & Status

#### Get API Health
```
GET /health
```
Returns: "OK" (plain text)

#### Get Coolify Version
```
GET /version
```
Returns: Version string (e.g., "v4.0.0")

#### Enable API
```
GET /enable
```
Requires: Root permissions only
Returns: `{ "message": "API enabled." }`

#### Disable API
```
GET /disable
```
Requires: Root permissions only
Returns: `{ "message": "API disabled." }`

---

### Applications

#### List Applications
```
GET /applications
Authorization: Bearer <token>
```

#### Create Application - Public Repository
```
POST /applications/public
Authorization: Bearer <token>

Request Body:
{
  "project_uuid": "string",
  "server_uuid": "string",
  "environment_name": "string (optional if environment_uuid provided)",
  "environment_uuid": "string (optional if environment_name provided)",
  "git_repository": "string",
  "git_branch": "string",
  "build_pack": "nixpacks | static | dockerfile | dockercompose",
  "ports_exposes": "string",
  "name": "string",
  "description": "string",
  "domains": "string (comma-separated URLs)",
  "instant_deploy": "boolean"
}
```

#### Create Application - Private GitHub App
```
POST /applications/private-github-app
Authorization: Bearer <token>

Request Body:
{
  "project_uuid": "string",
  "server_uuid": "string",
  "environment_name": "string OR environment_uuid",
  "environment_uuid": "string OR environment_name",
  "github_app_uuid": "string",
  "git_repository": "string",
  "git_branch": "string",
  "build_pack": "string",
  "ports_exposes": "string"
}
```

#### Create Application - Private Deploy Key
```
POST /applications/private-deploy-key
Authorization: Bearer <token>
```

#### Create Application - Dockerfile
```
POST /applications/dockerfile
Authorization: Bearer <token>

Request Body:
{
  "project_uuid": "string",
  "server_uuid": "string",
  "environment_name": "string OR environment_uuid",
  "dockerfile": "string",
  "build_pack": "string",
  "ports_exposes": "string"
}
```

#### Create Application - Docker Image
```
POST /applications/dockerimage
Authorization: Bearer <token>

Request Body:
{
  "docker_registry_image_name": "string",
  "docker_registry_image_tag": "string",
  "ports_exposes": "string"
}
```

#### Create Application - Docker Compose (Deprecated)
```
POST /applications/dockercompose
Authorization: Bearer <token>
(Use POST /services instead)
```

#### Get Application
```
GET /applications/{uuid}
Authorization: Bearer <token>
```
Returns: Application object with full details

#### Update Application
```
PATCH /applications/{uuid}
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string",
  "domains": "string",
  "git_branch": "string",
  "ports_exposes": "string",
  "build_pack": "string",
  "health_check_enabled": "boolean",
  "health_check_path": "string",
  "limits_memory": "string",
  "limits_cpus": "string"
}
```

#### Delete Application
```
DELETE /applications/{uuid}?delete_configurations=true&delete_volumes=true&docker_cleanup=true&delete_connected_networks=true
Authorization: Bearer <token>
```

#### Get Application Logs
```
GET /applications/{uuid}/logs?lines=100
Authorization: Bearer <token>
```
Returns: `{ "logs": "string" }`

#### List Environment Variables
```
GET /applications/{uuid}/envs
Authorization: Bearer <token>
```

#### Create Environment Variable
```
POST /applications/{uuid}/envs
Authorization: Bearer <token>

Request Body:
{
  "key": "string",
  "value": "string",
  "is_preview": "boolean",
  "is_literal": "boolean",
  "is_multiline": "boolean"
}
```

#### Update Environment Variable
```
PATCH /applications/{uuid}/envs
Authorization: Bearer <token>

Request Body:
{
  "key": "string",
  "value": "string",
  "is_preview": "boolean",
  "is_literal": "boolean",
  "is_multiline": "boolean"
}
```

#### Update Environment Variables (Bulk)
```
PATCH /applications/{uuid}/envs/bulk
Authorization: Bearer <token>

Request Body: Array of env variables
```

#### Delete Environment Variable
```
DELETE /applications/{uuid}/envs/{env_uuid}
Authorization: Bearer <token>
```

#### Start Application (Deploy)
```
GET /applications/{uuid}/start?force=false&instant_deploy=false
POST /applications/{uuid}/start
Authorization: Bearer <token>
```
Returns: `{ "message": "Deployment request queued.", "deployment_uuid": "string" }`

#### Stop Application
```
GET /applications/{uuid}/stop
POST /applications/{uuid}/stop
Authorization: Bearer <token>
```

#### Restart Application
```
GET /applications/{uuid}/restart
POST /applications/{uuid}/restart
Authorization: Bearer <token>
```

---

### Databases

#### List Databases
```
GET /databases
Authorization: Bearer <token>
```

#### Get Database
```
GET /databases/{uuid}
Authorization: Bearer <token>
```

#### Create PostgreSQL Database
```
POST /databases/postgresql
Authorization: Bearer <token>

Request Body:
{
  "server_uuid": "string (required)",
  "project_uuid": "string (required)",
  "environment_name": "string (optional if environment_uuid)",
  "environment_uuid": "string (optional if environment_name)",
  "name": "string",
  "description": "string",
  "image": "string",
  "is_public": "boolean",
  "public_port": "integer",
  "limits_memory": "string",
  "limits_cpus": "string",
  "instant_deploy": "boolean"
}
```

#### Create MySQL Database
```
POST /databases/mysql
Authorization: Bearer <token>
```

#### Create MariaDB Database
```
POST /databases/mariadb
Authorization: Bearer <token>
```

#### Create MongoDB Database
```
POST /databases/mongodb
Authorization: Bearer <token>
```

#### Create Redis Database
```
POST /databases/redis
Authorization: Bearer <token>
```

#### Create ClickHouse Database
```
POST /databases/clickhouse
Authorization: Bearer <token>
```

#### Create DragonFly Database
```
POST /databases/dragonfly
Authorization: Bearer <token>
```

#### Create KeyDB Database
```
POST /databases/keydb
Authorization: Bearer <token>
```

#### Update Database
```
PATCH /databases/{uuid}
Authorization: Bearer <token>
```

#### Delete Database
```
DELETE /databases/{uuid}
Authorization: Bearer <token>
```

#### Get Database Backups
```
GET /databases/{uuid}/backups
Authorization: Bearer <token>
```

#### Get Backup Executions
```
GET /databases/{uuid}/backups/{scheduled_backup_uuid}/executions
Authorization: Bearer <token>
```

#### Create Backup
```
POST /databases/{uuid}/backups
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string",
  "frequency": "string",
  "retention_days": "integer"
}
```

#### Update Backup Configuration
```
PATCH /databases/{uuid}/backups/{scheduled_backup_uuid}
Authorization: Bearer <token>
```

#### Delete Backup Configuration
```
DELETE /databases/{uuid}/backups/{scheduled_backup_uuid}?delete_s3=false
Authorization: Bearer <token>
```

#### Delete Backup Execution
```
DELETE /databases/{uuid}/backups/{scheduled_backup_uuid}/executions/{execution_uuid}
Authorization: Bearer <token>
```

#### Start Database
```
GET /databases/{uuid}/start
POST /databases/{uuid}/start
Authorization: Bearer <token>
```

#### Restart Database
```
GET /databases/{uuid}/restart
POST /databases/{uuid}/restart
Authorization: Bearer <token>
```

#### Stop Database
```
GET /databases/{uuid}/stop
POST /databases/{uuid}/stop
Authorization: Bearer <token>
```

---

### Services (One-Click & Custom)

#### List Services
```
GET /services
Authorization: Bearer <token>
```

#### Create Service
```
POST /services
Authorization: Bearer <token>

Request Body:
{
  "type": "string (e.g., 'actualbudget', 'calibre-web', 'gitea-with-mysql')",
  "name": "string",
  "description": "string",
  "server_uuid": "string (required)",
  "project_uuid": "string (required)",
  "environment_name": "string",
  "environment_uuid": "string",
  "ports_exposes": "string",
  "domains": "string",
  "instant_deploy": "boolean"
}
```

#### Get Service
```
GET /services/{uuid}
Authorization: Bearer <token>
```

#### Update Service
```
PATCH /services/{uuid}
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string",
  "ports_exposes": "string",
  "domains": "string"
}
```

#### Delete Service
```
DELETE /services/{uuid}?delete_configurations=true&delete_volumes=true&docker_cleanup=true&delete_connected_networks=true
Authorization: Bearer <token>
```

#### List Service Environment Variables
```
GET /services/{uuid}/envs
Authorization: Bearer <token>
```

#### Create Service Environment Variable
```
POST /services/{uuid}/envs
Authorization: Bearer <token>

Request Body:
{
  "key": "string",
  "value": "string"
}
```

#### Update Service Environment Variable
```
PATCH /services/{uuid}/envs
Authorization: Bearer <token>
```

#### Update Multiple Service Environment Variables
```
PATCH /services/{uuid}/envs/bulk
Authorization: Bearer <token>
```

#### Delete Service Environment Variable
```
DELETE /services/{uuid}/envs/{env_uuid}
Authorization: Bearer <token>
```

#### Start Service
```
GET /services/{uuid}/start
POST /services/{uuid}/start
Authorization: Bearer <token>
```

#### Stop Service
```
GET /services/{uuid}/stop
POST /services/{uuid}/stop
Authorization: Bearer <token>
```

#### Restart Service
```
GET /services/{uuid}/restart
POST /services/{uuid}/restart
Authorization: Bearer <token>
```

---

### Deployments

#### List Deployments
```
GET /deployments
Authorization: Bearer <token>
```

#### Get Deployment
```
GET /deployments/{uuid}
Authorization: Bearer <token>
```

#### Cancel Deployment
```
POST /deployments/{uuid}/cancel
Authorization: Bearer <token>
```

#### List Application Deployments
```
GET /deployments/applications/{uuid}?skip=0&take=10
Authorization: Bearer <token>
```

#### Deploy by UUID or Tag
```
GET /deploy?uuid=string&tag=string&force=false&pr=integer
POST /deploy
Authorization: Bearer <token>

Request Body:
{
  "uuid": "string",
  "tag": "string",
  "force": "boolean",
  "pr": "integer"
}
```

---

### Projects

#### List Projects
```
GET /projects
Authorization: Bearer <token>
```

#### Create Project
```
POST /projects
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string"
}
```

#### Get Project
```
GET /projects/{uuid}
Authorization: Bearer <token>
```

#### Update Project
```
PATCH /projects/{uuid}
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string"
}
```

#### Delete Project
```
DELETE /projects/{uuid}
Authorization: Bearer <token>
```

#### List Environments
```
GET /projects/{uuid}/environments
Authorization: Bearer <token>
```

#### Get Environment by Name or UUID
```
GET /projects/{uuid}/{environment_name_or_uuid}
Authorization: Bearer <token>
```

#### Create Environment
```
POST /projects/{uuid}/environments
Authorization: Bearer <token>

Request Body:
{
  "name": "string"
}
```

#### Delete Environment
```
DELETE /projects/{uuid}/environments/{environment_name_or_uuid}
Authorization: Bearer <token>
```

---

### Servers

#### List Servers
```
GET /servers
Authorization: Bearer <token>
```

#### Get Server
```
GET /servers/{uuid}
Authorization: Bearer <token>
```

#### Create Server
```
POST /servers
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string",
  "ip": "string (IPv4 address)",
  "port": "integer (SSH port, default 22)",
  "user": "string (SSH user)"
}
```

#### Update Server
```
PATCH /servers/{uuid}
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string"
}
```

#### Delete Server
```
DELETE /servers/{uuid}
Authorization: Bearer <token>
```

#### Validate Server
```
GET /servers/{uuid}/validate
Authorization: Bearer <token>
```
Returns: `{ "message": "Validation started." }`

#### Get Server Resources
```
GET /servers/{uuid}/resources
Authorization: Bearer <token>
```

#### Get Server Domains
```
GET /servers/{uuid}/domains
Authorization: Bearer <token>
```

---

### Hetzner Cloud Integration

#### Get Hetzner Locations
```
GET /hetzner/locations?cloud_provider_token_uuid=string
Authorization: Bearer <token>
```

Returns: Array of available Hetzner datacenter locations

#### Get Hetzner Server Types
```
GET /hetzner/server-types?cloud_provider_token_uuid=string
Authorization: Bearer <token>
```

Returns: Available Hetzner server instance types with pricing

#### Get Hetzner Images
```
GET /hetzner/images?cloud_provider_token_uuid=string
Authorization: Bearer <token>
```

Returns: Available Hetzner operating system images

#### Get Hetzner SSH Keys
```
GET /hetzner/ssh-keys?cloud_provider_token_uuid=string
Authorization: Bearer <token>
```

Returns: All SSH keys from Hetzner Cloud account

#### Create Hetzner Server
```
POST /servers/hetzner
Authorization: Bearer <token>

Request Body:
{
  "cloud_provider_token_uuid": "string",
  "location": "string (e.g., 'nbg1')",
  "server_type": "string (e.g., 'cx11')",
  "image": "integer",
  "private_key_uuid": "string"
}
```

---

### Cloud Tokens (Provider Authentication)

#### List Cloud Provider Tokens
```
GET /cloud-tokens
Authorization: Bearer <token>
```

#### Create Cloud Provider Token
```
POST /cloud-tokens
Authorization: Bearer <token>

Request Body:
{
  "provider": "hetzner | digitalocean",
  "token": "string (API token)",
  "name": "string"
}
```

#### Get Cloud Provider Token
```
GET /cloud-tokens/{uuid}
Authorization: Bearer <token>
```

#### Update Cloud Provider Token
```
PATCH /cloud-tokens/{uuid}
Authorization: Bearer <token>

Request Body:
{
  "name": "string"
}
```

#### Delete Cloud Provider Token
```
DELETE /cloud-tokens/{uuid}
Authorization: Bearer <token>
```

#### Validate Cloud Provider Token
```
POST /cloud-tokens/{uuid}/validate
Authorization: Bearer <token>
```

Returns: `{ "valid": boolean, "message": "string" }`

---

### Private Keys (SSH)

#### List Private Keys
```
GET /security/keys
Authorization: Bearer <token>
```

#### Create Private Key
```
POST /security/keys
Authorization: Bearer <token>

Request Body:
{
  "name": "string (optional)",
  "description": "string (optional)",
  "private_key": "string (required)"
}
```

#### Get Private Key
```
GET /security/keys/{uuid}
Authorization: Bearer <token>
```

#### Update Private Key
```
PATCH /security/keys/{uuid}
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "description": "string",
  "private_key": "string"
}
```

#### Delete Private Key
```
DELETE /security/keys/{uuid}
Authorization: Bearer <token>
```

---

### GitHub Apps

#### List GitHub Apps
```
GET /github-apps
Authorization: Bearer <token>
```

#### Create GitHub App
```
POST /github-apps
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "organization": "string (optional)",
  "api_url": "string",
  "html_url": "string",
  "custom_user": "string",
  "custom_port": "integer",
  "app_id": "integer",
  "installation_id": "integer",
  "client_id": "string",
  "client_secret": "string",
  "webhook_secret": "string",
  "private_key_uuid": "string",
  "is_system_wide": "boolean"
}
```

#### Update GitHub App
```
PATCH /github-apps/{github_app_id}
Authorization: Bearer <token>

Request Body:
{
  "name": "string",
  "organization": "string",
  "api_url": "string",
  "html_url": "string",
  "custom_user": "string",
  "custom_port": "integer",
  "app_id": "integer",
  "installation_id": "integer",
  "client_id": "string",
  "client_secret": "string",
  "webhook_secret": "string",
  "private_key_uuid": "string",
  "is_system_wide": "boolean"
}
```

#### Delete GitHub App
```
DELETE /github-apps/{github_app_id}
Authorization: Bearer <token>
```

#### List GitHub Repositories
```
GET /github-apps/{github_app_id}/repositories
Authorization: Bearer <token>
```

#### Load GitHub Branches
```
GET /github-apps/{github_app_id}/repositories/{owner}/{repo}/branches
Authorization: Bearer <token>
```

---

### Teams

#### List Teams
```
GET /teams
Authorization: Bearer <token>
```

#### Get Team
```
GET /teams/{id}
Authorization: Bearer <token>
```

#### Get Team Members
```
GET /teams/{id}/members
Authorization: Bearer <token>
```

#### Get Current Authenticated Team
```
GET /teams/current
Authorization: Bearer <token>
```

#### Get Current Team Members
```
GET /teams/current/members
Authorization: Bearer <token>
```

---

### Resources

#### List All Resources
```
GET /resources
Authorization: Bearer <token>
```

---

## Response Formats

### Successful Response (2xx)

#### Standard Success (200 OK)
```json
{
  "message": "Operation completed successfully",
  "data": {}
}
```

#### Created (201)
```json
{
  "uuid": "resource-uuid",
  "message": "Resource created successfully"
}
```

### Error Responses

#### 400 Bad Request
```json
{
  "message": "Invalid token."
}
```

#### 401 Unauthorized
```json
{
  "message": "Unauthenticated."
}
```

#### 404 Not Found
```json
{
  "message": "Resource not found."
}
```

#### 409 Conflict (Domain Conflicts)
```json
{
  "message": "Domain conflicts detected. Use force_domain_override=true to proceed.",
  "warning": "Using the same domain for multiple resources can cause routing conflicts and unpredictable behavior.",
  "conflicts": [
    {
      "domain": "example.com",
      "resource_name": "My Application",
      "resource_uuid": "abc123-def456",
      "resource_type": "application",
      "message": "Domain example.com is already in use by application 'My Application'"
    }
  ]
}
```

#### 422 Unprocessable Entity (Validation Error)
```json
{
  "message": "Validation error.",
  "errors": {
    "field_name": [
      "The field was invalid.",
      "Error message 2"
    ]
  }
}
```

#### 429 Too Many Requests (Rate Limit)
```json
{
  "message": "Rate limit exceeded. Please try again later."
}
```

Response header includes: `Retry-After: 60` (seconds to wait)

---

## Common Data Models

### Application Object
```json
{
  "id": 1,
  "uuid": "app-uuid-string",
  "name": "My Application",
  "description": "Application description",
  "fqdn": "app.example.com",
  "config_hash": "hash-string",
  "git_repository": "https://github.com/user/repo",
  "git_branch": "main",
  "git_commit_sha": "commit-hash",
  "build_pack": "nixpacks",
  "ports_exposes": "3000",
  "domains": "app.example.com",
  "status": "running",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Database Object
```json
{
  "uuid": "db-uuid-string",
  "name": "my-database",
  "description": "Database description",
  "type": "postgresql",
  "image": "postgres:latest",
  "is_public": false,
  "public_port": null,
  "status": "running",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Server Object
```json
{
  "uuid": "server-uuid-string",
  "name": "Production Server",
  "description": "Main production server",
  "ip": "192.168.1.1",
  "port": 22,
  "user": "root",
  "status": "functional",
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Deployment Object
```json
{
  "id": 1,
  "deployment_uuid": "deployment-uuid-string",
  "application_id": "app-uuid",
  "pull_request_id": null,
  "force_rebuild": false,
  "commit": "commit-hash",
  "status": "in_progress",
  "is_webhook": false,
  "is_api": true,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z",
  "logs": "Deployment logs..."
}
```

### Environment Variable Object
```json
{
  "uuid": "env-uuid-string",
  "key": "DATABASE_URL",
  "value": "postgresql://...",
  "is_literal": false,
  "is_multiline": false,
  "is_preview": false,
  "is_runtime": true,
  "is_buildtime": false,
  "is_shared": false,
  "is_shown_once": false
}
```

### Project Object
```json
{
  "uuid": "project-uuid-string",
  "name": "My Project",
  "description": "Project description",
  "team_id": 1,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Team Object
```json
{
  "id": 1,
  "name": "My Team",
  "description": "Team description",
  "personal_team": false,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

### Cloud Token Object
```json
{
  "uuid": "token-uuid-string",
  "name": "My Hetzner Token",
  "provider": "hetzner",
  "team_id": 1,
  "servers_count": 5,
  "created_at": "2024-01-01T00:00:00Z",
  "updated_at": "2024-01-01T00:00:00Z"
}
```

---

## Common Use Cases for MCP Server

### 1. Deploy an Application from GitHub
```bash
1. Create Project: POST /projects
2. Create Environment: POST /projects/{uuid}/environments
3. Get or Create Server: GET /servers or POST /servers
4. Create GitHub App: POST /github-apps (if needed)
5. Create Application: POST /applications/private-github-app
6. Start Deployment: GET /applications/{uuid}/start
```

### 2. Provision a Database with Backups
```bash
1. Create Database: POST /databases/postgresql
2. Create Backup Config: POST /databases/{uuid}/backups
3. Start Database: GET /databases/{uuid}/start
4. Monitor via: GET /deployments/{uuid}
```

### 3. Deploy Hetzner Server
```bash
1. Create Cloud Token: POST /cloud-tokens (Hetzner API token)
2. Get Locations: GET /hetzner/locations
3. Get Server Types: GET /hetzner/server-types
4. Get Images: GET /hetzner/images
5. Create Server: POST /servers/hetzner
6. Validate: GET /servers/{uuid}/validate
```

### 4. Manage Environment Variables
```bash
POST /applications/{uuid}/envs - Create
PATCH /applications/{uuid}/envs - Update single
PATCH /applications/{uuid}/envs/bulk - Update multiple
DELETE /applications/{uuid}/envs/{env_uuid} - Delete
GET /applications/{uuid}/logs - View logs
```

### 5. Deploy One-Click Services
```bash
POST /services
- type: "actualbudget" | "calibre-web" | "gitea-with-mysql" etc.
- Automatically configured with defaults
```

---

## Error Handling

### Common Error Scenarios

**Invalid Token:**
- Status: 401
- Message: "Unauthenticated."

**Resource Not Found:**
- Status: 404
- Message: "Resource not found."

**Domain Conflicts:**
- Status: 409
- Solution: Use `force_domain_override=true` in request

**Rate Limiting:**
- Status: 429
- Header: `Retry-After: 60` (recommended wait time)

**Validation Failures:**
- Status: 422
- Response includes detailed `errors` object mapping field names to error messages

---

## Rate Limiting

While specific rate limits aren't documented, the API includes:
- 429 status code for rate limit exceeded
- `Retry-After` header in response indicating seconds to wait

---

## OpenAPI Specification

Full OpenAPI 3.1.0 specifications available at:
```
https://raw.githubusercontent.com/coollabsio/coolify/v4.x/openapi.json
https://raw.githubusercontent.com/coollabsio/coolify/v4.x/openapi.yaml
```

---

## API Capabilities Summary

| Feature | Supported |
|---------|-----------|
| Applications Management | ✅ |
| Database Management | ✅ |
| Services/Docker Compose | ✅ |
| Deployments | ✅ |
| Server Management | ✅ |
| Cloud Provider Integration | ✅ (Hetzner, DigitalOcean) |
| GitHub Integration | ✅ |
| SSH Key Management | ✅ |
| Environment Variables | ✅ |
| Database Backups | ✅ |
| Team Management | ✅ |
| Project Organization | ✅ |
| Webhooks | ✅ (via applications) |
| Real-time Logs | ✅ |
| Health Checks | ✅ |
| Monitoring | ✅ |

---

## Implementation Notes for MCP Server

1. **Authentication**: Always include Bearer token in Authorization header
2. **Async Operations**: Deployments, server creation are asynchronous - monitor via UUID
3. **Resource Organization**: Utilize Projects and Teams for logical grouping
4. **Environment Variables**: Can be marked as literal, multiline, preview-only, etc.
5. **Domain Management**: Automatic collision detection with override option
6. **Build Packs**: nixpacks, static, dockerfile, dockercompose
7. **Health Checks**: Fully configurable per application
8. **Resource Limits**: Memory and CPU limits configurable
9. **Cloud Integration**: Requires provider tokens (Hetzner, DigitalOcean)
10. **Deletion**: Resources can be deleted with cascading option (delete volumes, configurations)

---

## Security Considerations

- API tokens should be kept secret and rotated regularly
- Use HTTPS for all API connections
- Implement token scoping based on use case
- Consider IP whitelisting for API access
- Monitor API usage for suspicious activity
- Regularly validate cloud provider tokens
- Use strong SSH keys for server authentication

---

## Version Information

- **Coolify Version**: v4.x (current stable)
- **API Version**: v0.1
- **OpenAPI Version**: 3.1.0
- **Last Updated**: 2024 (February)

---

## Resources

- **Official Coolify**: https://coolify.io
- **Documentation**: https://coolify.io/docs
- **GitHub Repository**: https://github.com/coollabsio/coolify
- **API Routes**: https://github.com/coollabsio/coolify/blob/v4.x/routes/api.php
- **OpenAPI Spec**: https://github.com/coollabsio/coolify/blob/v4.x/openapi.json

