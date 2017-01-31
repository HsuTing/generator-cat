'use strict';

import path from 'path';
import React from 'react';
import nunjucks from 'nunjucks';
import {renderToStaticMarkup} from 'react-dom/server';
import IsomorphicRelay from 'isomorphic-relay';
import Wrapper from 'componentsShare/Wrapper';

nunjucks.configure(path.resolve(__dirname, './../../views'));

export default options => {
  return ctx => {
    return IsomorphicRelay.prepareData(options.rootContainerProps, options.networkLayer)
      .then(({data, props}) => {
        const content = renderToStaticMarkup(
          <Wrapper radiumConfig={{userAgent: ctx.request.headers['user-agent']}}>
            <IsomorphicRelay.Renderer {...props} />
          </Wrapper>
        );
        ctx.body = nunjucks.render(
          options.template ? options.template : 'template.html',
          Object.assign({}, options, {
            content,
            data: JSON.stringify(data)
          })
        );
      });
  };
};
