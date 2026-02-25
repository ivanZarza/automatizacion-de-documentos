# Coolify API - Quick Reference & Examples

## Quick Setup

### 1. Get Your API Token
```
Navigate to: Settings → Keys & Tokens → API tokens
Click "Create New Token"
Copy the generated token
```

### 2. Verify API Access
```bash
curl -H "Authorization: Bearer YOUR_TOKEN" \
  https://your-coolify-instance/api/v1/health
```

---

## Common Operations

### Deploy Application from GitHub

**Scenario:** Deploy a Next.js app from GitHub main branch

```bash
# Step 1: Get existing projects
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/projects | jq '.[] | {uuid, name}'

# Step 2: Get environments in project
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/projects/PROJECT_UUID/environments | jq '.[] | {uuid, name}'

# Step 3: List available servers
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/servers | jq '.[] | {uuid, name, ip}'

# Step 4: Deploy application
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/public \
  -d '{
    "project_uuid": "proj-uuid",
    "server_uuid": "srv-uuid",
    "environment_uuid": "env-uuid",
    "git_repository": "https://github.com/user/nextjs-app",
    "git_branch": "main",
    "build_pack": "nixpacks",
    "ports_exposes": "3000",
    "name": "my-nextjs-app",
    "domains": "app.example.com"
  }' | jq '.'

# Step 5: Get deployment UUID and watch deployment
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/deployments/DEPLOYMENT_UUID | jq '.status'

# Step 6: View logs
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/logs?lines=50 | jq '.logs'
```

**Response:**
```json
{
  "uuid": "app-uuid-12345",
  "name": "my-nextjs-app",
  "status": "running",
  "fqdn": "app.example.com",
  "git_branch": "main"
}
```

---

### Create PostgreSQL Database with Backup

**Scenario:** Create a PostgreSQL database and hourly backups

```bash
# Step 1: Create PostgreSQL database
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/databases/postgresql \
  -d '{
    "server_uuid": "srv-uuid",
    "project_uuid": "proj-uuid",
    "environment_uuid": "env-uuid",
    "name": "production_db",
    "description": "Main production database",
    "is_public": false,
    "limits_memory": "512M",
    "limits_cpus": "1"
  }' | jq '.uuid'

# Process UUID from response: DB_UUID="..."

# Step 2: Create backup configuration
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/databases/DB_UUID/backups \
  -d '{
    "name": "hourly-backup",
    "description": "Hourly backups for production DB",
    "frequency": "hourly",
    "retention_days": 30
  }' | jq '.uuid'

# Step 3: Start database
curl -X POST -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/databases/DB_UUID/start | jq '.'

# Step 4: Monitor database
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/databases/DB_UUID | jq '.status'

# Step 5: Check backup executions
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/databases/DB_UUID/backups/BACKUP_UUID/executions | jq '.executions'
```

---

### Manage Environment Variables

**Scenario:** Set database credentials for an application

```bash
# List current environment variables
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/envs | jq '.[] | {key, is_shown_once}'

# Add single environment variable
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/APP_UUID/envs \
  -d '{
    "key": "DATABASE_URL",
    "value": "postgresql://user:pass@host:5432/dbname",
    "is_literal": true,
    "is_multiline": false,
    "is_preview": false
  }' | jq '.uuid'

# Add multiple environment variables (bulk)
curl -X PATCH -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/APP_UUID/envs/bulk \
  -d '[
    {
      "key": "API_KEY",
      "value": "your-api-key",
      "is_preview": false
    },
    {
      "key": "DEBUG_MODE",
      "value": "false",
      "is_preview": true
    }
  ]' | jq '.[] | {key}'

# Update single environment variable
curl -X PATCH -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/APP_UUID/envs \
  -d '{
    "key": "DATABASE_URL",
    "value": "postgresql://newuser:newpass@newhost:5432/newdb"
  }' | jq '.'

# Delete environment variable
curl -X DELETE -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/envs/ENV_VAR_UUID | jq '.message'
```

