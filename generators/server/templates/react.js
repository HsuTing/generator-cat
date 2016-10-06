'use strict';

import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
<% if(router) { -%>
import {match, RouterContext} from 'react-router';
<% } -%>
<% if(redux) { -%>
import {Provider} from 'react-redux';
<% } -%>
<% if(radium) { -%>
import Wrapper from './../components/radium/Wrapper';
<% } -%>

export default options => {
  return (req, res, next) => {
<% if(router) { -%>
    if(options.type === 'router') {
      match({routes: options.component, location: req.url}, (error, redirextLocation, renderProps) => {
        if(error)
          res.status(500).send(error.message);
        else if(redirextLocation)
          res.redirect(302, redirextLocation.pathname + redirextLocation.search);
        else if(renderProps) {
          req.react = renderToStaticMarkup(
<% if(radium) { -%>
            React.createElement(Wrapper, {radiumConfig: {userAgent: req.headers['user-agent']}},
<% if(redux) { -%>
              React.createElement(Provider, {store: options.store}, React.createElement(RouterContext, renderProps))
<% } else { -%>
              React.createElement(RouterContext, renderProps)
<% } -%>
            )
<% } else { -%>
<% if(redux) { -%>
            React.createElement(Provider, {store: options.store}, React.createElement(RouterContext, renderProps))
<% } else { -%>
            React.createElement(RouterContext, renderProps)
<% } -%>
<% } -%>
          );
          next();
        } else
          res.status(404).send('Not found');
      });
      return;
    }
<% } -%>
    req.react = renderToStaticMarkup(
<% if(radium) { -%>
      React.createElement(Wrapper, {radiumConfig: {userAgent: req.headers['user-agent']}},
<% if(redux) { -%>
        React.createElement(Provider, {store: options.store}, options.component)
<% } else { -%>
        options.component
<% } -%>
      )
<% } else { -%>
<% if(redux) { -%>
      React.createElement(Provider, {store: options.store}, options.component)
<% } else { -%>
      options.component
<% } -%>
<% } -%>
    );
    next();
  };
};
