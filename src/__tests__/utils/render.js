// @flow
'use strict';

import fs from 'fs';
import path from 'path';
import ejs from 'ejs';

export default (
  dir: string,
  name: string,
  data: {} = {}
): string => {
  const content: string = fs.readFileSync(
    path.resolve(dir, name), {
      encoding: 'utf-8'
    }
  );

  return ejs.render(
    content,
    data
  );
};
