/**
 * Protected path
 */

const verifyToken = require('../middlewares/verifyToken');

module.exports = (router) => {
  router.get('/home', verifyToken, (req, res) => {
    return res.json('home');
  });
};
