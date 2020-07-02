const mongoose = require('mongoose');
const config = require('../config');
// Database config
const db = config.db;
const mongooseConfig = config.mongoose;
const dbUri = `${db.host}:${db.port}/${db.name}`;

module.exports = async () => {
  // Database connection
  const connection = await mongoose.connect(dbUri, mongooseConfig.options);
  return connection.connection.db;
};
