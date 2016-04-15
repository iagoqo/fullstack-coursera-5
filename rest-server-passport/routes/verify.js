var User = require('../models/user');
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var config = require('../config.js');

exports.getToken = getToken;
exports.verifyOrdinaryUser = verifyOrdinaryUser;
exports.verifyAdmin = verifyAdmin;

/////

function getToken(user) {
  return jwt.sign(user, config.secretKey, {
    expiresIn: 3600
  });
}

function verifyOrdinaryUser(req, res, next) {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, config.secretKey, function(err, decoded) {
      if (err) {
        var error = new Error('You are not authenticated!');
        error.status = 401;
        return next(error);
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    var error = new Error('No token provided!');
    error.status = 403;
    return next(error);
  }
}

function verifyAdmin(req, res, next) {
  var admin = req.decoded._doc.admin;

  if (admin) {
    next();
  } else {
    var error = new Error('Not an admin!');
    return next(error);
  }
}
