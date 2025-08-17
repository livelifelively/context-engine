import { DgraphClient, DgraphClientStub } from 'dgraph-js';
import * as grpc from '@grpc/grpc-js';

export class DGraphService {
  private client: DgraphClient;
  private stub: DgraphClientStub;

  private extractUidFromResponse(response: any): string {
    const uidsMap = response.getUidsMap();
    const entries = Array.from(uidsMap.entries()) as [string, string][];
    
    if (entries.length > 0) {
      return entries[0][1];
    }
    
    throw new Error('Failed to get UID from mutation response');
  }

  constructor() {
    const host = process.env.DGRAPH_ALPHA_HOST || 'localhost';
    const port = process.env.DGRAPH_ALPHA_PORT || '9080';
    
    // Use the standard format for dgraph-js 24.x
    this.stub = new DgraphClientStub(`${host}:${port}`, grpc.credentials.createInsecure());
    this.client = new DgraphClient(this.stub);
  }

  async initialize(): Promise<void> {
    try {
      // Test connection by creating a simple transaction
      const txn = this.client.newTxn();
      await txn.query('{ me(func: has(name)) { uid } }');
      await txn.discard();
      console.log('✅ DGraph connection test successful');
    } catch (error) {
      console.error('❌ DGraph connection test failed:', error);
      throw error;
    }
  }

  async close(): Promise<void> {
    if (this.stub) {
      this.stub.close();
    }
  }

  // DQL Operations
  async createDQL(data: any): Promise<string> {
    const txn = this.client.newTxn();
    try {
      const mu = new (require('dgraph-js').Mutation)();
      mu.setSetJson(data);
      const response = await txn.mutate(mu);
      await txn.commit();
      
      return this.extractUidFromResponse(response);
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  async readDQL(query: string): Promise<any> {
    const txn = this.client.newTxn();
    try {
      const response = await txn.query(query);
      await txn.commit();
      return response.getJson();
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  async updateDQL(uid: string, data: any): Promise<void> {
    const txn = this.client.newTxn();
    try {
      const mu = new (require('dgraph-js').Mutation)();
      mu.setSetJson({ uid, ...data });
      await txn.mutate(mu);
      await txn.commit();
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  async deleteDQL(uid: string): Promise<void> {
    const txn = this.client.newTxn();
    try {
      const mu = new (require('dgraph-js').Mutation)();
      // Use N-Quads format for deletion
      mu.setDelNquads(`<${uid}> * * .`);
      await txn.mutate(mu);
      await txn.commit();
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  // GraphQL Operations
  async createGraphQL(data: any): Promise<string> {
    const txn = this.client.newTxn();
    try {
      const mu = new (require('dgraph-js').Mutation)();
      mu.setSetJson(data);
      const response = await txn.mutate(mu);
      await txn.commit();
      
      return this.extractUidFromResponse(response);
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  async readGraphQL(query: string): Promise<any> {
    const txn = this.client.newTxn();
    try {
      const response = await txn.query(query);
      await txn.commit();
      return response.getJson();
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  async updateGraphQL(uid: string, data: any): Promise<void> {
    const txn = this.client.newTxn();
    try {
      const mu = new (require('dgraph-js').Mutation)();
      mu.setSetJson({ uid, ...data });
      await txn.mutate(mu);
      await txn.commit();
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  async deleteGraphQL(uid: string): Promise<void> {
    const txn = this.client.newTxn();
    try {
      const mu = new (require('dgraph-js').Mutation)();
      // Use N-Quads format for deletion
      mu.setDelNquads(`<${uid}> * * .`);
      await txn.mutate(mu);
      await txn.commit();
    } catch (error) {
      await txn.discard();
      throw error;
    }
  }

  // Schema operations
  async setSchema(schema: string): Promise<void> {
    try {
      const op = new (require('dgraph-js').Operation)();
      op.setSchema(schema);
      await this.client.alter(op);
      console.log('✅ Schema updated successfully');
    } catch (error) {
      console.error('❌ Failed to update schema:', error);
      throw error;
    }
  }

  async getSchema(): Promise<string> {
    try {
      const op = new (require('dgraph-js').Operation)();
      await this.client.alter(op);
      // For now, return empty string as getSchema() method might not be available
      // We can implement a proper schema retrieval later
      return '';
    } catch (error) {
      console.error('❌ Failed to get schema:', error);
      throw error;
    }
  }

  // Legacy methods for backward compatibility
  async create(data: any): Promise<string> {
    return this.createDQL(data);
  }

  async read(query: string): Promise<any> {
    return this.readDQL(query);
  }

  async update(uid: string, data: any): Promise<void> {
    return this.updateDQL(uid, data);
  }

  async delete(uid: string): Promise<void> {
    return this.deleteDQL(uid);
  }
}
