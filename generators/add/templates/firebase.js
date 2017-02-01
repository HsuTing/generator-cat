'use strict';

import * as firebase from 'firebase';

firebase.initializeApp({
  apiKey: '<%= apiKey %>',
  authDomain: '<%= authDomain %>',
  databaseURL: '<%= databaseURL %>',
  storageBucket: '<%= storageBucket %>',
});

export default firebase;
