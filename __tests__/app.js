'use strict';

// app
import testStatic from './files/app/static';
// server
import server from './files/server/server';
import router from './files/add/router/router';
import fields from './files/server/fields';
// schema
import schema from './files/server/schema';
import index from './files/add/schema/index';
import datatype from './files/add/schema/datatype';
import query from './files/add/schema/query';
import mutation from './files/add/schema/mutation';
// electron
import electron from './files/desktop-app/electron';
import electronBuild from './files/desktop-app/electron-build';
// react
import normalize from './files/react/normalize';
import component from './files/add/react/component';
import testPublic from './files/add/react/public';
// relay
import environment from './files/relay/environment';
import container from './files/add/relay/container';
// webpack
import webpack from './files/webpack/webpack';
// template
import template from './files/template/template';

import testPlugins from './utils/testPlugins';

const testGraphql = ({website, graphql, chooseType, ...config}) => {
  describe(`### ${graphql ? '' : 'no '}graphql`, () => {
    const otherTest = [...config.otherTest];

    if(graphql) {
      if(chooseType === 'server') {
        otherTest.push(schema);
        otherTest.push(fields);
        otherTest.push(index);
        otherTest.push(datatype);
        otherTest.push(query);
        otherTest.push(mutation);
      }

      if(website) {
        otherTest.push(environment);
        otherTest.push(container);
      }
    }

    testPlugins({
      ...config,
      website,
      graphql,
      chooseType,
      otherTest
    });
  });
};

const testTypes = ({chooseType, ...config}) => {
  describe(`## type: ${chooseType}`, () => {
    const otherTest = [...config.otherTest];

    switch(chooseType) {
      case 'none':
        testPlugins({
          ...config,
          otherTest,
          chooseType
        });
        return;

      case 'desktop app':
        otherTest.push(electron);
        otherTest.push(electronBuild);
        otherTest.push(testStatic);
        break;

      case 'server':
        otherTest.push(server);
        otherTest.push(router);
        break;

      case 'docs':
        otherTest.push(testStatic);
        break;
    }

    [true, false].forEach(graphql => {
      testGraphql({
        ...config,
        chooseType,
        graphql,
        otherTest
      });
    });
  });
};

const testWebsite = ({website, ...config}) => {
  describe(`# ${website ? '' : 'no '}website`, () => {
    (website ? [
      'server',
      'desktop app',
      'docs'
    ] : [
      'server',
      'none'
    ]).forEach(chooseType => {
      testTypes({
        ...config,
        website,
        chooseType
      });
    });
  });
};

describe('app', () => {
  testWebsite({
    website: false,
    otherTest: []
  });
  testWebsite({
    website: true,
    subject: 'subject',
    url: 'http://hsuting.com',
    otherSettings: [],
    otherTest: [
      normalize,
      component,
      testPublic,
      webpack,
      template
    ]
  });
});
