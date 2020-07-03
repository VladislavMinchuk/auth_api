/**
 * Middlewares get User id from token
 * req.userId = user id
 */

const jwtService = require('../services/jwtService');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization && authorization.split(' ')[0] === 'Bearer' ? authorization.split(' ')[1] : null;
  
  try {
    if (!token) {
      return res.status(403).send({ auth: false, message: 'No token provided.' });
    }

    req.userId = jwtService.decodedToken(token).id;
  } catch (err) {
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
  }

  next();
}