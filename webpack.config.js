const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const mode = argv.mode || 'development';
  const isDev = mode === 'development';

  return {
    mode,
    target: isDev ? 'web' : 'browserslist',
    devtool: isDev ? 'source-map' : false,
    devServer: {
      port: 3000,
      open: true
    },
    entry: ['@babel/polyfill', path.resolve(__dirname, 'src', 'index.js')],
    output: {
      path: path.resolve(__dirname, 'dist'),
      clean: true,
      filename: isDev ? '[name].js' : '[contenthash].js',
      assetModuleFilename: isDev ? 'assets/[name][ext]' : 'assets/[hash][ext]'
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    resolve: {
      extensions: ['.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src/')
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, 'src', 'index.html')
      }),
      new MiniCssExtractPlugin({
        filename: isDev ? '[name].css' : '[contenthash].css'
      })
    ],
    module: {
      rules: [
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          test: /\.module.(c|sa|sc)ss$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                modules: {
                  localIdentName: '[local]__[sha1:hash:hex:7]'
                }
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('postcss-preset-env')]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /^((?!\.module).)*(c|sa|sc)ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('postcss-preset-env')]
                }
              }
            },
            'sass-loader'
          ]
        },
        {
          test: /\.otf$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext]'
          }
        },
        {
          test: /\.(jpe?g|png|webp|gif|svg)$/i,
          use: [{
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { progressive: true },
              optipng: { enabled: true },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: { interlaced: false },
              webp: { quality: 75 }
            }
          }],
          type: 'asset/resource'
        },
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          }
        }
      ]
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          vendors: {
            name: `chunk-vendors`,
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            chunks: 'initial',
          },
          common: {
            name: `chunk-common`,
            minChunks: 2,
            priority: -20,
            chunks: 'initial',
            reuseExistingChunk: true
          }
        }
      }
    }
  };
};