'use strict';

export const <%= name %> = (db, type = 'sqlite') => (
  db.create('<%= name %>', {
    id: 'text PRIMARY KEY NOT NULL'
  })
);

export const create_<%= name %> = id => db => (
  db.insert('<%= name %>', {
    id
  })
);
