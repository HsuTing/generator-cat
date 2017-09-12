# generator-cat [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url]

You can use this to build a website, a server or both of them.

![icon](http://hsuting.github.io/public/img/icon.svg)

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

## Subgenerators
We does not recommend using those subgenerators because the most of those subgenerators use the `plugins` in `.yo-rc.json`. Use those subgenerators with `yo cat:subgenerators`.

- `cat:add`: You can use to add some template file to your project.
  - `options`
    - `item`: Choose the template which will be added to project.
    - `name`: This is the name of the output file.
  - `list`
    - react
    - reducer
    - relay
    - router
    - schema
    - jest

- `cat:mobile-app`: Use after run `create-react-native-app`.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [hsuting](hsuting.com)


[npm-image]: https://badge.fury.io/js/generator-cat.svg
[npm-url]: https://www.npmjs.com/package/generator-cat
[travis-image]: https://travis-ci.org/HsuTing/generator-cat.svg?branch=master
[travis-url]: https://travis-ci.org/HsuTing/generator-cat
