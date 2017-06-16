#!/usr/bin/env node
'use strict';

const packager = require('electron-packager');
const rebuild = require('electron-rebuild').default;

const ignore = [
  'src',
  'server.log',
  'bin',
  'graphql.json',
  'webpack.config.js',
  'yarn.lock'
];
const options = {
  platform: 'all',
  dir: './',
  appCopyright: '<%= authorName %>',
  appVersion: '0.0.0',
  icon: './public/favicon/ms-icon-310x310.png',
  name: '<%= name %>',
  ignore,
  out: './apps',
  overwrite: true,
  prune: true,
  afterCopy: [(buildPath, electronVersion, platform, arch, callback) => {
    rebuild(buildPath, electronVersion, arch)
      .then(() => callback())
      .catch((error) => callback(error));
  }]
};

packager(options, (err, appPaths) => {
  if(err)
    return console.log(err);
});
