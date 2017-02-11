'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Wrapper from 'cat-components/lib/Wrapper';
import <%= componentName %> from 'components/<%= componentName %>';

(() => {
  ReactDOM.render(
    <Wrapper>
      <<%= componentName %> />
    </Wrapper>,
    document.getElementById('root')
  );
})();
