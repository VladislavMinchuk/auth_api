const bcrypt = require('bcrypt');
const passport = require('passport');
const saltRounds = 10;

module.exports = {
  create: (password) => {
    return bcrypt.hash(password, saltRounds)
      .then(hash => hash)
      .catch(error => error);
  },
  compare: (password, hashPassword) => {
    return bcrypt.compare(password, hashPassword)
      .then(result => result)
      .catch(error => error);
  }
}