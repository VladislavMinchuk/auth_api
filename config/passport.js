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
          return done(null, { status: 401, message: 'User is not found or password is invalid' });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  ));

  // SignUp Strategy
  passport.use('signup', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });
        let newUser = null;
        let hashPassword = null;

        console.log(email, password);
        
        if (user) {
          console.log('No user');
          return done(null, false, { message: 'User already exists' })
        }
        console.log('User registr....');
        hashPassword = await hashService.create(password);
        newUser = await User.create({ email: email, password: hashPassword })
        console.log('User SignUp')
        return done(null, newUser);
      } catch (err) {
        console.log('ERROR')
        return done(err);
      }
    }  
  ))
};