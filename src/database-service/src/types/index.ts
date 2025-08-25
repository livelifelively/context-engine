// Basic interfaces for DGraph operations
export interface DGraphNode {
  uid?: string;
  [key: string]: any;
}

export interface CreateResponse {
  uid: string;
  success: boolean;
}

export interface QueryResponse {
  data: any;
  success: boolean;
}

export interface MutationResponse {
  success: boolean;
  message?: string;
}

// Environment configuration interface
export interface Config {
  dgraph: {
    host: string;
    port: string;
  };
  server: {
    port: number;
  };
}
