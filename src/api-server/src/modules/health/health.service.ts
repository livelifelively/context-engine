import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class HealthService {
  constructor(private configService: ConfigService) {}

  getHealth() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      service: 'context-engine-api-server',
      version: '0.0.1',
    };
  }

  async getDatabaseHealth() {
    try {
      const dgraphHost = this.configService.get<string>('DGRAPH_ALPHA_HOST', 'localhost');
      const dgraphPort = this.configService.get<string>('DGRAPH_ALPHA_PORT', '8080').replace('9080', '8080');
      
      // Test DGraph connection with a simple GraphQL introspection query
      const response = await axios.post(`http://${dgraphHost}:${dgraphPort}/graphql`, {
        query: '{ __schema { types { name } } }'
      }, {
        timeout: 5000,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      return {
        status: 'ok',
        database: 'DGraph',
        endpoint: `${dgraphHost}:${dgraphPort}`,
        types: response.data.data?.__schema?.types?.length || 0,
      };
    } catch (error) {
      return {
        status: 'error',
        message: 'DGraph database unavailable',
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
