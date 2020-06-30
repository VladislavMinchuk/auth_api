const User = require('../../model/User');

module.exports = (app) => {
  app.post('/signin', (req, res) => {
    console.log(typeof req.body);
    res.send(req.body);
  });
};
