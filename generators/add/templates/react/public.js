'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import <%= componentName %> from 'components/<%= componentName %>';

(() => {
  ReactDOM.render(
    <<%= componentName %> />,
    document.getElementById('root')
  );
})();
