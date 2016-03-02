'use strict';

var SQL = require('sql-template-strings');

function createQuestionQuery(connection) {
  return {
    getAllQuestion: function (callback) {
      connection.sendQuery('SELECT question_id, type, content FROM questions', callback);
    },

    postQuestion: function (params, callback) {
      connection.sendQuery(
        SQL`
        INSERT INTO questions (type, content)
        VALUES (${params.type}, ${params.content})`,
        callback);
    },
  };
}

module.exports = createQuestionQuery;
