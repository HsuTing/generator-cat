module.exports = {
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/utils/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
<% if(react) { -%>
    '!**/public/**',
<% } -%>
    '!**/node_modules/**'
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    'html',
    'text'
  ]
};
