'use strict';

const _ = require('lodash');
const extend = _.merge;

module.exports = (props, currentPkg) => {
  // scripts
  const script = props.graphql ? ['yarn graphql'] : [];
  const build = script.concat(['yarn babel']);
  const prod = script.concat(['export NODE_ENV=production', 'yarn babel']);
  const watch = [
    `${props.graphql ? 'export BABEL_ENV=graphql && ' : ''}concurrently -c green`,
    '"yarn lint:watch"',
    '"yarn babel:watch"'
  ];

  if(props.plugins.indexOf('react') !== -1) {
    if(props.plugins.indexOf('websiteNoServer') !== -1) {
      build.push('yarn static static.config.js');
      prod.push('yarn static static.config.js');
    }

    prod.push('yarn webpack')
    watch.push('"yarn webpack-server"')
  }

  // pkg
  const pkg = extend({
    name: _.kebabCase(props.name),
    version: '0.0.0',
    description: props.description,
    author: {
      name: props.authorName,
      email: props.authorEmail,
      url: props.authorUrl
    },
    scripts: {
      build: build.join(' && '),
      prod: prod.join(' && '),
      watch: watch.join(' ')
    },
    main: './lib/index.js',
    keywords: [],
    'pre-commit': [
      'lint'
    ]
  }, currentPkg);

  if(props.gitLink) {
    pkg.gitLink = props.gitLink;
    pkg.repository = {
      type: 'git',
      url: 'git+' + props.gitLink + '.git'
    };
    pkg.bugs = {
      ur: props.gitLink + '/issues'
    };
  }

  if(props.keywords)
    pkg.keywords = _.uniq(props.keywords.concat(pkg.keywords));

  return pkg;
};
