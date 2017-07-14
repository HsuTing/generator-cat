'use strict';

import React from 'react';
import radium from 'radium';
import Wrapper from 'cat-components/lib/wrapper';

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

/* eslint-disable react/display-name, react/prop-types */
export default ({radiumConfig, ...props}) => (
  <Wrapper radiumConfig={radiumConfig}>
    <<%= componentName %> {...props} />
  </Wrapper>
);
/* eslint-enable react/display-name, react/prop-types */
