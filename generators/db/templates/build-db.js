'use strict';

import process from 'process';

import {
  sequelize,
  Data
} from 'constants/models';

const ENV = process.env.NODE_ENV === 'production';

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.log('Unable to connect to the database:', err);
  });

Data.sync({force: !ENV}).then(() => {
  return Data.build();
});
