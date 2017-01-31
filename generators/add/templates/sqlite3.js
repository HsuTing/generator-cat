'use strict';

import path from 'path';
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database(
  path.resolve(__dirname, './../../db.sqlite3')
);

export const get = query => {
  return new Promise((resolve, reject) => {
    db.get(query, (err, data) => {
      if(err)
        reject(err);
      else
        resolve(data || {});
    });
  });
};

export const all = query => {
  return new Promise((resolve, reject) => {
    db.all(query, (err, data) => {
      if(err)
        reject(err);
      else
        resolve(data || []);
    });
  });
};
