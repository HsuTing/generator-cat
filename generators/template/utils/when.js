'use strict';

module.exports = (
  name,
  config
) => ({
  otherSettings
}) => otherSettings.includes(name) && !config[name];
