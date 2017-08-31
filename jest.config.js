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
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ]
};
