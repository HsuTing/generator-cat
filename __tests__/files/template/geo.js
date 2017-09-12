'use strict';

import checkContent from './../../utils/checkTemplate';

export default name => {
  it('geo.html', () => {
    checkContent(name === 'geo', '<meta name="ICBM" content="lat, lon">');
    checkContent(name === 'geo', '<meta name="geo.position" content="lat;lon">');
    checkContent(name === 'geo', '<meta name="geo.placename" content="placename">');
  });
};
