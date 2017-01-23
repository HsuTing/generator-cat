'use strict';

const generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  initializing: function() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      title: pkg.name,
      description: pkg.description,
      subject: this.config.get('subject'),
      url: this.config.get('url'),
      extension: this.config.get('extension'),
      author: pkg.author,
      geo: this.config.get('geo'),
      google: this.config.get('google'),
      facebook: this.config.get('facebook'),
      twitter: this.config.get('twitter')
    };

    if(_.isString(pkg.author)) {
      const author = parseAuthor(pkg.author);

      this.props.author = {
        name: author.name,
        email: author.email,
        url: author.url
      };
    }
  },

  prompting: {
    askForNormal: function() {
      const other = ['geo', 'facebook', 'google', 'twitter'];
      return this.prompt([{
        name: 'subject',
        message: 'Subject of this template',
        when: !this.props.subject,
        store: true
      }, {
        name: 'url',
        message: 'Base url of this template',
        when: !this.props.url,
        store: true
      }, {
        name: 'extension',
        message: 'Extension of static file link',
        when: !this.props.extension,
        filter: function(words) {
          return words === '' ? false : words
        },
        store: true
      }, {
        type: 'checkbox',
        name: 'other',
        message: 'Choose other setting of this template',
        choices: other,
        store: true
      }]).then(function(props) {
        this.props = extend(this.props, props);
        Object.keys(props).forEach(function(name) {
          if(name === 'other')
            return;
          this.config.set(name, props[name]);
        }.bind(this));

        other.forEach(function(name) {
          if(this.props.other.indexOf(name) === -1) {
            this.props[name] = false;
            this.config.delete(name);
          }
        }.bind(this));
      }.bind(this));
    },

    askForGeo: function() {
      if(this.props.other.indexOf('geo') === -1 || this.props.geo)
        return;

      return this.prompt([{
        name: 'lat',
        message: 'Latitude of geo tag',
        store: true
      }, {
        name: 'lon',
        message: 'Longitude of geo tag',
        store: true
      }, {
        name: 'placename',
        message: 'Placename of geo tag',
        store: true
      }]).then(function(props) {
        this.props.geo = props;
        this.config.set('geo', props);
      }.bind(this));
    },

    askForGoogle: function() {
      if(this.props.other.indexOf('google') === -1 || this.props.google)
        return;

      return this.prompt([{
        name: 'id',
        message: 'id of google analytics',
        store: true
      }, {
        name: 'verification_token',
        message: 'verification_token of google site verification',
        store: true
      }, {
        name: 'publisher',
        message: 'publisher of google plus',
        store: true
      }]).then(function(props) {
        this.props.google = props;
        this.config.set('google', props);
      }.bind(this));
    },

    askForFacebook: function() {
      if(this.props.other.indexOf('facebook') === -1 || this.props.facebook)
        return;

      return this.prompt([{
        name: 'app_id',
        message: 'app id of facebook',
        store: true
      }, {
        name: 'version',
        message: 'version of facebook sdk',
        store: true
      }]).then(function(props) {
        this.props.facebook = props;
        this.config.set('facebook', props);
      }.bind(this));
    },

    askForTwitter: function() {
      if(this.props.other.indexOf('twitter') === -1 || this.props.twitter)
        return;

      return this.prompt([{
        name: 'site',
        message: 'site of twitter',
        store: true
      }, {
        name: 'creator',
        message: 'creator of twitter',
        store: true
      }]).then(function(props) {
        this.props.twitter = props;
        this.config.set('twitter', props);
      }.bind(this));
    }
  },

  writing: function() {
    // copy files
    this.fs.copyTpl(
      this.templatePath('template.html'),
      this.destinationPath('views/template.html'),
      this.props
    )
  }
});
