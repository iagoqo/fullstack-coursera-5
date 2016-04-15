/* jshint esversion:6 */

var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var Users = require('../models/user');
var Verify = require('./verify');
var passport = require('passport');

var router = express.Router();
router.use(bodyParser.json());

/* GET users listing. */
router.route('/')
  .get(Verify.verifyOrdinaryUser, Verify.verifyAdmin, (req, res, next) => {
    Users.find({}, function(err, user) {
      if (err) throw err;
      res.json(user);
    });
  });
router.route('/register')
  .post(function(req, res) {
    User.register(
      new User({ username: req.body.username }),
      req.body.password,
      function(err, user) {
        if (err) {
          return res.status(500).json({ err: err });
        }
        passport.authenticate('local')(req, res, function() {
          return res.status(200).json({ status: 'Registration Successful!' });
        });
      });
  });

router.route('/login')
  .post(function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({
          err: info
        });
      }
      req.logIn(user, function(err) {
        if (err) {
          return res.status(500).json({
            err: 'Could not log in user'
          });
        }

        var token = Verify.getToken(user);
        res.status(200).json({
          status: 'Login successful!',
          success: true,
          token: token
        });
      });
    })(req, res, next);
  });

router.route('/logout')
  .get(function(req, res) {
    req.logout();
    res.status(200).json({
      status: 'Bye!'
    });
  });

module.exports = router;
