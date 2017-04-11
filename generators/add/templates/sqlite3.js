#!/usr/bin/env node
'use strict';

const sqlite = require('cat-utils/lib/sqlite').default;

const db = new sqlite();

db.sqlite.serialize(() => {
  db.create('example', {id: 'TEXT'})
    .then(() => {
      db.insert('test', {
        id: '\'0\''
      });
    })
    .catch(err => {});
});
