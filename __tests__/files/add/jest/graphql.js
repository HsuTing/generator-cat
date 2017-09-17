'use strict';

import assert from 'yeoman-assert';
import _ from 'lodash';

export default ({
  website
}) => {
  const name = website ? 'index' : 'data';
  const path = `src/__tests__/graphql/${name}.js`;

  it(path, () => {
    /* eslint-disable no-useless-escape */
    assert.fileContent(path, `describe(\'${name}\', () => {`);
    assert.fileContent(path, `it(\'# query ${name}\', () => expect(graphql(schema, \``);
    assert.fileContent(path, `${name}(input: "test") {`);
    assert.fileContent(path, 'data: {');
    assert.fileContent(path, `it(\'# mutation ${name}\', () => expect(graphql(schema, \``);
    assert.fileContent(path, `modify${_.upperFirst(name)}(input: {`);
    assert.fileContent(path, `modify${_.upperFirst(name)}: {`);
    /* eslint-enable no-useless-escape */
  });
};
