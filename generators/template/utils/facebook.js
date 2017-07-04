'use strict';

module.exports = config => [{
  name: 'facebook-app_id',
  message: 'app id of facebook',
  store: true,
  when: require('./when')('facebook', config)
}, {
  name: 'facebook_api-api_version',
  message: 'version of facebook api',
  store: true,
  when: require('./when')('facebook_api', config)
}];
