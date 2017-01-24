'use strict';

const generator = require('yeoman-generator');
const chalk = require('chalk');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  initializing: function() {
    this.props = {};
  },

  prompting: {
    askForItems: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'items',
        message: 'Choose add items',
        choices: ['component']
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    },

    askForComponent: function() {
      return this.prompt([{
        name: 'componentName',
        message: 'Name of component',
        when: this.props.items.indexOf('component') !== -1,
        filter: function(words) {
          return words[0].toUpperCase() + words.slice(1).toLowerCase();
        }
      }]).then(function(props) {
        this.props = extend(this.props, props);
      }.bind(this));
    }
  },

  writing: {
    addComponent: function() {
      if(this.props.items.indexOf('component') === -1)
        return;

      const componentName = this.props.componentName;

      // copy files
      this.fs.copyTpl(
        this.templatePath('component/public.js'),
        this.destinationPath(`src/public/${componentName.toLowerCase()}.js`), {
          componentName: componentName
        }
      );

      this.fs.copyTpl(
        this.templatePath('component/component.js'),
        this.destinationPath(`src/components/${componentName}.js`), {
          componentName: componentName
        }
      );

      this.log(chalk.cyan('Remember to modify `webpack` and `.babelrc`'));
    }
  }
});
