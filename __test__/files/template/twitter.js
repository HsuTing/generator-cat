'use strict';

import {checkContent} from './template';

export default name => {
  it('twitter.html', () => {
    checkContent(name === 'twitter', '<meta name="twitter:site" content="@site">');
    checkContent(name === 'twitter', '<meta name="twitter:creator" content="@creator">');
  });
};
