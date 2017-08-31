module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'generators/**/*.js',
    '!**/templates/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ]
};
