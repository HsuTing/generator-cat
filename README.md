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

## Sub generators

Remember you can see the options of each sub generators by running `yo node:sub --help`.

- `cat:babel`
- `cat:eslint`
- `cat:pug`
- `cat:react`
  - remember you can use this to create all files about `react`
  - Include `react-router`, `redux`, `radium`.
- `cat:test`
  - Include `istanbul`, `mocha`
- `cat:webpack`
- `cat:server`
  - `http` or `https` server
  - Use `letsencrypt-express` to build `https` server.
- `cat:static` (type)
- `cat:dynamic` (type)

## Type

- You can know more information in `README.md`.
- Common default:
  - `babel`
  - `eslint`
  - `test`

#### Static pages

- Use to make a static page.
- Default:
  - `pug`
  - `react`
  - `webpack`

#### Dynamic pages

- Use to make a web server with `express`.
- Default:
  - `pug`
  - `react`
  - `webpack`
  - `server`

## License

MIT © [HsuTing](hsuting.com)


[npm-image]: https://badge.fury.io/js/generator-cat.svg
[npm-url]: https://npmjs.org/package/generator-cat
