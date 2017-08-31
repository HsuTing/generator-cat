'use strict';

import path from 'path';
import helpers from 'yeoman-test';

import geo from './files/template/geo';
import facebook from './files/template/facebook';
import facebookApi from './files/template/facebook-api';
import google from './files/template/google';
import googleAnalytics from './files/template/google-analytics';
import twitter from './files/template/twitter';
import firebase from './files/template/firebase';

const templates = [{
  name: 'geo',
  prompts: {
    'geo-lat': 'lat',
    'geo-lon': 'lon',
    'geo-placename': 'placename'
  }
}, {
  name: 'facebook',
  prompts: {
    'facebook-app_id': 'app id'
  }
}, {
  name: 'facebook api',
  prompts: {
    'facebook-app_id': 'app id',
    'facebook_api-api_version': 'app api version'
  }
}, {
  name: 'google',
  prompts: {
    'google-verification_token': 'verification token',
    'google-publisher': 'publisher'
  }
}, {
  name: 'google analytics',
  prompts: {
    'google_analytics-google_id': 'google id'
  }
}, {
  name: 'twitter',
  prompts: {
    'twitter-site': 'site',
    'twitter-creator': 'creator'
  }
}, {
  name: 'firebase',
  prompts: {
    'firebase-firebase_version': 'firebase version',
    'firebase-apiKey': 'apiKey',
    'firebase-authDomain': 'authDomain',
    'firebase-databaseURL': 'databaseURL',
    'firebase-projectId': 'projectId',
    'firebase-storageBucket': 'storageBucket',
    'firebase-messagingSenderId': 'messagingSenderId'
  }
}];

describe('template subgenerator', () => {
  templates.forEach(({name, prompts}) => {
    describe(`# ${name}`, () => {
      beforeAll(() => helpers
        .run(path.resolve(__dirname, './../generators/template'))
        .withPrompts({
          website: true,
          subject: 'subject',
          url: 'http://hsuting.com',
          otherSettings: (
            name === 'facebook api' ?
              ['facebook', 'facebook_api'] :
              [name.replace(/ /g, '_')]
          ),
          ...prompts
        }));

      geo(name);
      facebook(name);
      facebookApi(name);
      google(name);
      googleAnalytics(name);
      twitter(name);
      firebase(name);
    });
  });
});
