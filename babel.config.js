module.exports = (api) => {
  const isWebpack = api.caller(caller => Boolean(caller && caller.name === 'babel-loader'))
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: isWebpack ? undefined : 'entry',
          targets: isWebpack ? undefined : { node: 'current' },
          modules: isWebpack ? false : 'commonjs',
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      'babel-plugin-styled-components',
      '@babel/plugin-syntax-dynamic-import',
      // !isWebpack ? 'dynamic-import-node' : null,
    ].filter(Boolean),
    ignore: ['node_modules', 'dist'],
  }
}
