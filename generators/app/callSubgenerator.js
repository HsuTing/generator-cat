'use strit'

const Base = require('./../base');

/* istanbul ignore next */
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

    if(this.checkPlugins('test'))
      this.composeWith(require.resolve('./../test'));

    if(this.checkPlugins('desktop app'))
      this.composeWith(require.resolve('./../desktop-app'));

    if(this.checkPlugins('build template'))
      this.composeWith(require.resolve('./../build'));

    // normal subgenerator
    if(!this.getPkg.license)
      this.composeWith('generator-license/app', {
        name: this.getAuthor.name,
        email: this.getAuthor.email,
        website: this.getAuthor.url,
        defaultLicense: 'MIT'
      });

    this.composeWith(require.resolve('./../babel'));
    this.composeWith(require.resolve('./../eslint'));
  }

  writing() {
    this.writeFiles({
      editorconfig: '.editorconfig',
      gitignore: ['.gitignore', {
        server: this.checkPlugins('server'),
        react: this.checkPlugins('react'),
        test: this.checkPlugins('test')
      }]
    });

    if(this.checkPlugins('react') && (this.checkPlugins('docs') || this.checkPlugins('desktop app')))
      this.writeFiles({
        'static.config.js': 'static.config.js'
      });
  }

  end() {
    this.composeWith(require.resolve('./readme'));
  }
}
