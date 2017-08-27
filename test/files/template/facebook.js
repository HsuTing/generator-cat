'use strict';

import {checkContent} from './template';

export default name => {
  it('facebook.html', () => {
    checkContent(
      name === 'facebook' || name === 'facebook api',
      '<meta property="fb:app_id" content="app id">'
    );
  });
};
