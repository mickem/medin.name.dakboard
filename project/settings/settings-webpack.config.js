const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const { VueLoaderPlugin } = require('vue-loader')
const path = require('path');

module.exports = {
    devtool: false,
    entry: './src/Main.ts',
    target: 'web',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
            ignoreOrder: false,
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'src/index.html',
            /*inlineSource: '.(js|css)$',*/
            minify: {
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true
            },
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new VueLoaderPlugin(),
    ],
    output: {
        filename: 'settings.js',
        path: path.resolve(__dirname, '../../settings'),
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, use: [{
                    loader: 'ts-loader', options: {
                        configFile: 'tsconfig.json'
                    }
                }], exclude: /node_modules/
            },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.vue$/, use: 'vue-loader' },
            {
                test: /.html$/,
                loader: "vue-template-loader",
                exclude: /index.html/
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.css', '*.vue'],
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
    }
};