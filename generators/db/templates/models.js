'use strict';

import path from 'path';
import process from 'process';
import Sequelize from 'sequelize';

import getTables from 'utils/getTables';

export const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'sqlite',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  storage: path.resolve(process.cwd(), './db.sqlite3')
});

export const Data = sequelize.define('data', {
  ...getTables.Data,
  id: Sequelize.UUID
});
