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
// db
import testDb from './../files/db/db';
import tables from './../files/db/tables';
import table from './../files/add/db/table';

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
  const {website, graphql, chooseType, plugins, db, otherTest} = config;
  const server = chooseType === 'server';

  editorconfig();
  gitignore({
    website,
    server,
    ...checkPlugins(plugins)
  });
  babelrc({
    website,
    graphql,
    server,
    db
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
    const {graphql, chooseType} = config;

    beforeAll(() => setSetting(config));

    runDefaultTest(config);
    jest(config);
    travis(config);

    if(chooseType === 'server')
      pages();

    if(graphql)
      testGraphql();
  });

  const {chooseType} = propsConfig;

  if(chooseType === 'server')
    [true, false].forEach(db => {
      describe(`#### ${db ? '' : 'no '}db`, () => {
        const otherTest = [...propsConfig.otherTest];
        const config = {
          ...propsConfig,
          plugins: []
        };

        beforeAll(() => setSetting({
          ...config,
          db
        }));

        if(db) {
          otherTest.push(testDb);
          otherTest.push(tables);
          otherTest.push(table);
        }

        runDefaultTest({
          ...config,
          otherTest,
          db
        });
      });
    });
};
