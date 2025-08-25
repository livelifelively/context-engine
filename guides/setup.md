# Context Engine Setup Guide

This guide provides all the essential commands to get your Context Engine with DGraph and NestJS API server up and running quickly.

## 🎉 **Current Architecture**

✅ **Monorepo Structure**: Separate applications for database operations and API server  
✅ **DGraph Database**: Complete Docker-based DGraph cluster with Zero and Alpha  
✅ **NestJS API Server**: Modern TypeScript API server with hot reload  
✅ **Local Development**: Full IDE integration with debugging capabilities  
✅ **Multiple Deployment Options**: Development, production, and service-specific configurations  
✅ **Ratel GUI**: Web-based interface for database management  
✅ **Testing Suite**: Comprehensive unit tests with Vitest  

## 🚀 **Quick Start - Local Development (Recommended)**

### 1. Install Dependencies
```bash
# Install all dependencies (root + sub-services)
npm run install:all
```

### 2. Start DGraph Services
```bash
# Start DGraph in Docker (Zero, Alpha, Ratel)
npm run dgraph:dev
```

### 3. Start API Server Locally
```bash
# In a new terminal, start API server with hot reload
npm run api:dev

# Or with debugging enabled
npm run api:dev:debug
```

### 4. Verify Everything is Running
```bash
# Check DGraph health
curl -s http://localhost:8080/health

# Check API server health
curl -s http://localhost:3000/api/health

# Check API server database connection
curl -s http://localhost:3000/api/health/database
```

### 5. Access Interfaces
- **API Server**: http://localhost:3000
- **Ratel GUI**: http://localhost:8000
- **DGraph GraphQL**: http://localhost:8080/graphql
- **DGraph Admin**: http://localhost:8080/admin

## 🛠️ **Development Commands**

### Start Development Environment
```bash
# Option 1: Start everything together
npm run dev

# Option 2: Start services separately
npm run dgraph:dev    # Terminal 1: DGraph services
npm run api:dev       # Terminal 2: API server

# Option 3: Docker development (alternative)
npm run dev:docker
```

### Stop Development Environment
```bash
# Stop DGraph services
npm run dgraph:dev:down

# Stop API server (Ctrl+C in the terminal running npm run api:dev)
```

### View Logs
```bash
# DGraph logs
npm run dgraph:dev:logs

# API server logs (in the terminal running npm run api:dev)
```

## 🧪 **Testing Commands**

### Run All Tests
```bash
# Run all tests (database service + API server)
npm test

# Run specific service tests
npm run test:db      # Database service tests
npm run test:api     # API server tests
```

### Run Tests in Watch Mode
```bash
# Database service tests in watch mode
cd src/database-service && npm run test:watch

# API server tests in watch mode
cd src/api-server && npm run test:watch
```

## 🌐 **API Endpoints**

### Health Checks
```bash
# API server health
curl http://localhost:3000/api/health

# Database health check
curl http://localhost:3000/api/health/database
```

### Greet Module
```bash
# Test the greet endpoint
curl http://localhost:3000/api/greet/World
```

## 🐳 **Docker Deployment Options**

### Development (Docker)
```bash
# Start everything in Docker
npm run dev:docker

# Build and start
npm run dev:build
```

### Production Deployments
```bash
# Full stack production
npm run docker:full:prod

# API server only (with external DGraph)
npm run docker:api

# DGraph only (API deployed elsewhere)
npm run docker:dgraph
```

## 🔧 **Troubleshooting**

### Check Container Status
```bash
# List all containers
docker ps -a

# Check DGraph logs
npm run dgraph:dev:logs

# Check specific service
docker-compose -f docker-compose.dgraph.dev.yml logs alpha
```

### Reset Everything
```bash
# Stop all services
npm run dgraph:dev:down
npm run dev:down

# Clean everything
npm run clean

# Start fresh
npm run install:all
npm run dev
```

### Fix Common Issues
```bash
# If containers won't start, check ports
lsof -i :3000  # API server
lsof -i :8080  # DGraph GraphQL
lsof -i :8000  # Ratel GUI

# If API server won't start, check dependencies
cd src/api-server && npm install

# If DGraph won't connect, restart services
npm run dgraph:dev:down
npm run dgraph:dev
```

## 📊 **Data Management**

### Backup Data
```bash
# Export Dgraph data
docker-compose -f docker-compose.dgraph.dev.yml exec alpha dgraph export --output /dgraph/backup

# Copy backup from container
docker cp $(docker-compose -f docker-compose.dgraph.dev.yml ps -q alpha):/dgraph/backup ./backup
```

### Clear All Data
```bash
# Drop all data (WARNING: irreversible)
curl -X POST localhost:8080/admin/schema \
  -H "Content-Type: text/plain" \
  -d '{"drop_all": true}'
```

## 🎯 **Daily Workflow**

### Morning Setup
```bash
# 1. Start DGraph services
npm run dgraph:dev

# 2. Wait for services to be ready (check logs)
npm run dgraph:dev:logs

# 3. Verify DGraph is working
curl -s http://localhost:8080/health

# 4. Start the API server
npm run api:dev

# 5. Verify API server is working
curl -s http://localhost:3000/api/health

# 6. Open Ratel GUI
open http://localhost:8000
```

### Evening Cleanup
```bash
# Stop the API server (Ctrl+C)
# Stop DGraph services
npm run dgraph:dev:down

# Optional: clean up Docker system
docker system prune -f
```

## 📚 **Useful URLs**

- **API Server**: http://localhost:3000
- **API Health**: http://localhost:3000/api/health
- **Ratel GUI**: http://localhost:8000
- **DGraph GraphQL**: http://localhost:8080/graphql
- **DGraph Admin**: http://localhost:8080/admin
- **DGraph Health**: http://localhost:8080/health

## 🔍 **Monitoring**

### Check Resource Usage
```bash
# Docker resource usage
docker stats

# DGraph logs
npm run dgraph:dev:logs

# API server logs (in the terminal running npm run api:dev)
```

### Performance Monitoring
```bash
# Check Dgraph metrics
curl -s http://localhost:8080/metrics

# Check container health
docker-compose -f docker-compose.dgraph.dev.yml ps
```

## 🏗️ **Build Commands**

### Development Build
```bash
# Build all services
npm run build

# Build specific service
npm run build:db    # Database service
npm run build:api   # API server
```

### Production Build
```bash
# Build for production
npm run build

# Start production deployment
npm run docker:full:prod
```

---

## 🚀 **Quick Reference**

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start local development (DGraph + API) |
| `npm run dgraph:dev` | Start DGraph services only |
| `npm run api:dev` | Start API server locally |
| `npm run test` | Run all tests |
| `npm run build` | Build all services |
| `npm run docker:full:prod` | Production deployment |
| `npm run dgraph:dev:down` | Stop DGraph services |
| `npm run clean` | Clean everything |

## 📁 **Project Structure**

```
context-engine-server/
├── src/
│   ├── database-service/      # CLI tool for DGraph operations
│   └── api-server/           # NestJS API server
├── docker-compose.*.yml      # Multiple deployment configurations
├── package.json              # Monorepo orchestrator
└── README.md                 # Main documentation
```

**Remember**: 
- Use `npm run dev` for local development with full IDE integration
- Use `npm run docker:full:prod` for production deployment
- Always run `npm run dgraph:dev:down` before shutting down

🎉 **Your Context Engine with DGraph and NestJS is ready to go!**
