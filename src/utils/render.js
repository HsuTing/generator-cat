// @flow
'use strict';

import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

export default (
  name: string,
  data: {} = {}
): string => {
  const content: string = fs.readFileSync(
    path.resolve(
      __dirname,
      './../../templates',
      name
    ), {
      encoding: 'utf-8'
    }
  );

  return ejs.render(
    content,
    data
  );
};
