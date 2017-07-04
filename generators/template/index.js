'use strict';

const _ = require('lodash');
const extend = _.merge;

const Base = require('./../base');

module.exports = class extends Base {
  initializing() {
    this.state = this.config.get('template') || {};
    this.addDependencies([
      'nunjucks'
    ]);
  }

  prompting() {
    return this.prompt([{
      name: 'subject',
      message: 'Subject of this template',
      store: true,
      when: !this.state.subject
    }, {
      name: 'url',
      message: 'Base url of this template',
      store: true,
      when: !this.state.url
    }, {
      type: 'checkbox',
      name: 'otherSettings',
      message: 'Choose other settings of this template',
      choices: [
        'geo',
        'facebook',
        'facebook_api',
        'google',
        'google_analytics',
        'twitter',
        'firebase'
      ],
      store: true
    }].concat(
      require('./utils/geo')(this.state),
      require('./utils/facebook')(this.state),
      require('./utils/google')(this.state),
      require('./utils/twitter')(this.state),
      require('./utils/firebase')(this.state)
    )).then(function(state) {
      const otherSettings = {};

      state.otherSettings.forEach(setting => {
        Object.keys(state).forEach(key => {
          if((new RegExp(`${setting}-`)).test(key)) {
            const otherKeys = key.split(/-/);

            if(!otherSettings[otherKeys[0]])
              otherSettings[otherKeys[0]] = {};

            otherSettings[otherKeys[0]][otherKeys[1]] = state[key];
          }
        });
      });

      this.state = extend(this.state, {
        subject: state.subject,
        url: state.url,
        otherSettings: state.otherSettings
      }, otherSettings);
    }.bind(this));
  }

  writing() {
    const pkg = this.getPkg;

    this.config.set('template', this.state);
    this.writeFiles({
      'template.html': ['views/template.html', extend(this.state, {
        title: pkg.name,
        description: pkg.description,
        author: this.getAuthor,
        docs: this.checkPlugins('docs')
      })]
    });
  }

  install() {
    this.addInstall();
  }
};
