'use strict';

const _ = require('lodash');
const extend = _.merge;

module.exports = (props, currentPkg) => {
  // scripts
  const relay = props.plugins.indexOf('relay') !== -1;
  const base_script = relay ? ['yarn graphql'] : [];
  const build = base_script.concat(['yarn babel']);
  const prod = base_script.concat(['export NODE_ENV=production', 'yarn babel']);
  const watch = [
    `${relay ? 'export BABEL_ENV=relay && ' : ''}concurrently -c green`,
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

  // add other script
  const scripts = {
    build: build.join(' && '),
    prod: prod.join(' && '),
    watch: watch.join(' ')
  }

  if(props.plugins.indexOf('react') !== -1)
    scripts.postinstall = 'rm -rf ./node_modules/radium/.babelrc'

  if(props.plugins.indexOf('heroku') !== -1)
    scripts['heroku-postbuild'] = 'yarn prod';

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
    scripts: scripts,
    main: './lib/index.js',
    keywords: [],
    'pre-commit': [
      'lint'
    ]
  }, currentPkg);

  if(props.homepage) {
    pkg.homepage = props.homepage;
    pkg.repository = {
      type: 'git',
      url: 'git+' + props.homepage + '.git'
    };
    pkg.bugs = {
      ur: props.homepage + '/issues'
    };
  }

  if(props.keywords)
    pkg.keywords = _.uniq(props.keywords.concat(pkg.keywords));

  return pkg;
};
