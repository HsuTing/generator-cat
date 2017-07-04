'use strict';

module.exports = config => [{
  name: 'google-verification_token',
  message: 'verification_token of google site verification',
  store: true,
  when: require('./utils/when')('google', config)
}, {
  name: 'google-publisher',
  message: 'publisher of google plus',
  store: true,
  when: require('./utils/when')('google', config)
}, {
  name: 'google_analytics-googe_id',
  message: 'id of google analytics',
  store: true,
  when: require('./utils/when')('google_analytics', config)
}];
