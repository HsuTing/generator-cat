'use strict';

import React from 'react';
import radium, {Style as StyleRadium} from 'radium';
import normalize from 'radium-normalize';

@radium
export default class Style extends React.Component {
  render() {
    return (
      <div>
        <StyleRadium rules={normalize} />
        <StyleRadium scopeSelector="a"
                     rules={{color: 'inherit', textDecoration: 'initial'}}
        />
      </div>
    );
  }
}
