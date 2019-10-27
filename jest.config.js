module.exports = {
  bail: 1,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './lib/**/*.js',
    '!./*/index.js'
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: [
    'lcov',
    'text'
  ]
}
