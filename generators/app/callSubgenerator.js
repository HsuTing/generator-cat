'use strit'

const Base = require('./../base');

module.exports = class extends Base {
  default() {
    if(this.checkPlugins('react')) {
      this.composeWith(require.resolve('./../template'));
      this.composeWith(require.resolve('./../react'));
      this.composeWith(require.resolve('./../add'), {
        item: this.checkPlugins('relay') ? 'component' : 'relay'
      });
    }

    if(this.checkPlugins('graphql'))
      this.composeWith(require.resolve('./../add'), {
        item: 'schema'
      });

    if(this.checkPlugins('relay'))
      this.composeWith(require.resolve('./../relay'));

    if(this.checkPlugins('server'))
      this.composeWith(require.resolve('./../server'));

    if(this.checkPlugins('npm'))
      this.composeWith(require.resolve('./../npm'));

    // normal subgenerator
    if(!this.getPkg.license)
      this.composeWith('generator-license/app', {
        name: this.getAuthor.name,
        email: this.getAuthor.email,
        website: this.getAuthor.url
      });

    this.composeWith(require.resolve('./../babel'));
    this.composeWith(require.resolve('./../eslint'));
  }

  writing() {
    this.writeFiles({
      editorconfig: '.editorconfig',
      gitignore: '.gitignore',
      'README.md': ['README.md', {
        name: this.getPkg.name,
        description: this.getPkg.description,
        license: this.getPkg.license,
        authorName: this.getAuthor.name,
        authorUrl: this.getAuthor.url
      }]
    });

    if(this.checkPlugins('react') && (this.checkPlugins('docs') || this.checkPlugins('desktop app')))
      this.writeFiles({
        'static.config.js': ['static.config.js', {
          docs: this.checkPlugins('docs')
        }]
      });
  }
}
