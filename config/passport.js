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
        console.log(password, ' passport');
        console.log(await hashService.create(password));
        console.log(await hashService.compare(password, await hashService.create(password)));
  
        const user = await User.findOne({ email });
        if (!user || hashService.compare(password, user.password)) {
          return done(null, false, { message: 'User is not found or password is invalid' });
        }
      } catch (err) {
          return done(err);
      }
    }
  ));
};