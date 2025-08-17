# GraphQL Guide for Context Engine

This guide shows you how to use GraphQL with your Dgraph setup in the TypeScript/Node.js Context Engine project.

## 🌐 **GraphQL Endpoints**

Your Dgraph setup exposes the following GraphQL endpoints:

- **GraphQL API**: `http://localhost:8080/graphql`
- **GraphQL Admin**: `http://localhost:8080/admin`
- **Ratel GUI**: `http://localhost:8000` (has a GraphQL tab)

## 📊 **Current Schema**

The following GraphQL schema is active (you can customize this):

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

## 🟦 **TypeScript/Node.js Examples**

### Using the DGraphService

```typescript
import { DGraphService } from './src/services/dgraph.service';

async function example() {
  const dgraphService = new DGraphService();
  await dgraphService.initialize();

  try {
    // Create a user
    const uid = await dgraphService.createGraphQL({
      name: "Jane Doe",
      email: "jane@example.com",
      age: 28
    });
    console.log('Created user with UID:', uid);

    // Query users
    const result = await dgraphService.readGraphQL(`
      {
        queryUser {
          uid
          name
          email
          age
        }
      }
    `);
    console.log('Users:', result.queryUser);

  } finally {
    await dgraphService.close();
  }
}

example().catch(console.error);
```

### Using Fetch API

```typescript
async function graphqlQuery() {
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

// Usage
graphqlQuery().then(users => {
  console.log('Users:', users);
});
```

### Using Axios

```typescript
import axios from 'axios';

async function graphqlMutation() {
  const response = await axios.post('http://localhost:8080/graphql', {
    query: `
      mutation {
        addUser(input: [{
          name: "Alice Smith",
          email: "alice@example.com",
          age: 25
        }]) {
          user {
            uid
            name
            email
          }
        }
      }
    `
  });

  return response.data.data.addUser.user;
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

## 🛠️ **Client Libraries for TypeScript/Node.js**

You can use any standard GraphQL client library:

- **Apollo Client**: `npm install @apollo/client graphql`
- **GraphQL Request**: `npm install graphql-request graphql`
- **Relay**: `npm install relay-runtime graphql`
- **Native Fetch**: Built into Node.js 18+
- **Axios**: `npm install axios`

## 🎯 **Best Practices**

1. **Use GraphQL for standard operations** - mutations, queries with filtering
2. **Use DQL for complex graph traversals** - when you need Dgraph-specific features
3. **Define proper indexes** in your schema with `@search` directives
4. **Use fragments** for reusable query parts
5. **Take advantage of variables** for dynamic queries
6. **Use TypeScript interfaces** for type safety

## 🚀 **Getting Started**

1. Your GraphQL schema is already set up
2. GraphQL endpoint is available at `http://localhost:8080/graphql`
3. Try the example queries above
4. Use Ratel's GraphQL tab for interactive testing
5. Integrate with your favorite GraphQL client library
6. Use the `DGraphService` class for programmatic access

## 📦 **Testing GraphQL in Your Project**

```bash
# Run GraphQL-specific tests
npm test -- --run src/services/__tests__/dgraph.service.test.ts -t "GraphQL"

# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## 🔧 **Environment Configuration**

Make sure your environment variables are set:

```bash
# .env file
DGRAPH_ALPHA_HOST=localhost
DGRAPH_ALPHA_PORT=9080
PORT=8008
NODE_ENV=development
```

Now you have both DQL and GraphQL available in your TypeScript/Node.js project - use whichever fits your needs better! 🎉
