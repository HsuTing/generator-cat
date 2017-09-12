'use strict';

import path from 'path';
import helpers from 'yeoman-test';

import defaultSetting from './defaultSetting';
import pkg from './../files/pkg';
// app
import editorconfig from './../files/app/editorconfig';
import gitignore from './../files/app/gitignore';
import readme from './../files/app/readme';
// babel
import babelrc from './../files/babel/babelrc';
// eslint
import eslintrc from './../files/eslint/eslintrc';
// npm
import npmignore from './../files/npm/npmignore';
// test
import jest from './../files/test/jest';
import travis from './../files/test/travis';
import testGraphql from './../files/add/jest/graphql';
import pages from './../files/add/jest/pages';
import component from './../files/add/jest/component';

const setSetting = prompts => helpers
  .run(path.resolve(__dirname, './../../generators/app'))
  .withPrompts({
    ...defaultSetting,
    ...prompts
  });

const checkPlugins = plugins => ({
  npm: plugins.includes('npm'),
  test: plugins.includes('test'),
  heroku: plugins.includes('heroku')
});

const runDefaultTest = config => {
  const {website, graphql, chooseType, plugins, otherTest} = config;
  const server = chooseType === 'server';

  editorconfig();
  gitignore({
    website,
    server,
    graphql,
    ...checkPlugins(plugins)
  });
  babelrc({
    website,
    graphql,
    server
  });
  eslintrc({
    website,
    ...checkPlugins(plugins)
  });
  pkg({
    website,
    graphql,
    chooseType,
    keywords: defaultSetting.keywords,
    ...checkPlugins(plugins)
  });
  readme({
    server,
    ...checkPlugins(plugins)
  });

  otherTest.forEach(func => {
    func(config);
  });
};

export default propsConfig => {
  describe('#### no plugins', () => {
    const config = {
      ...propsConfig,
      plugins: []
    };

    beforeAll(() => setSetting(config));

    runDefaultTest(config);
  });

  describe('#### plugins: npm', () => {
    const config = {
      ...propsConfig,
      plugins: ['npm']
    };

    beforeAll(() => setSetting(config));

    runDefaultTest(config);
    npmignore(checkPlugins(config.plugins));
  });

  describe('#### plugins: heroku', () => {
    const config = {
      ...propsConfig,
      plugins: ['heroku']
    };

    beforeAll(() => setSetting(config));

    runDefaultTest(config);
  });

  describe('#### plugins: test', () => {
    const config = {
      ...propsConfig,
      plugins: ['test']
    };
    const {graphql, chooseType, website} = config;

    beforeAll(() => setSetting(config));

    runDefaultTest(config);
    jest(config);
    travis(config);

    if(website)
      component();

    if(chooseType === 'server')
      pages();

    if(graphql)
      testGraphql();
  });
};
