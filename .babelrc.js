module.exports = {
  presets: [
    '@babel/preset-env',
    // [
    //   '@babel/preset-env',
    //   {
    //     targets: {
    //       node: 'current',
    //     },
    //   },
    // ],
    '@babel/preset-react',
  ],
  plugins: [
    '@babel/plugin-syntax-dynamic-import',
    'dynamic-import-node',
    ['@babel/plugin-proposal-decorators', { legacy: true }],
    ['@babel/plugin-proposal-class-properties', { loose: true }],
    'babel-plugin-styled-components',
  ],
  ignore: ['node_modules', 'build'],
}
