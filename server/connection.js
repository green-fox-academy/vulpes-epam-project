'use strict';

var pg = require('pg');
var config = require('./config.js');

function createConnection() {
  function sendQuery(query, callback) {
    pg.connect(config.DATABASE_URL, function (connectError, client, done) {
      if (connectError) {
        callback(connectError);
      } else {
        client.query(query, function (queryError, result) {
          done();
          callback(queryError, result);
        });
      }
    });
  }

  return {
    sendQuery: sendQuery,
  };
}

module.exports = createConnection;
