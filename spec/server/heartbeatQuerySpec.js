'use strict';

describe('heartbeat query', function () {
  var connection = {};
  var createHeartbeatQuery = require('../../server/heartbeat/heartbeat-query.js');
  var heartbeatQuery = createHeartbeatQuery(connection);
  var callback;

  beforeEach(function () {
    callback = function () {};

    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };

    spyOn(connection, 'sendQuery').and.callThrough();
  });

  describe('get query', function () {
    it('tracks all the arguments of its calls', function () {
      heartbeatQuery.get(callback);
      expect(connection.sendQuery).toHaveBeenCalledWith(
        'SELECT ok FROM heartbeat', callback
      );
    });
  });
});
