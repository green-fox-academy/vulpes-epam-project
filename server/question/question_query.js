'use strict';

var SQL = require('sql-template-strings');

function createQuestionQuery(connection) {
  return {
    getAllQuestion: function (callback) {
      connection.sendQuery(
        SQL`
        SELECT question_id, type, content
        FROM questions`,
        callback);
    },

    postQuestion: function (params, callback) {
      connection.sendQuery(
        SQL`
        INSERT INTO questions (type, content)
        VALUES (${params.type}, ${params.content})
        RETURNING question_id, type, content`,
        callback);
    },

    putQuestion: function (params, id, callback) {
      console.log('PUTPUTPUT');
      connection.sendQuery(
        SQL`
        UPDATE questions SET type = ${params.type}, content = ${params.content}
        WHERE question_id= ${id}
        RETURNING question_id, type, content`,
        callback);
    },

    deleteQuestion: function (id, callback) {
      connection.sendQuery(
        SQL`
        DELETE FROM questions WHERE question_id= ${id}
        RETURNING question_id`,
        callback);
    },
  };
}

module.exports = createQuestionQuery;
