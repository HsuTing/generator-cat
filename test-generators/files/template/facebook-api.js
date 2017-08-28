'use strict';

import {checkContent} from './template';

export default name => {
  it('facebook-api.html', () => {
    checkContent(name === 'facebook api', 'appId: \'app id\',');
    checkContent(name === 'facebook api', 'version: \'app api version\'');
  });
};
