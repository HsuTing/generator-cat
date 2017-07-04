'use strict';

module.exports = config => [{
  name: 'firebase-firebase_version',
  message: 'version of firebase',
  store: true,
  when: require('./utils/when')('firebase', config)
}, {
  name: 'firebase-apiKey',
  message: 'apiKey of firebase',
  store: true,
  when: require('./utils/when')('firebase', config)
}, {
  name: 'firebase-authDomain',
  message: 'authDomain of firebase',
  store: true,
  when: require('./utils/when')('firebase', config)
}, {
  name: 'firebase-databaseURL',
  message: 'databaseURL of firebase',
  store: true,
  when: require('./utils/when')('firebase', config)
}, {
  name: 'firebase-storageBucket',
  message: 'storageBucket of firebase',
  store: true,
  when: require('./utils/when')('firebase', config)
}, {
  name: 'firebase-messagingSenderId',
  message: 'messagingSenderId of firebase',
  store: true,
  when: require('./utils/when')('firebase', config)
}];
