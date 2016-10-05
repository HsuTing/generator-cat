var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var gulpRequireTasks = require('gulp-require-tasks');
var watch = require('gulp-watch');
var taskListing = require('gulp-task-listing');
<% if(static) { -%>
var staticRender = require('./gulp-tasks/static');
<% } -%>

gulpRequireTasks({
  path: path.resolve(process.cwd(), './gulp-tasks')
});

gulp.task('help', taskListing);

gulp.task('nsp', function(cb) {
  nsp({package: path.resolve('package.json')}, cb);
});

gulp.task('prepublish', ['nsp']);
<% if(static) { -%>
gulp.task('build', [
  'babel:build'
], staticRender);
<% } -%>
<% if(babel) { -%>
gulp.task('watch', ['babel:build'], function() {
<% } else { -%>
gulp.task('watch', function() {
<% } -%>
  gulp.watch('./src/**', [
<% if(babel && eslint) { -%>
    'babel:render',
    'lint'
<% } else if(babel) { -%>
    'babel:render'
<% } else if(eslint) { -%>
    'lint'
<% } -%>
  ]);
});
gulp.task('default', [
<% if(eslint) { -%>
  'lint',
<% } -%>
  'test'
]);
