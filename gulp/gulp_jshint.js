'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

var sourceFiles = [
  './client/**/*.js',
  '!./client/bundle.js',
  './server/**/*.js',
  './spec/backendSpec/*.js',
  './spec/frontendSpec/*.js',
];

gulp.task('jshint', function () {
  return gulp.src(sourceFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
