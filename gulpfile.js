'use strict';

let gulp = require('gulp');
let webpack = require('gulp-webpack');

gulp.task('default', function() {
  return gulp.src('./app.js')
    .pipe(webpack( require('./webpack.config.js') ))
    .pipe(gulp.dest('build/'));
});
