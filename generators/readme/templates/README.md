# <%= projectName %> [![NPM version][npm-image]][npm-url]

<%= description %>

## Getting Started

```sh
$ npm install -i
gulp build
```

Then you can open your [website]('/<%= projectName %>/').

## Usage

Control `./gulp-tasks/static.js` to render `*.html`.
- `component` or `router`: Your root componet. If you use `react-router`, use `router`.
- `name`: Name of output html. If this is not `index`, it will create a folder with this name and a `index.html` in this folder.
- `store`: If you use `redux`, this is your `store`.
- `location`: If you use `react-router`, you need to give a path to render `router`.

#### gulp
- `gulp` test code, test code coverage and check code style
- `gulp help` show gulp task list
- `gulp prepublish` task before `npm publish`
- `gulp build` build `*.html`
- `gulp watch` check code style with watching `./src`

#### npm
- `npm run build` (production) render `*.html`
- `npm run webpack-server` run webpack server when you are coding
- `npm run webpack` (production) render `*.js` in `./public/js/`
- `npm run test` is equal to `gulp`

## Tree structure
```
.<%= projectName %>
├── LICENSE
├── README.md
├── gulp-tasks
│   ├── babel.js
│   ├── eslint.js
│   ├── static.js
│   └── test.js
├── gulpfile.js
├── index.html
├── package.json
├── src
<% if(redux) { -%>
│   ├── actions
│   │   └── (action names)
│   ├── reducers
│   │   └── (reducer names)
│   ├── stores
│   │   └── (store names)
<% } -%>
<% if(router) { -%>
│   ├── routers
│   │   └── (router names)
<% } -%>
│   ├── components
<% if(radium) { -%>
│   │   ├── (component names)
│   │   ├── Style.js
│   │   └── radium
<% if(router) { -%>
│   │       ├ Link.js
<% } -%>
│   │       └── Wrapper.js
<% } else { -%>
│   │   └── (component names)
<% } -%>
│   └── public
│       └── index.js
├── views
│   ├── page.pug
│   └── test-page.pug
└── webpack.config.js
```

## License

<%= license %> © [<%= author.name %>](<%= author.url %>)

[npm-image]: https://badge.fury.io/js/<%= projectName %>.svg
[npm-url]: https://npmjs.org/package/<%= projectName %>
