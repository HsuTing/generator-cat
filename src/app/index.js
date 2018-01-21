'use strict';

import Generator from 'yeoman-generator';

module.exports = class App extends Generator {
  initializing() {
    this.log(`
    /\\__/\\
   /'    '\\
 === 0  0 ===
   \\  --  /
  /        \\
 /          \\
|            |
 \\  ||  ||  /
  \\_oo__oo_/#######o
    `);
  }
};
