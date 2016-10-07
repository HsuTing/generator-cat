var path = require('path');
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var gulpRequireTasks = require('gulp-require-tasks');
var watch = require('gulp-watch');
var taskListing = require('gulp-task-listing');
<% if(type === 'dynamic') { -%>
var exec = require('gulp-exec');
<% } -%>
<% if(type === 'static') { -%>
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
<% if(type === 'static') { -%>

gulp.task('build', [
  'babel:build'
], staticRender);

gulp.task('watch', ['babel:build'], function() {
  gulp.watch('./src/**', [
    'babel:render',
    'lint'
  ]);
});
<% else if(type === 'dynamic') { -%>

gulp.task('server', [
  'babel:build'
], function() {
  gulp.src('./')
    .pipe(exec('NODE_ENV=1 node ./lib/server'))
    .pipe(exec.reporter(reportOptions));
});

gulp.task('server:dev', [
  'babel:render'
], function() {
  gulp.src('./')
    .pipe(exec('node ./lib/server'))
    .pipe(exec.reporter(reportOptions));
});

gulp.task('watch', ['babel:build'], function() {
  gulp.watch('./src/**', [
    'server:dev',
    'lint'
  ]);
});
<% } -%>

gulp.task('default', [
<% if(eslint) { -%>
  'lint',
<% } -%>
  'test'
]);
