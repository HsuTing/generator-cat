'use strict';

import {graphql} from 'react-relay';

export const variables = {
  input: 'test'
};

export default graphql`
  query <%= queryName %>Query($input: String!) {
    <%= queryName %>(input: $input) {
      data
    }
  }
`;
