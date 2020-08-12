// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const HtmlWebpackPlugin = require('html-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require('copy-webpack-plugin');

const outputDirectory = 'dist';

module.exports = {
    entry: ['babel-polyfill', './src/client/index.tsx'],
    output: {
        path: path.join(__dirname, outputDirectory),
        filename: './js/[name].bundle.js',
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                    },
                ],
                exclude: /node_modules/,
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                loader: 'source-map-loader',
            },
            {
                test: /\.(css|less)$/,
                use: [
                    { loader: 'style-loader' },
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './Less',
                            hmr: process.env.NODE_ENV === 'development',
                        },
                    },
                    { loader: 'css-loader' },
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                strictMath: true,
                                noIeCompat: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/,
                loader: 'url-loader?limit=100000',
            },
        ],
    },
    resolve: {
        extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    },
    devServer: {
        port: 3000,
        open: true,
        proxy: {
            '/api': 'http://localhost:8050',
        },
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
            title: 'Book Manager',
        }),
        new MiniCssExtractPlugin({
            filename: './css/[name].css',
            chunkFilename: './css/[id].css',
        }),
        // new CopyPlugin({
        //   patterns: [
        //   { from: './src/client/Assets', to: 'assets' },
        // ]})
    ],
};
