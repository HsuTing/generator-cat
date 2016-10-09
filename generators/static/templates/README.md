# <%= projectName %>

<%= description %>

## Getting Started

```sh
npm install -i
```

Then you can open your [browser](/<%= projectName %>/).

## Usage

#### `static.config.js`

```js
module.exports = [
  {
    router: false,
    redux: true,
    radium: true,
    component: require('./lib/components/Index').default,
    store: require('./lib/stores/index').default,
    name: 'index'
  }
];
```

- If you use `router`, `redux` or `radium`, you set their value to `true`.
- `component` is your main component which you also use in `ReactDOM.render`.
- `name` is name of output `html`. If it is not equal to `index`, it will make a folder with name and a `index.html` in that folder.
- Use `store` when you use `redux` and it will be your `store` to `Provider`.
- Use `location` when you use `react-router` and it will use to find `router` component which should be rendered.

#### script

```json
{
  "scripts": {
    "webpack-server": "webpack-dev-server --content-base src --hot --inline",
    "webpack": "NODE_ENV=1 webpack",
    "static": "node tools/static.js",
    "build": "npm run babel && npm run static",
    "build:production": "npm run babel && NODE_ENV=1 npm run static",
    "watch": "concurrently \"npm run lint:watch\" \"npm run webpack-server\"",
    "test": "istanbul cover _mocha -- -R spec",
    "lint": "eslint --cache ./ --ext .js",
    "lint:watch": "esw --cache ./ --ext .js -w --color",
    "babel": "rm -rf ./lib && babel src --out-dir lib",
    "babel:watch": "rm -rf ./lib && babel -w src --out-dir lib"
  },
  "pre-commit": [
    "build:production",
    "webpack",
    "lint",
    "test"
  ]
}
```
- webpack
  - development: webpack-server
  - production: webpack
- static
  - use `static.config.js` to render html.
- build
  - development: build
  - production: build:production
- watch
  - run all watch
- test
  - run test code and code coverage
- lint
  - check code style
- babel
  - render `es6`

## Tree structure

```
.<%= projectName %>
├── LICENSE
├── README.md
├── package.json
├── src
<% if(router) { -%>
│   ├── routers
│   │   └── (router names)
<% } -%>
<% if(redux) { -%>
│   ├── actions
│   │   └── (action names)
│   ├── reducers
│   │   └── (reducer names)
│   ├── stores
│   │   └── (store names)
<% } -%>
│   ├── components
<% if(radium) { -%>
│   │   ├── (component names)
│   │   ├── Style.js
│   │   └── radium
<% if(router) { -%>
│   │       ├── Link.js
<% } -%>
│   │       └── Wrapper.js
<% } else { -%>
│   │   └── (component names)
<% } -%>
│   └── public
│       └── (main js files)
├── views
│   └── page.pug
├── static.config.js
└── webpack.config.js
```

## License
<%= license %> © [<%= name %>](<%= url %>)
