#!/usr/bin/env node
'use strict';

const postgresql = require('cat-utils/lib/postgresql').default;

const db = new postgresql();

db.pool.on('error', (err, client) => {
  console.error('idle client error', err.message, err.stack)
});

db.create('example', {id: 'TEXT'})
  .then(() => {
    db.insert('test', {
      id: '\'0\''
    });
  })
  .catch(err => {});
