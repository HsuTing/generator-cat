var process = require('process');
var gulp = require('gulp');
var pug = require('gulp-pug');
var rename = require('gulp-rename');
var React = require('react');
var renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
<% if(router) { -%>
var match = require('react-router').match;
var RouterContext = require('react-router').RouterContext;
<% } -%>
<% if(redux) { -%>
var Provider = require('react-redux').Provider;
<% } -%>

var ENV = Boolean(Number(process.env.NODE_ENV) || 0);

var staticRender = function() {
<% if (radium) { -%>
  var Wrapper = require('./../lib/components/radium/Wrapper').default;
<% } -%>

  [
    {
<% if(router) { -%>
      location: '<%= url %>',
      router: require('./../lib/routers/<%= name %>').default,
<% } else { -%>
      component: require('./../lib/components/<%= componentName %>').default,
<% } -%>
<% if(redux) { -%>
      store: require('./../lib/stores/<%= name %>').default,
<% } -%>
      name: 'index'
    }
  ].forEach(function(component) {
<% if(router) { -%>
    if(component.router) {
      match({routes: component.router, location: component.location}, function(error, redirextLocation, renderProps) {
        if(renderProps)
          gulp.src(ENV ? './views/page.pug' : './views/test-page.pug')
            .pipe(rename(component.name === 'index' ? 'index.html' : name + '/index.html'))
            .pipe(pug({
              locals: {
                markup: renderToStaticMarkup(
<% if(radium) { -%>
                  React.createElement(Wrapper, null,
<% if(redux) { -%>
                    React.createElement(Provider, {store: component.store}, React.createElement(RouterContext, renderProps))
<% } else { -%>
                    React.createElement(RouterContext, renderProps)
<% } -%>
                  )
<% } else { -%>
<% if(redux) { -%>
                    React.createElement(Provider, {store: component.store}, React.createElement(RouterContext, renderProps))
<% } else { -%>
                  React.createElement(RouterContext, renderProps)
<% } -%>
<% } -%>
                )
              }
            }))
            .pipe(gulp.dest(process.cwd()));
        else
          gulp.src(ENV ? './views/page.pug' : './views/test-page.pug')
            .pipe(rename(component.name === 'index' ? 'index.html' : name + '/index.html'))
            .pipe(pug({
              locals: {
                markup: renderToStaticMarkup(
                  React.createElement('div', null, 'not find')
                )
              }
            }))
            .pipe(gulp.dest(process.cwd()));
      });
      return;
    }
<% } -%>
    gulp.src(ENV ? './views/page.pug' : './views/test-page.pug')
      .pipe(rename(component.name === 'index' ? 'index.html' : name + '/index.html'))
      .pipe(pug({
        locals: {
          markup: renderToStaticMarkup(
<% if(radium) { -%>
            React.createElement(Wrapper, null,
<% if(redux) { -%>
              React.createElement(Provider, {store: component.store}, React.createElement(component.component))
<% } else { -%>
              component.component
<% } -%>
            )
<% } else { -%>
<% if(redux) { -%>
            React.createElement(Provider, {store: component.store}, React.createElement(component.component))
<% } else { -%>
            component.component
<% } -%>
<% } -%>
          )
        }
      }))
      .pipe(gulp.dest(process.cwd()));
  });
};
gulp.task('static:render', staticRender);

module.exports = staticRender;
