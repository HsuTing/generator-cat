'use strict';

import React from 'react';
import radium from 'radium';
import Style from 'componentsShare/Style';

@radium
export default class <%= componentName %> extends React.Component {
  render() {
    return (
      <div>
        <Style />
        This is <%= componentName %>!
      </div>
    );
  }
}
