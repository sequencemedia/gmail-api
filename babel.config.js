module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        targets: {
          node: 'current'
        },
        corejs: 3
      }
    ]
  ],
  plugins: [
    [
      'module-resolver', {
        root: ['.'],
        cwd: 'babelrc',
        alias: {
          '@sequencemedia/gmail-api': '.'
        }
      }
    ]
  ]
}
