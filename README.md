# generator-cat [![NPM version][npm-image]][npm-url]

![icon](http://hsuting.github.io/img/icon.svg)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cat using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-cat
```

Then generate your new project:

```bash
yo cat
```

## Subgenerator
- `add`: use to add new files.
  - `component`: add default component and js of `react`.
  - `reducer`: add default reducer and action of `redux`.
  - `store`: add default store of `redux`.
  - `router`: add default router of `react-router`.
  - `schema`: add default schema of `graphql`.
  - `relay`: add default component, route and js of `react-relay`.
  - `nodemailer`: add default `nodemailer` with `react`.
  - `sqlite3`: add default `sqlite3`.
  - `imgResize`: add function to do resize image for meeting this size of the parentNode.
  - `firebase`: add default `firebase` with `nodejs`.
- `test`: use to add test framework.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## Issue
- [ ] `app` does not use `class extends generator`.

## License

MIT © [hsuting](hsuting.com)


[npm-image]: https://badge.fury.io/js/generator-cat.svg
[npm-url]: https://npmjs.org/package/generator-cat
