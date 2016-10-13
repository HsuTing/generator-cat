'use strict';

import React from 'react';
import radium from 'radium';

@radium
class Wrapper extends React.Component {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export default Wrapper;
