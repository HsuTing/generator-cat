'use strict';

module.exports = {
  users: (db, type = 'sqlite') => (
    db.create('<%= name %>', {
      id: 'text PRIMARY KEY NOT NULL'
    })
  ),

  create_user: id => db => (
    db.insert('<%= name %>', {
      id
    })
  )
};
