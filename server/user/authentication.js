'use strict';

var config = require('../config.js');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

function authentication(userController) {

  function createStrategy() {
    return new Strategy(
      config.PASSPORT_CONFIG,
      function (email, password, done) {
        userController.findUser(email, function (err, user) {
          if (err) {
            return done(err, false, 'Connection error');
          } else if (!user) {
            return done(null, false, 'Incorrect username');
          } else if (!isMatch(password, user.password)) {
            return done(null, false, 'Incorrect password');
          } else {
            return done(null, user);
          }
        });
      });
  }

  function generateHash(password) {
    var salt = config.ENCRYPT_SALT;
    return bcrypt.hashSync(password, salt);
  }

  function isMatch(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  function authenticateUser(req, res, next) {
    passport.authenticate('local', function (err, user, info) {
      if (err) {
        res.status(503).send(info);
      } else if (user) {
        userController.loginUser(req, res, user);
      } else {
        res.status(401).send(info);
      }
    })(req, res, next);
  }

  function serialize(user, cb) {
    cb(null, user.email);
  }

  function deserialize(email, done) {
    userController.findUser(email, function (err, user) {
      done(err, user);
    });
  }

  function sessionLogout(req, res) {
    if (req.isAuthenticated()) {
      req.logout();
      res.status(200).send('Successful logout');
    } else {
      res.status(500).send('Nobody logged in');
    }
  }

  function getLoggedInUser(req, res) {
    if (req.isAuthenticated()) {
      res.status(200).send({
        email: req.user.email,
        isadmin: req.user.isadmin,
      });
    } else {
      res.status(204).send('No user in session');
    }
  }

  return {
    createStrategy: createStrategy,
    authenticateUser: authenticateUser,
    generateHash: generateHash,
    serialize: serialize,
    deserialize: deserialize,
    sessionLogout: sessionLogout,
    getLoggedInUser: getLoggedInUser,
  };

}

module.exports = authentication;
