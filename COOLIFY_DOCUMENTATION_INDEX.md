# Coolify API Documentation Index

## 📚 Complete Documentation Package

This comprehensive documentation suite provides everything needed to build and deploy a Model Context Protocol (MCP) server for Coolify API integration.

---

## 📄 Documents Overview

### 1. **COOLIFY_API_REFERENCE.md** ⭐ Start Here
**Comprehensive API Reference Manual**

Contains:
- Complete authentication guide
- All available endpoints (60+)
- Detailed request/response formats
- Error handling codes and examples
- Data models and schemas
- Common use cases and workflows

**Key Sections:**
- Bearer Token Authentication
- Applications Management (8 operations)
- Databases (15+ operations)
- Services Management (8 operations)
- Deployments Monitoring
- Servers & Infrastructure
- GitHub Integration
- Cloud Provider Tokens (Hetzner, DigitalOcean)
- Team & Project Management

**Use this for:**
- Understanding API capabilities
- Learning endpoint structure
- Implementing new operations
- Understanding error scenarios

---

### 2. **COOLIFY_MCP_SERVER_GUIDE.md** 🏗️ Implementation Guide
**Step-by-Step MCP Server Development**

Contains:
- Complete architecture overview
- TypeScript implementation examples
- API client implementation
- MCP tool definitions
- Tool handlers and processors
- Server initialization code
- Configuration setup
- Error handling strategies
- Testing examples
- Deployment instructions
- Security best practices
- Performance optimization

**Key Code Examples:**
```typescript
// Complete CoolifyClient implementation
class CoolifyClient {
  // All API methods with error handling
  // Authentication management
  // Request/response handling
}

// MCP Tool definitions and handlers
const applicationTools: Tool[]
class ApplicationHandler { /* ... */ }

// Full MCP server setup
const server = new Server({...})
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  // Tool routing and execution
})
```

**Use this for:**
- Building the MCP server
- Understanding MCP integration
- Implementing handlers
- Setting up tools
- Deploying the server

---

### 3. **COOLIFY_API_EXAMPLES.md** 🎯 Practical Examples
**Real-World Usage Examples**

Contains:
- Quick setup instructions
- 10+ complete workflow examples using curl
- Common operations with copy-paste code
- Error handling examples
- Bash scripting examples
- JQ filtering recipes
- Best practices and tips
- Troubleshooting guide

**Example Workflows:**
1. Deploy application from GitHub
2. Create PostgreSQL database with backup
3. Manage environment variables
4. Deploy one-click services
5. Monitor deployments
6. Manage servers
7. GitHub integration setup
8. Docker Compose deployment
9. Complete app lifecycle management

**Use this for:**
- Copy-paste solutions
- Learning by example
- Quick reference lookups
- Scripting automation
- Testing API endpoints

---

## 🚀 Quick Start Path

### For API Understanding:
```
1. Read: COOLIFY_API_REFERENCE.md
   └─ Understand endpoints and authentication
2. Browse: COOLIFY_API_EXAMPLES.md
   └─ See practical examples
3. Implement: Follow workflows with curl
```

### For MCP Server Development:
```
1. Read: COOLIFY_MCP_SERVER_GUIDE.md
   └─ Understand architecture
2. Review: COOLIFY_API_REFERENCE.md
   └─ Know all available endpoints
3. Copy: Code examples from COOLIFY_MCP_SERVER_GUIDE.md
   └─ Implement handlers and tools
4. Reference: COOLIFY_API_EXAMPLES.md
   └─ For specific operation details
```

---

## 🎯 Core Capabilities Documented

### Resource Management
- ✅ Applications (Deploy, manage, monitor)
- ✅ Databases (Create, backup, restore)
- ✅ Services (One-click deployments)
- ✅ Servers (SSH, Hetzner provisioning)
- ✅ Projects & Teams
- ✅ Private Keys & SSH Management
- ✅ Cloud Tokens (Hetzner, DigitalOcean)
- ✅ GitHub Integration

### Operations Documented
- ✅ Deployments (60+ API endpoints)
- ✅ Authentication (Bearer tokens)
- ✅ Error Handling (401, 404, 422, 429)
- ✅ Environment Variables
- ✅ Monitoring & Logs
- ✅ Resource Limits
- ✅ Health Checks
- ✅ Webhooks Support

---

## 📊 API Statistics

| Metric | Value |
|--------|-------|
| Total Endpoints | 60+ |
| Available Resources | 12 |
| Database Types | 8 |
| One-Click Services | 200+ |
| Build Packs | 4 |
| Cloud Providers | 2+ |
| Error Codes | 6 |
| HTTP Methods | 5 |

---

## 🔐 Authentication

All APIs require Bearer token authentication:

```bash
Authorization: Bearer YOUR_API_TOKEN
```

**Token Management:**
- Generate in Coolify UI: Settings → Keys & Tokens → API tokens
- Never commit tokens to version control
- Use environment variables
- Rotate regularly

---

## 🏗️ MCP Tool Categories

### Implemented in Guide

