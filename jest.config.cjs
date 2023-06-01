module.exports = {
  bail: 1,
  verbose: true,
  rootDir: '.',
  roots: [
    './test'
  ],
  transform: {},
  testMatch: ['**/*/*.spec.mjs'],
  collectCoverage: true,
  collectCoverageFrom: [
    './src/**/*.mjs',
    '!./*/index.mjs'
  ],
  coverageDirectory: './coverage',
  coveragePathIgnorePatterns: [
    '/node_modules/'
  ],
  coverageReporters: [
    'lcov',
    'text'
  ],
  moduleNameMapper: {
    '@eslint/eslintrc/universal': '@eslint/eslintrc/dist/eslintrc-universal.cjs'
  }
}
