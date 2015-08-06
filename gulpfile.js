'use strict';

var gulp = require('gulp');
var webpack = require('gulp-webpack');
var KarmaServer = require('karma').Server;

gulp.task('webpack:dev', function() {
  return gulp.src('app/js/client.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      }
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('webpack:test', function() {
  return gulp.src('test/karma_tests/entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      }
    }))
    .pipe(gulp.dest('test/karma_tests/'));
});

gulp.task('copy', function() {
  return gulp.src('app/**/*.html')
    .pipe(gulp.dest('build/'));
});

gulp.task('karmatest', ['webpack:test'], function(done) {
  new KarmaServer({
    configFile: __dirname + '/karma.conf.js'
  }, done).start(); 
});

gulp.task('build', ['webpack:dev', 'copy']);
gulp.task('default', ['karmatest', 'build']);

