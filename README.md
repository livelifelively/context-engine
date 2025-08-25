# Context Engine

A modular system for managing context and methodology documents with DGraph database backend.

## Architecture

This project is organized as a monorepo with separate applications for better separation of concerns:

```
context-engine-server/
├── src/
│   ├── database-service/      # DGraph operations and schema management (CLI tool)
│   └── api-server/           # NestJS API server for business logic
├── docker/
│   └── compose/              # Docker Compose configurations
├── guides/                   # Documentation guides
└── package.json              # Root workspace orchestration
```

## Services

### Database Service (`src/database-service/`)
- **Purpose**: DGraph database operations, schema management, migrations
- **Type**: CLI tool (not a running service)
- **Features**:
  - GraphQL schema management
  - Database migrations
  - CLI commands for database operations
  - Schema validation and testing

### API Server (`src/api-server/`)
- **Purpose**: Business logic and external API endpoints
- **Port**: 3000
- **Features**:
  - Methodology management
  - Workflow management
  - Health checks
  - External API endpoints
  - Direct DGraph integration

## Quick Start

### Prerequisites
- Node.js 18+
- Docker and Docker Compose
- DGraph (automatically started via Docker)

### Development Setup

1. **Clone and install dependencies**:
   ```bash
   git clone <repository-url>
   cd context-engine-server
   
   # Install dependencies for all services
   npm run install:all
   ```

2. **Start DGraph services**:
   ```bash
   # Start DGraph in Docker (background)
   npm run dgraph:dev
   ```

3. **Start API server locally**:
   ```bash
   # In a new terminal, start API server with hot reload
   npm run api:dev
   
   # Or with debugging enabled
   npm run api:dev:debug
   ```

4. **Alternative: Start everything together**:
   ```bash
   # Start both DGraph and API server
   npm run dev
   ```

### Individual Service Development

#### Database Service
```bash
# Run migrations
npm run db:migrate

# Apply schema changes
npm run db:schema:apply

# View logs
npm run db:logs:view

# Run tests
npm run test:db
```

#### API Server
```bash
# Start development server
npm run api:dev

# Run tests
npm run test:api

# Build for production
npm run build:api
```

## API Endpoints

### API Server (Port 3000)
- `GET /api/health` - Health check
- `GET /api/health/database` - Database health check

*Note: Methodology and workflow endpoints are planned for future implementation.*

## Docker Deployment Options

This project provides multiple Docker Compose configurations for different deployment scenarios:

### 1. Full Stack Development (Default)
**File**: `docker/compose/full.dev.yml`
**Use Case**: Development, testing, small deployments

```bash
# Start all services (DGraph + API server)
docker-compose -f docker/compose/full.dev.yml up

# Start in background
docker-compose -f docker/compose/full.dev.yml up -d

# View logs
docker-compose -f docker/compose/full.dev.yml logs -f
```

**Services Started**:
- DGraph Zero (port 5080, 6080)
- DGraph Alpha (port 8080, 9080)
- DGraph Ratel UI (port 8000)
- API Server (port 3000)

### 2. API Server Only (Production)
**File**: `docker/compose/api.prod.yml`
**Use Case**: When using external/managed DGraph services

```bash
# Start API server only
docker-compose -f docker/compose/api.prod.yml up

# With external DGraph configuration
DGRAPH_ALPHA_HOST=your-dgraph-host DGRAPH_ALPHA_PORT=8080 docker-compose -f docker/compose/api.prod.yml up
```

**Before running**: Update the environment variables in the file to point to your external DGraph instance.

### 3. DGraph Only (Production)
**File**: `docker/compose/dgraph.prod.yml`
**Use Case**: When API server is deployed elsewhere (Kubernetes, etc.)

```bash
# Start DGraph services only
docker-compose -f docker/compose/dgraph.prod.yml up

# Start in background
docker-compose -f docker/compose/dgraph.prod.yml up -d
```

**Services Started**:
- DGraph Zero (port 5080, 6080)
- DGraph Alpha (port 8080, 9080)
- DGraph Ratel UI (port 8000)

### 4. Full Stack Production
**File**: `docker/compose/full.prod.yml`
**Use Case**: Production environments with resource limits, health checks, and restart policies

```bash
# Production deployment
docker-compose -f docker/compose/full.prod.yml up -d

# With custom DGraph configuration
DGRAPH_ALPHA_HOST=prod-dgraph.example.com docker-compose -f docker/compose/full.prod.yml up -d
```

**Features**:
- Resource limits and reservations (CPU/Memory)
- Restart policies (`unless-stopped`)
- Health checks for all services
- Environment variable support
- Optional DGraph services (can be commented out for external DGraph)
- Production-optimized settings

### Environment Variables for External DGraph

When using external DGraph services, set these environment variables:

```bash
# For API-only or production deployments
export DGRAPH_ALPHA_HOST=your-dgraph-host
export DGRAPH_ALPHA_PORT=8080

# Or use .env file
echo "DGRAPH_ALPHA_HOST=your-dgraph-host" > .env
echo "DGRAPH_ALPHA_PORT=8080" >> .env
```

### Docker Commands Reference

```bash
# Build specific configuration
docker-compose -f docker/compose/full.prod.yml build

# View logs for specific configuration
docker-compose -f docker/compose/api.prod.yml logs -f api-server

# Stop specific configuration
docker-compose -f docker/compose/dgraph.prod.yml down

# Scale services (production)
docker-compose -f docker/compose/full.prod.yml up -d --scale api-server=3
```

## Development

### Root Commands
```bash
# Install all dependencies
npm run install:all

# Start all services in development
npm run dev

# Build all services
npm run build

# Run all tests
npm run test

# View logs
npm run logs

# Clean all builds
npm run clean
```

### Development Commands
```bash
# Local development (recommended)
npm run dev                    # Start DGraph + API server locally
npm run dgraph:dev             # Start DGraph services only
npm run api:dev                # Start API server locally (hot reload)
npm run api:dev:debug          # Start API server with debugging

# Docker development (alternative)
npm run dev:docker             # Start everything in Docker
npm run dev:build              # Build and start in Docker
```

### Production Commands
```bash
# API server only (production)
npm run docker:api             # Start API server only
npm run docker:api:build       # Build and start API server only

# DGraph only (production)
npm run docker:dgraph          # Start DGraph services only
npm run docker:dgraph:build    # Build and start DGraph only

# Full stack production
npm run docker:full:prod       # Production deployment
npm run docker:full:prod:build # Build and deploy production
npm run docker:full:prod:logs  # View production logs
```

### Adding New Features

1. **Database Operations**: Add to `src/database-service/`
2. **Business Logic**: Add to `src/api-server/`

### Testing
```bash
# Database service tests
npm run test:db

# API server tests
npm run test:api

# All tests
npm run test
```

## Production Deployment

### Environment Variables

#### API Server
- `DGRAPH_ALPHA_HOST` - DGraph alpha host (default: alpha)
- `DGRAPH_ALPHA_PORT` - DGraph alpha port (default: 9080)
- `PORT` - API server port (default: 3000)
- `NODE_ENV` - Environment (production/development)

### Docker Production Build
```bash
# Build all services
docker-compose build

# Deploy
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## License

ISC
