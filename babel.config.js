module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: 'current'
        },
        useBuiltIns: 'usage',
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
