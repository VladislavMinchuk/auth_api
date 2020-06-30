process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/**
 * PORT - application port
 * MONGODB_URI - Mongo DB uri
 * MONGODB_PORT - Mongo DB port
 * MONGODB_NAMEDB - Mongo database name
 */

module.exports = {
  app: {
    port: parseInt(process.env.PORT, 10) || 3000
  },
  db: {
    host: process.env.MONGODB_URI || 'mongodb://127.0.0.1',
    port: parseInt(process.env.MONGODB_PORT, 10) || 27017,
    name: process.env.MONGODB_NAMEDB || 'auth_api'
  },
  mongoose: {
    options: {
      useNewUrlParser: true
    }
  },
  api: {
    prefix: '/api'
  }
};
