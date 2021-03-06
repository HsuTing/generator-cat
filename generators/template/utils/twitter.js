'use strict';

module.exports = config => [{
  name: 'twitter-site',
  message: 'site of twitter',
  store: true,
  when: require('./when')('twitter', config)
}, {
  name: 'twitter-creator',
  message: 'creator of twitter',
  store: true,
  when: require('./when')('twitter', config)
}];
