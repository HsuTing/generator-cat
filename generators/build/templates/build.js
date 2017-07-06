#!/usr/bin/env node
'use strict';

const path = require('path');
const procsee = require('process');
const nunjucks = require('nunjucks');
const memFs = require('mem-fs');
const editor = require('mem-fs-editor');
const chalk = require('chalk');

const store = memFs.create();
const fs = editor.create(store);
const templateName = process.argv[2];



/* add all settings in config
 * {
 *   [template name]: {
 *     source: 'template.js', // source file name in templates
 *     path: './../src', // the path of the output file
 *     extension: '.js', // the extension of the output file
 *     options: {} // the other options for rendering template
 *   }
 * }
*/
const config = ({
})[templateName];



// check template
if(!config)
  throw new Error(`no ${templateName} in templates.`);

// write files
nunjucks.configure(path.resolve(__dirname, './templates'));

fs.write(
  path.resolve(__dirname, config.path, `${process.argv[3]}${config.extension}`),
  nunjucks.render(config.source, config.options || {})
);

fs.commit(err => {
  if(err)
    throw new Error(err);

  console.log(chalk.green('build done'));
});
