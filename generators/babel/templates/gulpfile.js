var gulp = require('gulp');
var babel = require('gulp-babel');
var clean = require('gulp-clean');

gulp.task('babel:render', function() {
  return gulp.src('./src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('lib'));
});

gulp.task('babel:clean', function () {
  return gulp.src('./lib')
    .pipe(clean({force: true}));
});

gulp.task('babel', ['babel:clean', 'babel:render']);
