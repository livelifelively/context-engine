# GraphQL Guide for Context Engine

This guide shows you how to use GraphQL with your DGraph setup in the Context Engine project with NestJS API server.

## 🌐 **GraphQL Endpoints**

Your DGraph setup exposes the following GraphQL endpoints:

- **DGraph GraphQL API**: `http://localhost:8080/graphql`
- **DGraph Admin**: `http://localhost:8080/admin`
- **Ratel GUI**: `http://localhost:8000` (has a GraphQL tab)
- **NestJS API Server**: `http://localhost:3000` (REST API with DGraph integration)

## 📊 **Current Schema**

The following GraphQL schema is active in DGraph (you can customize this):

```graphql
type User {
  uid: ID!
  name: String! @search(by: [exact])
  email: String! @search(by: [exact])
  age: Int
  created_at: DateTime
}
```

## 🔧 **Setting Up GraphQL Schema**

If you need to update the schema, use:

```bash
curl -X POST localhost:8080/admin/schema \
  -H "Content-Type: text/plain" \
  -d 'type User {
  uid: ID!
  name: String! @search(by: [exact])
  email: String! @search(by: [exact])
  age: Int
  created_at: DateTime
}'
```

## 📝 **Creating Data (Mutations)**

### Add a User

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { addUser(input: [{ name: \"John Doe\", email: \"john@example.com\", age: 30 }]) { user { uid name email age } } }"
  }'
```

### Update a User

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { updateUser(input: { filter: { email: { eq: \"john@example.com\" } }, set: { age: 31 } }) { user { uid name age } } }"
  }'
```

### Delete a User

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "mutation { deleteUser(filter: { email: { eq: \"john@example.com\" } }) { msg numUids } }"
  }'
```

## 📖 **Querying Data**

### Get All Users

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ queryUser { uid name email age } }"}'
```

### Query by Email

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ queryUser(filter: { email: { eq: \"john@example.com\" } }) { uid name email } }"}'
```

### Search by Name (Exact)

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ queryUser(filter: { name: { eq: \"John Doe\" } }) { uid name email } }"}'
```

### Query by Age Range

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ queryUser(filter: { age: { ge: 25, le: 35 } }) { uid name age } }"}'
```

### Complex Filtering

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ queryUser(filter: { and: [{ age: { ge: 25 } }, { name: { eq: \"John Doe\" } }] }) { uid name age } }"
  }'
```

## 🔍 **Introspection**

### Get Schema Types

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { types { name } } }"}'
```

### Get Available Queries

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { queryType { fields { name } } } }"}'
```

### Get Available Mutations

```bash
curl -X POST localhost:8080/graphql \
  -H "Content-Type: application/json" \
  -d '{"query": "{ __schema { mutationType { fields { name } } } }"}'
```

## 🌐 **Using Ratel for GraphQL**

1. Open [http://localhost:8000](http://localhost:8000)
2. Click on the **"GraphQL"** tab (not the default DQL tab)
3. You can now use the GraphQL interface to:
   - Write and execute GraphQL queries
   - Browse the schema
   - See query results in a nice format

## 🟦 **NestJS API Server Integration**

### Using the Health Service

The NestJS API server includes a health service that checks DGraph connectivity:

```bash
# Check API server health
curl http://localhost:3000/api/health

# Check database connectivity
curl http://localhost:3000/api/health/database
```

### Creating a GraphQL Service in NestJS

You can create a GraphQL service in your NestJS application:

```typescript
// src/api-server/src/modules/graphql/graphql.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { fetch } from 'undici';

@Injectable()
export class GraphQLService {
  constructor(private configService: ConfigService) {}

  private getDGraphUrl(): string {
    const host = this.configService.get<string>('DGRAPH_ALPHA_HOST', 'localhost');
    const port = this.configService.get<string>('DGRAPH_ALPHA_PORT', '8080');
    return `http://${host}:${port}/graphql`;
  }

  async executeQuery(query: string, variables?: any) {
    const response = await fetch(this.getDGraphUrl(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return data.data;
  }

  async getUsers() {
    return this.executeQuery(`
      {
        queryUser {
          uid
          name
          email
          age
        }
      }
    `);
  }

  async createUser(userData: { name: string; email: string; age?: number }) {
    return this.executeQuery(`
      mutation {
        addUser(input: [{
          name: "${userData.name}",
          email: "${userData.email}",
          age: ${userData.age || null}
        }]) {
          user {
            uid
            name
            email
            age
          }
        }
      }
    `);
  }
}
```

### Using Fetch API in NestJS

```typescript
// Example of using fetch in a NestJS controller
import { Controller, Get, Post, Body } from '@nestjs/common';
import { fetch } from 'undici';

@Controller('users')
export class UsersController {
  @Get()
  async getUsers() {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          {
            queryUser {
              uid
              name
              email
              age
            }
          }
        `
      }),
    });

    const data = await response.json();
    return data.data.queryUser;
  }

  @Post()
  async createUser(@Body() userData: { name: string; email: string; age?: number }) {
    const response = await fetch('http://localhost:8080/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          mutation {
            addUser(input: [{
              name: "${userData.name}",
              email: "${userData.email}",
              age: ${userData.age || null}
            }]) {
              user {
                uid
                name
                email
                age
              }
            }
          }
        `
      }),
    });

    const data = await response.json();
    return data.data.addUser.user;
  }
}
```

## 🔄 **GraphQL vs DQL**

| Feature | GraphQL | DQL |
|---------|---------|-----|
| **Endpoint** | `/graphql` | `/query` |
| **Schema Required** | ✅ Yes | ❌ No |
| **Type Safety** | ✅ Strong | ⚠️ Flexible |
| **Standard** | ✅ GraphQL Standard | ❌ Dgraph-specific |
| **Client Tools** | ✅ Many available | ⚠️ Limited |
| **Learning Curve** | ✅ Familiar if you know GraphQL | ❌ Dgraph-specific syntax |

## 🛠️ **Client Libraries for NestJS**

You can use any standard GraphQL client library in your NestJS application:

- **GraphQL Request**: `npm install graphql-request graphql`
- **Apollo Client**: `npm install @apollo/client graphql`
- **Native Fetch**: Built into Node.js 18+ (already using undici)
- **Axios**: `npm install axios`

## 🎯 **Best Practices**

1. **Use GraphQL for standard operations** - mutations, queries with filtering
2. **Use DQL for complex graph traversals** - when you need Dgraph-specific features
3. **Define proper indexes** in your schema with `@search` directives
4. **Use fragments** for reusable query parts
5. **Take advantage of variables** for dynamic queries
6. **Use TypeScript interfaces** for type safety
7. **Create dedicated services** in NestJS for GraphQL operations
8. **Use environment variables** for DGraph configuration

## 🚀 **Getting Started**

1. **Start DGraph services**:
   ```bash
   npm run dgraph:dev
   ```

2. **Start NestJS API server**:
   ```bash
   npm run api:dev
   ```

3. **Verify services are running**:
   ```bash
   curl http://localhost:3000/api/health
   curl http://localhost:8080/health
   ```

4. **Try the example queries above**

5. **Use Ratel's GraphQL tab** for interactive testing

6. **Integrate with your NestJS application** using the service examples above

## 📦 **Testing GraphQL in Your Project**

```bash
# Run API server tests
npm run test:api

