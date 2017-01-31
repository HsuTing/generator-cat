#!/bin/env node

const fs = require('fs');
const path = require('path');
const graphql  = require('graphql').graphql;
const introspectionQuery = require('graphql/utilities').introspectionQuery;
const printSchema = require('graphql/utilities').printSchema;

const schema = require('./../lib/schemas/schema').default;

const schemaPath = path.resolve(__dirname, './../');

graphql(schema, introspectionQuery).then(result => {
  fs.writeFileSync(
    path.resolve(schemaPath, 'schema.json'),
    JSON.stringify(result, null, 2)
  );
});

fs.writeFileSync(
  path.resolve(schemaPath, 'schema.graphql'),
  printSchema(schema)
);
