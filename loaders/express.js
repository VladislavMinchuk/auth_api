const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('../api');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  // Load API routes
  app.use(config.api.prefix, routes());
};
