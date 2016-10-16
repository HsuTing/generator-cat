'use strict';

import React from 'react';
<% if(radium) { -%>
import Style from 'componentsShare/Style';
<% } -%>

<% if(radium) { -%>
@radium
<% } -%>
export default class <%= componentName %> extends React.Component {
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