---

### Deploy One-Click Service

**Scenario:** Deploy Gitea with MySQL in one command

```bash
# Only need basic info for one-click services
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/services \
  -d '{
    "type": "gitea-with-mysql",
    "name": "my-gitea-instance",
    "server_uuid": "srv-uuid",
    "project_uuid": "proj-uuid",
    "environment_uuid": "env-uuid",
    "description": "Internal Git server",
    "instant_deploy": true
  }' | jq '.uuid'
```

**Available One-Click Services:**
- `actualbudget` - Personal finance tracker
- `calibre-web` - E-book manager
- `gitea-with-mysql` - Self-hosted Git
- `wordpress` - WordPress with MySQL
- `mastodon` - Social network
- And 200+ more...

---

### Monitor Deployments

**Scenario:** Check deployment status and logs

```bash
# List all running deployments
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/deployments | jq '.[] | {deployment_uuid, status, created_at}'

# Get specific deployment details
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/deployments/DEPLOYMENT_UUID | jq '{
    status,
    created_at,
    updated_at,
    logs
  }'

# List application deployments (with pagination)
curl -s -H "Authorization: Bearer TOKEN" \
  "https://coolify/api/v1/deployments/applications/APP_UUID?skip=0&take=10" \
  | jq '.[] | {deployment_uuid, status, created_at}'

# Cancel ongoing deployment
curl -X POST -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/deployments/DEPLOYMENT_UUID/cancel | jq '.message'
```

**Response Example:**
```json
{
  "deployment_uuid": "dep-uuid-123",
  "status": "in_progress",
  "created_at": "2024-02-20T10:30:00Z",
  "logs": "Building application...\nDeploying...\nSuccess!"
}
```

---

### Manage Servers

**Scenario:** Add new server and provision with Hetzner

```bash
# Option 1: Manual SSH Server
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/servers \
  -d '{
    "name": "production-server",
    "description": "Main production server",
    "ip": "192.168.1.100",
    "port": 22,
    "user": "root"
  }' | jq '.uuid'

# Option 2: Provision Hetzner Server
# Step 1: Create cloud token first
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/cloud-tokens \
  -d '{
    "provider": "hetzner",
    "token": "your-hetzner-api-token",
    "name": "My Hetzner Account"
  }' | jq '.uuid'

# Step 2: Get available locations
curl -s -H "Authorization: Bearer TOKEN" \
  "https://coolify/api/v1/hetzner/locations?cloud_provider_token_uuid=TOKEN_UUID" \
  | jq '.[] | {id, name, city, country}'

# Step 3: Get server types
curl -s -H "Authorization: Bearer TOKEN" \
  "https://coolify/api/v1/hetzner/server-types?cloud_provider_token_uuid=TOKEN_UUID" \
  | jq '.[] | {id, name, vcpus, memory, price_monthly}'

# Step 4: Get available images
curl -s -H "Authorization: Bearer TOKEN" \
  "https://coolify/api/v1/hetzner/images?cloud_provider_token_uuid=TOKEN_UUID" \
  | jq '.[] | {id, name, os_flavor, os_version}'

# Step 5: Create server on Hetzner
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/servers/hetzner \
  -d '{
    "cloud_provider_token_uuid": "TOKEN_UUID",
    "location": "nbg1",
    "server_type": "cx52",
    "image": 1,
    "private_key_uuid": "KEY_UUID",
    "name": "hetzner-prod-01"
  }' | jq '.message'

# Validate server connection
curl -X GET -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/servers/SERVER_UUID/validate | jq '.message'
```

---

### Manage GitHub Integration

**Scenario:** Connect GitHub App and deploy private repository

