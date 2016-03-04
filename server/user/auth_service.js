'use strict';

var config = require('../config.js');
var encrypt = require('./encrypt_service.js')();
var Strategy = require('passport-local').Strategy;

function authService(queries) {

  function createStrategy() {
    return new Strategy(
      config.PASSPORT_CONFIG,
      function (email, password, done) {
        queries.findUser(email, function (err, user) {
          try {
            if (err) {
              throw new AuthError(503, 'error', 'Connection error');
            } else if (!user) {
              throw new AuthError(401, 'warn', 'Incorrect username');
            } else if (!encrypt.isMatch(password, user.password)) {
              throw new AuthError(401, 'warn', 'Incorrect password');
            } else {
              return done(null, user);
            }
          } catch (error) {
            return done(error, null);
          }
        });
      });
  }

  function serialize(user, cb) {
    cb(null, user.email);
  }

  function deserialize(email, done) {
    queries.findUser(email, function (err, user) {
      done(err, user);
    });
  }

  function AuthError(status, level, message) {
    return {
      status: status,
      level: level,
      message: message,
    };
  }

  return {
    createStrategy: createStrategy,
    serialize: serialize,
    deserialize: deserialize,
  };

}

module.exports = authService;
