var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');

var render = function() {
  return gulp.src('./src/**')
    .pipe(babel())
    .pipe(gulp.dest('./lib'));
};

gulp.task('babel:build', ['babel:clean'], render);

gulp.task('babel:clean', function () {
  return gulp.src('./lib')
    .pipe(clean({force: true}));
});

gulp.task('babel:render', render);
