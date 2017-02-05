# generator-cat [![NPM version][npm-image]][npm-url]

You can use this to build a website, a server or both of them.

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
- Those of subgenerator will be controled by `plugins` in `.yo-rc.json`.
- `babel`: use to set setting of `babel`.
  - This will be different when plugins have `react` or `graphql`.
- `bin`: use to add bin files.
  - This will add something when some plugins are included.
- `eslint`: use to add setting of `eslint`.
- `npm`: use to add `.npmignore`.
- `react`: use to install plugins of `react`.
- `readme`: use to add default `README.md`.
- `server`: use to add server.
  - This server use `koa` and add some middleware of `koa`.
  - If `graphql` is include in plugins, it will also make a `graphql` server.
- `template`: use to add default template.
  - This is a template of `nunjucks`.
  - This will add favions for all platform.
- `webpack`: use to add setting of `webpack`.
  - This will be deifferent when plugins have `redux`, `router` or `graphql`.
  - This use `webpack 2`.
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
  - `firebase`: add default `firebase` with `node.js`.
  - `googleDrive`: add default google drive api with `react` or `node.js`.
  - `allpay`: add default function of allpay.
  - `paypal`: add default config about paypal.
- `test`: use to add test framework.
  - This use `istanbul` and `mocha`.

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
