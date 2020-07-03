const LocalStrategy = require('passport-local').Strategy;
const User = require('../model/User');
const hashService = require('../services/hashService');
const jwtService = require('../services/jwtService');

module.exports = (passport) => {
  // SignIn Strategy
  passport.use('signin', new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    async (email, password, done) => {
      try {
        // Get user without password field
        const user = await User.findOne({ email }, { password: 0 });
        const isValidPassword = await hashService.compare(password, user.password);
        let token = null;

        if (!user || !isValidPassword) {
          return done(null, { status: 401, message: 'User is not found or password is invalid' });
        }
        
        // Generate token
        token = await jwtService.generateToken(user._id);

        // Send new user with token
        return done(null, { auth: true, user, token });
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
        let user = await User.findOne({ email });
        let hashPassword = null;
        let token = null;

        console.log(email, password);
        
        if (user) {
          return done(null, { status: 401, message: 'User already exists' })
        }

        hashPassword = await hashService.create(password);

        // User variable replaced
        user = await User.create({ email: email, password: hashPassword });

        // Generate token
        token = await jwtService.generateToken(user._id);

        // Send new user with token
        return done(null, {
          auth: true,
          user: {
            _id: user._id,
            email: user.email
        }, token });

      } catch (err) {
        console.log('ERROR')
        return done(err);
      }
    }  
  ));
};