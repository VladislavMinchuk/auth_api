const bodyParser = require('body-parser');
const config = require('../config');
const routes = require('../api');
const passport = require('passport');

module.exports = (app) => {
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  require('../config/passport')(passport);
  // Passport middleware
  app.use(passport.initialize());
  app.use(passport.session());
  
  // Load API routes
  app.use(config.api.prefix, routes());
};
