/**
 * Created by jsons on 2017/6/22.
 */



var gulp = require('gulp');
var gulpPrefixer = require('./prefixText');

gulp.task('default', function (cb) {
  gulp.src('./data/*.user.js')
    .pipe(gulpPrefixer())
    .pipe(gulp.dest('modified-files'));
});




