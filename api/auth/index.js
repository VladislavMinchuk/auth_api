const passport = require('passport');
const User = require('../../model/User');

module.exports = (app) => {
  app.post('/signin', 
    passport.authenticate('login')
  );
};
