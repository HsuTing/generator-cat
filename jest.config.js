module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/files/',
    '/utils/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'generators/**/*.js',
    '!**/templates/**',
    '__test__'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ]
};
