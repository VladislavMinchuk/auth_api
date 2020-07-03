const passport = require('passport');
const User = require('../../model/User');

module.exports = (app) => {
  app.post('/signin', 
    passport.authenticate('login', {session: false}),
    (req, res) => {
      if (req.user.status === 401) return res.status(401).send(req.user.message);

      return res.status(200).send(req.user);
    }
  );

  app.post('/signup', 
    passport.authenticate('signup', {session: false}),
    (req, res) => {
      console.log(req.user);
      res.send(req.user);
    }
  );
};
