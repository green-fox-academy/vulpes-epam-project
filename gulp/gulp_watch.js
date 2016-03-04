'use strict';

var batch = require('gulp-batch');
var gulp = require('gulp');
var watch = require('gulp-watch');

var sourceFiles = [
  './client/**/*.js',
  '!./client/bundle.js',
  './server/**/*.js',
  './spec/backendSpec/*.js',
  './spec/frontendSpec/*.js',
];

gulp.task('watch', function () {

  console.log('I am watching you');

  watch(sourceFiles, batch(function (events, done) {
    gulp.start('jshint', done);
    gulp.start('jscsLint', done);
  }));

  watch('./client/js/*.js', batch(function (events, done) {
    gulp.start('browserify', done);
  }));

  watch('./client/style/*.scss', batch(function (events, done) {
    gulp.start('sass', done);
  }));
});
