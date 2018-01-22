// @flow
'use strict';

import Base from 'utils/Base';
import meow from 'utils/meow';

module.exports = class App extends Base {
  initializing() {
    this.log(meow`Start to build {red cat} project.`);
  }
};
