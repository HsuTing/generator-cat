'use strict';

import assert from 'yeoman-assert';

export default () => {
  it('src/__tests__/components/Index.js', () => {
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'import Index from \'components/Index\''
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'import indexQuery, {variables as indexVariables} from \'constants/query/indexQuery\''
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'describe(\'Index\', () => {'
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'await relayData(\'http://localhost:8000/graphql/\', indexQuery, indexVariables)(ctx, () => {});'
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      'global.wrapper = mount(<Index />);'
    );
    assert.fileContent(
      'src/__tests__/components/Index.js',
      '<div>{JSON.stringify({index: {data: \'query Index\'}})}</div> // eslint-disable-line react/jsx-key'
    );
  });
};
