'use strict';

import should from 'should'; // eslint-disable-line no-unused-vars
import {graphql} from 'graphql';

import schema from './../schemas/schema';

describe('<%= name %>', () => {
  it('# query <%= name %>', () => graphql(schema, `
    query {
      <%= name %>(input: "test") {
        data
      }
    }
  `).then(result => result)
    .should.be.eventually.equal({
      data: {
        <%= name %>: {
          data: 'query Data'
        }
      }
    }));

  it('# mutation <%= name %>', () => graphql(schema, `
    mutation {
      modify<%= dataName %>(input: {
        data: "test"
      }) {
        newData {
          data
        }
      }
    }
  `).then(result => result)
    .should.be.eventually.equal({
      data: {
        modify<%= dataName %>: {
          newData: {
            data: 'mutation Data'
          }
        }
      }
    }));
});
