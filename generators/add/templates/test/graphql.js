'use strict';

const should = require('should');
const {graphql} = require('graphql');
const {globalIdField} = require('graphql-relay');

const schema = require('./../lib/schemas/schema').default;

describe('<%= name %>', () => {
  let server = null;
  before(() => {
    server = require('./../lib/server').default;
  });

  it('# query <%= name %>', () => graphql(schema, `
    query {
      <%= name %>(input: "test") {
        data
      }
    }
  `)
    .then(result => JSON.stringify(result))
    .should.be.eventually.equal(
      JSON.stringify({
        data: {
          <%= name %>: {
            data: 'query Data'
          }
        }
      })
    )
  );

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
  `)
    .then(result => JSON.stringify(result))
    .should.be.eventually.equal(
      JSON.stringify({
        data: {
          modify<%= dataName %>: {
            newData: {
              data: 'mutation Data'
            }
          }
        }
      })
    )
  );

  after(() => {
    server.close();
  });
});
