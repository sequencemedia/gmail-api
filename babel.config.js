module.exports = {
  compact: true,
  comments: false,
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: 'usage',
        targets: {
          node: '12.18.1'
        },
        corejs: 3
      }
    ]
  ],
  plugins: [
    [
      'module-resolver', {
        alias: {
          '@sequencemedia/gmail-api': '.'
        }
      }
    ]
  ]
}
