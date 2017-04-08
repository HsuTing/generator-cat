#!/usr/bin/env node
'use strict';

const process = require('process');
const path = require('path');
const shell = require('shelljs');
const packager = require('electron-packager');

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
  prune: true
};

packager(options, (err, appPaths) => {
  if(err)
    return console.log(err);

  appPaths.forEach(appPath => {
    let folderPath = path.resolve(
      process.cwd(),
      appPath,
      '<%= name.replace(/ /, '-') %>.app',
      'Contents/Resources/app'
    );

    if(appPath.includes('linux') || (appPath.includes('win') && !appPath.includes('darwin')))
      folderPath = path.resolve(
        process.cwd(),
        appPath,
        'resources/app'
      );

    shell.rm('-rf', path.resolve(folderPath, 'node_modules'));
    shell.cp('-R', path.resolve(process.cwd(), 'node_modules'), folderPath);
  });
});
