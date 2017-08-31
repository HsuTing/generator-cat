module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/utils/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!src/bin/*.js'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ]
};
