import type { Configuration } from 'webpack';
import { rules } from './webpack.rules';
import { plugins } from './webpack.plugins';
import webpack from 'webpack';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load env variables
dotenv.config();

// Add CSS support
rules.push({
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
});

export const rendererConfig: Configuration = {
  module: {
    rules,
  },
  plugins: [
    ...plugins,
    new webpack.DefinePlugin({
      'process.env.API_BASE_URL': JSON.stringify(process.env.API_BASE_URL),
    }),
  ],
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      '@': path.resolve(__dirname, 'src/renderer'),
    },
  },
};
