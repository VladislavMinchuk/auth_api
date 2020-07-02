const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const hashService = require('../services/hashService');

module.exports = (passport) => {
  // Login Strategy
  passport.use('login', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        const isValidPassword = await hashService.compare(password, user.password);

        if (!user || !isValidPassword) {
          return done(null, false, { message: 'User is not found or password is invalid' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));
};