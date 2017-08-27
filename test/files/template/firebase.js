'use strict';

import {checkContent} from './template';

export default name => {
  it('firebase.html', () => {
    checkContent(
      name === 'firebase',
      '<script src="https://www.gstatic.com/firebasejs/firebase version/firebase-app.js"></script>'
    );
    checkContent(name === 'firebase', 'apiKey: "apiKey",');
    checkContent(name === 'firebase', 'authDomain: "authDomain",');
    checkContent(name === 'firebase', 'databaseURL: "databaseURL",');
    checkContent(name === 'firebase', 'projectId: "projectId",');
    checkContent(name === 'firebase', 'storageBucket: "storageBucket",');
    checkContent(name === 'firebase', 'messagingSenderId: "messagingSenderId"');
  });
};
