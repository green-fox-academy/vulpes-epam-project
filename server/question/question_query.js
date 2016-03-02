'use strict';

function createQuestionQuery(connection) {
  return {
    getAll: function (callback) {
      connection.sendQuery('SELECT question_id, type, content FROM questions', callback);
    },
  };
}

module.exports = createQuestionQuery;
