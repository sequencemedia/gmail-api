module.exports = {
  bail: 1,
  verbose: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './lib/**/*.js'
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
