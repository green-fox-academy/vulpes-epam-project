'use strict';

function createHeartbeat(connection) {
  return {
    get: function (callback) {
      connection.sendQuery('SELECT ok FROM heartbeat', callback);
    },
  };
}

module.exports = createHeartbeat;
