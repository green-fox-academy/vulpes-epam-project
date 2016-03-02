'use strict';

function createHeartbeatQuery(connection) {
  return {
    get: function (callback) {
      connection.sendQuery('SELECT ok FROM heartbeat', callback);
    },
  };
}

module.exports = createHeartbeatQuery;
