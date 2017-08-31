'use strict';

import fs from 'fs';
import path from 'path';
import chalk from 'chalk';

const getTemplateFolders = now_path => fs.readdirSync(now_path)
  .reduce((result, file) => {
    const childFilePath = path.resolve(now_path, file);
    const stats = fs.lstatSync(childFilePath);

    if(stats.isDirectory())
      return result.concat(getTemplateFolders(childFilePath));

    const pathArray = childFilePath.split(/\//g);
    if(stats.isFile() &&
      pathArray.includes('generator-cat') &&
      pathArray.includes('templates') &&
      !(/.swp/g).test(file)
    )
      result.push(`${
        pathArray
          .slice(pathArray.indexOf('templates') - 1, pathArray.length - 1)
          .filter(folder => folder !== 'templates')
          .join('/')
      }/${
        file
          .split(/\./g)[0]
          .toLowerCase()
      }.js`);

    /* istanbul ignore if */
    if(result.includes(file))
      throw new Error(`Have same name in list: ${file}`);

    return result;
  }, []);

const testFolderRoot = path.resolve(__dirname, './files');
const getTestFolders = now_path => fs.readdirSync(now_path)
  .reduce((result, file) => {
    const childFilePath = path.resolve(now_path, file);
    const stats = fs.lstatSync(childFilePath);

    if(stats.isDirectory())
      return result.concat(getTestFolders(childFilePath));
    else
      result.push(
        childFilePath.replace(testFolderRoot, '').slice(1)
      );

    return result;
  }, [])

const testFolders = getTestFolders(testFolderRoot);
const templateFolders = getTemplateFolders(path.resolve(__dirname, './../generators'))
  .concat(['pkg.js']);

describe('check list', () => {
  it('# should test all template', () => {
    templateFolders.forEach(folder => {
      /* istanbul ignore if */
      if(!testFolders.includes(folder))
        console.log(chalk.red(folder));
    });

    expect(testFolders.sort()).toEqual(templateFolders.sort());
  });

  it('# it should be included in test files', () => {
    testFolders.forEach(folder => {
      const result = (/it\(.+\)/).test(
        fs.readFileSync(path.resolve(testFolderRoot, folder))
      ) || ['template/author.js', 'template/favicon.js'].includes(folder);

      /* istanbul ignore if */
      if(!result)
        console.log(chalk.red(folder));

      expect(result).toBe(true);
    });
  });
});
