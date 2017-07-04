'use strict';

const _ = require('lodash');
const extend = _.merge;

module.exports = (props, currentPkg) => {
  // scripts
  const base_script = props.plugins.includes('relay') ? ['yarn graphql', 'yarn relay'] : [];
  const build = base_script.concat(['yarn babel']);
  const prod = base_script.concat(['export NODE_ENV=production', 'yarn babel']);
  const watch = [
    'concurrently -c green',
    '"yarn lint:watch"',
    '"yarn babel:watch"'
  ];

  if(props.plugins.includes('react')) {
    if(props.plugins.includes('docs') || props.plugins.includes('desktop app')) {
      build.push('static static.config.js');
      prod.push('static static.config.js');
    }

    prod.push('yarn webpack')
    watch.push('"yarn webpack-server"')
  }

  const scripts = {
    build: build.join(' && '),
    prod: prod.join(' && '),
    watch: watch.join(' ')
  }

  if(props.plugins.includes('react'))
    scripts.postinstall = 'rm -rf ./node_modules/radium/.babelrc';

  if(props.plugins.includes('heroku'))
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
    scripts,
    main: props.plugins.includes('desktop app') ? './index.js' : './lib/index.js',
    keywords: props.keywords ? _.uniq(props.keywords.concat(props.keywords)) : [],
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
      url: props.homepage + '/issues'
    };
  }

  return pkg;
};
