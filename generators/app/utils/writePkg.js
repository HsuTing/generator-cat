'use strict';

const _ = require('lodash');
const extend = _.merge;

module.exports = (props, currentPkg) => {
  // scripts
  const baseScript = props.plugins.includes('relay') ? ['yarn graphql', 'yarn relay'] : [];
  const build = baseScript.concat(['yarn babel']);
  const prod = ['cross-env-shell NODE_ENV=production'].concat(baseScript).concat(['yarn babel']);
  const watch = [
    'concurrently -c green',
    '"yarn lint:watch"',
    '"yarn babel:watch"'
  ];

  if(props.plugins.includes('react')) {
    if(props.plugins.includes('docs') || props.plugins.includes('desktop app')) {
      build.push('static static.config.js');
      prod.push('cross-env NODE_ENV=production static static.config.js');
    }

    prod.push('yarn webpack');
    watch.push('"yarn webpack-server"');
  }

  if(props.plugins.includes('relay'))
    watch.push('"yarn relay:watch"');

  const scripts = {
    build: build.join(' && '),
    prod: prod.join(' && '),
    watch: watch.join(' ')
  };

  if(props.plugins.includes('heroku'))
    scripts['heroku-postbuild'] = 'yarn prod';

  // pkg
  const pkg = extend({
    name: _.kebabCase(props.name),
    version: '0.1.0',
    description: props.description,
    author: {
      name: props.authorName,
      email: props.authorEmail,
      url: props.authorUrl
    },
    scripts: props.plugins.includes('mobile app') ? {} : scripts,
    main: props.plugins.includes('desktop app') ? './index.js' : './lib/index.js',
    keywords: props.keywords ? _.uniq(props.keywords.concat(props.keywords)) : [],
    'pre-commit': [
      'lint'
    ],
    homepage: `https://github.com/${props.authorName}/${props.name}/`,
    repository: {
      type: 'git',
      url: `get+https://github.com/${props.authorName}/${props.name}.git`
    },
    bugs: {
      url: `https://github.com/${props.authorName}/${props.name}/issues/`
    }
  }, currentPkg);

  return pkg;
};
