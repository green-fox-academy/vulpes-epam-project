'use strict';

var gulp = require('gulp');
var jscs = require('gulp-jscs');
var stylish = require('jscs-stylish');

var sourceFiles = [
  './client/**/*.js',
  './server/**/*.js',
  './spec/backendSpec/*.js',
  './spec/frontendSpec/*.js',
];

gulp.task('jscsLint', function () {
  return gulp.src(sourceFiles)
  .pipe(jscs())
  .pipe(jscs.reporter(stylish));
});
