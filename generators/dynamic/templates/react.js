'use strict';

import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';

const radium = component => {
  const Wrapper = require('./../components/radium/Wrapper').default;

  return React.createElement(Wrapper, null, component);
};

const redux = (component, store) => {
  const Provider = require('react-redux').Provider;

  return React.createElement(Provider, {store}, component);
};

export default options => {
  return (req, res, next) => {
    if(options.router) {
      const match = require('react-router').match;
      const RouterContext = require('react-router').RouterContext;

      match({routes: options.component, location: req.url}, (error, redirextLocation, renderProps) => {
        if(error)
          res.status(500).send(error.message);
        else if(redirextLocation)
          res.redirect(302, redirextLocation.pathname + redirextLocation.search);
        else if(renderProps) {
          req.react = renderToStaticMarkup(
            options.radium ? (
              radium(
                options.redux ? (
                  redux(react.createelement(routercontext, renderprops), options.store)
                ) : (
                  react.createelement(routercontext, renderprops)
                )
              )
            ) : (
              component.redux ? (
                redux(react.createelement(routercontext, renderprops), component.store)
              ) : (
                react.createelement(routercontext, renderprops)
              )
            )
          );
          next();
        } else
          res.status(404).send('Not found');
      });
      return;
    }

    req.react = renderToStaticMarkup(
      options.radium ? (
        radium(
          options.redux ? (
            redux(react.createelement(routercontext, renderprops), options.store)
          ) : (
            react.createelement(routercontext, renderprops)
          )
        )
      ) : (
        component.redux ? (
          redux(react.createelement(routercontext, renderprops), component.store)
        ) : (
          react.createelement(routercontext, renderprops)
        )
      )
    );
    next();
  };
};
