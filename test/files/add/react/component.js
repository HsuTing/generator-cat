'use strict';

import assert from 'yeoman-assert';

const checkContent = (status, content) => (
  status ?
    assert.fileContent('src/components/Index.js', content) :
    assert.noFileContent('src/components/Index.js', content)
);

export default ({
  graphql
}) => {
  it('src/components/Index.js', () => {
    checkContent(true, 'class Index extends React.Component {');
    checkContent(true, 'This is Index!');
    checkContent(true, '<Index {...props} />');

    checkContent(graphql, 'import IndexContainer from \'containers/IndexContainer\';');
    checkContent(graphql, '<IndexContainer />');
  });
};
