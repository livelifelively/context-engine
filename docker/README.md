# Docker Configuration

This directory contains all Docker Compose configurations for the Context Engine project.

## 📁 File Structure

```
docker/
├── compose/
│   ├── full.dev.yml      # Full stack development
│   ├── full.prod.yml     # Full stack production
│   ├── api.prod.yml      # API server only (production)
│   ├── dgraph.prod.yml   # DGraph only (production)
│   └── dgraph.dev.yml    # DGraph only (development)
└── README.md             # This file
```

## 🚀 Configuration Types

### Development Configurations

#### `full.dev.yml`
- **Purpose**: Full stack development with DGraph + API server
- **Use Case**: Complete development environment in Docker
- **Services**: DGraph Zero, Alpha, Ratel + API Server
- **Ports**: 3000 (API), 8080 (DGraph), 8000 (Ratel)

#### `dgraph.dev.yml`
- **Purpose**: DGraph services only for local development
- **Use Case**: When running API server locally with DGraph in Docker
- **Services**: DGraph Zero, Alpha, Ratel
- **Ports**: 8080 (DGraph), 8000 (Ratel)

### Production Configurations

#### `full.prod.yml`
- **Purpose**: Full stack production with resource limits and health checks
- **Use Case**: Production deployment with local DGraph
- **Features**: Resource limits, restart policies, health checks
- **Services**: DGraph Zero, Alpha, Ratel + API Server

#### `api.prod.yml`
- **Purpose**: API server only for external DGraph
- **Use Case**: When using managed/external DGraph services
- **Services**: API Server only
- **Configuration**: Update environment variables for external DGraph

#### `dgraph.prod.yml`
- **Purpose**: DGraph services only for production
- **Use Case**: When API server is deployed elsewhere (Kubernetes, etc.)
- **Services**: DGraph Zero, Alpha, Ratel
- **Features**: Resource limits, restart policies

## 🔧 Usage

### Using npm Scripts (Recommended)

```bash
# Development
npm run dev:docker              # Full stack development
npm run dgraph:dev              # DGraph only development

# Production
npm run docker:full:prod        # Full stack production
npm run docker:api              # API only production
npm run docker:dgraph           # DGraph only production
```

### Direct Docker Compose Commands

```bash
# Development
docker-compose -f docker/compose/full.dev.yml up
docker-compose -f docker/compose/dgraph.dev.yml up

# Production
docker-compose -f docker/compose/full.prod.yml up -d
docker-compose -f docker/compose/api.prod.yml up -d
docker-compose -f docker/compose/dgraph.prod.yml up -d
```

## 🌐 Ports

| Service | Port | Purpose |
|---------|------|---------|
| API Server | 3000 | REST API endpoints |
| DGraph Alpha | 8080 | GraphQL API |
| DGraph Alpha | 9080 | gRPC API |
| DGraph Zero | 5080 | Zero service |
| DGraph Zero | 6080 | Zero admin |
| Ratel | 8000 | Web UI |

## 🔍 Environment Variables

### For External DGraph
```bash
DGRAPH_ALPHA_HOST=your-dgraph-host
DGRAPH_ALPHA_PORT=8080
```

### For Local Development
```bash
DGRAPH_ALPHA_HOST=localhost
DGRAPH_ALPHA_PORT=8080
NODE_ENV=development
PORT=3000
```

## 📊 Resource Limits (Production)

| Service | Memory Limit | CPU Limit | Memory Reservation | CPU Reservation |
|---------|-------------|-----------|-------------------|-----------------|
| API Server | 512M | 0.5 | 256M | 0.25 |
| DGraph Zero | 1G | 1.0 | 512M | 0.5 |
| DGraph Alpha | 2G | 2.0 | 1G | 1.0 |
| Ratel | 256M | 0.25 | 128M | 0.1 |

## 🛠️ Troubleshooting

### Check Container Status
```bash
docker-compose -f docker/compose/full.dev.yml ps
```

### View Logs
```bash
docker-compose -f docker/compose/full.dev.yml logs -f
```

### Reset Everything
```bash
docker-compose -f docker/compose/full.dev.yml down -v
docker system prune -f
```

## 📚 Related Documentation

- [Setup Guide](../guides/setup.md) - Complete setup instructions
- [Docker Deployment Guide](../guides/docker-deployment.md) - Quick reference
- [GraphQL Guide](../guides/graphql.md) - GraphQL usage with DGraph
