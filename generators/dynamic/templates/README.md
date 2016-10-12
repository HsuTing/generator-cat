# <%= projectName %>

<%= description %>

## Getting Started

#### Install package
```sh
npm install -i
```

#### Run watch
```sh
npm run watch
```

#### Run test server
```sh
npm run test-server
```

Then you can open your [browser](localhost:8000).

## Usage

#### script

```json
{
  "scripts": {
    "webpack-server": "webpack-dev-server --content-base src --hot --inline",
    "webpack": "NODE_ENV=1 webpack",
    "test-server": "nodemon ./lib/server.js",
    "start": "NODE_ENV=1 node ./lib/server.js",
    "watch": "concurrently -c green \"npm run lint:watch\" \"npm run webpack-server\" \"npm run babel:watch\"",
    "production": "npm run babel && npm run webpack",
    "test": "istanbul cover _mocha -- -R spec",
    "lint": "eslint --cache ./ --ext .js",
    "lint:watch": "esw --cache ./ --ext .js -w --color",
    "babel": "rm -rf ./lib && babel src --out-dir lib",
    "babel:watch": "rm -rf ./lib && babel -w src --out-dir lib"
  },
  "pre-commit": [
    "lint",
    "test"
  ]
}
```
- webpack
  - development: webpack-server
  - production: webpack
- server
  - development: test-server
  - production: start
- watch
  - run all watch
- production
  - run it before you use `npm run start`.
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
├── middleware
│   └── (middleware name)
├── routes
│   └── views
│       └── index.js
├── server.js
└── webpack.config.js
```

## License
<%= license %> © [<%= name %>](<%= url %>)
