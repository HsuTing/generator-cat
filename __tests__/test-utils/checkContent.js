// @flow
'use strict';

import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import assert from 'yeoman-assert';

/**
 * check content is equal to generate content
 *
 * @param {String} filename - file name
 * @param {Object} options - options for rendering templates
*/
export default (
  filename: string,
  options: {} = {}
) => {
  const content: string = fs.readFileSync(
    path.resolve(
      __dirname,
      './../../templates',
      filename
    ), {
      encoding: 'utf-8'
    }
  );

  assert.fileContent(
    filename,
    ejs.render(
      content,
      options
    )
  );
};
