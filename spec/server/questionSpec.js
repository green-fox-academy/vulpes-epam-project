'use strict';

describe('Controller', function () {
  var request = require('supertest');
  var createServer = require('../../server/server');
  var app;

  beforeEach(function () {
    var connection = {};
    connection.sendQuery = function (query, callback) {
      return callback(null, { rows: [{}] });
    };

    app = createServer(connection);
  });

  describe('GET /api/questions', function () {
    it('should respond with json', function (done) {
      request(app)
        .get('/api/questions')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });

  describe('POST api/questions', function () {
    it('should respond with json', function (done) {
      var data = { type: 'JS', content: 'test' };
      request(app)
        .post('/api/questions')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });

  describe('PUT api/questions/1', function () {
    it('should respond with json', function (done) {
      var data = { type: 'JS', content: 'test' };
      request(app)
        .put('/api/questions/1')
        .send(data)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });

  describe('DELETE api/questions/1', function () {
    it('should respond with json', function (done) {
      request(app)
        .put('/api/questions/1')
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.body).toEqual([{}]);
            done();
          }
        });
    });
  });
});
