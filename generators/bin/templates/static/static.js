#!/bin/env node

/*
* You need to giva an array in `static.config.js`.
*
* Example:
*
* module.exports = [
*   {
*     router: ture,
*     location: '/',(if `router` is true, you need to give a location to render)
*
*     redux: true,
*     reducer: Reducer, (if `redux` is true, you need to give a reducer)
*     data: data, (if `redux` is true, you can give a inital data or not)
*
*     component: Component, (your main component)
*     name: 'index' (output name of html)
*   }
* ];
*/

var fs = require('fs');
var path = require('path');
var pug = require('pug');
var _ = require('lodash');
var extend = _.merge;
var mkdirp = require('mkdirp');
var clc = require('cli-color');
var React = require('react');
var renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
var config = [];

try {
  config = require('./../static.config.js');
} catch(e) {
  console.log('No config.js');
}

var copyFile = function(component) {
  var fn = pug.compileFile(
    path.resolve(__dirname, './../', component.pug)
  );

  fs.writeFile(
    path.resolve(__dirname, './../', component.name === 'index' ? 'index.html' : component.name + '/index.html'),
    fn(component.locals),
    function(err) {
      if(err)
        throw err;

      console.log(clc.greenBright('rendered ') + clc.cyanBright((component.name === 'index' ? '' : component.name + '/') + 'index.html'));
    }
  );
};

var render = function(component) {
  if(component.name !== 'index') {
    mkdirp(component.name, function(err) {
      if(err)
        throw err;

      copyFile(component);
    });
  } else
    copyFile(component);
};

var radium = function(component) {
  var Wrapper = require('./../lib/components/share/radium/Wrapper').default;

  return React.createElement(Wrapper, null, component);
};

var redux = function(component, reducer, data) {
  var Provider = require('react-redux').Provider;
  var createStore = require('redux').createStore;

  return React.createElement(Provider, {
    store: data === undefined ? createStore(reducer) : createStore(reducer, data)
  }, component);
};

config.forEach(function(component) {
  var markup = React.createElement('div', null, 'not find');
  if(component.router) {
    var match = require('react-router').match;
    var RouterContext = require('react-router').RouterContext;

    match({routes: component.component, location: component.location}, function(error, redirextLocation, renderProps) {
      if(renderProps) {
        if(component.redux)
          markup = redux(React.createElement(RouterContext, renderProps), component.reducer, component.data);
        else
          markup = React.createElement(RouterContext, renderProps);

        render(extend({}, component, {
          locals: {
            markup: renderToStaticMarkup(radium(markup))
          }
        }));
      } else {
        render(extend({}, component, {
          locals: {
            markup: renderToStaticMarkup(markup)
          }
        }));
      }
    });
    return;
  }

  if(component.redux)
    markup = redux(React.createElement(component.component), component.reducer, component.data);
  else
    markup = React.createElement(component.component);

  render(extend({}, component, {
    locals: {
      markup: renderToStaticMarkup(radium(markup))
    }
  }));
});
