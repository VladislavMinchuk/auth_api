const Router = require('express').Router;
const authApi = require('./auth');
const homeApi = require('./home');

module.exports = () => {
  const router = Router();

  authApi(router);
  homeApi(router);

  return router;
};
