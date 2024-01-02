import { Configuration } from 'webpack'
import 'webpack-dev-server'
import merge from 'webpack-merge'
import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import HtmlInlineScriptPlugin from 'html-inline-script-webpack-plugin'

const mode = process.env.NODE_ENV ?? 'development'

const baseConfig: Configuration = {
  entry: {
    ui: join(__dirname, 'src/js/ui.tsx'),
    code: join(__dirname, 'src/js/code.ts')
  },
  output: {
    path: join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.mjs']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'ui.html',
      template: join(__dirname, 'src/static/ui.html'),
      inject: 'body',
      chunks: [
        'ui'
      ],
      cache: false
    }),
    new HtmlInlineScriptPlugin({
      htmlMatchPattern: [/ui\.html$/],
      scriptMatchPattern: [/ui\.js$/]
    }),
  ]
}

const modeConfig: Record<string, Configuration> = {
  development: {
    mode: 'development',
    devtool: false
  },
  production: {
    mode: 'production',
    devtool: 'source-map'
  }
}

module.exports = merge(baseConfig, modeConfig[mode] ?? {})