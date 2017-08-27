'use strict';

import 'babel-polyfill';
import process from 'process';

import {users, create_user} from './users';

export default async (db, type = 'sqlite') => {
  const tables = {
    users
  };
  const create_data = {};
  const choices = process.argv.length === 2 ? Object.keys(tables) : process.argv.slice(2);
  const choice_data = [];

  try {
    await Promise.all(
      choices.map(key => {
        if(create_data[key])
          choice_data.push(create_data[key]);

        if(tables[key])
          return tables[key](db, type);

        throw new Error(`"${key}" is not in tables.`);
      })
    );

    await choice_data.map(create_func => create_func(db));

    switch(type) {
      case 'sqlite':
        if(choices.includes('users')) {
          const user_id = `'363a5f9b-7e93-4f8d-9f1a-a3941fc0905d'`;

          if(await create_user(user_id)(db))
            console.log(`test user id: ${user_id}`)
        }
        break;
    }

    console.log('done');
    process.exit();
  } catch(e) {
    console.log(e);
  }
};
