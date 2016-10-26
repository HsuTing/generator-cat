'use strict';

import React from 'react';
import radium from 'radium';

@radium
class Wrapper extends React.Component {
  static propTypes = {
    children: React.PropTypes.element.isRequired
  }

  render() {
    const children = this.props.children;

    return (
      <div>{children}</div>
    );
  }
}

export default Wrapper;
