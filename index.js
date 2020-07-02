const config = require('./config');
const express = require('express');
const PORT = config.app.port;

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
