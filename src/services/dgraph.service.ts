export class DGraphService {
  private graphqlEndpoint: string;

  constructor() {
    const host = process.env.DGRAPH_ALPHA_HOST || 'localhost';
    const port = process.env.DGRAPH_ALPHA_PORT || '8080';
    
    // Use GraphQL endpoint
    this.graphqlEndpoint = `http://${host}:${port}/graphql`;
  }

  async initialize(): Promise<void> {
    try {
      // Test connection with a simple GraphQL query
      const testQuery = `
        query {
          __schema {
            types {
              name
            }
          }
        }
      `;
      
      const response = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: testQuery }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      console.log('✅ DGraph GraphQL connection test successful');
    } catch (error) {
      console.error('❌ DGraph GraphQL connection test failed:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    // No connection to close for HTTP requests
  }

  // GraphQL Operations
  async create(data: any): Promise<string> {
    try {
      // For now, use a simpler approach with direct JSON mutation
      // This will need to be adjusted based on Dgraph's GraphQL schema
      const mutation = `
        mutation {
          add${data['dgraph.type']}(
            input: [{
              name_id: "${data.name_id}",
              document_type: "${data.document_type}",
              title: "${data.title}",
              version: "${data.version}",
              description: "${data.description}",
              sections: [],
              createdAt: "${data.createdAt}",
              updatedAt: "${data.updatedAt}"
            }]
          ) {
            ${data['dgraph.type']} {
              id
            }
          }
        }
      `;

      const response = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      const uid = result.data[`add${data['dgraph.type']}`][data['dgraph.type']][0].id;
      return uid;
    } catch (error) {
      throw error;
    }
  }

  async query(query: string): Promise<any> {
    try {
      const response = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async update(uid: string, data: any): Promise<void> {
    try {
      // Convert data to GraphQL mutation
      const mutation = `
        mutation {
          update${data['dgraph.type']}(
            input: {
              filter: { id: ["${uid}"] }
              set: ${JSON.stringify(data).replace(/"([^"]+)":/g, '$1:')}
            }
          ) {
            ${data['dgraph.type']} {
              id
            }
          }
        }
      `;

      const response = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  async delete(uid: string): Promise<void> {
    try {
      // Convert to GraphQL mutation
      const mutation = `
        mutation {
          delete${this.getTypeFromUid(uid)}(
            filter: { id: ["${uid}"] }
          ) {
            msg
          }
        }
      `;

      const response = await fetch(this.graphqlEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: mutation }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      if (result.errors) {
        throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
      }
    } catch (error) {
      throw error;
    }
  }

  private getTypeFromUid(_uid: string): string {
    // For now, return a default type - this could be enhanced to query the type
    return '_System_Document__Documentation_Driven_Development_Methodology_';
  }

  // Schema operations - these would need to be implemented via admin endpoints
  async setSchema(_schema: string): Promise<void> {
    // This would need to be implemented via admin GraphQL endpoint
    console.log('⚠️ Schema operations not yet implemented for GraphQL');
  }

  async getSchema(): Promise<string> {
    // This would need to be implemented via admin GraphQL endpoint
    console.log('⚠️ Schema operations not yet implemented for GraphQL');
    return '';
  }
}
