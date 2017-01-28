'use strict';

const Generator = require('yeoman-generator');
const parseAuthor = require('parse-author');
const _ = require('lodash');
const extend = _.merge;

module.exports = class extends Generator {
  initializing() {
    const pkg = this.fs.readJSON(this.destinationPath('package.json'), {});

    this.props = {
      title: pkg.name,
      description: pkg.description,
      subject: this.config.get('subject'),
      url: this.config.get('url'),
      extension: this.config.get('extension'),
      author: pkg.author
    };

    if(_.isString(pkg.author)) {
      const author = parseAuthor(pkg.author);

      this.props.author = {
        name: author.name,
        email: author.email,
        url: author.url
      };
    }
  }

  prompting() {
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
      default: '',
      when: !this.props.extension,
      filter: function(words) {
        return words === '' ? false : words
      }
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
        if(this.props.other.indexOf(name) === -1)
          this.config.delete(name);
      }.bind(this));
    }.bind(this));
  }

  default() {
    if(this.props.other.indexOf('geo') !== -1)
      this.composeWith(require.resolve('./geo'));
    if(this.props.other.indexOf('google') !== -1)
      this.composeWith(require.resolve('./google'));
    if(this.props.other.indexOf('facebook') !== -1)
      this.composeWith(require.resolve('./facebook'));
    if(this.props.other.indexOf('twitter') !== -1)
      this.composeWith(require.resolve('./twitter'));
  }

  writing() {
    this.props = extend(this.props, {
      geo: this.config.get('geo'),
      google: this.config.get('google'),
      facebook: this.config.get('facebook'),
      twitter: this.config.get('twitter')
    });

    this.fs.copyTpl(
      this.templatePath('template.html'),
      this.destinationPath('views/template.html'),
      this.props
    )
  }

  install() {
    this.yarnInstall('nunjucks', {dev: true});
  }
};
