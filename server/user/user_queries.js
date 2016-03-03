'use strict';

var SQL = require('sql-template-strings');

function createUserQueries(connection) {

  function registNewUser(params, callback) {
    connection.sendQuery(
      SQL`
      INSERT INTO users (email, password)
      VALUES (${params.email}, ${params.password})
      RETURNING user_id, email, isadmin`,
      getFirstItem(callback)
    );
  }

  function findUser(param, callback) {
    connection.sendQuery(
      SQL`
      SELECT user_id, email, password, isadmin FROM users
      WHERE email=${param}`,
      getFirstItem(callback)
    );
  }

  function updateUserAdminStatus(params, callback) {
    connection.sendQuery(
      SQL`
      UPDATE users SET isadmin = ${params.isAdmin}
      WHERE email = ${params.email}
      RETURNING email, isadmin`,
      callback
    );
  }

  function getUsers(callback) {
    connection.sendQuery('SELECT user_id, email, isadmin FROM USERS', callback);
  }

  function getFirstItem(callback) {
    return function (err, res) {
      callback(err, res ? res.rows[0] : null);
    };
  }

  return {
    registNewUser: registNewUser,
    findUser: findUser,
    updateUserAdminStatus: updateUserAdminStatus,
    getUsers: getUsers,
    getFirstItem: getFirstItem,
  };
}

module.exports = createUserQueries;
