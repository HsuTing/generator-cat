# <%= name[0].toUpperCase() + name.slice(1).toLowerCase() %><% if(npm) { %> [![NPM version][npm-image]][npm-url]<% } %>[![Build Status][travis-image]][travis-url]
<%= description %>

## Getting Started
Install packages using [yarn](https://yarnpkg.com/) (we assume you have pre-installed [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/)).

```sh
yarn install && yarn build
```

## Usage
- `build`: Build the project. Use this script before you start to write the project.
- `prod`: Set `NODE_ENV=production` and build the project. Use this script when you need to make a production version.
- `watch`: Watch all files. Use this script when you are developing.
<% if(server) { -%>
- `start`: Run the prodiction version server.
- `test-server`: Run the test server with `nodemon`.
<% } -%>
- `test`: Run the test.
- You can see other scripts in [package.json](./package.json).

## License
<%= license %> © [<%= author.name %>](<%= author.url %>)

<% if(npm) { -%>
[npm-image]: https://badge.fury.io/js/<%= name %>.svg
[npm-url]: https://npmjs.org/package/<%= name %>
<% } -%>
[travis-image]: https://travis-ci.org/<%= author.name %>/<%= name %>.svg?branch=master
[travis-url]: https://travis-ci.org/<%= author.name %>/<%= name %>