1. **Application Tools** (8 tools)
   - `list_applications`
   - `get_application`
   - `create_application`
   - `deploy_application`
   - `stop_application`
   - `restart_application`
   - `get_application_logs`
   - `delete_application`

2. **Database Tools**
   - `list_databases`
   - `get_database`
   - `create_database`
   - `create_backup`
   - `restore_backup`

3. **Deployment Tools**
   - `list_deployments`
   - `get_deployment`
   - `cancel_deployment`

4. **Server Tools**
   - `list_servers`
   - `create_server`
   - `validate_server`

All tools follow consistent error handling and response formats.

---

## 💾 Response Formats

### Success (200/201)
```json
{
  "uuid": "resource-id",
  "message": "Operation successful",
  "data": { /* resource data */ }
}
```

### Error (4xx/5xx)
```json
{
  "message": "Error description",
  "errors": {
    "field": ["Validation error"]
  }
}
```

---

## 🔍 Endpoint Categories

### Applications
```
GET    /applications
POST   /applications/public
POST   /applications/private-github-app
POST   /applications/dockerfile
GET    /applications/{uuid}
PATCH  /applications/{uuid}
DELETE /applications/{uuid}
POST   /applications/{uuid}/start
POST   /applications/{uuid}/stop
POST   /applications/{uuid}/restart
GET    /applications/{uuid}/logs
GET    /applications/{uuid}/envs
POST   /applications/{uuid}/envs
PATCH  /applications/{uuid}/envs
DELETE /applications/{uuid}/envs/{env_uuid}
```

### Databases
```
GET    /databases
GET    /databases/{uuid}
POST   /databases/postgresql
POST   /databases/mysql
POST   /databases/mariadb
POST   /databases/mongodb
POST   /databases/redis
DELETE /databases/{uuid}
POST   /databases/{uuid}/start
POST   /databases/{uuid}/stop
POST   /databases/{uuid}/restart
GET    /databases/{uuid}/backups
POST   /databases/{uuid}/backups
DELETE /databases/{uuid}/backups/{backup_uuid}
```

### Deployments
```
GET    /deployments
GET    /deployments/{uuid}
POST   /deployments/{uuid}/cancel
GET    /deploy
```

### Servers
```
GET    /servers
GET    /servers/{uuid}
POST   /servers
PATCH  /servers/{uuid}
DELETE /servers/{uuid}
POST   /servers/hetzner
```

### Cloud Integration
```
GET    /cloud-tokens
POST   /cloud-tokens
PATCH  /cloud-tokens/{uuid}
DELETE /cloud-tokens/{uuid}
POST   /cloud-tokens/{uuid}/validate
```

---

## 📝 Common Workflows

### Workflow 1: Deploy from GitHub
```
Create Project → Create Environment → Select Server → 
Add GitHub App → Deploy Application → Monitor Deployment
```
**Documented in:** COOLIFY_API_EXAMPLES.md (Deploy Application section)

### Workflow 2: Create Database
```
Create Database → Configure Backups → Start Database → 
Monitor Status → Verify Connection
```
**Documented in:** COOLIFY_API_EXAMPLES.md (Create PostgreSQL Database section)

### Workflow 3: Setup Infrastructure
```
Add Cloud Token → List Locations → Create Hetzner Server → 
Validate Server → Create Projects → Deploy Applications
```
**Documented in:** COOLIFY_API_EXAMPLES.md (Manage Servers section)

---

## 🛠️ Implementation Checklist

- [ ] Read COOLIFY_API_REFERENCE.md
- [ ] Review COOLIFY_MCP_SERVER_GUIDE.md architecture
- [ ] Set up development environment
- [ ] Initialize TypeScript project
- [ ] Implement CoolifyClient class
- [ ] Create API handlers for each resource
- [ ] Define MCP tools
- [ ] Implement tool handlers
- [ ] Set up MCP server
- [ ] Test with curl examples
- [ ] Add error handling
- [ ] Implement logging
- [ ] Write unit tests
- [ ] Deploy server
- [ ] Document custom extensions

---

## 🔗 External Resources

- **Official Coolify:** https://coolify.io
- **Documentation:** https://coolify.io/docs
- **GitHub Repository:** https://github.com/coollabsio/coolify
- **API Routes Source:** https://github.com/coollabsio/coolify/blob/v4.x/routes/api.php
- **OpenAPI Specification:** https://github.com/coollabsio/coolify/blob/v4.x/openapi.json
- **MCP Protocol:** https://modelcontextprotocol.io

---

## 📋 Document Cross-References

### When you need to...

| Task | Reference |
|------|-----------|
| Understand API structure | COOLIFY_API_REFERENCE.md → Overview |
| Learn authentication | COOLIFY_API_REFERENCE.md → Authentication |
| Deploy an app | COOLIFY_API_EXAMPLES.md → Deploy Application |
| Set up MCP server | COOLIFY_MCP_SERVER_GUIDE.md → Implementation |
| Create database | COOLIFY_API_EXAMPLES.md → Create Database |
| Handle errors | COOLIFY_API_EXAMPLES.md → Error Handling |
| Provision servers | COOLIFY_API_EXAMPLES.md → Manage Servers |
| Write tools | COOLIFY_MCP_SERVER_GUIDE.md → Tools Definition |
| Test endpoints | COOLIFY_API_EXAMPLES.md → Quick Start |
| Understand rate limits | COOLIFY_API_REFERENCE.md → Rate Limiting |
| Deploy to production | COOLIFY_MCP_SERVER_GUIDE.md → Deployment |
| Secure the server | COOLIFY_MCP_SERVER_GUIDE.md → Security |

