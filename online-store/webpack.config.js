const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name]_bundle.js',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Online-store',
            template: path.resolve(__dirname, './src/template.html'),
            filename: 'index.html',
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
              { from: "src/assets", to: "assets" },
            //   { from: "other", to: "public" },
            ],
          }),
    ],
    module: {
        rules: [{
                test: /\.[tj]s$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                // use: [{
                //     loader: 'file-loader',
                //     options: {
                //         name: '[name].[ext]',
                //         outputPath: 'assets/images/'
                //     }
                // }]
                type: 'asset/resource',
                generator: {
                    filename: 'assets/[name][ext]',
                }
            },
            {
                test: /\.json$/,
                type: 'asset/resource',
                generator: {
                    filename: 'assets/books_base/[name][ext]',
                }
            },
            {
                test: /\.html$/,
                use: [
                    'html-loader'
                ]
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    }
}

// const { merge } = require('webpack-merge');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const EslingPlugin = require('eslint-webpack-plugin');
// const { assert } = require('console');

// const baseConfig = {
//     entry: path.resolve(__dirname, './src/index'),
//     mode: 'development',
//     module: {
//         rules: [{
//                 test: /\.css$/i,
//                 use: ['style-loader', 'css-loader'],
//             },
//             {
//                 test: /\.[tj]s$/,
//                 use: 'ts-loader'
//             },
//             {
//                 test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
//                 type: 'asset/resource',
//                 generator: {
//                     filename: 'assets/[name][ext]',
//                 }
//             },
//         ],
//     },
//     resolve: {
//         extensions: ['.ts', '.js'],
//     },
//     output: {
//         filename: 'index.js',
//         path: path.resolve(__dirname, '../dist'),
//         assetModuleFilename: 'assets/[name][ext]',
//     },
//     plugins: [
//         new HtmlWebpackPlugin({
//             template: path.resolve(__dirname, './src/index.html'),
//             filename: 'index.html',
//         }),
//         new CleanWebpackPlugin(),
//         new EslingPlugin({ extensions: 'ts' }),
//     ],
// };

// module.exports = ({ mode }) => {
//     const isProductionMode = mode === 'prod';
//     const envConfig = isProductionMode ? require('./webpack.prod.config') : require('./webpack.dev.config');

//     return merge(baseConfig, envConfig);
// };