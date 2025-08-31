# Docker Deployment Quick Reference

## Development Options

### 1. Local Development (Recommended)
**Best for**: Fast development with full IDE integration
```bash
npm run dev          # Start DGraph + API server locally
npm run dgraph:dev   # Start DGraph services only
npm run api:dev      # Start API server locally (hot reload)
npm run api:dev:debug # Start API server with debugging
```

### 2. Docker Development (Alternative)
**Best for**: Containerized development environment
```bash
npm run dev:docker   # Start everything in Docker
npm run dev:build    # Build and start in Docker
```

## Production Options

### 1. API Server Only (Production)
**Best for**: Using external/managed DGraph services
```bash
npm run docker:api
```
**Configure**: Update `DGRAPH_ALPHA_HOST` and `DGRAPH_ALPHA_PORT` in `docker-compose.api.prod.yml`

### 2. DGraph Only (Production)
**Best for**: API server deployed elsewhere (Kubernetes, etc.)
```bash
npm run docker:dgraph
```

### 3. Full Stack Production
**Best for**: Production with resource limits, health checks, and restart policies
```bash
npm run docker:full:prod
```

## Environment Variables

### For External DGraph
```bash
export DGRAPH_ALPHA_HOST=your-dgraph-host
export DGRAPH_ALPHA_PORT=8080
```

### Using .env File
```bash
echo "DGRAPH_ALPHA_HOST=your-dgraph-host" > .env
echo "DGRAPH_ALPHA_PORT=8080" >> .env
```

## Ports

- **API Server**: 3000
- **DGraph Alpha**: 8080 (GraphQL), 9080 (gRPC)
- **DGraph Zero**: 5080, 6080
- **DGraph Ratel**: 8000

## Quick Commands

```bash
# View logs
npm run logs                    # All services
npm run logs:api               # API server only
npm run logs:dgraph            # DGraph only

# Stop services
npm run dgraph:dev:down        # DGraph development
npm run docker:api:down        # API production
npm run docker:dgraph:down     # DGraph production
npm run docker:full:prod:down  # Full production

# Build and deploy
npm run dev:build              # Docker development with rebuild
npm run docker:full:prod:build # Production with rebuild
```
