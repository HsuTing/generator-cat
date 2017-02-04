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
    const other = ['geo', 'facebook', 'google', 'twitter', 'firebase'];
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
        return words === '' ? '' : `${words}/`;
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
    this.props.other.forEach(function(name) {
      this.composeWith(require.resolve(`./${name}`));
    }.bind(this));
  }

  writing() {
    this.props = extend(this.props, {
      geo: this.config.get('geo'),
      google: this.config.get('google'),
      facebook: this.config.get('facebook'),
      twitter: this.config.get('twitter'),
      firebase: this.config.get('firebase')
    });

    this.fs.copyTpl(
      this.templatePath('template.html'),
      this.destinationPath('views/template.html'),
      this.props
    )

    this.fs.copy(
      this.templatePath('favicon'),
      this.destinationPath('public/favicon')
    )

    this.fs.copyTpl(
      this.templatePath('manifest.json'),
      this.destinationPath('public/favicon/manifest.json'), {
        extension: this.props.extension
      }
    )
  }

  install() {
    this.yarnInstall('nunjucks', {dev: true});
  }
};
