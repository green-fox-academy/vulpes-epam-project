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
          if (err) {
            return done(err, false, 'Connection error');
          } else if (!user) {
            return done(null, false, 'Incorrect username');
          } else if (!encrypt.isMatch(password, user.password)) {
            return done(null, false, 'Incorrect password');
          } else {
            return done(null, user);
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

  return {
    createStrategy: createStrategy,
    serialize: serialize,
    deserialize: deserialize,
  };

}

module.exports = authService;
