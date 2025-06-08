import path from 'path';
import type { Configuration } from 'webpack';

import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';

export const preloadConfig: Configuration = {
  target: 'electron-preload',

  entry: './src/preload.ts', // ✅ Your preload script entry

  output: {
    filename: 'preload.js', // ✅ Prevents conflict with main.js
    path: path.resolve(__dirname, '.webpack/main'), // Output to same folder
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },

  plugins,
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
};
