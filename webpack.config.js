// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodeExternals = require('webpack-node-externals');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { RunScriptWebpackPlugin } = require('run-script-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = function (options, webpack) {
  options.resolve.alias = {
    ...options.resolve.alias,
    '@root': path.resolve(__dirname, '.'),
    '@src': path.resolve(__dirname, 'src'),
    '@wasm': path.resolve(__dirname, 'wasm_module'),
  };
  return {
    ...options,
    entry: ['webpack/hot/poll?100', options.entry],
    externals: [
      nodeExternals({
        allowlist: ['webpack/hot/poll?100'],
      }),
    ],
    experiments: {
      syncWebAssembly: true,
      asyncWebAssembly: true,
    },
    plugins: [
      ...options.plugins,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.WatchIgnorePlugin({
        paths: [/\.js$/, /\.d\.ts$/],
      }),
      new RunScriptWebpackPlugin({
        name: options.output.filename,
        autoRestart: false,
      }),
      new WasmPackPlugin({
        crateDirectory: './wasm_module',
      }),
    ],
  };
};
