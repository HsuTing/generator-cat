'use strict';

import {graphql} from 'graphql';

import schema from 'schemas/schema';

describe('<%= name %>', () => {
  it('# query <%= name %>', () => expect(graphql(schema, `
    query {
      <%= name %>(input: "test") {
        data
      }
    }
  `)).resolves.toMatchObject({
      data: {
        <%= name %>: {
          data: 'query <%= dataName %>'
        }
      }
    }));

  it('# mutation <%= name %>', () => expect(graphql(schema, `
    mutation {
      modify<%= dataName %>(input: {
        data: "test"
      }) {
        newData {
          data
        }
      }
    }
  `)).resolves.toMatchObject({
      data: {
        modify<%= dataName %>: {
          newData: {
            data: 'mutation <%= dataName %>'
          }
        }
      }
    }));
});
