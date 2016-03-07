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

  describe('GET /api/users', function () {
    it('should respond with an unauthorized status, if the user is not logged in', function (done) {
      request(app)
        .get('/api/users')
        .expect('Content-Type', /text\/html/)
        .expect(401)
        .end(function (err, res) {
          if (err) {
            done.fail(err);
          } else {
            expect(res.text).toEqual('You do not have permission to access this page.');
            done();
          }
        });
    });
  });

  describe('PUT api/users', function () {
    it('should respond with json', function (done) {
      var update = { email: 'smth@fox.com', admin: true };
      request(app)
        .put('/api/users')
        .send(update)
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
