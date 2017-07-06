#!/usr/bin/env node
'use strict';

const fs = require('fs');
const path = require('path');
const process = require('process');
const shell = require('shelljs');

const pkg = require(path.resolve(process.cwd(), './package.json'));

if(!shell.which('docker')) {
  shell.echo('Sorry, this script requires docker.');
  shell.exit(1);
}

const ENV = process.env.DOCKER_ENV === 'production';
const server_image_name = `${ENV ? '' : 'test-'}${pkg.name}`;
const server_name = ENV ? 'server' : 'test-server';
const db_name = ENV ? `db-${pkg.version}` : 'test-db';
const run = ENV ? 'run': 'run --rm';

const build = [
  // build db container
  `docker ${run} --name ${db_name} -e POSTGRES_USER=hsuting -e POSTGRES_PASSWORD=hsuting -e POSTGRES_DB=db -d postgres`,
  // build server image
  `docker build -t="${server_image_name}" .`,
  // build server container
  `docker ${run} --name ${server_name} --link=${db_name}:db -d -p 8000:8000 ${server_image_name} /bin/sh -c "yarn start"`,
  // create tables
  `docker run --rm --name build --link=${db_name}:db ${server_image_name} /bin/sh -c "node ./bin/db.js"`
];

const rebuild = [
  `docker container restart ${db_name}`,
  // build server image
  `docker build -t="${server_image_name}" .`,
  // build server container
  `docker ${run} --name ${server_name} --link=${db_name}:db -d -p 8000:8000 ${server_image_name} /bin/sh -c "yarn start"`,
];

const update = ({pre_version}) => {
  if(!pre_version)
    throw new Error(`Error: update: previous version can not be undefined, use like "update:0.1.0"`);

  if(!fs.existsSync('./../backup')) {
    if(shell.mkdir('-p', path.resolve(__dirname, './../backup')).code !== 0) {
      console.log(`Error: "make backup folder" failed`);
    }
  }

  if(!ENV)
    throw new Error(`Error: update: "DOCKER_ENV" is needed to be "production"`);

  return [
    `docker export db-${pre_version} > ./backup/db-${pre_version}.tar`,
    `docker run --rm --name update --link=db-${pre_version}:db --link=${db_name}:new_db ${server_image_name} /bin/sh -c "yarn postgresql-copy"`
  ];
};

const start = [
  `docker container restart ${db_name} ${server_name}`
];

const stop = [
  `docker container stop ${db_name} ${server_name}`
];

process.argv.slice(2).forEach(argv => {
  const command_name = argv.split(':')[0];
  const commands = {
    build,
    rebuild,
    update,
    start,
    stop
  }[command_name];
  const options = {};

  if(!commands) {
    console.log(`Error: ${argv}: command not found`);
    shell.exit(1);
  }

  if(command_name === 'update')
    options.pre_version = argv.split(':')[1];

  (
    commands instanceof Array ?
    commands :
    commands(options)
  ).forEach(command => {
    if(shell.exec(command).code !== 0) {
      console.log(`Error: "${command}" failed`);
      shell.exit(1);
    }
  });
});
