const Router = require('express').Router;
const authApi = require('./auth');

module.exports = () => {
  const app = Router();

  authApi(app);

  return app;
};
