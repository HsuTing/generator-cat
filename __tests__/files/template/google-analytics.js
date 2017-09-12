'use strict';

import checkContent from './../../utils/checkTemplate';

export default name => {
  it('google-analytics.html', () => {
    checkContent(name === 'google analytics', 'ga(\'create\', \'google id\', \'auto\');');
  });
};
