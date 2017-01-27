#!/bin/env node

const fs = require('fs');
const path = require('path');
const process = require('process');
const nunjucks = require('nunjucks');
const chalk = require('chalk');
const minify = require('html-minifier').minify;
const React = require('react');
const renderToStaticMarkup = require('react-dom/server').renderToStaticMarkup;
const Wrapper = require('./../lib/components/share/Wrapper').default;
const _ = require('lodash');
const extend = _.merge;

const config = [
  {
    component: './../lib/components/Index',
    js: 'index',
    name: 'index'
  }
];
/*
 * Example:
 * You can add any value for template
 *
 * config = [
 *   {
 *     router: ture,
 *     location: '/',(if `router` is true, you need to give a location to render)
 *
 *     redux: true,
 *     reducer: 'PATH TO REDUCER', (if `redux` is true, you need to give a path of reducer)
 *     data: data, (if `redux` is true, you can give a inital data or not)
 *
 *     component: 'PATH TO COMONENT', (your main component)
 *     js: 'index', (name of main js)
 *     name: 'index', (output name of html)
 *
 *     template: 'tempalate.html' (if you need, you can choose your template in `views`)
 *   }
 * ];
*/
const root = path.resolve(__dirname, './../');
nunjucks.configure(path.resolve(root, './views'));

const copyFile = function(html, options) {
  options.content = html;

  const filename = (options.name === 'index' ? '' : options.name + '/') + 'index.html';
  const output = nunjucks.render(
    options.template ? options.template : 'template.html',
    extend(options, {
      ENV: process.env.NODE_ENV
    })
  );

  fs.writeFile(
    path.resolve(root, filename),
    minify(output, {
      removeComments: true,
      collapseWhitespace: true,
      minifyCSS: true,
      minifyURLs: true,
      minifyJS: true
    }),
    function(err) {
      if(err)
        throw err;

      console.log(chalk.green('rendered ') + chalk.cyan(filename));
    }
  );
};

const render = function(component, options) {
  const html = renderToStaticMarkup(component);
  if(options.name !== 'index') {
    fs.mkdir(options.name, function(err) {
      if(err)
        throw err;

      copyFile(html, options);
    });
  } else
    copyFile(html, options);
};

const radium = function(component) {
  return React.createElement(Wrapper, null, component);
};

const redux = function(component, options) {
  const Provider = require('react-redux').Provider;
  const createStore = require('redux').createStore;
  const reducer = require(options.reducer).default;

  return React.createElement(Provider, {
    store: options.data ? createStore(reducer, options.data) : createStore(reducer)
  }, component);
};

const router = function(component, options) {
  const match = require('react-router').match;
  const RouterContext = require('react-router').RouterContext;

  match({routes: component, location: options.location}, function(error, redirextLocation, renderProps) {
    if(renderProps) {
      let output = React.createElement(RouterContext, renderProps);

      if(options.redux)
        output = redux(output, options);

      render(radium(output), options);
    } else {
      render('not find', options);
    }
  });
}

config.forEach(function(options) {
  options.component = require(options.component).default;

  if(options.router) {
    router(options.component, options);
    return;
  }

  let output = React.createElement(options.component);

  if(options.redux)
    output = redux(output, options);

  render(radium(output), options);
});
