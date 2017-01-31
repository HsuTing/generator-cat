'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import IsomorphicRelay from 'isomorphic-relay';
import Wrapper from 'componentsShare/Wrapper';
import <%= name.toLowerCase() %> from 'containers/<%= name.toLowerCase() %>';

const environment = new Relay.Environment();

environment.injectNetworkLayer(new Relay.DefaultNetworkLayer('/graphql'));
IsomorphicRelay.injectPreparedData(environment, data); // eslint-disable-line no-undef

(() => {
  IsomorphicRelay.prepareInitialRender({...<%= name.toLowerCase() %>({input: 'input'}), environment}).then(props => {
    ReactDOM.render(
      <Wrapper>
        <IsomorphicRelay.Renderer {...props} />
      </Wrapper>,
      document.getElementById('root')
    );
  });
})();
