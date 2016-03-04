'use strict';

var config = require('../config.js');
var bcrypt = require('bcryptjs');

function encryptService() {

  function generateHash(password) {
    var salt = config.ENCRYPT_SALT;
    return bcrypt.hashSync(password, salt);
  }

  function isMatch(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  return {
    generateHash: generateHash,
    isMatch: isMatch,
  };
}

module.exports = encryptService;
