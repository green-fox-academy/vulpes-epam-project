'use strict';

var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gulp = require('gulp');

gulp.task('browserify', function () {
  browserify('./client/js/index.js')
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('./client'));
});
