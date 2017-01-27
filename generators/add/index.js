'use strict';

const generator = require('yeoman-generator');
const _ = require('lodash');
const extend = _.merge;

module.exports = generator.extend({
  constructor: function() {
    generator.apply(this, arguments);

    this.option('item', {
      type: String,
      required: false,
      default: '',
      desc: 'Name of item'
    });
  },

  initializing: function() {
    this.props = {
      items: this.options.item === '' ? [] : [
        this.options.item
      ]
    };
  },

  prompting: {
    askForItems: function() {
      return this.prompt([{
        type: 'checkbox',
        name: 'items',
        message: 'Choose add items',
        when: this.props.items.length === 0,
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
        default: 'index',
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
    }
  }
});
