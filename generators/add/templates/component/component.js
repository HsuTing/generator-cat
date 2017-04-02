'use strict';

import React from 'react';
import radium from 'radium';

import Normalize from 'componentsShare/Normalize';

@radium
export default class <%= componentName %> extends React.Component {
  render() {
    return (
      <div>
        <Normalize />
        This is <%= componentName %>!
      </div>
    );
  }
}
