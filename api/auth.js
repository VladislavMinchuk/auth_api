const passport = require('passport');

module.exports = (router) => {
  router.post('/signin', 
    passport.authenticate('signin', {session: false}),
    (req, res) => {
      if (req.user.status === 401) return res.status(401).send(req.user.message);

      return res.status(200).send(req.user);
    }
  );

  router.post('/signup', 
    passport.authenticate('signup', {session: false}),
    (req, res) => {
      if (req.user.status === 401) return res.status(401).send(req.user.message);
      
      return res.status(200).send(req.user);
    }
  );
};