# Run database service tests
npm run test:db

# Run all tests
npm test
```

## 🔧 **Environment Configuration**

The NestJS API server automatically configures DGraph connection using environment variables:

```bash
# Environment variables (set automatically by docker-compose)
DGRAPH_ALPHA_HOST=localhost
DGRAPH_ALPHA_PORT=8080
NODE_ENV=development
PORT=3000
```

## 📁 **Project Structure**

```
context-engine-server/
├── src/
│   ├── database-service/      # CLI tool for DGraph operations
│   └── api-server/           # NestJS API server with DGraph integration
│       ├── src/
│       │   ├── modules/
│       │   │   ├── health/   # Health checks (includes DGraph connectivity)
│       │   │   └── greet/    # Example module
│       │   └── main.ts       # Application entry point
│       └── Dockerfile        # Production Dockerfile
└── docker-compose.*.yml      # Multiple deployment configurations
```

## 🎉 **Integration Benefits**

- **Direct DGraph Access**: NestJS API server connects directly to DGraph
- **Health Monitoring**: Built-in health checks for DGraph connectivity
- **Type Safety**: Full TypeScript support throughout the stack
- **Development Workflow**: Hot reload for fast development
- **Production Ready**: Docker-based deployment options

Now you have a complete GraphQL setup with DGraph and NestJS API server integration! 🚀
