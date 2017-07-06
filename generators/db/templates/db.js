#!/usr/bin/env node
'use strict';

const sqlite = require('cat-utils/lib/sqlite').default;

const fields = require('./fields');
const db = new sqlite();

db.sqlite.serialize(() => {
  fields(db);
});
