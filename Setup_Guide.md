# Context Engine Setup Guide

This guide provides all the essential commands to get your Context Engine with Dgraph up and running quickly.

## 🎉 **Today's Accomplishments**

✅ **Dgraph Setup**: Complete Docker-based Dgraph cluster with Zero and Alpha  
✅ **Ratel GUI**: Web-based interface for database management  
✅ **GraphQL API**: Standard GraphQL endpoints for data access  
✅ **CRUD Operations**: Full Create, Read, Update, Delete functionality  
✅ **Service Layer**: TypeScript DGraphService with both DQL and GraphQL support  
✅ **Testing Suite**: Comprehensive unit and integration tests with Vitest  
✅ **Docker Setup**: Multi-stage Dockerfile for production deployment  
✅ **Development Environment**: Local Node.js + Docker DGraph setup  

## 🚀 **Quick Start Commands**

### 1. Start DGraph Services
```bash
# Start DGraph services (Zero, Alpha, Ratel)
docker-compose up -d

# Check status
docker-compose ps
```

### 2. Install Dependencies & Start App
```bash
# Install Node.js dependencies
npm install

# Start the TypeScript application in development mode
npm run dev
```

### 3. Verify Services Are Running
```bash
# Check Dgraph health
curl -s http://localhost:8080/health

# Check if GraphQL is working
curl -s http://localhost:8080/graphql -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name } } }"}'
```

### 4. Access Interfaces
- **Ratel GUI**: http://localhost:8000
- **GraphQL API**: http://localhost:8080/graphql
- **Dgraph Admin**: http://localhost:8080/admin
- **App Server**: http://localhost:8008 (when running)

## 🛠️ **Development Commands**

### Start Development Environment
```bash
# Start DGraph services
docker-compose up -d

# Install dependencies (if not already done)
npm install

# Start app in development mode with hot reload
npm run dev

# View DGraph logs
docker-compose logs -f alpha
docker-compose logs -f ratel
```

### Stop Development Environment
```bash
# Stop DGraph services
docker-compose down

# Stop the Node.js app (Ctrl+C in the terminal running npm run dev)
```

### Rebuild and Restart
```bash
# Rebuild DGraph services
docker-compose up --build -d

# Rebuild app (if using Docker for app)
docker-compose up --build -d app
```

## 🧪 **Testing Commands**

### Run Unit Tests
```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- src/services/__tests__/dgraph.service.test.ts
```

### Run Specific Test Suites
```bash
# Run only GraphQL tests
npm test -- --run src/services/__tests__/dgraph.service.test.ts -t "GraphQL"

# Run only DQL tests
npm test -- --run src/services/__tests__/dgraph.service.test.ts -t "DQL"

# Run only connection tests
npm test -- --run src/services/__tests__/dgraph.service.test.ts -t "Connection"
```

### Test CRUD Operations Manually
```bash
# Start the app and test manually
npm run dev

# In another terminal, you can test the API endpoints
curl -X POST http://localhost:8008/api/nodes \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Node", "email": "test@example.com"}'
```

## 🌐 **GraphQL Commands**

### Set Up GraphQL Schema
```bash
# Set up a basic schema
curl -X POST localhost:8080/admin/schema \
  -H "Content-Type: text/plain" \
  -d 'type User {
  uid: ID!
  name: String! @search(by: [exact])
  email: String! @search(by: [exact])
  age: Int
}'
```

### Test GraphQL Operations
```bash
# Create a user via GraphQL
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { addUser(input: [{ name: \"John Doe\", email: \"john@example.com\", age: 30 }]) { user { uid name email age } } }"
  }'

# Query all users
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ queryUser { uid name email age } }"}'

# Query by email
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ queryUser(filter: { email: { eq: \"john@example.com\" } }) { uid name email } }"}'
```

## 🔧 **Troubleshooting Commands**

### Check Container Status
```bash
# List all containers
docker ps -a

# Check container logs
docker-compose logs

# Check specific service
docker-compose logs alpha
```

### Reset Everything
```bash
# Stop and remove everything
docker-compose down -v

# Remove all images (WARNING: will rebuild everything)
docker system prune -a

# Start fresh
docker-compose up -d
```

### Fix Common Issues
```bash
# If containers won't start, check ports
lsof -i :8080
lsof -i :9080
lsof -i :8000
lsof -i :8008

# If Dgraph won't connect, restart alpha
docker-compose restart alpha

# If Node.js app won't start, check dependencies
npm install

# If TypeScript compilation fails
npm run build
```

## 📊 **Data Management**

### Backup Data
```bash
# Export Dgraph data
docker-compose exec alpha dgraph export --output /dgraph/backup

# Copy backup from container
docker cp context-engine-server-alpha-1:/dgraph/backup ./backup
```

### Restore Data
```bash
# Copy backup to container
docker cp ./backup context-engine-server-alpha-1:/dgraph/backup

# Import data
docker-compose exec alpha dgraph import --files /dgraph/backup
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
docker-compose up -d

# 2. Wait for services to be ready
sleep 10

# 3. Verify DGraph is working
curl -s http://localhost:8080/health

# 4. Start the Node.js app
npm run dev

# 5. Open Ratel GUI
open http://localhost:8000
```

### Evening Cleanup
```bash
# Stop the Node.js app (Ctrl+C)
# Stop DGraph services
docker-compose down

# Optional: clean up Docker system
docker system prune -f
```

## 📚 **Useful URLs**

- **Ratel GUI**: http://localhost:8000
- **GraphQL Playground**: http://localhost:8080/graphql
- **Dgraph Admin**: http://localhost:8080/admin
- **Dgraph Health**: http://localhost:8080/health
- **App Server**: http://localhost:8008 (when running)

## 🔍 **Monitoring**

### Check Resource Usage
```bash
# Docker resource usage
docker stats

# Container logs
docker-compose logs -f --tail=100

# Node.js app logs (in the terminal running npm run dev)
```

### Performance Monitoring
```bash
# Check Dgraph metrics
curl -s http://localhost:8080/metrics

# Check container health
docker-compose ps
```

## 🏗️ **Build Commands**

### Development Build
```bash
# Build TypeScript to JavaScript
npm run build

# Clean build directory
npm run clean
```

### Production Build
```bash
# Build for production
npm run build

# Start production server
npm start
```

### Docker Production Build
```bash
# Build Docker image
docker build -t context-engine-server .

# Run production container
docker run -p 8008:8008 context-engine-server
```

---

## 🚀 **Quick Reference**

| Command | Purpose |
|---------|---------|
| `docker-compose up -d` | Start DGraph services |
| `npm run dev` | Start Node.js app in development |
| `npm test` | Run all tests |
| `npm run build` | Build TypeScript to JavaScript |
| `docker-compose down` | Stop DGraph services |
| `docker-compose logs -f` | View live DGraph logs |
| `curl localhost:8080/health` | Check Dgraph health |
| `open http://localhost:8000` | Open Ratel GUI |

**Remember**: 
- Always run `docker-compose down` before shutting down your computer
- Use `npm run dev` for development with hot reload
- Use `npm start` for production after building with `npm run build`

🎉 **Your TypeScript Context Engine is ready to go!**
