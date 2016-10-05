# generator-cat [![NPM version][npm-image]][npm-url]

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cat using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-cat
```

Make a folder for project and then generate your new project:

```bash
mkdir (porject name)
cd (project name)
yo cat
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## Options

- `license`(Boolean, default true) include or not a LICENSE file.
- `router` (Boolean, default true) use react-router or not.
- `redux` (Boolean, default true) use react-redux or not.
- `radium` (Boolean, default true) use radium or not.

## Sub generators

Remember you can see the options of each sub generators by running `yo node:sub --help`.

- `cat:babel`
- `cat:editorconfig`
- `cat:eslint`
- `cat:git`
- `cat:gulp` (`istanbul` and `mocha` will be also included)
- `cat:pug`
- `cat:react` (remember you can use this to create all files about `react`)
- `cat:readme`
- `cat:webpack`
- `cat:server`
- `cat:static`
- `cat:dynamic`

## Type

- Choose `Default` if you just want to use those.
- Common default:
  - `babel`
  - `editorconfig`
  - `eslint`
  - `git`
  - `gulp`
  - `readme`
- Remember you can see the tasks by running `gulp help`.

#### Static pages

- Add `render.js` in `gulp-tasks`
- Default:
  - `react`
  - `webpack`
  - `pug`

#### Dynamic pages

- Not yet
- Default:
  - `react`
  - `webpack`
  - `pug`
  - `server`

## License

MIT © [HsuTing](hsuting.com)


[npm-image]: https://badge.fury.io/js/generator-cat.svg
[npm-url]: https://npmjs.org/package/generator-cat
