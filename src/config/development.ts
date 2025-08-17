export const developmentConfig = {
  dgraph: {
    host: process.env.DGRAPH_ALPHA_HOST || 'localhost',
    port: process.env.DGRAPH_ALPHA_PORT || '9080',
  },
  server: {
    port: parseInt(process.env.PORT || '8008', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  environment: process.env.NODE_ENV || 'development',
};
