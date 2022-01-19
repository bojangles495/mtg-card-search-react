'use strict';

const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CopyPlugin = require("copy-webpack-plugin");

const hashDigest = 'hex'
const hashDigestLength = 20
const hashFunction = 'sha384'
const { ASSET_PATH } = require('./src/config/index.js');
const { DefinePlugin } = require('webpack');

class CleanPlugin {
  apply(compiler) {
    compiler.hooks.afterEmit.tap('CleanPlugin', compilation => {
      if (0 === compilation.errors.length) {
        fs.readdir(compilation.options.output.path, (err, files) => {
          if (err) {
            console.log(`failed to read directory: ${compilation.options.output.path}:`, err)
          } else {
            files.forEach(file => {
              if (!compilation.assets.hasOwnProperty(file)) {
                const resolvedPath = path.resolve(compilation.options.output.path, file)
                fs.unlink(resolvedPath, err => {
                  if (err) {
                    console.log(`failed to unlink file: ${resolvedPath}:`, err)
                  }
                })
              }
            })
          }
        })
      }
    })
  }
}

const topdir = __dirname;
const baseConfig =
{
  context: path.resolve(topdir)
  , entry:
  {
    'app':
      [path.resolve(__dirname, 'build', 'client', 'index.js')
      , path.resolve(__dirname, 'src', 'sass', 'index.scss')
      ]
  }
  , resolve:
  {
    extensions: ['.ts', '.tsx', '.js', '.scss', '.css']
    , modules: [path.resolve(__dirname, 'src'), 'node_modules']
    , fallback: { "path": require.resolve('path-browserify') }
  }
  , output:
  {
    path: path.resolve(__dirname, 'public')
    , filename: '[name].[chunkhash].js'
    , hashDigest
    , hashDigestLength
    , hashFunction
    , publicPath: ASSET_PATH
  }
  , module:
  {
    rules:
      [ {
          test: /\.jsx?$/
        , exclude: /node_modules\/(?!escape-string-regexp|nanoid|postcss|sanitize-html\/)/
          , use:
          [
            {
              loader: 'babel-loader'
              , options:
              {
                cacheDirectory: true
                , babelrc: false
                , compact: false
                , presets:
                  [
                    ['@babel/preset-env'
                      , { targets: { "browsers": ["> 0.5%", "last 2 versions", "ie >= 10", "edge >= 12", "firefox >= 50", "chrome >= 50"]
                            , "node": "current"
                            }
                          , useBuiltIns: "usage"
                          , corejs: "3"
                        }
                    ]
                    , '@babel/preset-typescript'
                    , '@babel/preset-react'
                  ]
                , plugins:
                  [
                    [
                      '@babel/plugin-transform-runtime',
                        { corejs: "3"
                        }
                      ],
                    '@babel/plugin-proposal-object-rest-spread',
                    '@babel/plugin-syntax-dynamic-import',
                    '@loadable/babel-plugin',
                    ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: false }],
                    ['@babel/plugin-proposal-class-properties', { loose: true }],
                    ['@babel/plugin-proposal-private-property-in-object', { loose: true }],
                    ['@babel/plugin-proposal-private-methods', { loose: true }],
                    ['@babel/plugin-transform-modules-commonjs', {importInterop: "node"}]
                  ]
              }
            }
          ]
        }
        , {
          test: /\.(sa|sc|c)ss$/
        , include:
          [path.join(__dirname, 'transpiled', 'client')
            , path.resolve(__dirname, 'src', 'sass')
          ]
        , use:
          [{ loader: MiniCssExtractPlugin.loader }
            , { loader: 'css-loader' }
            , {
              loader: 'postcss-loader'
            , options:
            { postcssOptions: {plugins: () => ([require('precss'), require('autoprefixer')])}
            }
          }
            , { loader: 'sass-loader' }
          ]
        }
        , {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/]
        , loader: require.resolve("url-loader")
        , options: {
            limit: 10 * 1024
          }
        }
        , {
          test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/]
        , loader: require.resolve("file-loader")
      }
      ]
  }
  , optimization:
  {
    minimizer: [new CssMinimizerPlugin()]
    , splitChunks:
    {
      cacheGroups:
      {
        client:
        {
          test: /[\\/]src\/client[\\/]/
          , name: 'client'
          , chunks: 'all'
        }
        , vendor:
        {
          test: /[\\/]node_modules[\\/]/
          , name: "vendor"
          , chunks: 'all'
        }
      }
    }
  }
  , plugins:
    [
      new webpack.EnvironmentPlugin(
        {
          NODE_ENV: 'development',
          MTG_GRAPHQL_BASE_URL: 'http://localhost:7846',
        }
      ),

     new CleanPlugin()
      , new ForkTsCheckerWebpackPlugin()
      , new MiniCssExtractPlugin({ filename: '[name].[fullhash].css', chunkFilename: '[id].[fullhash].css' })
      , new WebpackManifestPlugin({ fileName: 'inventory.json', publicPath: '' })
    ]
  , watchOptions:
  {
    ignored: /\.sw.$/
  }
}

module.exports = (env, argv) => {
  let config
  const mode = argv.mode || 'development'

  if (mode !== 'production' && !(env && env.prod)) {
    config =
    {
      ...baseConfig
      , mode
      , devtool: 'eval-source-map'
      , plugins: [...baseConfig.plugins
        ,  new BundleAnalyzerPlugin()
        // ,  new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify(mode)})
      ]
    }
  } else {
    config =
    {
      ...baseConfig
      , mode
      , devtool: 'source-map'
      , optimization:
      {
        ...baseConfig.optimization
        , minimize: true
        , minimizer:
          [...baseConfig.optimization.minimizer
            , new TerserPlugin()
          ]
      }
    }
  }

  return config
}
