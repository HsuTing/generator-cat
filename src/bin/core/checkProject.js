// @flow
'use strict';

import {getFileListWithFilter} from 'cat-bin/lib/utils/getFileList';

export default () => {
  const fileList: Array<{
    filePath: string,
    file: string
  }> = getFileListWithFilter('.gitignore')
  .map((
    filePath: string
  )=> ({
    filePath,
    file: filePath.replace(process.cwd(), '')
  }));

  // TODO

  return fileList;
};
