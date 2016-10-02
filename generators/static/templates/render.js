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
<% if (radium) { -%>
var Wrapper = require('./../lib/components/radium/Wrapper').default;
<% } -%>

var ENV = Boolean(Number(process.env.NODE_ENV) || 0);

gulp.task('render:html', function() {
  [
    {
<% if(router) { -%>
      location: '/',
      router: require('./../lib/routers/<%= name %>').default,
<% } else { -%>
      component: require('./../lib/omponents/<%= componentName %>').default,
<% } -%>
<% if(redux) { -%>
      store: require('./../lib/stores/<%= name %>').default,
<% } -%>
      name: 'index'
    }
  ].forEach(function(component) {
<% if(router) { -%>
      match({routes: component.component, location: component.location}, function(error, redirextLocation, renderProps) {
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
              markup: renderToStaticMarkup(
                React.createElement('div', null 'not find')
              )
            }))
            .pipe(gulp.dest(process.cwd()));
      });
<% } else { -%>
    gulp.src(ENV ? './views/page.pug' : './views/test-page.pug')
      .pipe(rename(component.name === 'index' ? 'index.html' : name + '/index.html'))
      .pipe(pug({
        locals: {
          markup: renderToStaticMarkup(
<% if(radium) { -%>
            React.createElement(Wrapper, null,
<% if(redux) { -%>
              React.createElement(Provider, {store: component.store}, component.component)
<% } else { -%>
              component.component
<% } -%>
            )
<% } else { -%>
<% if(redux) { -%>
            React.createElement(Provider, {store: component.store}, component.component)
<% } else { -%>
            component.component
<% } -%>
<% } -%>
          )
        }
      }))
      .pipe(gulp.dest(process.cwd()));
<% } -%>
  });
});