```bash
# Step 1: Create GitHub App connection
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/github-apps \
  -d '{
    "name": "My GitHub App",
    "api_url": "https://github.com/api/v3",
    "html_url": "https://github.com",
    "app_id": 12345,
    "installation_id": 54321,
    "client_id": "Ixxx",
    "client_secret": "your-client-secret",
    "webhook_secret": "your-webhook-secret",
    "private_key_uuid": "ssh-key-uuid"
  }' | jq '.uuid'

# Step 2: Load repositories
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/github-apps/GITHUB_APP_ID/repositories \
  | jq '.repositories[] | {name, full_name}'

# Step 3: Load branches for repo
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/github-apps/GITHUB_APP_ID/repositories/owner/repo/branches \
  | jq '.branches[] | {name}'

# Step 4: Deploy private repository
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/private-github-app \
  -d '{
    "project_uuid": "proj-uuid",
    "server_uuid": "srv-uuid",
    "environment_uuid": "env-uuid",
    "github_app_uuid": "github-uuid",
    "git_repository": "https://github.com/owner/private-repo",
    "git_branch": "main",
    "build_pack": "nixpacks",
    "ports_exposes": "3000",
    "name": "private-app"
  }' | jq '.uuid'
```

---

### Docker Compose Deployment

**Scenario:** Deploy application using Dockerfile

```bash
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/dockerfile \
  -d '{
    "project_uuid": "proj-uuid",
    "server_uuid": "srv-uuid",
    "environment_uuid": "env-uuid",
    "dockerfile": "FROM node:18\nWORKDIR /app\nCOPY . .\nRUN npm install\nCMD [\"npm\", \"start\"]",
    "build_pack": "dockerfile",
    "name": "custom-app",
    "ports_exposes": "3000",
    "domains": "app.example.com"
  }' | jq '.uuid'
```

---

### Application Lifecycle

**Scenario:** Complete app lifecycle management

```bash
# Deploy (start)
curl -X POST -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/start | jq '.deployment_uuid'

# Monitor deployment
while true; do
  curl -s -H "Authorization: Bearer TOKEN" \
    https://coolify/api/v1/deployments/DEPLOYMENT_UUID | jq '.status'
  sleep 5
done

# View live logs
curl -s -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/logs?lines=100 | jq '.'

# Restart (after changes)
curl -X POST -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/restart | jq '.deployment_uuid'

# Stop
curl -X POST -H "Authorization: Bearer TOKEN" \
  https://coolify/api/v1/applications/APP_UUID/stop | jq '.message'

# Delete
curl -X DELETE -H "Authorization: Bearer TOKEN" \
  "https://coolify/api/v1/applications/APP_UUID?delete_volumes=true&docker_cleanup=true" \
  | jq '.message'
```

---

## Error Handling Examples

### Handling 409 Domain Conflict

```bash
# Error response:
{
  "message": "Domain conflicts detected. Use force_domain_override=true to proceed.",
  "conflicts": [
    {
      "domain": "app.example.com",
      "resource_name": "Another App",
      "message": "Domain already in use"
    }
  ]
}

# Solution: Re-deploy with override
curl -X POST -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  https://coolify/api/v1/applications/public \
  -d '{
    ...
    "force_domain_override": true,
    ...
  }'
```

### Handling 422 Validation Error

```bash
# Error response:
{
  "message": "Validation error.",
  "errors": {
    "git_branch": ["The git branch field is invalid."],
    "ports_exposes": ["The ports exposes must be a valid port number."]
  }
}

# Solution: Fix the validation errors in request
```

### Handling 429 Rate Limit

```bash
# Error response includes:
# Header: Retry-After: 60

# Solution: Implement backoff
function retryWithBackoff(fn, maxRetries = 3) {
  return new Promise((resolve, reject) => {
    let attempt = 0;
    
    async function tryRequest() {
      try {
        return resolve(await fn());
      } catch (error) {
        if (error.status === 429 && attempt < maxRetries) {
          const retryAfter = parseInt(
            error.headers['Retry-After'] || '60'
          );
          await new Promise(r => setTimeout(r, retryAfter * 1000));
          attempt++;
          return tryRequest();
        }
        reject(error);
      }
    }
    
    tryRequest();
  });
}
```

