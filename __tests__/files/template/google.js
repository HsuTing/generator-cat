'use strict';

import checkContent from './../../utils/checkTemplate';

export default name => {
  it('google.html', () => {
    checkContent(
      name === 'google',
      '<meta name="google-site-verification" content="verification token">'
    );
    checkContent(
      name === 'google',
      '<link href="https://plus.google.com/publisher" rel="publisher">'
    );
  });
};
