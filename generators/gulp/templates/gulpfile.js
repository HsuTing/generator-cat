var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var gulpRequireTasks = require('gulp-require-tasks');
var watch = require('gulp-watch');

gulpRequireTasks({
  path: path.resolve(process.cwd(), './gulp-tasks')
});

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('prepublish', ['nsp']);
<% if(static) { -%>
gulp.task('render', [
  'babel',
  'render-html'
]);
<% } -%>
gulp.task('watch', function() {
  gulp.watch('./src', [
<% if(babel) { -%>
    'babel',
<% } -%>
<% if(eslint) { -%>
    'eslint',
<% } -%>
<% if(static) { -%>
    'render-html'
<% } -%>
  ]);
});
gulp.task('default', [
<% if(eslint) { -%>
  'eslint',
<% } -%>
  'test'
]);
