'use strict';

import React from 'react';
import radium from 'radium';
import Wrapper from 'cat-components/lib/Wrapper';

import Normalize from 'componentsShare/Normalize';

@radium
class <%= componentName %> extends React.Component {
  render() {
    return (
      <div>
        <Normalize />

        This is <%= componentName %>!
      </div>
    );
  }
}

/* eslint-disable */
export default () => (
  <Wrapper>
    <<%= componentName %> />
  </Wrapper>
);
/* eslint-enable */
