'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['build']);
