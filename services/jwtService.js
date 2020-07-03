const jwt = require('jsonwebtoken');
const signature = 'signature_Secret_1Z';
const expiration = '10m';

module.exports = {
  /**
   * payload: type Object
   * return user id in payload
   */
  generateToken: (payload) => {
    return jwt.sign({ id: payload }, signature, { expiresIn: expiration });
  },
  /**
   * Need to catch error
   */
  decodedToken: (token) => {
    return jwt.verify(token, signature);
  }
}