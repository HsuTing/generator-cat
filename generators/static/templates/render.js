var gulp = require('gulp');
var pug = require('gulp-pug');
var merge = require('merge-stream');
var React = require('react');
var renderToString = require('react-dom/server').renderToString;
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

gulp.task('render', function() {
  console.log('render html');

  return Merge(
    [
      {
<% if(router) { -%>
        location: '/',
<% } -%>
<% if(redux) { -%>
        store: require('./../lib/stores'),
<% } -%>
        component: require('./../lib/omponents'),
        name: 'index'
      }
    ].map(function(component) {
<% if(router) { -%>
        return function() {
          match({routes: component.component, location: component.location}, function(error, redirextLocation, renderProps) {
            if(renderProps) {
              gulp.src(ENV ? './../views/page.pug' : './../views/test-page.pug')
                .pipe(pug({
                  content: renderToStaticMarkup(
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
                }))
                .pipe(gulp.dest(component.name === 'index' ? 'index.html' : name + '/index.html'));
            }
            else {
              gulp.src(ENV ? './../views/page.pug' : './../views/test-page.pug')
                .pipe(pug({
                  content: renderToStaticMarkup(
                    React.createElement('div', null 'not find')
                  )
                }))
                .pipe(gulp.dest(component.name === 'index' ? 'index.html' : name + '/index.html'));
            }
          });
        };
<% } else { -%>
      return gulp.src(ENV ? './../views/page.pug' : './../views/test-page.pug')
        .pipe(pug({
          content: renderToString(
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
        }))
        .pipe(gulp.dest(component.name === 'index' ? 'index.html' : name + '/index.html'));
<% } -%>
    })
  );
});
