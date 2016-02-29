'use strict';

var SQL = require('sql-template-strings');

function UserQueries(connection) {

  this.registNewUser = function (params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO users (email, password)
      VALUES (${params.email}, ${params.password})
      RETURNING user_id, email, isadmin`,
      callback
    );
  };

  this.findUser = function (param, callback) {
    connection.sendQuery(
      SQL`
      SELECT user_id, email, password, isadmin FROM users
      WHERE email=${param}`,
      callback
    );
  };

  this.updateUserAdminStatus = function (params, callback) {
    connection.sendQuery(
      SQL`
      UPDATE users SET isadmin = ${params.admin}
      WHERE email = ${params.email}
      RETURNING email, isadmin`,
      callback
    );
  };

  this.getUsers = function (callback) {
    connection.sendQuery('SELECT user_id, email, isadmin FROM USERS', callback);
  };
}

module.exports = UserQueries;
