'use strict';

var SQL = require('sql-template-strings');

describe('Question query', function () {
  var connection = {};
  var createQuestionQuery = require('../../server/question/question_query.js');
  var questionQuery = createQuestionQuery(connection);
  var callback;

  beforeEach(function () {
    callback = function () {};

    connection.sendQuery = function (query, callback) {
      return callback(null, [{}]);
    };

    spyOn(connection, 'sendQuery').and.callThrough();
  });

  describe('test getAllQuestion query', function () {
    it('tracks all the arguments of its calls', function () {
      questionQuery.getAllQuestion(callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(
        SQL`
        SELECT question_id, type, content
        FROM questions`,
        callback);
    });
  });

  describe('test postQuestion query', function () {
    it('tracks all the arguments of its calls', function () {
      var params = { content: 'test', type: 'JS' };
      questionQuery.postQuestion(params, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(
        SQL`
        INSERT INTO questions (type, content)
        VALUES (${params.type}, ${params.content})
        RETURNING question_id, type, content`,
        callback);
    });
  });

  describe('test putQuestion query', function () {
    it('tracks all the arguments of its calls', function () {
      var params = { type: 'JS_put', content: 'test_put' };
      var id = 1;
      questionQuery.putQuestion(params, id, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(
        SQL`
        UPDATE questions SET type = ${params.type}, content = ${params.content}
        WHERE question_id= ${id}
        RETURNING question_id, type, content`,
        callback);
    });
  });

  describe('test deleteQuestion query', function () {
    it('tracks all the arguments of its calls', function () {
      var id = 1;
      questionQuery.deleteQuestion(id, callback);

      expect(connection.sendQuery).toHaveBeenCalledWith(
        SQL`
        DELETE FROM questions WHERE question_id= ${id}
        RETURNING question_id`,
        callback);
    });
  });
});
