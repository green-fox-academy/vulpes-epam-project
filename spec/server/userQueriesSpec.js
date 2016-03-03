'use strict';

var SQL = require('sql-template-strings');

describe('User query', function () {
  var connection = {};
  var createUserQueries = require('../../server/user/user_queries.js');
  var userQueries = createUserQueries(connection);
  var callback;

  beforeEach(function () {
    callback = function () {};

    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };

    spyOn(connection, 'sendQuery');
  });

  describe('test registrateUser query', function () {
    it('tracks all the arguments of its calls', function () {
      var params = { email: 'test@test.com', password: '1234' };
      userQueries.registNewUser(params, callback);

      expect(connection.sendQuery).toHaveBeenCalled();
    });
  });

  describe('test getUsers query', function () {
    it('tracks all the arguments of its calls', function () {
      userQueries.getUsers(callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(
      'SELECT user_id, email, isadmin FROM USERS',
      callback);
    });
  });

  describe('test updateUserAdminStatus query', function () {
    it('tracks all the arguments of its calls', function () {
      var params = { email: 'test@test.com', admin: true };
      userQueries.updateUserAdminStatus(params, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(SQL`
      UPDATE users SET isadmin = ${params.isAdmin}
      WHERE email = ${params.email}
      RETURNING email, isadmin`,
      callback);
    });
  });
});
