'use strict';

let jwt = require('jsonwebtoken');
let config = require('./../config');

module.exports = function(req, res, next) {
  try {
    var token = req.headers.authorization.split(' ')[1];
    req.decodedToken = jwt.verify(token, config.secret);
    next();
  }
  catch (e) {
    return res.status(400).json({msg: 'authentication error'});
  }
}
