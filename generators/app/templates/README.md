# <%= name[0].toUpperCase() + name.slice(1).toLowerCase() %>

<%= description %>

## Getting Started

First, install packages using [yarn](https://yarnpkg.com/) (we assume you have pre-installed [npm](https://www.npmjs.com/) and [node.js](https://nodejs.org/)).

```
yarn install
```

## Usage

You can see `scripts` in `package.json`.
<% if(website) { -%>
- `production`: `production` mode.
- `watch`: watch files.
- `favicon`: render `favicon.ico` for every platform.
<% } -%>
<% if(website && server) { -%>
- `start`: run `express` server with `production` mode.
- `test-server`: run `express` server with `test` mode.
<% } -%>
<% if(website && !server) { -%>
- `build`: make a default html with `pug` and `react server side rendering`.
<% } -%>

## Folders
We use `babel-plugin-module-resolver`. As a result, you just need to use short name to import file.

#### src/utils(short name: utils)
Util functions.

#### src/constants(short name: constants)
Constant variables.

<% if(website) { -%>
#### src/public(short name: public)
Main js files.

#### src/components(short name: components)
UI components.

#### src/components/share(short name: componentsShare)
All sharing UI components(like `footer` and `header`).

#### src/components/share/radium(short name: componentsShareRadium)
Some componets need to use `radium` to transform(like `Link` in `react-router`).

<% } -%>
<% if(website && (reactPlugin.router || reactPlugin.redux)) { -%>
#### scr/containers(short name: containers)
Some components using `react-redux` and so on.

<% } -%>
<% if(website && reactPlugin.redux) { -%>
#### src/reducers(short name: reducers)
`Redux` reducers.

#### src/actions(short name: actions)
`Redux` actions.

#### src/stores(short name: stores)
`Redux` stores.

<% } -%>
<% if(server) { -%>
#### src/routes(short name: routes)
`Express` routes.

#### src/middleware(short name: middleware)
`Express` custom middleware.

<% } -%>
## License
<%= license %> © <%= authorName %>