---

## 🎓 Learning Path

### Beginner
1. Start with COOLIFY_API_EXAMPLES.md - Quick Start
2. Follow curl examples to understand API basics
3. Try deploying a simple app

### Intermediate
1. Study COOLIFY_API_REFERENCE.md - All endpoints
2. Understand authentication and error handling
3. Learn project/environment organization

### Advanced
1. Review COOLIFY_MCP_SERVER_GUIDE.md - Full architecture
2. Implement MCP server from scratch
3. Add custom tools and handlers
4. Implement caching and optimization
5. Deploy and manage in production

---

## 💡 Key Concepts

### Projects & Environments
- **Projects**: Logical grouping of applications/databases
- **Environments**: Development, staging, production deployments
- UUIDs used for identification
- Environments contain resources

### Server Types
- **SSH Servers**: Manual server connection
- **Hetzner Servers**: Auto-provisioned cloud servers
- **DigitalOcean**: Via cloud tokens
- Multi-server deployments supported

### Resources
- **Applications**: Git-based deployments
- **Services**: Pre-configured one-click services
- **Databases**: Managed database instances
- **Private Keys**: SSH key management
- All have UUIDs and belong to projects

### Deployments
- Asynchronous operations
- Track via deployment UUID
- Monitor status and logs
- Support force rebuilds
- Pull request deployments

---

## 🚀 Next Steps

1. **Choose your path:**
   - API Learning → Start with COOLIFY_API_REFERENCE.md
   - MCP Development → Start with COOLIFY_MCP_SERVER_GUIDE.md
   - Practical Tasks → Start with COOLIFY_API_EXAMPLES.md

2. **Set up environment:**
   - Get API token from Coolify UI
   - Note Coolify instance URL
   - Set environment variables

3. **Test connectivity:**
   - Use curl examples from COOLIFY_API_EXAMPLES.md
   - Verify API access
   - Understand response formats

4. **Build implementation:**
   - Follow COOLIFY_MCP_SERVER_GUIDE.md
   - Use code examples provided
   - Test incrementally

5. **Deploy:**
   - Follow deployment instructions
   - Configure for Claude Desktop
   - Monitor and maintain

---

## 📞 Support Resources

- **Official Docs:** https://coolify.io/docs
- **GitHub Issues:** https://github.com/coollabsio/coolify/issues
- **Community Chat:** Available on Coolify website
- **Documentation Issues:** Check provided markdown files

---

## Version Information

- **API Version:** v0.1
- **Coolify Version:** v4.x (current stable)
- **OpenAPI:** 3.1.0 compatible
- **Documentation Date:** February 2025
- **Last Updated:** 2025-02-25

---

## 📄 File Guide

```
GeneracionDocumentacion/
├── COOLIFY_API_REFERENCE.md ........... Complete API reference (60+ endpoints)
├── COOLIFY_MCP_SERVER_GUIDE.md ....... MCP server implementation guide
├── COOLIFY_API_EXAMPLES.md ........... Practical examples and workflows
└── README (this file) ................. Navigation and overview
```

---

## ✅ What's Covered

### 100% Coverage:
- ✅ All 60+ API endpoints documented
- ✅ Authentication methods explained
- ✅ Response formats and examples
- ✅ Error handling strategies
- ✅ Common workflows detailed
- ✅ MCP server implementation
- ✅ Tool definitions and handlers
- ✅ Deployment instructions
- ✅ Security best practices
- ✅ Practical code examples

---

## 🎯 Documentation Quality

Each document includes:
- Clear structure and organization
- Code examples (curl, TypeScript, bash)
- Visual diagrams where applicable
- Cross-references between documents
- Practical examples and use cases
- Error handling explanations
- Best practices and tips
- Security considerations
- Performance optimization guidance

---

## 📚 How to Use This Documentation

1. **Start here** - Read this index
2. **Pick your focus** - Choose a document based on your goal
3. **Follow the structure** - Sections are organized logically
4. **Use examples** - Copy and adapt code examples
5. **Cross-reference** - Jump between documents as needed
6. **Refer back** - Use as reference while implementing

---

## 🏁 Ready to Get Started?

Choose your starting point:

- **🎓 Learning Coolify API?** → [COOLIFY_API_REFERENCE.md](./COOLIFY_API_REFERENCE.md)
- **🔧 Building MCP Server?** → [COOLIFY_MCP_SERVER_GUIDE.md](./COOLIFY_MCP_SERVER_GUIDE.md)
- **⚡ Need Quick Examples?** → [COOLIFY_API_EXAMPLES.md](./COOLIFY_API_EXAMPLES.md)

Happy coding! 🚀

