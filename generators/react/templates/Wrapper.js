'use strict';

import React from 'react';
import radium from 'radium';

@radium
export default class Wrapper extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render() {
    const {children} = this.props;

    return (
      <div>{children}</div>
    );
  }
}
