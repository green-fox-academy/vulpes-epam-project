'use strict';

var jasmine = require('gulp-jasmine');
var gulp = require('gulp');

gulp.task('jasmine', function () {
  return gulp.src('./spec/server/*[sS]pec.js')
    .pipe(jasmine());
});
