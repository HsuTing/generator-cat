#!/usr/bin/env node
'use strict';

const postgresql = require('cat-utils/lib/postgresql').default;

const db = new postgresql();

db.create('example', {id: 'TEXT'})
  .then(() => {
    db.insert('test', {
      id: '\'0\''
    });
  })
  .catch(err => {});
