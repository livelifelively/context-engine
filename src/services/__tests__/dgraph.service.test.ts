import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest';
import { DGraphService } from '../dgraph.service';

describe('DGraphService', () => {
  let dgraphService: DGraphService;

  beforeAll(async () => {
    dgraphService = new DGraphService();
    await dgraphService.initialize();
  });

  afterAll(async () => {
    await dgraphService.close();
  });

  describe('Connection', () => {
    it('should initialize successfully', async () => {
      await expect(dgraphService.initialize()).resolves.not.toThrow();
    });
  });

  describe('DQL Operations', () => {
    let testUid: string;

    beforeEach(async () => {
      // Clean up any existing test data
      if (testUid) {
        try {
          await dgraphService.deleteDQL(testUid);
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    });

    it('should create a node using DQL', async () => {
      const testData = {
        name: 'Test User DQL',
        email: 'test-dql@example.com',
        age: 30
      };

      testUid = await dgraphService.createDQL(testData);
      expect(testUid).toBeDefined();
      expect(typeof testUid).toBe('string');
      expect(testUid.length).toBeGreaterThan(0);
    });

    it('should read data using DQL query', async () => {
      const testData = {
        name: 'Test User DQL Read',
        email: 'test-dql-read@example.com',
        age: 25
      };

      testUid = await dgraphService.createDQL(testData);
      
      const query = `
        {
          users(func: has(name)) {
            uid
            name
            email
            age
          }
        }
      `;

      const result = await dgraphService.readDQL(query);
      expect(result).toBeDefined();
      expect(result.users).toBeDefined();
      expect(Array.isArray(result.users)).toBe(true);
    });

    it('should update a node using DQL', async () => {
      const testData = {
        name: 'Test User DQL Update',
        email: 'test-dql-update@example.com',
        age: 28
      };

      testUid = await dgraphService.createDQL(testData);
      
      const updateData = {
        age: 29,
        email: 'updated-dql@example.com'
      };

      await expect(dgraphService.updateDQL(testUid, updateData)).resolves.not.toThrow();
    });

    it('should delete a node using DQL', async () => {
      const testData = {
        name: 'Test User DQL Delete',
        email: 'test-dql-delete@example.com',
        age: 35
      };

      testUid = await dgraphService.createDQL(testData);
      
      await expect(dgraphService.deleteDQL(testUid)).resolves.not.toThrow();
      
      // Verify deletion
      const query = `{ user(func: uid(${testUid})) { uid name } }`;
      const result = await dgraphService.readDQL(query);
      expect(result.user).toBeDefined();
      expect(result.user.length).toBe(0);
    });
  });

  describe('GraphQL Operations', () => {
    let testUid: string;

    beforeEach(async () => {
      // Clean up any existing test data
      if (testUid) {
        try {
          await dgraphService.deleteGraphQL(testUid);
        } catch (error) {
          // Ignore cleanup errors
        }
      }
    });

    it('should create a node using GraphQL', async () => {
      const testData = {
        name: 'Test User GraphQL',
        email: 'test-graphql@example.com',
        age: 32
      };

      testUid = await dgraphService.createGraphQL(testData);
      expect(testUid).toBeDefined();
      expect(typeof testUid).toBe('string');
      expect(testUid.length).toBeGreaterThan(0);
    });

    it('should read data using GraphQL query', async () => {
      const testData = {
        name: 'Test User GraphQL Read',
        email: 'test-graphql-read@example.com',
        age: 27
      };

      testUid = await dgraphService.createGraphQL(testData);
      
      const query = `
        {
          users(func: has(name)) {
            uid
            name
            email
            age
          }
        }
      `;

      const result = await dgraphService.readGraphQL(query);
      expect(result).toBeDefined();
    });

    it('should update a node using GraphQL', async () => {
      const testData = {
        name: 'Test User GraphQL Update',
        email: 'test-graphql-update@example.com',
        age: 31
      };

      testUid = await dgraphService.createGraphQL(testData);
      
      const updateData = {
        age: 33,
        email: 'updated-graphql@example.com'
      };

      await expect(dgraphService.updateGraphQL(testUid, updateData)).resolves.not.toThrow();
    });

    it('should delete a node using GraphQL', async () => {
      const testData = {
        name: 'Test User GraphQL Delete',
        email: 'test-graphql-delete@example.com',
        age: 38
      };

      testUid = await dgraphService.createGraphQL(testData);
      
      await expect(dgraphService.deleteGraphQL(testUid)).resolves.not.toThrow();
    });
  });

  describe('Schema Operations', () => {
    it('should set and get schema', async () => {
      const testSchema = `
        name: string @index(exact) .
        email: string @index(exact) .
        age: int .
      `;

      await expect(dgraphService.setSchema(testSchema)).resolves.not.toThrow();
      
      const schema = await dgraphService.getSchema();
      expect(schema).toBeDefined();
      expect(typeof schema).toBe('string');
    });
  });

  describe('Legacy Methods', () => {
    it('should work with legacy create/read methods', async () => {
      const testData = {
        name: 'Test Legacy User',
        email: 'test-legacy@example.com',
        age: 40
      };

      const uid = await dgraphService.create(testData);
      expect(uid).toBeDefined();

      const query = `{ user(func: uid(${uid})) { uid name email age } }`;
      const result = await dgraphService.read(query);
      expect(result).toBeDefined();
    });
  });
});
