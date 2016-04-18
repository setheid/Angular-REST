'use strict';

let base64Decoder = require('../lib/base64Decoder');

module.exports = function(router, models) {
  let User = models.User;

  router.post('/signup', (req, res) => {
    User.findOne({username: req.body.username}, (err, user) => {
      if (err) return console.log(err);

      if (user) {
        res.json({
          status: 'failure',
          message: 'username already exists'
        });
        return res.end();

      } else if (!req.body.username || !req.body.password) {

        return res.json({
          status: 'failure',
          message: 'a required field is empty'
        });

      } else {

        var newUser = new User(req.body);
        newUser.save((err, user) => {
          if (err) return console.log(err);
          res.json({data: user});
        });
      }
    });
  });

  router.post('/login', (req, res) => {
    let userLogin = base64Decoder(req.headers);
    let userName = userLogin[0];
    let password = userLogin[1];
    User.findOne({username: userName}, (err, user) => {
      if (err) return res.send(err);
      let valid = user.compareHash(password);
      if (!valid) return res.json({status:'failure'});
      res.json({token: user.generateToken()});
    });
  });
}
