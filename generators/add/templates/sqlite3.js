#!/usr/bin/env node
'use strict';

const db = require('cat-utils/lib/sqlite').default;
const create = require('cat-utils/lib/sqlite').create;

db.serialize(() => {
  create('example', {id: 'TEXT'}, err => console.log(err));
});

db.close();
