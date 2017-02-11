#!/usr/bin/env node
'use strict';

const db = require('cat-utils/lib/sqlite').default;

db.serialize(() => {
  db.run(`CREATE TABLE example (id TEXT)`);
});

db.close();
