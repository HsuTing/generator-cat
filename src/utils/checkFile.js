// @flow
'use strict';

// TODO not test

import fs from 'fs';
import path from 'path';
import ejs from 'ejs';
import {diffLines} from 'diff';

export default (
  content: string,
  filename: string,
  data: {} = {}
): Array<{}> => {
  const template: string = fs.readFileSync(
    path.resolve(
      __dirname,
      './../../templates',
      filename
    ), {
      encoding: 'utf-8'
    }
  );
  const templateContent: string = ejs.render(
    template,
    data
  );

  return diffLines(
    templateContent,
    content
  );
};
