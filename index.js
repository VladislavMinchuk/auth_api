const config = require('./config');
const express = require('express');
const mongoose = require('mongoose');
const PORT = config.app.port;
// Database config
const db = config.db;
const mongooseConfig = config.mongoose;
const dbUri = `${db.host}:${db.port}/${db.name}`;

// Database connection
mongoose
  .connect(dbUri, mongooseConfig.options)
  .then(() => {
    console.log('Mongo connected!');
  })
  .catch((error) => {
    console.log(error);
  });


async function startServer() {
  const app = express();

  // Connect app loaders
  await require('./loaders')(app);

  // Start App
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