---

## Useful JQ Filters

```bash
# Get all app UUIDs and names
curl -s https://coolify/api/v1/applications | \
  jq -r '.[] | "\(.uuid) - \(.name)"'

# Get all running applications
curl -s https://coolify/api/v1/applications | \
  jq '.[] | select(.status == "running") | {uuid, name}'

# Get deployment timeline
curl -s https://coolify/api/v1/deployments | \
  jq '.[] | {
    uuid: .deployment_uuid,
    status,
    created: .created_at,
    updated: .updated_at
  } | @csv' | column -t -s','

# Get database backup history
curl -s https://coolify/api/v1/databases/DB_UUID/backups/BACKUP_UUID/executions | \
  jq '.executions | sort_by(.created_at) | 
    map({date: .created_at, status, size: .size}) | 
    reverse | .[:10]'

# Check server health across all servers
curl -s https://coolify/api/v1/servers | \
  jq '.[] | {name, ip, status}'
```

---

## Scripting Examples

### Deploy Multiple Applications

```bash
#!/bin/bash

APPS=(
  "app1|https://github.com/user/app1"
  "app2|https://github.com/user/app2"
  "app3|https://github.com/user/app3"
)

for app_info in "${APPS[@]}"; do
  IFS='|' read -r app_name repo <<< "$app_info"
  
  response=$(curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    -H "Content-Type: application/json" \
    https://coolify/api/v1/applications/public \
    -d "{
      \"project_uuid\": \"$PROJECT_UUID\",
      \"server_uuid\": \"$SERVER_UUID\",
      \"environment_uuid\": \"$ENV_UUID\",
      \"git_repository\": \"$repo\",
      \"git_branch\": \"main\",
      \"build_pack\": \"nixpacks\",
      \"name\": \"$app_name\",
      \"ports_exposes\": \"3000\"
    }")
  
  uuid=$(echo $response | jq -r '.uuid')
  echo "Deployed $app_name: $uuid"
done
```

### Monitor Ongoing Deployments

```bash
#!/bin/bash

watch_deployment() {
  local deployment_uuid=$1
  local max_attempts=300
  local attempt=0
  
  while [ $attempt -lt $max_attempts ]; do
    status=$(curl -s -H "Authorization: Bearer $TOKEN" \
      https://coolify/api/v1/deployments/$deployment_uuid | jq -r '.status')
    
    echo "[$(date)] Deployment status: $status"
    
    if [[ "$status" == "finished" ]]; then
      echo "✓ Deployment completed successfully"
      return 0
    elif [[ "$status" == "failed" ]]; then
      echo "✗ Deployment failed"
      return 1
    fi
    
    sleep 5
    ((attempt++))
  done
  
  echo "✗ Deployment timeout"
  return 1
}

watch_deployment $DEPLOYMENT_UUID
```

---

## Best Practices

1. **Always use HTTPS** - Never send tokens over HTTP
2. **Cache responses** - Reduce API calls with intelligent caching
3. **Use pagination** - For endpoints with many results, use skip/take
4. **Handle timeouts** - Implement proper timeout handling
5. **Log important events** - Track deployments and changes
6. **Rotate tokens** - Regularly rotate API tokens
7. **Monitor rates** - Watch for 429 rate limit responses
8. **Test in staging** - Always test deployment changes in staging first
9. **Validate inputs** - Validate all inputs before sending to API
10. **Document changes** - Keep records of deployment changes

---

## Resources

- [Full API Reference](./COOLIFY_API_REFERENCE.md)
- [MCP Server Guide](./COOLIFY_MCP_SERVER_GUIDE.md)
- [Official Docs](https://coolify.io/docs)
- [GitHub Repository](https://github.com/coollabsio/coolify)
- [OpenAPI Spec](https://github.com/coollabsio/coolify/blob/v4.x/openapi.json)

