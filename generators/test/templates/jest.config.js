module.exports = {
<% if(mobile_app) { -%>
  preset: 'jest-expo',
<% } -%>
  testPathIgnorePatterns: [
    '/node_modules/',
    '/lib/',
    '/utils/'
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
<% if(react && !mobile_app) { -%>
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
