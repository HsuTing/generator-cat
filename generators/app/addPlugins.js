'use strict';

module.exports = (type) => {
  const plugins = [];

  if(type.indexOf('website') !== -1) {
    plugins.push('react');

    if(type.indexOf('server') === -1)
      plugins.push('websiteNoServer');
  }

  if(type.indexOf('graphql') !== -1) {
    plugins.push('graphql');

    if(type.indexOf('website') !== -1)
      plugins.push('relay');
  }

  return plugins;
};
