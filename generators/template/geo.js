'use strict';

module.exports = config => [{
  name: 'geo-lat',
  message: 'Latitude of geo tag',
  store: true,
  when: require('./utils/when')('geo', config)
}, {
  name: 'geo-lon',
  message: 'Longitude of geo tag',
  store: true,
  when: require('./utils/when')('geo', config)
}, {
  name: 'geo-placename',
  message: 'Placename of geo tag',
  store: true,
  when: require('./utils/when')('geo', config)
}];
