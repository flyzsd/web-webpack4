const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    target: 'web',
    mode: 'production',
    entry: {
        index: './src/index.js',
        about: './src/about.js',
        help: './src/help.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: []
    },
    plugins: [
        new CleanWebpackPlugin('dist', {}),
        new HtmlWebpackPlugin({
            templateParameters: {
                'foo': 'bar'
            },
            inject: 'body',
            template: './src/index.html',
            filename: 'index.html',
            chunks: ['index', 'about']
        }),
        new HtmlWebpackPlugin({
            templateParameters: {
                'foo': 'bar'
            },
            inject: 'body',
            template: './src/help.html',
            filename: 'help.html',
            chunks: ['help']
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};

module.exports = (env, args) => {
    console.dir(env);
    console.dir(args);
    if (args.mode === 'production') {
        config.module.rules.push(
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',                       // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',                      // compiles Sass to CSS, using Node Sass by default
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        );
    } else {
        config.module.rules.push(
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',                       // translates CSS into CommonJS
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',                      // compiles Sass to CSS, using Node Sass by default
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }
        );
    }

    return config;
};
