#!/usr/bin/env node
'use strict';

import sqlite from 'cat-utils/lib/sqlite';

import tables from 'constants/tables';

const db = new sqlite();

db.sqlite.serialize(() => {
  tables(db);
});
