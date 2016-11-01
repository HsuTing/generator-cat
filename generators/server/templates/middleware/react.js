'use strict';

/*
* You need to giva an object.
*
* Example:
*
* import renderReact from 'middleware/react';
*
* app.use({
*   router: ture,
*
*   redux: true,
*   reducer: Reducer, (if `redux` is true, you need to give a reducer)
*   data: data, (if `redux` is true, you can give a inital data or not)
*
*   component: Component, (your main component)
* });
*/

import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const radium = (component, req) => {
  const Wrapper = require('componentsShareRadium/Wrapper').default;

  return React.createElement(Wrapper, {radiumConfig: {userAgent: req.headers['user-agent']}}, component);
};

const redux = (component, reducer, data) => {
  const Provider = require('react-redux').Provider;
  const createStore = require('redux').createStore;

  return React.createElement(Provider, {
    store: data === undefined ? createStore(reducer) : createStore(reducer, data)
  }, component);
};

export default options => {
  return (req, res, next) => {
    let markup = null;

    if(options.router) {
      const match = require('react-router').match;
      const RouterContext = require('react-router').RouterContext;

      match({routes: options.component, location: req.url}, (error, redirextLocation, renderProps) => {
        if(error)
          res.status(500).send(error.message);
        else if(redirextLocation)
          res.redirect(302, redirextLocation.pathname + redirextLocation.search);
        else if(renderProps) {
          if(options.redux)
            markup = redux(React.createElement(RouterContext, renderProps), options.reducer, options.data);
          else
            markup = React.createElement(RouterContext, renderProps);

          req.react = renderToStaticMarkup(radium(markup, req));
          next();
        } else
        res.status(404).send('Not found');
      });
      return;
    }

    if(options.redux)
      markup = redux(React.createElement(options.component), options.reducer, options.data);
    else
      markup = React.createElement(options.component);

    req.react = renderToStaticMarkup(radium(markup, req));
    next();
  };
};
