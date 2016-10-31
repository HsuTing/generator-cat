'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from 'componentsShareRadium/Wrapper';
import <%= componentName %> from 'components<%= componentName %>/<%= componentName %>';

(() => {
  ReactDOM.render(
    <Wrapper>
      <<%= componentName %> />
    </Wrapper>,
    document.getElementById('root')
  );
})();
