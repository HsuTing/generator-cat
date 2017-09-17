'use strit';

const Base = require('./../base');

module.exports = class extends Base {
  default() {
    if(this.checkPlugins('react')) {
      this.composeWith(require.resolve('./../template'));
      this.composeWith(require.resolve('./../react'));
    }

    if(this.checkPlugins('relay'))
      this.composeWith(require.resolve('./../relay'));

    if(this.checkPlugins('server'))
      this.composeWith(require.resolve('./../server'));

    if(this.checkPlugins('npm'))
      this.composeWith(require.resolve('./../npm'));

    if(this.checkPlugins('desktop app'))
      this.composeWith(require.resolve('./../desktop-app'));

    // normal subgenerator
    /* istanbul ignore next */
    if(!this.getPkg.license) {
      this.composeWith('generator-license/app', {
        name: this.getAuthor.name,
        email: this.getAuthor.email,
        website: this.getAuthor.url,
        defaultLicense: 'MIT'
      });
    }

    this.composeWith(require.resolve('./../babel'));
    this.composeWith(require.resolve('./../eslint'));
    this.composeWith(require.resolve('./../test'));
  }

  writing() {
    this.writeFiles({
      editorconfig: '.editorconfig',
      gitignore: ['.gitignore', {
        server: this.checkPlugins('server'),
        react: this.checkPlugins('react'),
        relay: this.checkPlugins('relay'),
        mobile_app: this.checkPlugins('mobile app')
      }]
    });

    if(this.checkPlugins('docs') || this.checkPlugins('desktop app')) {
      this.writeFiles({
        'static.config.js': 'static.config.js'
      });
    }
  }

  end() {
    this.composeWith(require.resolve('./readme'));
  }
};
