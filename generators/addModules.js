'use strict';

module.exports = function(nowModules, modules) {
  nowModules = nowModules || [];

  modules.forEach(function(module) {
    if(nowModules.indexOf(module) === -1)
      nowModules.push(module);
  });

  return nowModules;
};
