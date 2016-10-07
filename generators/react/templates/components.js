'use strict';

import React from 'react';
<% if(radium) { -%>
import Style from './Style';
<% } -%>

class <%= componentName %> extends React.Component {
  render() {
    return (
      <div>
<% if(radium) { -%>
        <Style />
<% } -%>
        This is <%= componentName %>
      </div>
    );
  }
}

export default <%= componentName %>;
