'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function () {
  return gulp.src('./client/style/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./client/style/css'));
});
