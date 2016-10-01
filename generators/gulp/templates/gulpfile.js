var path = require('path');
var gulp = require('gulp');
var gulpRequireTasks = require('gulp-require-tasks');

gulpRequireTasks({
  path: path.resolve(process.cwd(), './gulp-tasks')
});

gulp.task('default', [
]);
